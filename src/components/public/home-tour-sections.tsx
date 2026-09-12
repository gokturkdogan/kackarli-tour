import { getActivePublicTours } from "@/actions/public";
import { DestinationMarquee } from "@/components/public/destination-marquee";
import { StatsBar } from "@/components/public/stats-bar";
import { RizeHighlights } from "@/components/public/rize-highlights";
import { ExperienceBanner } from "@/components/public/experience-banner";
import { RoutePreviews } from "@/components/public/route-previews";
import { RouteItinerarySection } from "@/components/public/route-itinerary-section";
import { WhyChooseUs } from "@/components/public/why-choose-us";
import { CtaSection } from "@/components/public/cta-section";

export async function HomeTourSections() {
  const activeTours = await getActivePublicTours();
  const dayTripRouteCount = activeTours.filter((tour) => tour.type === "DAY_TRIP").length;
  const primaryTour = activeTours[0] ?? null;

  return (
    <>
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
    </>
  );
}
