import Image from "next/image";
import {
  BedDouble,
  Sun,
} from "lucide-react";
import { PageContainer } from "@/components/public/page-container";
import { RouteItinerarySection } from "@/components/public/route-itinerary-section";
import { TourDetailCtaSection } from "@/components/public/tour-detail-cta-section";
import { TourDetailSidebar } from "@/components/public/tour-detail-sidebar";
import { AnimateIn } from "@/components/public/animate-in";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { tourTypeLabel } from "@/lib/utils-helpers";
import type { PublicTour } from "@/lib/tour-types";

interface TourDetailViewProps {
  tour: PublicTour;
  showItinerary?: boolean;
}

export function TourDetailView({ tour, showItinerary = true }: TourDetailViewProps) {
  const isDayTrip = tour.type === "DAY_TRIP";

  return (
    <>
      <section className="py-12 sm:py-16">
        <PageContainer>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-8">
              <AnimateIn>
                <div className="relative rounded-3xl overflow-hidden aspect-[16/9]">
                  {tour.image ? (
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-forest-100" />
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={cn(
                        isDayTrip ? "bg-sage-500 text-forest-900" : "bg-earth-400 text-white"
                      )}
                    >
                      {isDayTrip ? (
                        <Sun className="h-3 w-3 mr-1" />
                      ) : (
                        <BedDouble className="h-3 w-3 mr-1" />
                      )}
                      {tourTypeLabel(tour.type)}
                    </Badge>
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn delay={100}>
                <div>
                  {tour.subtitle && (
                    <p className="text-forest-500 text-sm font-medium uppercase tracking-wider mb-2">
                      {tour.subtitle}
                    </p>
                  )}
                  <h2 className="text-2xl font-bold text-forest-900 mb-4">Tur Hakkında</h2>
                  <p className="text-muted-foreground leading-relaxed">{tour.description}</p>
                  {tour.departureTime && tour.returnTime && (
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      Rotamız sabah{" "}
                      <strong className="text-forest-800">{tour.departureTime}</strong> hareketli
                      olup akşam <strong className="text-forest-800">{tour.returnTime}</strong>
                      &apos;de dönüş yapar. Yol boyunca planlı duraklar, manzara molaları ve
                      dinlenme noktaları bulunur.
                    </p>
                  )}
                  {tour.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      {tour.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2.5 py-1 rounded-full bg-forest-50 text-forest-700 text-xs"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </AnimateIn>
            </div>

            <div className="hidden lg:block lg:col-span-1">
              <AnimateIn delay={150}>
                <div className="sticky top-24">
                  <TourDetailSidebar tour={tour} />
                </div>
              </AnimateIn>
            </div>
          </div>
        </PageContainer>
      </section>

      {showItinerary && tour.stops.length > 0 && <RouteItinerarySection tour={tour} />}

      <TourDetailCtaSection tour={tour} />
    </>
  );
}
