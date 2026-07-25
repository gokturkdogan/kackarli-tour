import { PageContainer } from "@/components/public/page-container";
import Link from "next/link";
import { Mountain, Phone, Mail, MapPin } from "lucide-react";
import { formatTelHref, getSiteSettings } from "@/lib/site-settings";

export async function PublicFooter() {
  const settings = await getSiteSettings();

  return (
    <footer className="bg-forest-900 text-cream/70 w-full overflow-hidden">
      <PageContainer className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-600">
                <Mountain className="h-5 w-5 text-cream" />
              </div>
              <span className="text-lg font-semibold text-cream">{settings.siteName}</span>
            </Link>
            <p className="text-sm leading-relaxed text-cream/60">{settings.siteDescription}</p>
          </div>

          <div>
            <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-wider">
              Tur
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/turlar" className="hover:text-cream transition-colors">
                  Günübirlik Yayla Turu
                </Link>
              </li>
              <li>
                <Link href="/rezervasyon" className="hover:text-cream transition-colors">
                  Rezervasyon
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-wider">
              Kurumsal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hakkimizda" className="hover:text-cream transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-cream transition-colors">
                  Galeri
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-cream transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-semibold mb-4 text-sm uppercase tracking-wider">
              İletişim
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-sage-400 shrink-0" />
                {settings.contactAddress}
              </li>
              {settings.contactPhones.map((phone) => (
                <li key={`${phone.label}-${phone.number}`} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-sage-400 shrink-0" />
                  <a href={formatTelHref(phone.number)} className="hover:text-cream transition-colors">
                    {phone.number}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-sage-400 shrink-0" />
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="hover:text-cream transition-colors"
                >
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <p>
            &copy; {new Date().getFullYear()} {settings.siteName}. Tüm hakları saklıdır.
          </p>
          <p>Karadeniz&apos;in kalbinde, yaylaların büyüsünde.</p>
        </div>
      </PageContainer>
    </footer>
  );
}
