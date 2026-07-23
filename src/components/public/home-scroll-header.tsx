"use client";

import { useEffect, useRef, useState } from "react";
import { PublicHeader } from "@/components/public/public-header";
import { HOME_STICKY_SENTINEL_ID } from "@/lib/home-hero";
import { cn } from "@/lib/utils";

function isSentinelPassed(entry: IntersectionObserverEntry) {
  return !entry.isIntersecting && entry.boundingClientRect.top < 0;
}

export function HomeScrollHeader() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const sentinel = document.getElementById(HOME_STICKY_SENTINEL_ID);
    if (!sentinel) return;

    const setStickyVisible = (next: boolean) => {
      if (next === visibleRef.current) return;
      visibleRef.current = next;
      setVisible(next);
      if (next) setMounted(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStickyVisible(isSentinelPassed(entry));
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
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
      onTransitionEnd={() => {
        if (!visible) setMounted(false);
      }}
    >
      {mounted ? <PublicHeader variant="solid" /> : null}
    </div>
  );
}
