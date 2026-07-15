import { PageContainer } from "@/components/public/page-container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimateIn } from "@/components/public/animate-in";
import { stockImage } from "@/lib/stock-images";
import type { SiteSettings } from "@/lib/site-settings";

interface AboutStoryProps {
  settings: SiteSettings;
}

export function AboutStory({ settings }: AboutStoryProps) {
  return (
    <section className="py-12 sm:py-20 md:py-28 bg-cream relative overflow-hidden w-full">
      <div className="absolute top-10 right-0 w-40 sm:w-80 h-40 sm:h-80 bg-sage-100/40 rounded-full blur-3xl pointer-events-none" />

      <PageContainer className="relative">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <AnimateIn direction="left">
            <div className="relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[5/4] sm:aspect-[4/5] shadow-xl sm:shadow-2xl shadow-forest-200/50 ring-1 ring-forest-100/80">
                <Image
                  src={stockImage("heroMountain", 900)}
                  alt="Rize yayla manzarası"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/55 via-forest-900/10 to-transparent" />

                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 rounded-xl bg-forest-900/85 backdrop-blur-sm px-3 py-2.5 sm:px-4 sm:py-3 ring-1 ring-cream/10">
                  <p className="text-sage-300 text-[10px] sm:text-xs uppercase tracking-wider">
                    Kuruluş
                  </p>
                  <p className="text-cream font-bold text-base sm:text-lg">2014 · Rize</p>
                </div>

                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 rounded-xl bg-white/95 backdrop-blur-sm px-3 py-2.5 sm:px-4 sm:py-3 shadow-lg border border-forest-100">
                  <p className="text-2xl sm:text-3xl font-bold text-forest-700 leading-none">
                    10+
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 max-w-[9rem]">
                    Yıllık yayla turizmi deneyimi
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn direction="right" delay={150}>
            <div className="rounded-2xl sm:rounded-none border border-forest-100 sm:border-0 bg-white/70 sm:bg-transparent p-5 sm:p-0 shadow-sm sm:shadow-none">
              <span className="inline-flex items-center rounded-full bg-forest-50 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-forest-600">
                Hikayemiz
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-forest-900 mt-3 mb-4 sm:mb-6 leading-tight">
                Rize&apos;nin Yaylalarını
                <span className="text-forest-600"> Tutkuyla Paylaşıyoruz</span>
              </h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
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
                  Günübirlik yayla turumuzla Fırtına Vadisi&apos;nden Pokut ve Sal&apos;a uzanan
                  özel rotamızı her hafta onlarca misafirimizle paylaşıyoruz.
                </p>
              </div>
              <Link
                href="/turlar"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-6 sm:mt-8 w-full sm:w-auto justify-center group bg-gradient-to-r from-sage-500 to-sage-400 hover:from-sage-400 hover:to-sage-300 text-forest-900 font-bold shadow-lg shadow-sage-500/20"
                )}
              >
                Tur Rotamızı Keşfedin
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </PageContainer>
    </section>
  );
}
