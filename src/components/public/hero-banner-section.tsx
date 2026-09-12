import { HeroBanner } from "@/components/public/hero-banner-loader";
import { HeroCriticalShell } from "@/components/public/hero-critical-shell";
import { defaultSiteSettings } from "@/lib/site-settings.shared";

/** Sync section — no DB await; critical shell paints immediately for LCP. */
export function HeroBannerSection() {
  return (
    <div className="relative min-h-hero-vh">
      <HeroCriticalShell />
      <HeroBanner settings={defaultSiteSettings} />
    </div>
  );
}
