import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kaçkarlı Tur | Rize Yayla Turları",
    template: "%s | Kaçkarlı Tur",
  },
  description:
    "Rize ve Kaçkar Dağları'nda günübirlik yayla turu. Fırtına Vadisi, Ayder, Pokut ve Sal rotası.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} h-full antialiased overflow-x-hidden`}>
      <body className="min-h-full flex flex-col overflow-x-hidden w-full">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
