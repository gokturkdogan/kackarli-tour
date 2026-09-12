import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { AnimateIn } from "@/components/public/animate-in";
import type { PublicGuideListItem } from "@/lib/guide-types";

interface GuideListProps {
  guides: PublicGuideListItem[];
}

function formatPublishedDate(iso: string | null) {
  if (!iso) return null;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function GuideList({ guides }: GuideListProps) {
  if (guides.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-12">
        Henüz yayınlanmış rehber içeriği bulunmuyor.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide, i) => (
        <AnimateIn key={guide.id} delay={i * 60}>
          <article className="group h-full flex flex-col overflow-hidden rounded-2xl border border-forest-100 bg-white hover:border-forest-300 hover:shadow-xl hover:shadow-forest-100/40 transition-all duration-300">
            <Link href={`/rehberlerimiz/${guide.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-forest-100">
              <Image
                src={guide.coverImage ?? ""}
                alt={guide.title}
                fill
                className="object-cover object-[center_10%] transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-transparent to-transparent" />
            </Link>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mb-3">
                {guide.publishedAt && (
                  <time dateTime={guide.publishedAt}>{formatPublishedDate(guide.publishedAt)}</time>
                )}
                {guide.readingMinutes && (
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {guide.readingMinutes} dk okuma
                  </span>
                )}
              </div>

              <h2 className="text-lg font-bold text-forest-900 leading-snug mb-2 group-hover:text-forest-700 transition-colors">
                <Link href={`/rehberlerimiz/${guide.slug}`}>{guide.title}</Link>
              </h2>

              {guide.excerpt && (
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {guide.excerpt}
                </p>
              )}

              <Link
                href={`/rehberlerimiz/${guide.slug}`}
                className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-forest-600 group-hover:text-forest-800 transition-colors"
              >
                Rehberi Oku
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </article>
        </AnimateIn>
      ))}
    </div>
  );
}
