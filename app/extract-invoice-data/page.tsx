import type { Metadata } from 'next';
import { InvoiceExtractor } from '@/components/invoice-extractor';

export const metadata: Metadata = {
  title: 'Extract Invoice Data from PDF (Fast & Simple Tool)',
  description:
    'Extract structured invoice data from PDFs in seconds. Get supplier details, invoice numbers, totals, VAT, and currency ready for Excel or CSV export.',
  alternates: {
    canonical: 'https://parzo.app/extract-invoice-data',
  },
};

export default function ExtractInvoiceDataPage() {
  return (
    <InvoiceExtractor
      headline={
        <>
          Extract{' '}
          <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
            structured invoice data
          </span>{' '}
          from PDFs
        </>
      }
      subtext="Upload your invoice PDF and get structured data ready for Excel or CSV in seconds."
      seoContent={
        <section aria-label="Extract invoice data content" className="mb-10">
          <h2 className="text-base font-semibold text-slate-900">
            Extract structured invoice data from PDFs
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Parzo helps you extract key data from invoice PDFs without manual work.
          </p>

          <h3 className="mt-6 text-sm font-semibold text-slate-800">What Parzo extracts</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500">
            <li>Supplier details</li>
            <li>Invoice number</li>
            <li>Invoice date</li>
            <li>Totals and VAT</li>
            <li>Currency</li>
          </ul>

          <h3 className="mt-6 text-sm font-semibold text-slate-800">No signup. No storage.</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Files are processed temporarily and discarded after extraction.
          </p>

          <h3 className="mt-6 text-sm font-semibold text-slate-800">When to use Parzo</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500">
            <li>Processing multiple invoices</li>
            <li>Preparing data for accounting</li>
            <li>Automating manual workflows</li>
          </ul>
        </section>
      }
    />
  );
}
