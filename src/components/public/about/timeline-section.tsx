import { PageContainer } from "@/components/public/page-container";
import { milestones } from "@/lib/about-data";
import { AnimateIn } from "@/components/public/animate-in";

export function TimelineSection() {
  return (
    <section className="py-20 bg-forest-900 relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest-700/30 to-transparent" />

      <PageContainer className="relative">
        <AnimateIn className="text-center mb-14">
          <span className="text-sage-300 text-sm font-medium tracking-widest uppercase">
            Yolculuğumuz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-cream mt-3">
            Zaman Çizelgemiz
          </h2>
        </AnimateIn>

        <div className="relative">
          {/* Desktop timeline line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-forest-600" />

          <div className="grid md:grid-cols-4 gap-8">
            {milestones.map((item, i) => (
              <AnimateIn key={item.year} delay={i * 120}>
                <div className="relative text-center md:text-left group">
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-sage-400 border-4 border-forest-900 mx-auto md:mx-0 mb-6 relative z-10 group-hover:scale-125 transition-transform" />
                  <div className="md:hidden flex items-center gap-4 mb-3">
                    <div className="w-3 h-3 rounded-full bg-sage-400 shrink-0" />
                    <span className="text-sage-300 font-bold text-2xl">{item.year}</span>
                  </div>
                  <span className="hidden md:block text-sage-300 font-bold text-3xl mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-cream font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-cream/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
