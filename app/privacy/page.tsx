import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy – Parzo',
  description: 'How Parzo handles your data when extracting invoice information from PDFs.',
};

const SECTIONS = [
  {
    heading: 'Your files',
    body: 'When you upload a PDF, it is processed temporarily in your browser and, if needed, on our servers to extract text. The file itself is never stored after processing is complete. We do not keep copies of your invoices or receipts.',
  },
  {
    heading: 'AI processing',
    body: 'Extracted text from your PDF is sent to the OpenAI API to identify invoice fields such as supplier, date, and amounts. OpenAI does not use this data to train its models under the standard API terms. Parzo does not store the extracted text or invoice data after the response is returned.',
  },
  {
    heading: 'Analytics',
    body: 'We collect anonymous usage data through Vercel Analytics — things like which features are used and how often. This data contains no personally identifiable information, no invoice content, and no file data.',
  },
  {
    heading: 'No accounts',
    body: 'Parzo requires no signup or login. We do not create user accounts, store personal profiles, or track individual users across sessions.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f9ff_0%,#f8fbff_24%,#ffffff_100%)]">
      <div className="mx-auto max-w-2xl px-6 pb-24 pt-16">

        <div className="mb-10">
          <Link
            href="/"
            className="text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Back
          </Link>
        </div>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
          Privacy Policy
        </h1>
        <p className="mb-12 text-sm text-slate-400">Last updated April 2026</p>

        <div className="flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 text-base font-semibold text-slate-800">
                {section.heading}
              </h2>
              <p className="text-sm leading-7 text-slate-500">{section.body}</p>
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-slate-200/70 pt-8 text-center">
          <p className="text-sm font-medium text-slate-400">
            Built for freelancers and small businesses
          </p>
        </footer>

      </div>
    </div>
  );
}
