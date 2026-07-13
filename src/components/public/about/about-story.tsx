import { PageContainer } from "@/components/public/page-container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimateIn } from "@/components/public/animate-in";
import type { SiteSettings } from "@/lib/site-settings";

interface AboutStoryProps {
  settings: SiteSettings;
}

export function AboutStory({ settings }: AboutStoryProps) {
  return (
    <section className="py-20 md:py-28 bg-cream relative overflow-hidden w-full">
      <div className="absolute top-20 right-0 w-48 sm:w-80 h-48 sm:h-80 bg-sage-100/40 rounded-full blur-3xl pointer-events-none" />

      <PageContainer className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimateIn direction="left">
            <div className="relative overflow-hidden rounded-3xl pb-8 sm:pb-0">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-forest-200/50 mx-2 sm:mx-0">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80"
                  alt="Rize yayla manzarası"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/40 to-transparent" />
              </div>
              {/* Floating widget card */}
              <div className="absolute bottom-2 right-2 sm:-bottom-6 sm:right-6 bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-forest-100 max-w-[160px] sm:max-w-[200px] animate-float">
                <p className="text-2xl sm:text-3xl font-bold text-forest-700">10+</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                  Yıllık yayla turizmi deneyimi
                </p>
              </div>
              <div className="absolute top-2 left-2 sm:-top-4 sm:-left-4 bg-forest-800 rounded-2xl p-3 sm:p-4 shadow-lg max-w-[140px] sm:max-w-[160px]">
                <p className="text-sage-300 text-xs uppercase tracking-wider">Kuruluş</p>
                <p className="text-cream font-bold text-lg">2014 · Rize</p>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn direction="right" delay={150}>
            <span className="text-forest-500 text-sm font-medium tracking-widest uppercase">
              Hikayemiz
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mt-3 mb-6 leading-tight">
              Rize&apos;nin Yaylalarını
              <span className="text-forest-600"> Tutkuyla Paylaşıyoruz</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-forest-800">{settings.siteName}</strong>, 2014
                yılında Rize&apos;de doğdu. Amacımız basitti: Kaçkar Dağları&apos;nın
                büyülü yaylalarını, şelalelerini ve vadilerini herkes için erişilebilir
                kılmak.
              </p>
              <p>
                {settings.siteDescription}. Yıllar içinde yüzlerce rotayı keşfettik,
                binlerce misafirimizi bu eşsiz coğrafyayla buluşturduk. Her turumuzda
                doğaya saygı, güvenlik ve misafirperverlik ilkelerimizden ödün vermiyoruz.
              </p>
              <p>
                Günübirlik keşiflerden çok günlük konaklamalı maceralara kadar geniş bir
                yelpazede, Rize&apos;nin her köşesini sizinle paylaşmaya devam ediyoruz.
              </p>
            </div>
            <Link
              href="/turlar"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 bg-forest-600 hover:bg-forest-700 text-cream"
              )}
            >
              Turlarımızı Keşfedin
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </AnimateIn>
        </div>
      </PageContainer>
    </section>
  );
}
