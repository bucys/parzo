import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { extractInvoiceData } from '@/lib/ai/extract-invoice';
import { isInvoiceLikeText } from '@/lib/utils/validate-invoice-text';
import { log } from '@/lib/monitoring/logger';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const startTime = Date.now();

  let text: string;
  try {
    const body = await request.json();
    text = typeof body?.text === 'string' ? body.text.trim() : '';
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!text) {
    return NextResponse.json(
      { error: 'Could not extract text from this PDF.' },
      { status: 400 },
    );
  }

  log('text.receive.start', { requestId, charCount: text.length });

  if (!isInvoiceLikeText(text)) {
    log('invoice.detect.failure', { requestId, charCount: text.length }, 'warn');
    return NextResponse.json(
      { error: 'This PDF does not look like an invoice or receipt.' },
      { status: 400 },
    );
  }

  log('text.receive.success', { requestId, charCount: text.length });

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
