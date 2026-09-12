import { getPublishedGuides } from "@/actions/guides";
import { buildPageMetadata } from "@/lib/seo";
import { PublicHeaderShell } from "@/components/public/public-header-shell";
import { PublicFooter } from "@/components/public/public-footer";
import { PageHero } from "@/components/public/page-hero";
import { PageContainer } from "@/components/public/page-container";
import { GuideList } from "@/components/public/guide-list";
import { stockImage } from "@/lib/stock-images";

export const revalidate = 3600;

export const metadata = buildPageMetadata({
  title: "Rehberlerimiz",
  description:
    "Rize günübirlik tur, Ayder turu, Pokut yaylası, Hüser sis denizi ve Kaçkar Dağları hakkında SEO rehberleri. Yayla turu planlamak için uzman içerikler.",
  path: "/rehberlerimiz",
});

export default async function GuidesPage() {
  const guides = await getPublishedGuides();

  return (
    <>
      <PublicHeaderShell variant="solid" />
      <main className="bg-cream min-h-screen overflow-x-hidden w-full max-w-full">
        <PageHero
          title="Rehberlerimiz"
          subtitle="Rize & Kaçkarlar"
          description="Ayder turu, günübirlik yayla rotaları, sis denizi manzaraları ve Karadeniz gezi ipuçları — tur öncesi okumanız gereken rehberler."
          image={stockImage("mistyValley", 1920)}
        />
        <section className="py-12 sm:py-16">
          <PageContainer>
            <GuideList guides={guides} />
          </PageContainer>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
