'use client';

import Image from 'next/image';
import { useState } from 'react';
import { track } from '@vercel/analytics';
import type { InvoiceData } from '@/types/invoice';
import parzoLogo from '@/assets/images/parzo-logo.png';
import { extractTextFromPdfFile } from '@/lib/pdf/extract-text-client';
import { UploadDropzone } from '@/components/upload-dropzone';
import { LoadingState } from '@/components/loading-state';
import { ErrorState } from '@/components/error-state';
import { ExtractionResult } from '@/components/extraction-result';

type AppState =
  | { status: 'idle' }
  | { status: 'uploading' }
  | { status: 'success'; data: InvoiceData }
  | { status: 'error'; message: string };

const TRUST_ITEMS = [
  {
    icon: (
      <svg className="h-[1.375rem] w-[1.375rem] text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'No signup required',
    subtitle: 'Start using instantly',
  },
  {
    icon: (
      <svg className="h-[1.375rem] w-[1.375rem] text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'No data stored',
    subtitle: 'Your files stay private',
  },
  {
    icon: (
      <svg className="h-[1.375rem] w-[1.375rem] text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Results in seconds',
    subtitle: 'Fast and accurate',
  },
];

export default function Home() {
  const [state, setState] = useState<AppState>({ status: 'idle' });

  async function handleFile(file: File) {
    setState({ status: 'uploading' });
    track('upload_pdf_started');

    let text: string;
    try {
      text = await extractTextFromPdfFile(file);
    } catch {
      track('invoice_extraction_error', { reason: 'client_pdf_parse_failed' });
      setState({
        status: 'error',
        message: 'Could not extract text from this PDF. The file may be scanned or image-based.',
      });
      return;
    }

    if (!text || text.length < 20) {
      track('invoice_extraction_error', { reason: 'no_text_extracted' });
      setState({
        status: 'error',
        message: 'Could not extract text from this PDF. The file may be scanned or image-based.',
      });
      return;
    }

    track('pdf_text_extracted', { textLength: text.length, fileSize: file.size });

    try {
      const res = await fetch('/api/extract-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const json = await res.json();

      if (!res.ok) {
        track('invoice_extraction_error', { reason: json.error ?? 'api_error' });
        setState({ status: 'error', message: json.error ?? 'Something went wrong.' });
        return;
      }

      track('invoice_extraction_success');
      setState({ status: 'success', data: json.data });
    } catch {
      track('invoice_extraction_error', { reason: 'network_error' });
      setState({ status: 'error', message: 'Could not reach the server. Please try again.' });
    }
  }

  function reset() {
    setState({ status: 'idle' });
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#f5f9ff_0%,#f8fbff_24%,#ffffff_100%)]">
      <div className="relative mx-auto max-w-2xl px-6 pb-28 pt-12">
        {/* ── Brand ── */}
        <div className="mb-[3.75rem] flex justify-center">
          <Image
            src={parzoLogo}
            alt="Parzo"
            className="h-[7rem] w-auto object-contain"
            priority
          />
        </div>

        {/* ── Hero ── */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold leading-[1.34] tracking-[-0.022em] text-slate-900 sm:text-5xl">
            Turn messy invoices into{' '}
            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
              clean data
            </span>{' '}
            instantly
          </h1>
          <p className="mx-auto mt-5 max-w-[420px] text-base leading-7 text-slate-600">
            Upload any invoice or receipt PDF and get structured data you can export in seconds.
          </p>
        </div>

        {/* ── Dynamic zone: upload / loading / error ── */}
        <div className="mb-3">
          {(state.status === 'idle' || state.status === 'success') && (
            <UploadDropzone onFile={handleFile} />
          )}
          {state.status === 'uploading' && <LoadingState />}
          {state.status === 'error' && (
            <ErrorState message={state.message} onRetry={reset} />
          )}
        </div>

        {/* Format hint — subtle, SEO-supportive */}
        <p className="mb-7 text-center text-xs text-slate-400">
          Supports PDF invoices and receipts
        </p>

        {/* ── Trust signals ── */}
        <div className="mb-14 grid grid-cols-3 gap-4 sm:gap-7">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-card-soft ring-1 ring-slate-200/80">
                {item.icon}
              </div>
              <div>
                <p className="text-[0.84rem] font-semibold text-slate-800">{item.title}</p>
                <p className="mt-1 text-[0.73rem] leading-5 text-slate-400">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Result card (success only) ── */}
        {state.status === 'success' && (
          <div className="mb-14 animate-fade-up">
            <ExtractionResult data={state.data} onReset={reset} />
          </div>
        )}

        {/* ── SEO content block ── */}
        <section aria-label="About Parzo" className="mb-10 text-center">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Extract invoice data from PDF
          </h2>
          <p className="mx-auto mt-3 max-w-[480px] text-sm leading-relaxed text-slate-400">
            Parzo reads your invoice or receipt PDF and pulls out structured fields — supplier
            name, invoice number, date, total amount, and VAT — in seconds. No manual data
            entry. No account required.
          </p>
          <p className="mx-auto mt-2 max-w-[480px] text-sm leading-relaxed text-slate-400">
            Download results as an Excel spreadsheet or CSV file with one click. Useful for
            freelancers, accountants, and small businesses who process PDF invoices regularly.
          </p>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-slate-200/70 pt-10 text-center">
          <p className="text-sm font-medium text-slate-400">
            Built for freelancers and small businesses
          </p>
          <p className="mt-2">
            <a
              href="/privacy"
              className="text-xs text-slate-400 underline underline-offset-2 hover:text-slate-600 transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
