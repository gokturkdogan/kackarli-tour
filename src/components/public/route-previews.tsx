import { PageContainer } from "@/components/public/page-container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/public/animate-in";
import { RoutePreviewCard } from "@/components/public/route-preview-card";
import { TourBannerCarousel } from "@/components/public/tour-banner-carousel";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tourTypeLabel } from "@/lib/utils-helpers";
import type { PublicTour } from "@/lib/tour-types";

interface RoutePreviewsProps {
  tours: PublicTour[];
}

export function RoutePreviews({ tours }: RoutePreviewsProps) {
  if (tours.length === 0) return null;

  const isSingle = tours.length === 1;
  const tour = tours[0];

  return (
    <section className="py-16 sm:py-20 bg-mist w-full overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100%,48rem)] h-48 bg-sage-200/25 rounded-full blur-3xl pointer-events-none" />

      <PageContainer className="relative">
        <AnimateIn className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-forest-500 text-xs font-medium tracking-widest uppercase">
            {isSingle ? tourTypeLabel(tour.type) + " Tur" : "Tur Rotalarımız"}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-forest-900 mt-2 mb-2 leading-tight">
            {isSingle ? tour.title : "Kaçkarlı Yaylaları Keşfedin"}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {isSingle
              ? (tour.shortDescription ?? tour.description)
              : "Günübirlik ve konaklamalı yayla turlarımızı inceleyin; özenle planlanmış rotalar ve unutulmaz manzaralar."}
          </p>
          {isSingle && (
            <Link
              href={tour.href}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-5 border-forest-300 text-forest-700 hover:bg-forest-50"
              )}
            >
              Rotayı İncele
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
          )}
        </AnimateIn>

        {isSingle ? (
          <AnimateIn>
            <RoutePreviewCard tour={tour} />
          </AnimateIn>
        ) : (
          <AnimateIn>
            <TourBannerCarousel tours={tours} />
          </AnimateIn>
        )}
      </PageContainer>
    </section>
  );
}
