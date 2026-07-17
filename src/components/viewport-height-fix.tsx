"use client";

import { useEffect } from "react";
import { setViewportUnit } from "@/lib/viewport-height";

/** Locks --vh for stable hero/pin height; ignores mobile URL-bar resize jitter. */
export function ViewportHeightFix() {
  useEffect(() => {
    setViewportUnit();

    const mobileMq = window.matchMedia("(max-width: 767px)");
    const onOrientation = () => {
      window.setTimeout(setViewportUnit, 100);
    };

    const onDesktopResize = () => {
      if (mobileMq.matches) return;
      setViewportUnit();
    };

    window.addEventListener("orientationchange", onOrientation);
    window.addEventListener("resize", onDesktopResize);

    return () => {
      window.removeEventListener("orientationchange", onOrientation);
      window.removeEventListener("resize", onDesktopResize);
    };
  }, []);

  return null;
}
