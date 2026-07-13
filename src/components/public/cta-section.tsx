import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimateIn } from "@/components/public/animate-in";

export function CtaSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
          alt="Kaçkar Dağları panorama"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-forest-900/75" />
      </div>

      <div className="relative container mx-auto px-4 text-center">
        <AnimateIn>
          <h2 className="text-3xl md:text-5xl font-bold text-cream mb-4 max-w-2xl mx-auto leading-tight">
            Yaylalar Sizi Bekliyor
          </h2>
          <p className="text-cream/70 text-lg mb-10 max-w-xl mx-auto">
            Hayalinizdeki Rize turunu planlayalım. WhatsApp üzerinden hızlıca
            bilgi alın veya online rezervasyon talebi oluşturun.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/rezervasyon"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-sage-500 hover:bg-sage-400 text-forest-900 shadow-lg"
              )}
            >
              Rezervasyon Yap
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/iletisim"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-cream/30 text-cream hover:bg-cream/10"
              )}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp ile Yazın
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
