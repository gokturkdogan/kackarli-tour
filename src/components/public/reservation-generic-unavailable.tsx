import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { AnimateIn } from "@/components/public/animate-in";
import { PageContainer } from "@/components/public/page-container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReservationGenericUnavailableProps {
  tourTitle?: string;
}

export function ReservationGenericUnavailable({
  tourTitle,
}: ReservationGenericUnavailableProps) {
  return (
    <section className="py-16 sm:py-20 bg-mist">
      <PageContainer>
        <AnimateIn className="max-w-lg mx-auto text-center rounded-3xl bg-white border border-forest-100 p-10 shadow-lg">
          <CalendarDays className="h-12 w-12 text-forest-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-forest-900 mb-2">Bu tur için açık tarih yok</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {tourTitle
              ? `"${tourTitle}" için şu an rezervasyon yapılabilecek bir tarih bulunmuyor. Diğer turlarımıza göz atabilir veya iletişime geçebilirsiniz.`
              : "Şu an rezervasyon yapılabilecek bir tur tarihi bulunmuyor. Turlarımıza göz atabilir veya iletişime geçebilirsiniz."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/turlar"
              className={cn(buttonVariants(), "bg-forest-600 hover:bg-forest-700")}
            >
              Turları İncele
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/iletisim"
              className={cn(buttonVariants({ variant: "outline" }), "border-forest-300")}
            >
              İletişime Geç
            </Link>
          </div>
        </AnimateIn>
      </PageContainer>
    </section>
  );
}
