import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Route, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PublicTour } from "@/lib/tour-types";

interface RoutePreviewCardProps {
  tour: PublicTour;
  className?: string;
  compact?: boolean;
}

const statItems = (tour: PublicTour) => [
  { icon: Clock, label: "Süre", value: tour.duration ?? "—" },
  { icon: Route, label: "Mesafe", value: tour.distance ?? "—" },
  { icon: MapPin, label: "Çıkış", value: tour.departureTime ?? "—" },
  {
    icon: Users,
    label: "Grup",
    value: tour.maxGroupSize ? `Max ${tour.maxGroupSize}` : "—",
  },
];

export function RoutePreviewCard({ tour, className, compact = false }: RoutePreviewCardProps) {
  return (
    <div
      className={cn(
        "group rounded-2xl overflow-hidden bg-white border border-forest-100 hover:border-forest-300 hover:shadow-xl hover:shadow-forest-100/50 transition-all duration-500 h-full",
        className
      )}
    >
      <div className={cn("grid", compact ? "grid-cols-1" : "lg:grid-cols-2")}>
        <div
          className={cn(
            "relative overflow-hidden",
            compact ? "h-44 sm:h-48" : "h-52 sm:h-56 lg:h-auto lg:min-h-[300px]"
          )}
        >
          {tour.image ? (
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              className="object-cover object-[center_5%] transition-transform duration-700 group-hover:scale-105"
              sizes={compact ? "(max-width: 768px) 90vw, 400px" : "(max-width: 1024px) 100vw, 50vw"}
            />
          ) : (
            <div className="absolute inset-0 bg-forest-100" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 via-forest-900/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-forest-900/15" />
          <div className="absolute bottom-3 left-3 right-3 lg:hidden">
            <p className="text-cream font-bold text-base leading-snug drop-shadow-sm line-clamp-2">
              {tour.title}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col justify-center text-center lg:text-left",
            compact ? "p-4 sm:p-5" : "p-4 sm:p-5 lg:p-6"
          )}
        >
          {tour.subtitle && (
            <p className="text-forest-500 text-[11px] font-medium uppercase tracking-wider mb-1 hidden lg:block">
              {tour.subtitle}
            </p>
          )}

          <h3
            className={cn(
              "font-bold text-forest-900 mb-3 leading-tight hidden lg:block line-clamp-2",
              compact ? "text-lg" : "text-xl"
            )}
          >
            {tour.title}
          </h3>

          <div
            className={cn(
              "grid gap-2 mb-4",
              compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"
            )}
          >
            {statItems(tour).map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-forest-50/80 border border-forest-100 px-2 py-2 text-center"
              >
                <item.icon className="h-3.5 w-3.5 text-forest-600 mx-auto mb-1" />
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground leading-none">
                  {item.label}
                </p>
                <p className="text-xs font-semibold text-forest-900 mt-1 leading-tight">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {!compact && tour.departureTime && tour.returnTime && (
            <p className="text-xs text-muted-foreground leading-relaxed mb-3 max-w-md mx-auto lg:mx-0 line-clamp-2">
              {tour.departureTime} hareket · {tour.returnTime} dönüş — planlı duraklar ve manzara molaları.
            </p>
          )}

          {tour.highlights.length > 0 && (
            <div className="flex flex-wrap justify-center lg:justify-start gap-1.5 mb-4">
              {tour.highlights.slice(0, compact ? 3 : 4).map((h) => (
                <span
                  key={h}
                  className="px-2 py-0.5 rounded-full bg-forest-50 border border-forest-100 text-forest-700 text-[11px]"
                >
                  {h}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-center lg:justify-start">
            <Link
              href={tour.href}
              className={cn(
                buttonVariants({ size: "sm" }),
                "w-full sm:w-auto justify-center bg-forest-600 hover:bg-forest-700 text-cream h-9 px-4"
              )}
            >
              Programı Gör
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
