import { PageContainer } from "@/components/public/page-container";
import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { PageHero } from "@/components/public/page-hero";
import { ContactInfoPanel } from "@/components/public/contact-info";
import { ContactForm } from "@/components/public/contact-form";
import { getSiteSettings } from "@/lib/site-settings";
import { AnimateIn } from "@/components/public/animate-in";
import { MessageCircle, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Kaçkarlı Tur ile iletişime geçin. Rize yayla turları hakkında bilgi alın, rezervasyon yapın.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PublicHeader variant="solid" />
      <main className="bg-cream min-h-screen overflow-x-hidden w-full max-w-full">
        <PageHero
          title="İletişim"
          subtitle="Kaçkarlı Tur"
          description="Tur planlaması, rezervasyon ve özel talepleriniz için ekibimiz size yardımcı olmaya hazır."
          image="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80"
        />

        <section className="py-12 sm:py-16 md:py-20">
          <PageContainer>
            <div className="grid lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-14">
              <div className="lg:col-span-2">
                <ContactInfoPanel settings={settings} />
              </div>
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </PageContainer>
        </section>

        <section className="pb-20">
          <PageContainer>
            <AnimateIn>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: Zap,
                    title: "Hızlı Dönüş",
                    text: "Mesajlarınıza genellikle aynı gün içinde yanıt veriyoruz.",
                  },
                  {
                    icon: MessageCircle,
                    title: "WhatsApp Destek",
                    text: "Anlık iletişim için WhatsApp hattımız her zaman açık.",
                  },
                  {
                    icon: Shield,
                    title: "Güvenli İletişim",
                    text: "Bilgileriniz yalnızca talebinize yanıt vermek için kullanılır.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="text-center p-6 rounded-2xl bg-white border border-forest-100"
                  >
                    <div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-6 w-6 text-forest-600" />
                    </div>
                    <h3 className="font-semibold text-forest-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </PageContainer>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
