import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/seo";
import { PublicFooter } from "@/components/public/public-footer";
import { HeroBannerSection } from "@/components/public/hero-banner-section";
import { HomeTourSections } from "@/components/public/home-tour-sections";

export const metadata = buildPageMetadata({
  title: "Rize Günübirlik Yayla Turu",
  description:
    "Kaçkarlı Tur ile Rize ve Kaçkar Dağları'nda günübirlik yayla turu. Fırtına Vadisi, Ayder, Pokut ve Sal rotalarında rehberli turlar.",
  path: "/",
});

export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <main className="overflow-x-hidden w-full max-w-full">
        <HeroBannerSection />
        <Suspense fallback={null}>
          <HomeTourSections />
        </Suspense>
      </main>
      <PublicFooter />
    </>
  );
}
