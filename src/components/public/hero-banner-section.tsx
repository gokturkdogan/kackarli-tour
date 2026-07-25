import { getSiteSettings } from "@/lib/site-settings";
import { HeroBanner } from "@/components/public/hero-banner-loader";

export async function HeroBannerSection() {
  const settings = await getSiteSettings();
  return <HeroBanner settings={settings} />;
}
