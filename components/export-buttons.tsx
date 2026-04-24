'use client';

import type { InvoiceData } from '@/types/invoice';
import { downloadCsv } from '@/lib/export/download-csv';
import { downloadXlsx } from '@/lib/export/download-xlsx';

interface ExportButtonsProps {
  data: InvoiceData;
}

export function ExportButtons({ data }: ExportButtonsProps) {
  return (
    <div className="flex items-center gap-2.5">
      <button
        onClick={() => downloadCsv(data)}
        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Download CSV
      </button>
      <button
        onClick={() => downloadXlsx(data)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Download Excel
      </button>
    </div>
  );
}
