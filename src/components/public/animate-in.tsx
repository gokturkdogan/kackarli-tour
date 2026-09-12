"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  /** Skip IntersectionObserver — show immediately (hero / above-the-fold). */
  immediate?: boolean;
  id?: string;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewHeight && rect.bottom > 0;
}

export function AnimateIn({
  children,
  className,
  delay = 0,
  direction = "up",
  immediate = false,
  id,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    if (immediate || prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    if (isInViewport(el)) {
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <div
      ref={ref}
      id={id}
      className={cn(
        "transition-all duration-700 ease-out min-w-0",
        !visible && direction === "up" && "translate-y-8 opacity-0",
        !visible && direction === "left" && "opacity-0 sm:-translate-x-8 sm:translate-y-0 translate-y-6",
        !visible && direction === "right" && "opacity-0 sm:translate-x-8 sm:translate-y-0 translate-y-6",
        !visible && direction === "none" && "opacity-0",
        visible && "translate-x-0 translate-y-0 opacity-100",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
