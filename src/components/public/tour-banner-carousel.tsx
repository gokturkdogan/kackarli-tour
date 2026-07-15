"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { RoutePreviewCard } from "@/components/public/route-preview-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tourTypeLabel } from "@/lib/utils-helpers";
import type { PublicTour } from "@/lib/tour-types";

interface TourBannerCarouselProps {
  tours: PublicTour[];
}

const AUTO_PLAY_MS = 6000;

export function TourBannerCarousel({ tours }: TourBannerCarouselProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = tours.length;

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % count) + count) % count;
      if (next !== active) setActive(next);
    },
    [active, count]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (isPaused || count <= 1) return;
    const timer = setInterval(() => next(), AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, next, count]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev();
      else next();
    }
    touchStartX.current = null;
  }

  const tour = tours[active];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Animated header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-xl relative min-h-[120px] sm:min-h-[132px]">
          {tours.map((t, i) => (
            <div
              key={t.id}
              className={cn(
                "transition-all duration-700 ease-out",
                i === active
                  ? "opacity-100 translate-y-0 relative"
                  : "opacity-0 translate-y-3 absolute inset-0 pointer-events-none"
              )}
            >
              <span className="text-forest-500 text-sm font-medium tracking-widest uppercase">
                {tourTypeLabel(t.type)} Tur
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mt-3 mb-3 leading-tight">
                {t.title}
              </h2>
              <p className="text-muted-foreground">
                {t.shortDescription ?? t.description}
              </p>
            </div>
          ))}
        </div>
        <Link
          href="/turlar"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-forest-300 text-forest-700 hover:bg-forest-50 shrink-0"
          )}
        >
          Tüm Turlar
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>

      {/* Banner carousel */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative overflow-hidden rounded-3xl">
          {tours.map((t, i) => (
            <div
              key={t.id}
              aria-hidden={i !== active}
              className={cn(
                "transition-all duration-700 ease-in-out",
                i === active
                  ? "opacity-100 translate-x-0 relative z-10"
                  : "opacity-0 absolute inset-0 z-0 pointer-events-none translate-x-0"
              )}
            >
              <RoutePreviewCard tour={t} />
            </div>
          ))}
        </div>

        {/* Side arrows */}
        <button
          type="button"
          onClick={prev}
          aria-label="Önceki tur"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-forest-100 shadow-lg flex items-center justify-center text-forest-700 hover:bg-white hover:scale-105 transition-all"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Sonraki tur"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-forest-100 shadow-lg flex items-center justify-center text-forest-700 hover:bg-white hover:scale-105 transition-all"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots + counter */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="flex items-center gap-2">
            {tours.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`${t.title} turuna git`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  i === active ? "w-8 bg-forest-600" : "w-2 bg-forest-200 hover:bg-forest-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">
            {active + 1} / {count}
          </span>
        </div>
      </div>
    </div>
  );
}
