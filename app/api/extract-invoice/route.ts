import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';
import { extractTextFromPdf } from '@/lib/pdf/extract-text';
import { extractInvoiceData } from '@/lib/ai/extract-invoice';
import { isInvoiceLikeText } from '@/lib/utils/validate-invoice-text';
import { log } from '@/lib/monitoring/logger';

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const startTime = Date.now();

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF files are supported' }, { status: 400 });
  }

  log('upload.start', { requestId, fileSize: file.size, mimeType: file.type });

  const buffer = Buffer.from(await file.arrayBuffer());

  let text: string;
  try {
    text = await extractTextFromPdf(buffer);
    log('pdf.parse.success', { requestId, charCount: text.length, durationMs: Date.now() - startTime });
  } catch (err) {
    log('pdf.parse.failure', { requestId, error: String(err) }, 'error');
    return NextResponse.json(
      { error: 'Could not extract text from this PDF. The file may be scanned or image-based.' },
      { status: 400 },
    );
  }

  // Pre-check: skip OpenAI if the text doesn't look like a financial document
  if (!isInvoiceLikeText(text)) {
    log('invoice.detect.failure', { requestId, charCount: text.length }, 'warn');
    return NextResponse.json(
      { error: 'This PDF does not look like an invoice or receipt.' },
      { status: 400 },
    );
  }

  const aiStart = Date.now();
  let data;
  try {
    data = await extractInvoiceData(text);
    log('ai.extract.success', { requestId, durationMs: Date.now() - aiStart });
  } catch (err) {
    log('ai.extract.failure', { requestId, error: String(err), durationMs: Date.now() - aiStart }, 'error');
    return NextResponse.json(
      { error: 'Failed to extract invoice data. Please try again.' },
      { status: 500 },
    );
  }

  // Post-check: all core fields null means the AI found nothing useful
  if (
    data.supplierName === null &&
    data.invoiceNumber === null &&
    data.invoiceDate   === null &&
    data.totalAmount   === null
  ) {
    log('invoice.extract.no_core_fields', { requestId }, 'warn');
    return NextResponse.json(
      { error: 'Could not find invoice data in this PDF.' },
      { status: 400 },
    );
  }

  log('request.complete', { requestId, totalDurationMs: Date.now() - startTime });
  return NextResponse.json({ data });
}
