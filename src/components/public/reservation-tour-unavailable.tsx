import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, CalendarDays, Sun } from "lucide-react";
import { AnimateIn } from "@/components/public/animate-in";
import { PageContainer } from "@/components/public/page-container";
import { RouteItinerarySection } from "@/components/public/route-itinerary-section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tourTypeLabel } from "@/lib/utils-helpers";
import type { PublicTour } from "@/lib/tour-types";

interface ReservationTourUnavailableProps {
  tour: PublicTour;
}

export function ReservationTourUnavailable({ tour }: ReservationTourUnavailableProps) {
  const isDayTrip = tour.type === "DAY_TRIP";

  return (
    <>
      <section className="py-8 sm:py-10 bg-mist border-b border-forest-100">
        <PageContainer>
          <AnimateIn className="rounded-2xl bg-earth-50 border border-earth-200 p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-white border border-earth-200 flex items-center justify-center shrink-0">
                  <CalendarDays className="h-5 w-5 text-earth-600" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-forest-900">
                    Bu tur için açık tarih yok
                  </h2>
                  <p className="text-sm text-earth-800 mt-1 leading-relaxed">
                    &quot;{tour.title}&quot; için şu an rezervasyon yapılabilecek bir tarih
                    bulunmuyor. Tur programını aşağıda inceleyebilir, diğer turlarımıza göz
                    atabilirsiniz.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
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
            </div>
          </AnimateIn>
        </PageContainer>
      </section>

      <section className="py-12 sm:py-16 bg-cream">
        <PageContainer>
          <div className="max-w-4xl mx-auto space-y-8">
            adasdad
            <AnimateIn>
              <div className="relative rounded-3xl overflow-hidden aspect-[16/9]">
                {tour.image ? (
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 896px"
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

            <AnimateIn delay={80}>
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
                    {tour.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-2.5 py-1 rounded-full bg-forest-50 text-forest-700 text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </AnimateIn>

            {tour.included.length > 0 && (
              <AnimateIn delay={120}>
                <div className="rounded-2xl bg-white border border-forest-100 p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-forest-900 mb-4">Dahil Olanlar</h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {tour.included.map((item) => (
                      <li key={item} className="text-sm text-forest-700 leading-snug">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            )}
          </div>
        </PageContainer>
      </section>

      {tour.stops.length > 0 && <RouteItinerarySection tour={tour} />}
    </>
  );
}
