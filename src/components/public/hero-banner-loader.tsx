"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { HERO_SHELL_ID } from "@/lib/hero-copy";
import { scheduleIdleWork, waitForLcp } from "@/lib/hero-video";
import type { SiteSettings } from "@/lib/site-settings.shared";

function hideCriticalShell() {
  const shell = document.getElementById(HERO_SHELL_ID);
  if (shell) shell.hidden = true;
}

const HeroBannerInner = dynamic(
  () =>
    import("@/components/public/hero-banner").then((m) => {
      hideCriticalShell();
      return m.HeroBanner;
    }),
  { ssr: false, loading: () => null }
);

interface HeroBannerProps {
  settings: SiteSettings;
}

export function HeroBanner({ settings }: HeroBannerProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const start = () => {
      if (!cancelled) setReady(true);
    };

    waitForLcp(1500).then(() => scheduleIdleWork(start, 400));

    const onIntent = () => {
      start();
      window.removeEventListener("scroll", onIntent);
      window.removeEventListener("touchstart", onIntent);
    };
    window.addEventListener("scroll", onIntent, { passive: true, once: true });
    window.addEventListener("touchstart", onIntent, { passive: true, once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onIntent);
      window.removeEventListener("touchstart", onIntent);
    };
  }, []);

  if (!ready) return null;

  return (
    <div className="absolute inset-0 z-20 min-h-hero-vh">
      <HeroBannerInner settings={settings} />
    </div>
  );
}
