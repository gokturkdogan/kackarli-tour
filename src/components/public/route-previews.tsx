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
    <section className="py-24 bg-mist w-full overflow-hidden">
      <PageContainer>
        {isSingle ? (
          <>
            <AnimateIn className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div className="max-w-xl">
                <span className="text-forest-500 text-sm font-medium tracking-widest uppercase">
                  {tourTypeLabel(tour.type)} Tur
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mt-3 mb-3">
                  {tour.title}
                </h2>
                <p className="text-muted-foreground">
                  {tour.shortDescription ?? tour.description}
                </p>
              </div>
              <Link
                href={tour.href}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "border-forest-300 text-forest-700 hover:bg-forest-50 shrink-0"
                )}
              >
                Rotayı İncele
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </AnimateIn>

            <AnimateIn>
              <RoutePreviewCard tour={tour} />
            </AnimateIn>
          </>
        ) : (
          <AnimateIn>
            <TourBannerCarousel tours={tours} />
          </AnimateIn>
        )}
      </PageContainer>
    </section>
  );
}
