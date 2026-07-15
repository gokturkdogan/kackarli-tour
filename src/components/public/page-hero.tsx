import Image from "next/image";
import { PageContainer } from "@/components/public/page-container";
import { stockImage } from "@/lib/stock-images";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
}

export function PageHero({
  title,
  subtitle,
  description,
  image = stockImage("mistyValley", 1920),
}: PageHeroProps) {
  return (
    <section className="relative pt-16 pb-12 sm:pb-20 md:pb-28 overflow-hidden w-full max-w-full">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/85 via-forest-900/70 to-forest-900/95" />
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-sage-400/15 blur-3xl pointer-events-none" />
      </div>

      <PageContainer className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-20">
        {subtitle && (
          <p className="inline-flex items-center rounded-full bg-cream/10 px-3 py-1 text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-sage-300 mb-3 sm:mb-4 ring-1 ring-cream/10">
            {subtitle}
          </p>
        )}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-cream mb-3 sm:mb-4 break-words max-w-4xl leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-cream/70 text-sm sm:text-lg lg:text-xl max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </PageContainer>
    </section>
  );
}
