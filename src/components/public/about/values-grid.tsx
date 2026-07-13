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
    <section className="py-20 bg-mist w-full overflow-hidden">
      <PageContainer>
        <AnimateIn className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-forest-500 text-sm font-medium tracking-widest uppercase">
            Değerlerimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mt-3 mb-4">
            Her Turda Bizi Farklı Kılan
          </h2>
          <p className="text-muted-foreground">
            İşimizi sadece tur düzenlemek olarak görmüyoruz — misafirlerimize Rize&apos;nin
            ruhunu yaşatmayı misyon edindik.
          </p>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coreValues.map((value, i) => {
            const Icon = iconMap[value.icon as keyof typeof iconMap];
            return (
              <AnimateIn key={value.title} delay={i * 100}>
                <div className="group h-full p-6 rounded-2xl bg-white border border-forest-100 hover:border-forest-300 hover:shadow-xl hover:shadow-forest-100/40 transition-all duration-300 hover:-translate-y-1">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border transition-colors",
                      colorMap[value.color as keyof typeof colorMap]
                    )}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-forest-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
