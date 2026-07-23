"use client";

import { useEffect, useState } from "react";
import { PublicHeader } from "@/components/public/public-header";
import {
  getHomeStickyHeaderRevealOffset,
  HOME_HERO_HEADER_ID,
} from "@/lib/home-hero";
import { cn } from "@/lib/utils";

function shouldShowStickyHeader() {
  const heroHeader = document.getElementById(HOME_HERO_HEADER_ID);
  if (!heroHeader) return false;

  const heroInView = heroHeader.getBoundingClientRect().bottom > 0;
  const scrolledEnough = window.scrollY >= getHomeStickyHeaderRevealOffset();

  return scrolledEnough && !heroInView;
}

export function HomeScrollHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId = 0;
    let scrollBound = false;

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        setVisible(shouldShowStickyHeader());
      });
    };

    const bindScroll = () => {
      if (scrollBound) return;
      scrollBound = true;
      window.addEventListener("scroll", onScrollOrResize, { passive: true });
      window.addEventListener("resize", onScrollOrResize);
      onScrollOrResize();
    };

    if (document.getElementById(HOME_HERO_HEADER_ID)) {
      bindScroll();
    } else {
      const mutationObserver = new MutationObserver(() => {
        if (!document.getElementById(HOME_HERO_HEADER_ID)) return;
        bindScroll();
        mutationObserver.disconnect();
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });

      return () => {
        mutationObserver.disconnect();
        window.removeEventListener("scroll", onScrollOrResize);
        window.removeEventListener("resize", onScrollOrResize);
        if (rafId) window.cancelAnimationFrame(rafId);
      };
    }

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[transform,opacity] duration-300 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      )}
      aria-hidden={!visible}
    >
      <PublicHeader variant="solid" />
    </div>
  );
}
