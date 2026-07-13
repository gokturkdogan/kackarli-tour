import Image from "next/image";
import { PageContainer } from "@/components/public/page-container";

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
  image = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80",
}: PageHeroProps) {
  return (
    <section className="relative pt-16 pb-16 sm:pb-20 md:pb-28 overflow-hidden w-full max-w-full">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/80 via-forest-900/70 to-forest-900/90" />
      </div>

      <PageContainer className="relative pt-12 md:pt-16 lg:pt-20">
        {subtitle && (
          <p className="text-sage-300 text-sm font-medium tracking-widest uppercase mb-3">
            {subtitle}
          </p>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cream mb-4 break-words max-w-4xl">
          {title}
        </h1>
        {description && (
          <p className="text-cream/70 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </PageContainer>
    </section>
  );
}
