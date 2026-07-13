import { getFeaturedTours } from "@/actions/public";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { HeroBanner } from "@/components/public/hero-banner";
import { DestinationMarquee } from "@/components/public/destination-marquee";
import { StatsBar } from "@/components/public/stats-bar";
import { RizeHighlights } from "@/components/public/rize-highlights";
import { ExperienceBanner } from "@/components/public/experience-banner";
import { RoutePreviews } from "@/components/public/route-previews";
import { FeaturedTours } from "@/components/public/featured-tours";
import { TourTypesSection } from "@/components/public/tour-types-section";
import { WhyChooseUs } from "@/components/public/why-choose-us";
import { CtaSection } from "@/components/public/cta-section";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredTours = await getFeaturedTours(3);

  return (
    <>
      <PublicHeader variant="transparent" />
      <main>
        <HeroBanner />
        <DestinationMarquee />
        <StatsBar />
        <RizeHighlights />
        <ExperienceBanner />
        <RoutePreviews />
        <FeaturedTours tours={featuredTours} />
        <TourTypesSection />
        <WhyChooseUs />
        <CtaSection />
      </main>
      <PublicFooter />
    </>
  );
}
