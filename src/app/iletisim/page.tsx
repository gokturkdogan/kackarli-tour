import type { Metadata } from "next";
import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";
import { PageHero } from "@/components/public/page-hero";
import { ContactHub } from "@/components/public/contact-hub";
import { getSiteSettings } from "@/lib/site-settings";

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
          subtitle={settings.siteName}
          description="Tur planlaması ve rezervasyon için bize ulaşın. WhatsApp üzerinden anında yanıt alın."
          image="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80"
        />
        <ContactHub settings={settings} />
      </main>
      <PublicFooter />
    </>
  );
}
