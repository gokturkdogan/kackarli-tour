export const HERO_POSTER_SRC = "/images/rize-hero-poster.jpg";

export const HERO_VIDEO = {
  mp4: {
    desktop: "/videos/rize-hero.mp4",
    mobile: "/videos/rize-hero-mobile.mp4",
  },
} as const;

export interface HeroVideoSources {
  mp4: string;
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

export function getHeroVideoSources(): HeroVideoSources {
  const mobile = isMobileViewport();
  return {
    mp4: mobile ? HERO_VIDEO.mp4.mobile : HERO_VIDEO.mp4.desktop,
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

/** Wait for LCP (or timeout) before loading heavy hero assets. */
export function waitForLcp(timeoutMs = 1200): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    const timer = window.setTimeout(finish, timeoutMs);

    try {
      const po = new PerformanceObserver(() => {
        window.clearTimeout(timer);
        po.disconnect();
        finish();
      });
      po.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      scheduleIdleWork(finish, timeoutMs);
    }
  });
}
