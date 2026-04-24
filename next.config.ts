import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdfjs-dist'],
  // Force Vercel's output file tracer to include the pdfjs worker file.
  // Without this, pdf.worker.mjs is never statically imported and is
  // absent from the serverless function bundle, causing runtime failures.
  outputFileTracingIncludes: {
    '/api/extract-invoice': [
      './node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs',
    ],
  },
};

export default nextConfig;
