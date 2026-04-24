import type { InvoiceData } from '@/types/invoice';
import { formatAmount, formatString } from '@/lib/utils/format-value';
import { ExportButtons } from './export-buttons';

interface ExtractionResultProps {
  data: InvoiceData;
  onReset: () => void;
}

function FieldRow({ label, value }: { label: string; value: string }) {
  const isEmpty = value === '—';
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-slate-100 py-4 last:border-0">
      <span className="shrink-0 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
        {label}
      </span>
      <span
        className={`text-right text-sm font-medium ${
          isEmpty ? 'text-slate-300' : 'text-slate-900'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export function ExtractionResult({ data, onReset }: ExtractionResultProps) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/70 bg-white/95 shadow-card ring-1 ring-slate-200/70">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-[1.125rem]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-3 w-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </span>
          <h2 className="text-sm font-semibold text-slate-900">Extracted Invoice Data</h2>
        </div>
        <button
          onClick={onReset}
          className="rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Upload another
        </button>
      </div>

      <div className="px-6 pb-2 pt-1">
        <FieldRow label="Supplier" value={formatString(data.supplierName)} />
        <FieldRow label="Invoice Number" value={formatString(data.invoiceNumber)} />
        <FieldRow label="Invoice Date" value={formatString(data.invoiceDate)} />
        <FieldRow label="Total Amount" value={formatAmount(data.totalAmount, data.currency)} />
        <FieldRow label="VAT Amount" value={formatAmount(data.vatAmount, data.currency)} />
        <FieldRow label="Currency" value={formatString(data.currency)} />
        <FieldRow label="Notes" value={formatString(data.notes)} />
      </div>

      <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-4">
        <ExportButtons data={data} />
      </div>
    </div>
  );
}
