export const HERO_POSTER_SRC = "/images/rize-hero-poster.jpg";

export const HERO_VIDEO = {
  mp4: {
    desktop: "/videos/rize-hero.mp4",
    mobile: "/videos/rize-hero-mobile.mp4",
  },
  webm: {
    desktop: "/videos/rize-hero.webm",
    mobile: "/videos/rize-hero-mobile.webm",
  },
} as const;

export interface HeroVideoSources {
  mp4: string;
  webm: string;
}

export function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

/** Skip heavy video on save-data or very slow connections. */
export function shouldLoadHeroVideo() {
  if (typeof window === "undefined") return true;
  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!conn) return true;
  if (conn.saveData) return false;
  const slow = conn.effectiveType === "slow-2g" || conn.effectiveType === "2g";
  return !slow;
}

/** Use full-quality hero video on mobile when the connection allows it. */
export function shouldUseHighQualityHeroVideo() {
  if (typeof window === "undefined") return true;
  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!conn) return true;
  if (conn.saveData) return false;
  const slow =
    conn.effectiveType === "slow-2g" ||
    conn.effectiveType === "2g" ||
    conn.effectiveType === "3g";
  return !slow;
}

export function getHeroVideoSources(): HeroVideoSources {
  const mobile = isMobileViewport();
  const highQuality = shouldUseHighQualityHeroVideo();
  const useDesktop = !mobile || highQuality;
  return {
    mp4: useDesktop ? HERO_VIDEO.mp4.desktop : HERO_VIDEO.mp4.mobile,
    webm: useDesktop ? HERO_VIDEO.webm.desktop : HERO_VIDEO.webm.mobile,
  };
}

/** Defer non-critical work until the browser is idle. */
export function scheduleIdleWork(callback: () => void, timeoutMs = 1800) {
  if (typeof window === "undefined") return;
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: timeoutMs });
  } else {
    setTimeout(callback, 120);
  }
}
