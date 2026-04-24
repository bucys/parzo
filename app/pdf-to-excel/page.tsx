import type { Metadata } from 'next';
import { InvoiceExtractor } from '@/components/invoice-extractor';

export const metadata: Metadata = {
  title: 'Convert Invoice PDF to Excel (Free, No Signup Tool)',
  description:
    'Convert PDF invoices and receipts to Excel instantly. Extract supplier, invoice number, date, totals, and VAT with no signup required.',
  alternates: {
    canonical: 'https://parzo.app/pdf-to-excel',
  },
};

export default function PdfToExcelPage() {
  return (
    <InvoiceExtractor
      headline={
        <>
          Convert PDF{' '}
          <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
            invoices to Excel
          </span>{' '}
          instantly
        </>
      }
      subtext="Turn PDF invoices and receipts into clean Excel files in seconds. No signup required."
      seoContent={
        <section aria-label="PDF to Excel content" className="mb-10">
          <h2 className="text-base font-semibold text-slate-900">
            Convert PDF invoices to Excel instantly
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Parzo lets you turn PDF invoices and receipts into clean Excel files in seconds. No
            signup, no setup — just upload your file and download structured data.
          </p>

          <h3 className="mt-6 text-sm font-semibold text-slate-800">How it works</h3>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500">
            <li>1. Upload your PDF invoice or receipt</li>
            <li>2. Extract key data like supplier, invoice number, date, totals, and VAT</li>
            <li>3. Download the result as Excel or CSV</li>
          </ol>

          <h3 className="mt-6 text-sm font-semibold text-slate-800">Why use Parzo</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500">
            <li>No account required</li>
            <li>No files stored</li>
            <li>Fast and simple</li>
            <li>Works with most invoice formats</li>
          </ul>

          <h3 className="mt-6 text-sm font-semibold text-slate-800">Use cases</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500">
            <li>Freelancers managing invoices</li>
            <li>Small businesses tracking expenses</li>
            <li>Accountants processing client documents</li>
          </ul>
        </section>
      }
    />
  );
}
