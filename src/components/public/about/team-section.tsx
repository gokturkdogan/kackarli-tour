import { PageContainer } from "@/components/public/page-container";
import { teamMembers } from "@/lib/about-data";
import { AnimateIn } from "@/components/public/animate-in";

export function TeamSection() {
  return (
    <section className="py-12 sm:py-20 bg-mist w-full overflow-hidden">
      <PageContainer>
        <AnimateIn className="text-center mb-8 sm:mb-14 max-w-2xl mx-auto px-1">
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-forest-600 border border-forest-100">
            Ekibimiz
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-forest-900 mt-3 mb-3 sm:mb-4">
            Tutkulu Rehberlerimiz
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Rize&apos;yi seven, doğayı bilen ve misafirperverliği ilke edinen ekibimizle
            tanışın.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {teamMembers.map((member, i) => (
            <AnimateIn key={member.name} delay={i * 100}>
              <div className="group bg-white rounded-xl sm:rounded-2xl border border-forest-100 overflow-hidden hover:border-forest-300 hover:shadow-xl hover:shadow-forest-100/40 transition-all duration-300 sm:hover:-translate-y-1">
                <div className="flex sm:block items-center gap-4 p-4 sm:p-0 sm:pt-0">
                  <div className="sm:relative shrink-0">
                    <div className="hidden sm:block h-28 bg-gradient-to-br from-forest-600 to-forest-800" />
                    <div className="w-14 h-14 sm:w-16 sm:h-16 sm:absolute sm:-bottom-8 sm:left-1/2 sm:-translate-x-1/2 rounded-xl sm:rounded-2xl bg-gradient-to-br from-sage-400 to-sage-500 flex items-center justify-center text-forest-900 font-bold text-lg sm:text-xl shadow-lg sm:border-4 sm:border-white group-hover:scale-105 transition-transform">
                      {member.initials}
                    </div>
                  </div>
                  <div className="sm:pt-12 sm:pb-6 sm:px-5 sm:text-center min-w-0 flex-1">
                    <h3 className="font-semibold text-forest-900">{member.name}</h3>
                    <p className="text-xs text-forest-500 font-medium mt-0.5 sm:mt-1 mb-2 sm:mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
