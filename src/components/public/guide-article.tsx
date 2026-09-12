import { SafeImage } from "@/components/public/safe-image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PublicGuide, PublicGuideListItem } from "@/lib/guide-types";

interface GuideArticleProps {
  guide: PublicGuide;
  relatedGuides?: PublicGuideListItem[];
}

function formatPublishedDate(iso: string | null) {
  if (!iso) return null;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function renderParagraphs(content: string) {
  return content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((paragraph, i) => (
      <p key={i} className="text-base text-forest-800/90 leading-relaxed">
        {paragraph}
      </p>
    ));
}

export function GuideArticle({ guide, relatedGuides = [] }: GuideArticleProps) {
  const publishedLabel = formatPublishedDate(guide.publishedAt);

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8 sm:mb-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
          {publishedLabel && guide.publishedAt && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-sage-600" />
              <time dateTime={guide.publishedAt}>{publishedLabel}</time>
            </span>
          )}
          {guide.readingMinutes && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-sage-600" />
              {guide.readingMinutes} dakika okuma
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-forest-900 leading-tight mb-4">
          {guide.title}
        </h1>

        {guide.excerpt && (
          <p className="text-lg text-muted-foreground leading-relaxed">{guide.excerpt}</p>
        )}
      </header>

      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 border border-forest-100 shadow-sm">
        <SafeImage
          src={guide.coverImage ?? ""}
          alt={guide.title}
          fill
          priority
          className="object-cover object-[center_10%]"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <div className="space-y-10">
        {guide.sections.map((section) => (
          <section key={section.id} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-forest-900 leading-snug">
              {section.heading}
            </h2>
            <div className="space-y-4">{renderParagraphs(section.content)}</div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-forest-50 border border-forest-100 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-forest-900 mb-2">Rize yayla turunu planlayın</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          Ayder, Pokut, Sal ve Fırtına Vadisi rotamızı inceleyin; uygun tarih için bizimle
          iletişime geçin.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/turlar"
            className={cn(
              buttonVariants({ size: "lg" }),
              "justify-center bg-sage-500 hover:bg-sage-400 text-white"
            )}
          >
            Turları Gör
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/iletisim"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "justify-center")}
          >
            İletişime Geç
          </Link>
        </div>
      </div>

      {relatedGuides.length > 0 && (
        <aside className="mt-12 pt-10 border-t border-forest-100">
          <h2 className="text-lg font-bold text-forest-900 mb-5">İlgili Rehberler</h2>
          <ul className="space-y-3">
            {relatedGuides.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/rehberlerimiz/${item.slug}`}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-forest-100 bg-white px-4 py-3 hover:border-forest-300 hover:bg-forest-50/50 transition-colors"
                >
                  <span className="text-sm font-medium text-forest-800 group-hover:text-forest-900 leading-snug">
                    {item.title}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-forest-400 group-hover:text-forest-600 mt-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}
