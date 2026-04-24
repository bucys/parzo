import { PDFParse } from 'pdf-parse';
import { log } from '@/lib/monitoring/logger';

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  log('pdf.load.start', { bufferBytes: buffer.length });

  const parser = new PDFParse({ data: buffer });
  let text: string;
  try {
    const result = await parser.getText();
    text = result.text.trim();
    log('pdf.parse.complete', { charCount: text.length });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    log('pdf.document.error', { error: msg, stack }, 'error');
    throw new Error(`Failed to parse PDF: ${msg}`);
  } finally {
    await parser.destroy();
  }

  log('pdf.extract.complete', { totalCharCount: text.length });

  if (!text) throw new Error('No readable text found in PDF');
  return text;
}
