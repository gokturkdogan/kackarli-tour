"use client";

import dynamic from "next/dynamic";
import { HeroPosterShell } from "@/components/public/hero-poster-shell";

export const HeroBanner = dynamic(
  () => import("@/components/public/hero-banner").then((m) => m.HeroBanner),
  {
    ssr: false,
    loading: () => <HeroPosterShell />,
  }
);
