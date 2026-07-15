import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Clock, MapPin, Route, Sun, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tourTypeLabel } from "@/lib/utils-helpers";
import type { PublicTour } from "@/lib/tour-types";

interface RoutePreviewCardProps {
  tour: PublicTour;
  className?: string;
  compact?: boolean;
}

export function RoutePreviewCard({ tour, className, compact = false }: RoutePreviewCardProps) {
  const isDayTrip = tour.type === "DAY_TRIP";

  return (
    <div
      className={cn(
        "group rounded-3xl overflow-hidden bg-white border border-forest-100 hover:border-forest-300 hover:shadow-2xl hover:shadow-forest-100/60 transition-all duration-500 h-full",
        className
      )}
    >
      <div className={cn("grid", compact ? "grid-cols-1" : "lg:grid-cols-2")}>
        <div
          className={cn(
            "relative overflow-hidden",
            compact ? "h-48 sm:h-56" : "h-64 lg:h-auto lg:min-h-[420px]"
          )}
        >
          {tour.image ? (
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={compact ? "(max-width: 768px) 90vw, 400px" : "(max-width: 1024px) 100vw, 50vw"}
            />
          ) : (
            <div className="absolute inset-0 bg-forest-100" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
          <div className="absolute top-4 left-4">
            <Badge
              className={cn(
                isDayTrip ? "bg-sage-500 text-forest-900" : "bg-earth-400 text-white"
              )}
            >
              {isDayTrip ? <Sun className="h-3 w-3 mr-1" /> : <BedDouble className="h-3 w-3 mr-1" />}
              {tourTypeLabel(tour.type)}
            </Badge>
          </div>
        </div>

        <div className={cn("flex flex-col justify-center", compact ? "p-5 sm:p-6" : "p-6 sm:p-8 lg:p-10")}>
          {tour.subtitle && (
            <p className="text-forest-500 text-sm font-medium uppercase tracking-wider mb-2">
              {tour.subtitle}
            </p>
          )}

          {compact && (
            <h3 className="text-xl font-bold text-forest-900 mb-3 leading-tight">{tour.title}</h3>
          )}

          <div className={cn("grid gap-4 mb-6", compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4")}>
            {[
              { icon: Clock, label: "Süre", value: tour.duration ?? "—" },
              { icon: Route, label: "Mesafe", value: tour.distance ?? "—" },
              { icon: MapPin, label: "Çıkış", value: tour.departureTime ?? "—" },
              {
                icon: Users,
                label: "Grup",
                value: tour.maxGroupSize ? `Max ${tour.maxGroupSize}` : "—",
              },
            ].map((item) => (
              <div key={item.label} className="text-center sm:text-left">
                <item.icon className="h-4 w-4 text-forest-500 mx-auto sm:mx-0 mb-1" />
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-forest-900">{item.value}</p>
              </div>
            ))}
          </div>

          {!compact && tour.departureTime && tour.returnTime && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Sabah <strong className="text-forest-800">{tour.departureTime}</strong>
              &apos;de hareket, akşam{" "}
              <strong className="text-forest-800">{tour.returnTime}</strong>
              &apos;de dönüş. Rota boyunca planlı duraklar, manzara molaları ve dinlenme noktaları.
            </p>
          )}

          {tour.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tour.highlights.slice(0, compact ? 3 : undefined).map((h) => (
                <span
                  key={h}
                  className="px-2.5 py-1 rounded-full bg-forest-50 text-forest-700 text-xs"
                >
                  {h}
                </span>
              ))}
            </div>
          )}

          <Link
            href={tour.href}
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full sm:w-auto justify-center bg-forest-600 hover:bg-forest-700 text-cream"
            )}
          >
            Durakları & Programı Gör
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
