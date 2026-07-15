import { PageContainer } from "@/components/public/page-container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimateIn } from "@/components/public/animate-in";
import { stockImage } from "@/lib/stock-images";

export function CtaSection() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden w-full max-w-full">
      <div className="absolute inset-0">
        <Image
          src={stockImage("mountainPeaks", 1920)}
          alt="Kaçkar Dağları panorama"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-forest-900/75" />
      </div>

      <PageContainer className="relative text-center">
        <AnimateIn>
          <h2 className="text-3xl md:text-5xl font-bold text-cream mb-4 max-w-2xl mx-auto leading-tight">
            Yaylalar Sizi Bekliyor
          </h2>
          <p className="text-cream/70 text-lg mb-10 max-w-xl mx-auto">
            Hayalinizdeki Rize turunu planlayalım. WhatsApp üzerinden hızlıca
            bilgi alın veya online rezervasyon talebi oluşturun.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href="/rezervasyon"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full sm:w-auto justify-center bg-sage-500 hover:bg-sage-400 text-forest-900 shadow-lg"
              )}
            >
              Rezervasyon Yap
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/iletisim"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "w-full sm:w-auto justify-center border-cream/50 text-cream bg-white/10 hover:bg-white/20 hover:text-cream backdrop-blur-sm"
              )}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp ile Yazın
            </Link>
          </div>
        </AnimateIn>
      </PageContainer>
    </section>
  );
}
