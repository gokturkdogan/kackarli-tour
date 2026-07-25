"use client";

import dynamic from "next/dynamic";
import { HeroPosterShell } from "@/components/public/hero-poster-shell";
import type { SiteSettings } from "@/lib/site-settings.shared";

const HeroBannerInner = dynamic(
  () => import("@/components/public/hero-banner").then((m) => m.HeroBanner),
  {
    ssr: false,
    loading: () => <HeroPosterShell />,
  }
);

interface HeroBannerProps {
  settings: SiteSettings;
}

export function HeroBanner({ settings }: HeroBannerProps) {
  return <HeroBannerInner settings={settings} />;
}
