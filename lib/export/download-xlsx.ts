import * as XLSX from 'xlsx';
import type { InvoiceData } from '@/types/invoice';

export function downloadXlsx(data: InvoiceData, filename = 'invoice.xlsx'): void {
  const row = {
    'Supplier Name': data.supplierName ?? '',
    'Invoice Number': data.invoiceNumber ?? '',
    'Invoice Date': data.invoiceDate ?? '',
    'Total Amount': data.totalAmount ?? '',
    'VAT Amount': data.vatAmount ?? '',
    'Currency': data.currency ?? '',
    'Notes': data.notes ?? '',
  };

  const ws = XLSX.utils.json_to_sheet([row]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Invoice');
  XLSX.writeFile(wb, filename);
}
