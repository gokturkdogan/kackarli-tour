import { PageContainer } from "@/components/public/page-container";
import Image from "next/image";
import { bentoFeatures } from "@/lib/about-data";
import { AnimateIn } from "@/components/public/animate-in";
import { cn } from "@/lib/utils";

export function BentoFeatures() {
  return (
    <section className="py-20 bg-cream w-full overflow-hidden">
      <PageContainer>
        <AnimateIn className="mb-10 sm:mb-14 max-w-2xl">
          <span className="text-forest-500 text-sm font-medium tracking-widest uppercase">
            Tur Deneyimi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mt-3 mb-4">
            Sıradan Bir Tur Değil, Bir Macera
          </h2>
          <p className="text-muted-foreground">
            Her detayı düşünülmüş tur programlarımızla Rize&apos;yi en iyi şekilde
            deneyimlemenizi sağlıyoruz.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-auto sm:auto-rows-[180px] md:auto-rows-[200px]">
          {bentoFeatures.map((feature, i) => (
            <AnimateIn
              key={feature.title}
              delay={i * 80}
              className={cn(
                "rounded-2xl overflow-hidden border border-forest-100 relative group min-h-[160px]",
                feature.size === "lg" && "sm:col-span-2 sm:row-span-2 min-h-[280px] sm:min-h-0",
                feature.size === "md" && "sm:col-span-2 min-h-[200px] sm:min-h-0",
                feature.size === "sm" && "sm:col-span-1"
              )}
            >
              {feature.image ? (
                <>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/40 to-forest-900/10" />
                  <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                    <h3 className="text-lg md:text-xl font-bold text-cream mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-cream/75 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
                      {feature.description}
                    </p>
                  </div>
                </>
              ) : (
                <div className="h-full p-5 md:p-6 bg-white hover:bg-forest-50/50 transition-colors flex flex-col justify-between">
                  <div>
                    {feature.stat && (
                      <div className="mb-3">
                        <span className="text-3xl md:text-4xl font-bold text-forest-700">
                          {feature.stat}
                        </span>
                        {feature.statLabel && (
                          <span className="block text-xs text-forest-500 mt-0.5">
                            {feature.statLabel}
                          </span>
                        )}
                      </div>
                    )}
                    <h3 className="text-base md:text-lg font-semibold text-forest-900 mb-2">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )}
            </AnimateIn>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
