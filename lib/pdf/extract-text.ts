import { log } from '@/lib/monitoring/logger';

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  log('pdf.load.start', { bufferBytes: buffer.length });

  let pdfjsLib: Awaited<typeof import('pdfjs-dist/legacy/build/pdf.mjs')>;
  try {
    pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
    log('pdf.module.loaded', {});
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log('pdf.module.error', { error: msg }, 'error');
    throw new Error(`pdfjs-dist failed to load: ${msg}`);
  }

  const data = new Uint8Array(buffer);
  let pdf: Awaited<ReturnType<typeof pdfjsLib.getDocument>['promise']>;
  try {
    pdf = await pdfjsLib.getDocument({
      data,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true,
    }).promise;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    log('pdf.document.error', { error: msg, stack }, 'error');
    throw new Error(`Failed to load PDF document: ${msg}`);
  }

  log('pdf.document.loaded', { numPages: pdf.numPages });

  const pageTexts: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const items = content.items.filter((item) => 'str' in item);
    const pageText = items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
      .trim();
    log('pdf.page.extracted', { page: i, itemCount: items.length, charCount: pageText.length });
    if (pageText) pageTexts.push(pageText);
  }

  const text = pageTexts.join('\n').trim();
  log('pdf.extract.complete', { totalCharCount: text.length });

  if (!text) throw new Error('No readable text found in PDF');
  return text;
}
