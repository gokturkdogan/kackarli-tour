import { getActiveDayTripTourCount, getActivePublicTours } from "@/actions/public";
import { PublicFooter } from "@/components/public/public-footer";
import { HomeScrollHeader } from "@/components/public/home-scroll-header";
import { HeroBanner } from "@/components/public/hero-banner-loader";
import { DestinationMarquee } from "@/components/public/destination-marquee";
import { StatsBar } from "@/components/public/stats-bar";
import { RizeHighlights } from "@/components/public/rize-highlights";
import { ExperienceBanner } from "@/components/public/experience-banner";
import { RoutePreviews } from "@/components/public/route-previews";
import { RouteItinerarySection } from "@/components/public/route-itinerary-section";
import { WhyChooseUs } from "@/components/public/why-choose-us";
import { CtaSection } from "@/components/public/cta-section";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [activeTours, dayTripRouteCount] = await Promise.all([
    getActivePublicTours(),
    getActiveDayTripTourCount(),
  ]);

  const primaryTour = activeTours[0] ?? null;

  return (
    <>
      <HomeScrollHeader />
      <main className="overflow-x-hidden w-full max-w-full">
        <HeroBanner />
        <DestinationMarquee />
        <StatsBar dayTripRouteCount={dayTripRouteCount} />
        <RizeHighlights />
        <ExperienceBanner />
        {activeTours.length > 0 && <RoutePreviews tours={activeTours} />}
        {activeTours.length === 1 && primaryTour && (
          <RouteItinerarySection tour={primaryTour} />
        )}
        <WhyChooseUs />
        <CtaSection />
      </main>
      <PublicFooter />
    </>
  );
}
