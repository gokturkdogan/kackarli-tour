"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Mountain, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/turlar", label: "Turlar" },
  { href: "/turlar/gunubirlik", label: "Günübirlik" },
  { href: "/turlar/konaklamali", label: "Konaklamalı" },
  { href: "/galeri", label: "Galeri" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

interface PublicHeaderProps {
  variant?: "transparent" | "solid";
}

export function PublicHeader({ variant = "transparent" }: PublicHeaderProps) {
  const [open, setOpen] = useState(false);
  const isTransparent = variant === "transparent";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-forest-900/40 backdrop-blur-md border-b border-cream/10"
          : "bg-cream/95 backdrop-blur-md border-b border-forest-100 shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-transform group-hover:scale-105",
              isTransparent ? "bg-forest-600/80" : "bg-forest-600"
            )}
          >
            <Mountain className="h-4 w-4 text-cream" />
          </div>
          <div>
            <span
              className={cn(
                "text-lg font-semibold leading-none",
                isTransparent ? "text-cream" : "text-forest-900"
              )}
            >
              Kaçkarlı Tur
            </span>
            <span
              className={cn(
                "text-[10px] tracking-widest uppercase block",
                isTransparent ? "text-cream/60" : "text-forest-500"
              )}
            >
              Rize · Yayla Turları
            </span>
          </div>
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
            Turları Keşfet
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
            <SheetContent side="right" className="bg-cream border-forest-100 w-80">
              <SheetHeader>
                <SheetTitle className="text-forest-900">Menü</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-lg text-forest-800 hover:bg-forest-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/turlar"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "mt-4 bg-forest-600 hover:bg-forest-700 text-cream"
                  )}
                >
                  Turları Keşfet
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
