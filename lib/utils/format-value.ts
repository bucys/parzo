export function formatAmount(amount: number | null, currency: string | null): string {
  if (amount === null) return '—';
  if (currency) {
    try {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
    } catch {
      return `${currency} ${amount.toFixed(2)}`;
    }
  }
  return amount.toFixed(2);
}

export function formatString(value: string | null): string {
  return value ?? '—';
}
