"use client";

import { useEffect, useRef, useState } from "react";
import {
  getHeroVideoSources,
  HERO_POSTER_SRC,
  scheduleIdleWork,
  shouldLoadHeroVideo,
  waitForLcp,
  type HeroVideoSources,
} from "@/lib/hero-video";
import { cn } from "@/lib/utils";

interface HeroLazyVideoProps {
  className?: string;
  autoPlay?: boolean;
}

function attachVideoSource(video: HTMLVideoElement, sources: HeroVideoSources) {
  video.replaceChildren();
  const mp4 = document.createElement("source");
  mp4.src = sources.mp4;
  mp4.type = "video/mp4";
  video.appendChild(mp4);
}

export function HeroLazyVideo({ className, autoPlay = true }: HeroLazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!shouldLoadHeroVideo()) return;
    const video = videoRef.current;
    if (!video) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      attachVideoSource(video, getHeroVideoSources());
      video.preload = "auto";
      video.load();
      const onPlaying = () => setVisible(true);
      video.addEventListener("playing", onPlaying);
      if (autoPlay) video.play().catch(() => {});
      cleanup = () => video.removeEventListener("playing", onPlaying);
    };

    waitForLcp().then(() => {
      scheduleIdleWork(start, 800);
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [autoPlay]);

  return (
    <video
      ref={videoRef}
      className={cn(
        className,
        "transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0"
      )}
      poster={HERO_POSTER_SRC}
      muted
      loop
      playsInline
      preload="none"
    />
  );
}
