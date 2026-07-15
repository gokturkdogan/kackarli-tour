import {
  Bus,
  CheckCircle2,
  Clock,
  Coffee,
  MapPin,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { ScrollToBookingCta } from "@/components/public/scroll-to-booking-cta";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils-helpers";
import { hasDistinctChildPrice, resolveChildPrice } from "@/lib/pricing";
import type { PublicTour } from "@/lib/tour-types";
import type { LucideIcon } from "lucide-react";

interface TourDetailSidebarProps {
  tour: PublicTour;
}

function includedIcon(label: string): LucideIcon {
  const text = label.toLowerCase();
  if (text.includes("araç") || text.includes("transfer")) return Bus;
  if (text.includes("rehber")) return Users;
  if (text.includes("mola")) return Coffee;
  if (text.includes("sigorta") || text.includes("güvenlik")) return ShieldCheck;
  if (text.includes("yemek") || text.includes("öğle")) return UtensilsCrossed;
  return CheckCircle2;
}

export function TourDetailSidebar({ tour }: TourDetailSidebarProps) {
  const stats = [
    { icon: Clock, label: "Süre", value: tour.duration ?? "—" },
    { icon: Route, label: "Mesafe", value: tour.distance ?? "—" },
    { icon: MapPin, label: "Hareket", value: tour.departureTime ?? "—" },
    {
      icon: Users,
      label: "Grup",
      value: tour.maxGroupSize ? `Max ${tour.maxGroupSize}` : "—",
    },
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-1.5 bg-gradient-to-br from-sage-300/25 via-forest-200/15 to-earth-200/25 rounded-[1.65rem] blur-sm pointer-events-none" />

      <div className="relative rounded-[1.35rem] border border-forest-100/90 bg-white shadow-xl shadow-forest-900/5 overflow-hidden">
        {/* Price strip */}
        <div className="relative overflow-hidden bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 px-5 py-5">
          <div className="absolute top-0 right-0 w-28 h-28 bg-sage-400/15 rounded-full blur-2xl" />
          <div className="relative flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-sage-300/80 font-medium mb-1">
                Kişi başı
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-cream leading-none">
                {formatPrice(tour.price)}
              </p>
              {hasDistinctChildPrice(tour.childPrice, tour.price) && (
                <p className="text-xs text-cream/55 mt-1.5">
                  Çocuk {formatPrice(resolveChildPrice(null, tour.childPrice, tour.price))}
                </p>
              )}
              <p className="text-[10px] text-cream/45 mt-2 leading-snug max-w-[200px]">
                Seçilen tur tarihine göre değişebilir.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sage-500/90 text-forest-900 text-[10px] font-bold uppercase tracking-wider shrink-0">
              <Sparkles className="h-3 w-3" />
              Popüler
            </span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2.5 rounded-xl bg-forest-50/90 border border-forest-100 px-3 py-2.5 transition-colors hover:bg-forest-50 hover:border-forest-200"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-forest-100 flex items-center justify-center shrink-0">
                  <stat.icon className="h-3.5 w-3.5 text-forest-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground leading-none">
                    {stat.label}
                  </p>
                  <p className="text-xs font-bold text-forest-900 mt-0.5 truncate">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Included */}
          {tour.included.length > 0 && (
            <div className="rounded-xl bg-mist/70 border border-forest-100/80 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-sage-100 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-sage-600" />
                </div>
                <h3 className="text-xs font-bold text-forest-900 uppercase tracking-wider">
                  Dahil Olanlar
                </h3>
              </div>
              <ul className="space-y-2">
                {tour.included.map((item) => {
                  const Icon = includedIcon(item);
                  return (
                    <li
                      key={item}
                      className="group flex items-start gap-2.5 rounded-lg px-2 py-1.5 -mx-2 transition-colors hover:bg-white/80"
                    >
                      <div className="w-6 h-6 rounded-md bg-white border border-forest-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-sage-300 group-hover:bg-sage-50 transition-colors">
                        <Icon className="h-3 w-3 text-forest-500 group-hover:text-sage-600 transition-colors" />
                      </div>
                      <span className="text-sm text-forest-700 leading-snug">{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Boarding points */}
          {tour.boardingPoints.length > 0 && (
            <div className="rounded-xl border border-forest-100 bg-white p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-forest-100 flex items-center justify-center">
                  <Bus className="h-4 w-4 text-forest-700" />
                </div>
                <h3 className="text-xs font-bold text-forest-900 uppercase tracking-wider">
                  Biniş Noktaları
                </h3>
              </div>

              <ol className="relative space-y-0">
                {tour.boardingPoints.map((point, i) => {
                  const isLast = i === tour.boardingPoints.length - 1;
                  const isOptional = point.toLowerCase().includes("talep");

                  return (
                    <li key={point} className="relative flex gap-3 pb-4 last:pb-0">
                      {!isLast && (
                        <span
                          className="absolute left-[11px] top-6 bottom-0 w-px bg-gradient-to-b from-forest-200 to-forest-100"
                          aria-hidden
                        />
                      )}
                      <span
                        className={cn(
                          "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold border-2",
                          i === 0
                            ? "bg-forest-700 border-forest-700 text-cream"
                            : isOptional
                              ? "bg-white border-dashed border-forest-300 text-forest-500"
                              : "bg-white border-forest-200 text-forest-700"
                        )}
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <p
                          className={cn(
                            "text-sm font-medium leading-snug",
                            isOptional ? "text-forest-600" : "text-forest-900"
                          )}
                        >
                          {point}
                        </p>
                        {i === 0 && (
                          <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">
                            Ana kalkış
                          </p>
                        )}
                        {isOptional && (
                          <p className="text-[10px] text-earth-600 mt-0.5 font-medium">
                            Ön bildirimle
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* Actions */}
          <div className="pt-1">
            <ScrollToBookingCta />
          </div>
        </div>
      </div>
    </div>
  );
}
