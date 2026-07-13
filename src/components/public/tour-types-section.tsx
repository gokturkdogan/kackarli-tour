import { PageContainer } from "@/components/public/page-container";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Sun } from "lucide-react";
import { AnimateIn } from "@/components/public/animate-in";

export function TourTypesSection() {
  return (
    <section className="py-24 bg-forest-900 relative overflow-hidden w-full">
      <PageContainer>
        <div className="grid lg:grid-cols-2 gap-6">
          <AnimateIn direction="left">
            <Link
              href="/turlar/gunubirlik"
              className="group relative block h-80 lg:h-96 rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&q=80"
                alt="Günübirlik yayla turu"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/40 to-forest-900/20 group-hover:from-forest-900/95 transition-colors" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="w-12 h-12 rounded-xl bg-sage-500/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <Sun className="h-6 w-6 text-sage-300" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-cream mb-2">
                  Günübirlik Turlar
                </h3>
                <p className="text-cream/70 text-sm mb-4 max-w-sm">
                  Sabah Rize&apos;den yola çıkın, akşam dolu dolu anılarla dönün.
                  Şelaleler, yaylalar ve vadiler tek günde.
                </p>
                <span className="inline-flex items-center text-sage-300 text-sm font-medium group-hover:text-sage-200">
                  Turları Gör
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </AnimateIn>

          <AnimateIn direction="right" delay={150}>
            <Link
              href="/turlar/konaklamali"
              className="group relative block h-80 lg:h-96 rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80"
                alt="Konaklamalı yayla turu"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/40 to-forest-900/20 group-hover:from-forest-900/95 transition-colors" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="w-12 h-12 rounded-xl bg-earth-400/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <BedDouble className="h-6 w-6 text-earth-300" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-cream mb-2">
                  Konaklamalı Turlar
                </h3>
                <p className="text-cream/70 text-sm mb-4 max-w-sm">
                  Yaylada geceleyin, yıldızları izleyin. Ahşap evlerde konaklama
                  ve çok günlük derinlemesine keşif.
                </p>
                <span className="inline-flex items-center text-earth-300 text-sm font-medium group-hover:text-earth-200">
                  Turları Gör
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </AnimateIn>
        </div>
      </PageContainer>
    </section>
  );
}
