// Signals that strongly suggest a financial document.
// Includes common English, Norwegian, Swedish, Danish, and German terms.
const INVOICE_SIGNALS = [
  // Document type words
  'invoice', 'receipt', 'faktura', 'kvittering', 'rechnung', 'factura', 'bill',
  // Financial totals
  'total', 'amount', 'subtotal', 'balance due', 'sum',
  // Tax terms
  'vat', 'tax', 'mva', 'moms', 'mwst', 'gst',
  // ISO currency codes
  'eur', 'usd', 'gbp', 'nok', 'sek', 'dkk', 'chf',
  // Currency symbols (present in raw PDF text)
  '€', '$', '£',
];

// Minimum required signal matches. Two is intentionally lenient:
// real invoices will typically hit 4–6, while non-financial PDFs hit 0–1.
const MIN_SIGNALS = 2;
export const MIN_INVOICE_TEXT_LENGTH = 80;

export function isInvoiceLikeText(text: string): boolean {
  if (text.length < MIN_INVOICE_TEXT_LENGTH) return false;
  const lower = text.toLowerCase();
  let matches = 0;
  for (const signal of INVOICE_SIGNALS) {
    if (lower.includes(signal)) {
      matches++;
      if (matches >= MIN_SIGNALS) return true;
    }
  }
  return false;
}
