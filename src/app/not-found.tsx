import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeaderShell } from "@/components/public/public-header-shell";
import { PublicFooter } from "@/components/public/public-footer";
import { PageContainer } from "@/components/public/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <PublicHeaderShell variant="solid" />
      <main className="bg-cream min-h-[60vh] flex items-center">
        <PageContainer className="py-16 text-center">
          <p className="text-forest-500 text-sm font-semibold uppercase tracking-widest mb-3">404</p>
          <h1 className="text-3xl font-bold text-forest-900 mb-3">Sayfa bulunamadı</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className={cn(buttonVariants({ size: "lg" }), "justify-center")}>
              Ana Sayfa
            </Link>
            <Link
              href="/turlar"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "justify-center"
              )}
            >
              Turları Gör
            </Link>
          </div>
        </PageContainer>
      </main>
      <PublicFooter />
    </>
  );
}
