import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getGuideBySlug, getPublishedGuideSlugs, getRelatedGuides } from "@/actions/guides";
import { PublicHeaderShell } from "@/components/public/public-header-shell";
import { PublicFooter } from "@/components/public/public-footer";
import { PageContainer } from "@/components/public/page-container";
import { GuideArticle } from "@/components/public/guide-article";
import { JsonLd } from "@/components/public/json-ld";
import { buildPageMetadata, breadcrumbJsonLd, articleJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getPublishedGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface GuideDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GuideDetailPageProps) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return { title: "Rehber Bulunamadı" };

  return buildPageMetadata({
    title: guide.seoTitle ?? guide.title,
    description: guide.seoDescription ?? guide.excerpt ?? undefined,
    path: `/rehberlerimiz/${slug}`,
    image: guide.coverImage,
    type: "article",
  });
}

export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) notFound();

  const relatedGuides = await getRelatedGuides(slug, 3);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Ana Sayfa", path: "/" },
    { name: "Rehberlerimiz", path: "/rehberlerimiz" },
    { name: guide.title, path: `/rehberlerimiz/${slug}` },
  ]);

  const article = articleJsonLd({
    title: guide.seoTitle ?? guide.title,
    description: guide.seoDescription ?? guide.excerpt ?? "",
    path: `/rehberlerimiz/${slug}`,
    image: guide.coverImage,
    publishedAt: guide.publishedAt,
  });

  return (
    <>
      <JsonLd data={[breadcrumb, article]} />
      <PublicHeaderShell variant="solid" />
      <main className="bg-cream min-h-screen overflow-x-hidden w-full max-w-full">
        <PageContainer className="py-8 sm:py-12">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-forest-700 transition-colors">Ana Sayfa</Link>
              </li>
              <li aria-hidden className="text-forest-300">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link href="/rehberlerimiz" className="hover:text-forest-700 transition-colors">
                  Rehberlerimiz
                </Link>
              </li>
              <li aria-hidden className="text-forest-300">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li className="text-forest-700 font-medium truncate max-w-[14rem] sm:max-w-md">
                {guide.title}
              </li>
            </ol>
          </nav>

          <GuideArticle guide={guide} relatedGuides={relatedGuides} />
        </PageContainer>
      </main>
      <PublicFooter />
    </>
  );
}
