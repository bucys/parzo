import { join } from 'path';
import { createRequire } from 'module';
import { pathToFileURL } from 'url';
import { log } from '@/lib/monitoring/logger';

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  log('pdf.load.start', { bufferBytes: buffer.length });

  // Dynamic import — keeps pdfjs out of module-level analysis at build time.
  // Node.js caches the module after the first invocation.
  let pdfjsLib: Awaited<typeof import('pdfjs-dist/legacy/build/pdf.mjs')>;
  try {
    pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
    log('pdf.module.loaded', {});
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log('pdf.module.error', { error: msg }, 'error');
    throw new Error(`pdfjs-dist failed to load: ${msg}`);
  }

  // Resolve the worker path using createRequire anchored at the project root.
  // This is more reliable than process.cwd() string-join because require.resolve
  // follows the actual node_modules resolution algorithm (including pnpm symlinks).
  // Falls back to a joined path if require.resolve is unavailable.
  let workerSrc: string;
  try {
    const projectRequire = createRequire(
      pathToFileURL(join(process.cwd(), 'package.json')).href,
    );
    workerSrc = projectRequire.resolve('pdfjs-dist/legacy/build/pdf.worker.mjs');
  } catch {
    workerSrc = join(
      process.cwd(),
      'node_modules',
      'pdfjs-dist',
      'legacy',
      'build',
      'pdf.worker.mjs',
    );
  }
  log('pdf.worker.resolved', { workerSrc });
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

  // Load the PDF document from the buffer.
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

  // Extract text from each page.
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
