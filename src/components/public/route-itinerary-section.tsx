import Image from "next/image";
import { PageContainer } from "@/components/public/page-container";
import {
  Bus,
  Camera,
  ChevronRight,
  Coffee,
  MapPin,
  UtensilsCrossed,
} from "lucide-react";
import type { PublicRouteStop, PublicTour, RouteStopType } from "@/lib/tour-types";
import { formatTourTimeRange } from "@/lib/tour-mapper";
import { AnimateIn } from "@/components/public/animate-in";
import { cn } from "@/lib/utils";

const stopTypeConfig: Record<
  RouteStopType,
  { label: string; icon: typeof MapPin; badge: string; dot: string }
> = {
  boarding: {
    label: "Biniş / Varış",
    icon: Bus,
    badge: "bg-forest-700/80 text-cream border-forest-600",
    dot: "bg-forest-400 ring-forest-400/30",
  },
  stop: {
    label: "Durak",
    icon: MapPin,
    badge: "bg-sage-500/90 text-forest-900 border-sage-400",
    dot: "bg-sage-400 ring-sage-400/30",
  },
  rest: {
    label: "Dinlenme",
    icon: Coffee,
    badge: "bg-earth-400/90 text-white border-earth-300",
    dot: "bg-earth-400 ring-earth-400/30",
  },
  viewpoint: {
    label: "Manzara",
    icon: Camera,
    badge: "bg-forest-600/90 text-cream border-forest-500",
    dot: "bg-forest-300 ring-forest-300/30",
  },
  meal: {
    label: "Yemek Molası",
    icon: UtensilsCrossed,
    badge: "bg-sage-600/90 text-cream border-sage-500",
    dot: "bg-sage-300 ring-sage-300/30",
  },
};

function StopContent({
  stop,
  config,
}: {
  stop: PublicRouteStop;
  config: (typeof stopTypeConfig)[RouteStopType];
}) {
  const Icon = config.icon;

  return (
    <div className="flex flex-col justify-center h-full p-5 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 text-sage-300 text-sm font-mono font-semibold bg-forest-800/80 px-2.5 py-1 rounded-lg">
          {stop.time}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-sm",
            config.badge
          )}
        >
          <Icon className="h-3 w-3" />
          {config.label}
        </span>
        {stop.duration && stop.duration !== "—" && (
          <span className="text-cream/40 text-xs">{stop.duration}</span>
        )}
      </div>
      <h3
        className={cn(
          "font-bold text-cream mb-2 leading-tight",
          stop.featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
        )}
      >
        {stop.name}
      </h3>
      <p className="text-sm sm:text-base text-cream/65 leading-relaxed">{stop.description}</p>
    </div>
  );
}

function StopImage({
  stop,
  config,
  priority = false,
}: {
  stop: PublicRouteStop;
  config: (typeof stopTypeConfig)[RouteStopType];
  priority?: boolean;
}) {
  if (!stop.image) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        stop.featured ? "min-h-[220px] sm:min-h-[280px] lg:min-h-[320px]" : "min-h-[180px] sm:min-h-[220px]"
      )}
    >
      <Image
        src={stop.image}
        alt={stop.name}
        fill
        priority={priority}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 45vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-forest-900/10 to-transparent" />
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-900/70 backdrop-blur-sm text-cream text-sm font-bold border border-cream/20">
          {stop.order}
        </span>
      </div>
      {stop.featured && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-sage-500/90 text-forest-900 font-semibold">
            Öne Çıkan
          </span>
        </div>
      )}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 lg:hidden">
        <span
          className={cn(
            "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-sm",
            config.badge
          )}
        >
          {config.label}
        </span>
      </div>
    </div>
  );
}

interface RouteItinerarySectionProps {
  tour: PublicTour;
}

export function RouteItinerarySection({ tour }: RouteItinerarySectionProps) {
  const routeStops = tour.stops;
  const featuredStops = routeStops.filter((s) => s.featured);
  const timeRange = formatTourTimeRange(tour);

  return (
    <section className="py-20 sm:py-28 bg-forest-900 relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest-700/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <PageContainer className="relative">
        <AnimateIn className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
          <span className="text-sage-300 text-sm font-medium tracking-widest uppercase">
            Tur Programı
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-cream mt-3 mb-4">
            Rota Durakları & Molalar
          </h2>
          <p className="text-cream/60 leading-relaxed">
            Gün boyunca izlediğimiz güzergâh ve her durakta neler yapacağımız. Hava koşullarına
            göre molalar kısmen uyarlanabilir.
          </p>
        </AnimateIn>

        {/* Route overview strip */}
        <AnimateIn delay={80} className="mb-12 sm:mb-16">
          <div className="rounded-2xl border border-forest-700/60 bg-forest-800/40 backdrop-blur-sm p-4 sm:p-5 overflow-hidden">
            <p className="text-[10px] uppercase tracking-widest text-sage-400 mb-3 text-center sm:text-left">
              Günün Akışı{timeRange ? ` · ${timeRange}` : ""}
            </p>
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {routeStops.map((stop, i) => (
                <div key={stop.order} className="flex items-center shrink-0">
                  <a
                    href={`#durak-${stop.order}`}
                    className="group flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-forest-700/50 transition-colors"
                  >
                    {stop.image && (
                      <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0 ring-1 ring-forest-600">
                        <Image
                          src={stop.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="36px"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-[10px] text-sage-400 font-mono">{stop.time}</p>
                      <p className="text-xs text-cream/80 font-medium truncate max-w-[88px] sm:max-w-[120px] group-hover:text-cream">
                        {stop.name.split(" — ")[0].split(" —")[0]}
                      </p>
                    </div>
                  </a>
                  {i < routeStops.length - 1 && (
                    <ChevronRight className="h-3.5 w-3.5 text-forest-600 shrink-0 mx-0.5" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* Featured stops gallery */}
        {featuredStops.length > 0 && (
          <AnimateIn delay={120} className="mb-12 sm:mb-16">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {featuredStops.map((stop, i) => (
                <a
                  key={stop.order}
                  href={`#durak-${stop.order}`}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[3/2]",
                    i === 1 && "col-span-1 sm:row-span-1"
                  )}
                >
                  {stop.image && (
                    <Image
                      src={stop.image}
                      alt={stop.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
                    <p className="text-[10px] text-sage-300 font-mono mb-0.5">{stop.time}</p>
                    <p className="text-xs sm:text-sm font-semibold text-cream leading-tight line-clamp-2">
                      {stop.name}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </AnimateIn>
        )}

        {/* Zigzag timeline */}
        <div className="relative max-w-5xl mx-auto">
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-sage-500/50 via-forest-600 to-sage-500/50" />

          <div className="space-y-6 sm:space-y-8">
            {routeStops.map((stop, i) => {
              const config = stopTypeConfig[stop.type];
              const isEven = i % 2 === 0;
              const isLeft = isEven;

              return (
                <AnimateIn key={stop.order} delay={i * 50} id={`durak-${stop.order}`}>
                  <div
                    className={cn(
                      "group relative",
                      stop.featured && "lg:my-2"
                    )}
                  >
                    {/* Center dot — desktop */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div
                        className={cn(
                          "w-4 h-4 rounded-full ring-4",
                          config.dot
                        )}
                      />
                    </div>

                    {/* Mobile / tablet card */}
                    <div className="lg:hidden rounded-2xl overflow-hidden border border-forest-700/50 bg-forest-800/50 hover:border-sage-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-forest-900/50">
                      <StopImage stop={stop} config={config} priority={i < 2} />
                      <StopContent stop={stop} config={config} />
                    </div>

                    {/* Desktop zigzag */}
                    <div
                      className={cn(
                        "hidden lg:grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-forest-700/50 bg-forest-800/40 hover:border-sage-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-forest-900/60",
                        stop.featured && "border-sage-500/30 shadow-lg shadow-forest-900/40"
                      )}
                    >
                      {isLeft ? (
                        <>
                          <div className="border-r border-forest-700/30">
                            <StopContent stop={stop} config={config} />
                          </div>
                          <StopImage stop={stop} config={config} priority={i < 2} />
                        </>
                      ) : (
                        <>
                          <StopImage stop={stop} config={config} priority={i < 2} />
                          <div className="border-l border-forest-700/30">
                            <StopContent stop={stop} config={config} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>

        {/* Summary footer */}
        <AnimateIn delay={200} className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-3 sm:gap-4 px-5 py-4 rounded-2xl bg-forest-800/50 border border-forest-700/50">
            {[
              { label: "Toplam Durak", value: `${routeStops.length}` },
              { label: "Süre", value: timeRange || tour.duration || "—" },
              { label: "Mesafe", value: tour.distance ?? "—" },
            ].map((item) => (
              <div key={item.label} className="text-center px-3">
                <p className="text-lg sm:text-xl font-bold text-cream">{item.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-cream/50">{item.label}</p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </PageContainer>
    </section>
  );
}
