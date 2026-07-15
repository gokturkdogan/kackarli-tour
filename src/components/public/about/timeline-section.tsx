import { PageContainer } from "@/components/public/page-container";
import { milestones } from "@/lib/about-data";
import { AnimateIn } from "@/components/public/animate-in";

export function TimelineSection() {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-forest-900 via-forest-900 to-forest-950 relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest-700/30 to-transparent" />
      <div className="absolute top-0 left-0 h-24 w-24 rounded-full bg-sage-400/10 blur-3xl pointer-events-none" />

      <PageContainer className="relative">
        <AnimateIn className="text-center mb-8 sm:mb-14">
          <span className="inline-flex items-center rounded-full bg-cream/10 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-sage-300">
            Yolculuğumuz
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream mt-3">
            Zaman Çizelgemiz
          </h2>
        </AnimateIn>

        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-forest-600" />

          <div className="md:hidden relative pl-6 space-y-4 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-sage-400/80 before:via-forest-600 before:to-forest-700">
            {milestones.map((item, i) => (
              <AnimateIn key={item.year} delay={i * 120}>
                <div className="relative rounded-xl border border-forest-700/60 bg-forest-800/50 backdrop-blur-sm p-4">
                  <div className="absolute -left-6 top-5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-sage-400 ring-4 ring-forest-900" />
                  <span className="text-sage-300 font-bold text-xl">{item.year}</span>
                  <h3 className="text-cream font-semibold text-base mt-1 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-cream/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-4 gap-8">
            {milestones.map((item, i) => (
              <AnimateIn key={item.year} delay={i * 120}>
                <div className="relative text-left group">
                  <div className="flex w-4 h-4 rounded-full bg-sage-400 border-4 border-forest-900 mb-6 relative z-10 group-hover:scale-125 transition-transform" />
                  <span className="text-sage-300 font-bold text-3xl mb-2 block">
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
