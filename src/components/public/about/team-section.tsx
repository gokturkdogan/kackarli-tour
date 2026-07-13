import { PageContainer } from "@/components/public/page-container";
import { teamMembers } from "@/lib/about-data";
import { AnimateIn } from "@/components/public/animate-in";

export function TeamSection() {
  return (
    <section className="py-20 bg-mist w-full overflow-hidden">
      <PageContainer>
        <AnimateIn className="text-center mb-14 max-w-2xl mx-auto">
          <span className="text-forest-500 text-sm font-medium tracking-widest uppercase">
            Ekibimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mt-3 mb-4">
            Tutkulu Rehberlerimiz
          </h2>
          <p className="text-muted-foreground">
            Rize&apos;yi seven, doğayı bilen ve misafirperverliği ilke edinen ekibimizle
            tanışın.
          </p>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {teamMembers.map((member, i) => (
            <AnimateIn key={member.name} delay={i * 100}>
              <div className="group bg-white rounded-2xl border border-forest-100 overflow-hidden hover:border-forest-300 hover:shadow-xl hover:shadow-forest-100/40 transition-all duration-300 hover:-translate-y-1 mt-8 sm:mt-0">
                <div className="h-32 bg-gradient-to-br from-forest-600 to-forest-800 relative flex items-end justify-center">
                  <div className="absolute -bottom-8 w-16 h-16 rounded-2xl bg-sage-400 flex items-center justify-center text-forest-900 font-bold text-xl shadow-lg border-4 border-white group-hover:scale-110 transition-transform">
                    {member.initials}
                  </div>
                </div>
                <div className="pt-12 pb-6 px-5 text-center">
                  <h3 className="font-semibold text-forest-900">{member.name}</h3>
                  <p className="text-xs text-forest-500 font-medium mt-1 mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
