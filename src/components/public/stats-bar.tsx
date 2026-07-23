import { PageContainer } from "@/components/public/page-container";
import { stats } from "@/lib/home-data";
import { AnimateIn } from "@/components/public/animate-in";

interface StatsBarProps {
  dayTripRouteCount: number;
}

export function StatsBar({ dayTripRouteCount }: StatsBarProps) {
  const displayStats = [
    { value: String(dayTripRouteCount), label: "Günübirlik Rota" },
    ...stats,
  ];

  return (
    <section className="py-16 bg-forest-800 relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest-700/50 to-transparent" />
      <PageContainer className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {displayStats.map((stat, i) => (
            <AnimateIn key={stat.label} delay={i * 80} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-cream mb-2">
                {stat.value}
              </div>
              <div className="text-sage-300 text-sm font-medium tracking-wide">
                {stat.label}
              </div>
            </AnimateIn>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
