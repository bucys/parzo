import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://parzo.app"),
  title: "Parzo – Invoice PDF Extractor | Export to Excel & CSV",
  description:
    "Upload any invoice or receipt PDF and extract structured data instantly — supplier, invoice number, amounts, VAT, and more. Export to Excel or CSV in one click. No account needed.",
  applicationName: "Parzo",
  keywords: [
    "invoice data extractor",
    "extract invoice data from PDF",
    "PDF invoice to Excel",
    "PDF invoice to CSV",
    "invoice parser",
    "receipt to Excel",
    "invoice PDF converter",
    "invoice data extraction tool",
  ],
  alternates: {
    canonical: "https://parzo.app/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Parzo – Extract Invoice Data from PDF",
    description:
      "Upload any invoice or receipt PDF and extract structured data instantly. Export to Excel or CSV in one click. No signup required.",
    type: "website",
    url: "https://parzo.app/",
    siteName: "Parzo",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Parzo – Invoice PDF Extractor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parzo – Extract Invoice Data from PDF",
    description:
      "Upload any invoice or receipt PDF and extract structured data instantly. Export to Excel or CSV in one click. No signup required.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Parzo",
  url: "https://parzo.app/",
  description:
    "Extract structured data from invoice and receipt PDFs instantly. Export to Excel or CSV. No signup required.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  browserRequirements: "Requires a modern web browser with JavaScript enabled",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Extract invoice data from PDF",
    "Export invoice data to Excel",
    "Export invoice data to CSV",
    "Parse receipts and invoices into structured data",
    "Extract supplier name, invoice number, date, amounts, and VAT",
  ],
  creator: {
    "@type": "Organization",
    name: "Parzo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
