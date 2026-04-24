import type { Metadata } from 'next';
import { InvoiceExtractor } from '@/components/invoice-extractor';

export const metadata: Metadata = {
  title: 'Invoice to Excel Converter (Free & No Signup)',
  description:
    'Convert invoice PDFs to Excel in seconds. Extract supplier names, invoice numbers, dates, totals, VAT, and currency without manual entry.',
  alternates: {
    canonical: 'https://parzo.app/invoice-to-excel',
  },
};

export default function InvoiceToExcelPage() {
  return (
    <InvoiceExtractor
      headline={
        <>
          Convert invoice{' '}
          <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
             PDFs to Excel
          </span>{' '}
          in seconds
        </>
      }
      subtext="Stop copying invoice data manually. Extract structured data instantly and export to Excel."
      seoContent={
        <section aria-label="Invoice to Excel content" className="mb-10">
          <h2 className="text-base font-semibold text-slate-900">
            Convert invoice PDFs to Excel in seconds
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Manually copying invoice data into Excel is slow and error-prone. Parzo automates
            this process by extracting structured data directly from your PDF invoices.
          </p>

          <h3 className="mt-6 text-sm font-semibold text-slate-800">What gets extracted</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500">
            <li>Supplier name</li>
            <li>Invoice number</li>
            <li>Invoice date</li>
            <li>Total amount and VAT</li>
            <li>Currency</li>
          </ul>

          <h3 className="mt-6 text-sm font-semibold text-slate-800">Why it&apos;s different</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500">
            <li>No signup required</li>
            <li>No data stored</li>
            <li>Clean structured output</li>
          </ul>

          <h3 className="mt-6 text-sm font-semibold text-slate-800">Who it&apos;s for</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-500">
            <li>Freelancers</li>
            <li>Bookkeepers</li>
            <li>Small business owners</li>
          </ul>
        </section>
      }
    />
  );
}
