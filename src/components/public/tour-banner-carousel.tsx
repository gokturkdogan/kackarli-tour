"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { RoutePreviewCard } from "@/components/public/route-preview-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

  return (
    <div className="space-y-4">
      <div
        className="relative max-w-4xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-lg shadow-forest-900/5">
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

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Önceki tur"
              className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-sm border border-forest-100 shadow-md flex items-center justify-center text-forest-700 hover:bg-white hover:scale-105 transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Sonraki tur"
              className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-sm border border-forest-100 shadow-md flex items-center justify-center text-forest-700 hover:bg-white hover:scale-105 transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <div className="flex items-center justify-center gap-2.5 mt-4">
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
          <Link
            href="/turlar"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "h-8 ml-1 text-forest-600 hover:text-forest-800 hover:bg-forest-50"
            )}
          >
            Tüm Turlar
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
