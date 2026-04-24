import type { InvoiceData } from '@/types/invoice';

const HEADERS = [
  'Supplier Name',
  'Invoice Number',
  'Invoice Date',
  'Total Amount',
  'VAT Amount',
  'Currency',
  'Notes',
];

function escapeCell(value: string | number | null): string {
  if (value === null || value === undefined) return '';
  const str = String(value);
  return str.includes(',') || str.includes('"') || str.includes('\n')
    ? `"${str.replace(/"/g, '""')}"`
    : str;
}

export function downloadCsv(data: InvoiceData, filename = 'invoice.csv'): void {
  const row = [
    data.supplierName,
    data.invoiceNumber,
    data.invoiceDate,
    data.totalAmount,
    data.vatAmount,
    data.currency,
    data.notes,
  ].map(escapeCell);

  const csv = [HEADERS.join(','), row.join(',')].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  triggerDownload(blob, filename);
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
