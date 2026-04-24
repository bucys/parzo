import OpenAI from 'openai';
import type { InvoiceData } from '@/types/invoice';
import { SYSTEM_PROMPT, buildUserPrompt } from './prompts';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Accepts only YYYY-MM-DD with basic range sanity; returns null otherwise.
function normalizeDate(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return null;
  const month = parseInt(trimmed.slice(5, 7), 10);
  const day   = parseInt(trimmed.slice(8, 10), 10);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return trimmed;
}

// Trims whitespace; returns null if empty, too long, or looks like copied paragraph text.
function normalizeNotes(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  // Long text (>180 chars) is likely a copied block, not a clean reference
  if (trimmed.length > 180) return null;
  // Multiple sentence boundaries suggest paragraph copy-paste, not a reference
  const sentenceBoundaries = (trimmed.match(/[.!?]\s+[A-ZÆØÅ]/g) ?? []).length;
  if (sentenceBoundaries >= 2) return null;
  return trimmed;
}

export async function extractInvoiceData(text: string): Promise<InvoiceData> {
  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: buildUserPrompt(text) },
    ],
    response_format: { type: 'json_object' },
    temperature: 0,
  });

  const raw = response.choices[0]?.message?.content ?? '{}';
  const parsed = JSON.parse(raw);

  return {
    supplierName:  typeof parsed.supplierName  === 'string' ? parsed.supplierName.trim()  || null : null,
    invoiceNumber: typeof parsed.invoiceNumber === 'string' ? parsed.invoiceNumber.trim() || null : null,
    invoiceDate:   normalizeDate(parsed.invoiceDate),
    totalAmount:   typeof parsed.totalAmount   === 'number' ? parsed.totalAmount   : null,
    vatAmount:     typeof parsed.vatAmount     === 'number' ? parsed.vatAmount     : null,
    currency:      typeof parsed.currency      === 'string' ? parsed.currency.trim().toUpperCase() || null : null,
    notes:         normalizeNotes(parsed.notes),
  };
}
