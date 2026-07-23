"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  ImageIcon,
  Info,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Route,
  X,
} from "lucide-react";
import { SiteLogo } from "@/components/public/site-logo";
import { cn } from "@/lib/utils";
import { pageContainerClass } from "@/components/public/page-container";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/turlar", label: "Tur Rotası", icon: Route },
  { href: "/galeri", label: "Galeri", icon: ImageIcon },
  { href: "/hakkimizda", label: "Hakkımızda", icon: Info },
  { href: "/iletisim", label: "İletişim", icon: MessageCircle },
] as const;

interface PublicHeaderProps {
  variant?: "transparent" | "solid";
  /** `hero` = absolute inside hero frame, scrolls away with content. */
  position?: "fixed" | "hero";
}

export function PublicHeader({
  variant = "transparent",
  position = "fixed",
}: PublicHeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isTransparent = variant === "transparent";
  const isHero = position === "hero";

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header
      className={cn(
        "top-0 left-0 right-0 z-50 w-full max-w-full transition-all duration-300",
        isHero ? "relative" : "fixed",
        isHero
          ? "bg-transparent border-b border-transparent"
          : isTransparent
            ? "bg-forest-900/40 backdrop-blur-md border-b border-cream/10"
            : "bg-cream/95 backdrop-blur-md border-b border-forest-100 shadow-sm"
      )}
    >
      <div className={pageContainerClass("h-16 flex items-center justify-between gap-2 min-w-0")}>
        <Link
          href="/"
          className="group flex min-w-0 shrink items-center bg-transparent transition-transform hover:scale-[1.02]"
        >
          <SiteLogo priority onDark={isTransparent || isHero} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-lg text-sm transition-colors",
                isTransparent
                  ? "text-cream/80 hover:text-cream hover:bg-cream/10"
                  : "text-forest-700 hover:text-forest-900 hover:bg-forest-50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/turlar"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden sm:inline-flex",
              isTransparent
                ? "bg-sage-500 hover:bg-sage-400 text-forest-900"
                : "bg-forest-600 hover:bg-forest-700 text-cream"
            )}
          >
            Tura Katıl
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ size: "icon", variant: "ghost" }),
                "lg:hidden",
                isTransparent ? "text-cream hover:bg-cream/10" : "text-forest-700"
              )}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-[min(22rem,100vw)] max-w-full border-forest-100 bg-cream p-0 gap-0"
            >
              <SheetTitle className="sr-only">Menü</SheetTitle>

              {/* Branded header */}
              <div className="relative overflow-hidden bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950 px-5 pt-5 pb-7">
                <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-sage-400/15 blur-2xl" />
                <div className="absolute bottom-0 left-0 h-20 w-20 rounded-full bg-cream/5 blur-xl" />

                <div className="relative flex items-start justify-between gap-3">
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="group flex min-w-0 items-center transition-transform hover:scale-[1.02]"
                  >
                    <SiteLogo className="h-12" onDark />
                  </Link>

                  <button
                    type="button"
                    onClick={closeMenu}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-cream/80 hover:bg-cream/10 hover:text-cream transition-colors"
                    aria-label="Menüyü kapat"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="relative mt-4 text-sm text-cream/65 leading-relaxed max-w-[240px]">
                  Fırtına Vadisi&apos;nden Pokut ve Sal&apos;a uzanan yayla rotası.
                </p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto px-4 py-5">
                <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-widest text-forest-500">
                  Keşfet
                </p>
                <ul className="space-y-1">
                  {navLinks.map((link) => {
                    const isActive =
                      pathname === link.href || pathname.startsWith(`${link.href}/`);
                    const Icon = link.icon;

                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                            isActive
                              ? "bg-forest-600 text-cream shadow-sm"
                              : "text-forest-800 hover:bg-forest-50 hover:text-forest-900"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                              isActive
                                ? "bg-cream/15 text-cream"
                                : "bg-forest-50 text-forest-600"
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-5 px-2">
                  <Link
                    href="/rezervasyon"
                    onClick={closeMenu}
                    className="flex items-center justify-between rounded-xl border border-forest-100 bg-forest-50/70 px-4 py-3 text-sm font-medium text-forest-800 hover:bg-forest-50 transition-colors"
                  >
                    <span>Rezervasyon yap</span>
                    <ArrowRight className="h-4 w-4 text-forest-500" />
                  </Link>
                </div>
              </nav>

              {/* Footer */}
              <div className="mt-auto border-t border-forest-100 bg-gradient-to-b from-forest-50/80 to-white px-4 py-5 space-y-4">
                <div className="space-y-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-forest-500">
                    İletişim
                  </p>
                  <ul className="space-y-2 text-sm text-forest-700">
                    <li className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 shrink-0 text-sage-600" />
                      Rize, Türkiye
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Phone className="h-4 w-4 shrink-0 text-sage-600" />
                      +90 555 123 45 67
                    </li>
                    <li className="flex items-center gap-2.5 min-w-0">
                      <Mail className="h-4 w-4 shrink-0 text-sage-600" />
                      <span className="truncate">info@kackarlitur.com</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/turlar"
                  onClick={closeMenu}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sage-500 to-sage-400 px-5 py-3.5 text-base font-bold text-forest-900 shadow-lg shadow-sage-500/25 transition-all hover:from-sage-400 hover:to-sage-300 active:scale-[0.98]"
                >
                  Tura Katıl
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <p className="text-center text-[10px] text-forest-500/80 leading-relaxed">
                  © {new Date().getFullYear()} Kaçkarlı Tur
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
