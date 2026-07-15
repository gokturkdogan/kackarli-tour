"use client";

import { ArrowRight, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { TOUR_BOOKING_CTA_ID } from "@/lib/tour-anchors";

interface ScrollToBookingCtaProps {
  className?: string;
  compact?: boolean;
}

export function ScrollToBookingCta({ className, compact }: ScrollToBookingCtaProps) {
  function handleClick() {
    const target = document.getElementById(TOUR_BOOKING_CTA_ID);
    if (!target) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });

    target.dataset.highlight = "true";
    window.setTimeout(() => {
      delete target.dataset.highlight;
    }, 2200);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "group flex items-center justify-center gap-2.5 w-full",
        compact ? "h-12 rounded-xl text-sm" : "h-14 rounded-2xl text-base",
        "px-5 bg-sage-500 hover:bg-sage-400 text-white font-bold",
        "shadow-lg shadow-sage-500/25 transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sage-500/30",
        className
      )}
    >
      <CalendarCheck className={cn(compact ? "h-4 w-4" : "h-5 w-5")} />
      Rezervasyon Yap
      <ArrowRight
        className={cn(
          "transition-transform group-hover:translate-x-0.5",
          compact ? "h-4 w-4" : "h-5 w-5"
        )}
      />
    </button>
  );
}
