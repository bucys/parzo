import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy – Parzo',
  description: 'How Parzo handles your data when extracting invoice information from PDFs.',
};

const TRUST_ITEMS = [
  { label: 'No signup', sub: 'Use it instantly, no account needed' },
  { label: 'No files stored', sub: 'Your PDFs are never retained' },
  { label: 'Anonymous analytics', sub: 'No personal data collected' },
];

const CARDS = [
  {
    icon: (
      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    iconBg: 'bg-blue-50',
    heading: 'Your files',
    body: "Your PDF is processed in the browser to extract text. Nothing is uploaded to our servers beyond what is needed for extraction. Files are never stored — once processing is done, they are gone.",
  },
  {
    icon: (
      <svg className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    iconBg: 'bg-violet-50',
    heading: 'AI processing',
    body: 'Extracted invoice text is sent to the OpenAI API to identify fields like supplier, date, and amounts. Under OpenAI\'s API terms, this data is not used to train models. Parzo does not store the extracted text or results.',
  },
  {
    icon: (
      <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    iconBg: 'bg-emerald-50',
    heading: 'Analytics',
    body: 'We use Vercel Analytics to understand how the tool is used — things like feature usage and session counts. No invoice content, file data, or personally identifiable information is ever collected.',
  },
  {
    icon: (
      <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    iconBg: 'bg-amber-50',
    heading: 'No accounts',
    body: 'Parzo requires no signup and no login. We don\'t create user profiles, track individual users across sessions, or store any personal information.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f9ff_0%,#f8fbff_24%,#ffffff_100%)]">
      <div className="mx-auto max-w-2xl px-6 pb-24 pt-14">

        {/* Back link */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-slate-600"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Parzo
          </Link>
        </div>

        {/* Hero */}
        <div className="mb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Privacy Policy
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900">
            We don&apos;t store your invoices.
          </h1>
          <p className="mb-5 max-w-lg text-base leading-relaxed text-slate-500">
            Your PDF is processed only to extract invoice data, then discarded after
            processing. No files, no accounts, no tracking.
          </p>
          <p className="text-xs text-slate-400">Last updated April 2026</p>
        </div>

        {/* Trust row */}
        <div className="mb-12 grid grid-cols-3 gap-3 rounded-xl border border-slate-200 bg-white px-4 py-5 shadow-sm">
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col items-center gap-1 text-center ${
                i < TRUST_ITEMS.length - 1
                  ? 'border-r border-slate-100 pr-3'
                  : ''
              }`}
            >
              <span className="text-[0.8rem] font-semibold text-slate-700">{item.label}</span>
              <span className="text-[0.7rem] leading-snug text-slate-400">{item.sub}</span>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CARDS.map((card) => (
            <section
              key={card.heading}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className={`mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg ${card.iconBg}`}>
                {card.icon}
              </div>
              <h2 className="mb-2 text-sm font-semibold text-slate-800">{card.heading}</h2>
              <p className="text-sm leading-relaxed text-slate-500">{card.body}</p>
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-200/70 pt-8 text-center">
          
          <p className="mt-2 text-xs font-medium text-slate-400">
            Built for freelancers and small businesses
          </p>
        </footer>

      </div>
    </div>
  );
}
