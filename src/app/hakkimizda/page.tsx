import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { PageHero } from "@/components/public/page-hero";
import { AboutStory } from "@/components/public/about/about-story";
import { RegionFacts } from "@/components/public/about/region-facts";
import { ValuesGrid } from "@/components/public/about/values-grid";
import { BentoFeatures } from "@/components/public/about/bento-features";
import { TimelineSection } from "@/components/public/about/timeline-section";
import { TeamSection } from "@/components/public/about/team-section";
import { MissionVision } from "@/components/public/about/mission-vision";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Kaçkarlı Tur hakkında bilgi edinin. Rize yayla turizminde 10 yılı aşkın deneyim, tutkulu rehberler ve unutulmaz rotalar.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PublicHeader variant="solid" />
      <main className="bg-cream min-h-screen overflow-x-hidden w-full max-w-full">
        <PageHero
          title="Hakkımızda"
          subtitle={settings.siteName}
          description="Rize'nin yaylalarını tutkuyla keşfetmeniz için buradayız. Hikayemizi, değerlerimizi ve ekibimizi tanıyın."
          image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80"
        />
        <AboutStory settings={settings} />
        <RegionFacts />
        <ValuesGrid />
        <BentoFeatures />
        <TimelineSection />
        <TeamSection />
        <MissionVision />
      </main>
      <PublicFooter />
    </>
  );
}
