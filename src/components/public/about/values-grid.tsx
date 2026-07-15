import { PageContainer } from "@/components/public/page-container";
import { Compass, Heart, Shield, Users } from "lucide-react";
import { coreValues } from "@/lib/about-data";
import { AnimateIn } from "@/components/public/animate-in";
import { cn } from "@/lib/utils";

const iconMap = {
  heart: Heart,
  users: Users,
  shield: Shield,
  compass: Compass,
};

const colorMap = {
  forest: "bg-forest-50 border-forest-200 text-forest-600 group-hover:bg-forest-100",
  sage: "bg-sage-50 border-sage-200 text-sage-500 group-hover:bg-sage-100",
  earth: "bg-earth-100 border-earth-200 text-earth-500 group-hover:bg-earth-200",
};

export function ValuesGrid() {
  return (
    <section className="py-12 sm:py-20 bg-mist w-full overflow-hidden">
      <PageContainer>
        <AnimateIn className="text-center mb-8 sm:mb-14 max-w-2xl mx-auto px-1">
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-forest-600 border border-forest-100">
            Değerlerimiz
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-forest-900 mt-3 mb-3 sm:mb-4">
            Her Turda Bizi Farklı Kılan
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            İşimizi sadece tur düzenlemek olarak görmüyoruz — misafirlerimize Rize&apos;nin
            ruhunu yaşatmayı misyon edindik.
          </p>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {coreValues.map((value, i) => {
            const Icon = iconMap[value.icon as keyof typeof iconMap];
            return (
              <AnimateIn key={value.title} delay={i * 100}>
                <div className="group h-full p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-forest-100 hover:border-forest-300 hover:shadow-xl hover:shadow-forest-100/40 transition-all duration-300 sm:hover:-translate-y-1">
                  <div className="flex items-start gap-3 sm:block">
                    <div
                      className={cn(
                        "w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex shrink-0 items-center justify-center sm:mb-5 border transition-colors",
                        colorMap[value.color as keyof typeof colorMap]
                      )}
                    >
                      <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-forest-900 mb-1 sm:mb-2">
                        {value.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
