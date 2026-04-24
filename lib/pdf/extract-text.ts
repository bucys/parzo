import { join } from 'path';

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  // Dynamic import keeps pdfjs-dist out of module-level analysis during
  // Next.js build. Node.js caches the module after the first call.
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

  // Resolve worker path from the project root — works locally (pnpm symlink)
  // and in Vercel's serverless environment (/var/task).
  pdfjsLib.GlobalWorkerOptions.workerSrc = join(
    process.cwd(),
    'node_modules',
    'pdfjs-dist',
    'legacy',
    'build',
    'pdf.worker.mjs',
  );

  const data = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({
    data,
    useWorkerFetch: false,
    isEvalSupported: false,
    useSystemFonts: true,
  });

  const pdf = await loadingTask.promise;
  const pageTexts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
      .trim();
    if (pageText) pageTexts.push(pageText);
  }

  const text = pageTexts.join('\n').trim();
  if (!text) throw new Error('No readable text found in PDF');
  return text;
}
