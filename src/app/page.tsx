import { getActivePublicTours } from "@/actions/public";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { HeroBanner } from "@/components/public/hero-banner";
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
  const activeTours = await getActivePublicTours();

  const primaryTour = activeTours[0] ?? null;

  return (
    <>
      <PublicHeader variant="transparent" />
      <main className="overflow-x-hidden w-full max-w-full">
        <HeroBanner />
        <DestinationMarquee />
        <StatsBar />
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
