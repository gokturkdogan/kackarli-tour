export function setViewportUnit() {
  if (typeof window === "undefined") return;
  const h = window.visualViewport?.height ?? window.innerHeight;
  document.documentElement.style.setProperty("--vh", `${h * 0.01}px`);
}

export function getLayoutViewportHeight() {
  if (typeof window === "undefined") return 800;
  const cssVh = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--vh")
  );
  if (cssVh > 0) return Math.round(cssVh * 100);
  return Math.round(window.visualViewport?.height ?? window.innerHeight);
}
