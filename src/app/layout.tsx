import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OrganizationJsonLd } from "@/components/public/organization-json-ld";
import { ViewportHeightFix } from "@/components/viewport-height-fix";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kaçkarlı Tur | Rize Yayla Turları",
    template: "%s | Kaçkarlı Tur",
  },
  description:
    "Rize ve Kaçkar Dağları'nda günübirlik yayla turu. Fırtına Vadisi, Ayder, Pokut ve Sal rotası.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Kaçkarlı Tur",
    images: [{ url: "/images/rize-hero-poster.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased overflow-x-hidden`}>
      <head>
        <link
          rel="preload"
          href="/images/rize-hero-poster.jpg"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden w-full">
        <OrganizationJsonLd />
        <ViewportHeightFix />
        {children}
      </body>
    </html>
  );
}
