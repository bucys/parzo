# Parzo

Extract invoice and receipt data from PDFs and export clean data to Excel or CSV in seconds.

## Features

- Upload PDF invoices or receipts
- Extract structured data:
  - Supplier
  - Invoice number
  - Invoice date
  - Total & VAT
- Export to CSV or Excel
- No signup required

## How it works

1. Upload a PDF invoice or receipt
2. Parzo extracts structured data using AI
3. Download as CSV or Excel

## Tech

- Next.js
- OpenAI (structured extraction)
- pdfjs-dist (PDF parsing)

## Local development

```bash
pnpm install
pnpm dev
```

Requires an `OPENAI_API_KEY` in `.env.local`. See `.env.example`.

## Notes

- Works best with digital PDFs
- Scanned or image-based PDFs are not supported
