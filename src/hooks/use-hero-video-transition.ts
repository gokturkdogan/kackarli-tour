"use client";

import { useEffect, useRef } from "react";
import type { HeroVideoSources } from "@/lib/hero-video";
import { scheduleIdleWork } from "@/lib/hero-video";
import { getLayoutViewportHeight } from "@/lib/viewport-height";

const CAMERA_FOV = 50;
const CAMERA_Z = 10;
const VIDEO_INSET_MOBILE = 12;
const VIDEO_INSET_DESKTOP = 16;
const CARD_RADIUS_MOBILE = 20;
const CARD_RADIUS_DESKTOP = 28;
/** Viewport heights of pinned scroll — lower = faster, more natural handoff. */
const SCROLL_DISTANCE_MOBILE = 0.9;
const SCROLL_DISTANCE_DESKTOP = 1.2;

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function attachVideoSources(video: HTMLVideoElement, sources: HeroVideoSources) {
  video.replaceChildren();
  // Prefer MP4 — our H.264 encodes are higher quality than the WebM variants.
  const mp4 = document.createElement("source");
  mp4.src = sources.mp4;
  mp4.type = "video/mp4";
  const webm = document.createElement("source");
  webm.src = sources.webm;
  webm.type = "video/webm";
  video.appendChild(mp4);
  video.appendChild(webm);
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uSize;
  uniform float uRadius;
  uniform vec2 uUvScale;
  uniform vec2 uUvOffset;
  uniform float uOverlay;
  uniform float uTint;
  uniform vec3 uOverlayColor;
  uniform vec3 uTintColor;

  float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  void main() {
    vec2 uv = vUv * uUvScale + uUvOffset;
    vec3 col = texture2D(uTexture, uv).rgb;

    float topGrad = smoothstep(0.15, 0.95, 1.0 - vUv.y);
    float leftGrad = smoothstep(0.0, 0.9, 1.0 - vUv.x);
    float gradMix = clamp(topGrad * 0.6 + leftGrad * 0.4, 0.0, 1.0);

    col = mix(col, uTintColor, uTint * (0.4 + gradMix * 0.6));
    col = mix(col, uOverlayColor, uOverlay * (0.3 + gradMix * 0.7));

    vec2 halfSize = uSize * 0.5;
    float r = min(uRadius, min(halfSize.x, halfSize.y));
    vec2 p = (vUv - 0.5) * uSize;
    float dist = roundedBoxSDF(p, halfSize, r);
    float aa = fwidth(dist) + 0.5;
    float alpha = 1.0 - smoothstep(-aa, aa, dist);

    gl_FragColor = vec4(col, alpha);
  }
`;

export interface HeroVideoRefs {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  posterRef: React.RefObject<HTMLDivElement | null>;
  headerRef: React.RefObject<HTMLDivElement | null>;
  heroContentRef: React.RefObject<HTMLDivElement | null>;
  targetRef: React.RefObject<HTMLDivElement | null>;
  editorialRef: React.RefObject<HTMLDivElement | null>;
  rightItemsRef: React.RefObject<HTMLDivElement | null>;
}

interface Options {
  sources: HeroVideoSources;
  enabled: boolean;
}

export function useHeroVideoTransition({ sources, enabled }: Options): HeroVideoRefs {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const posterRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const editorialRef = useRef<HTMLDivElement | null>(null);
  const rightItemsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !isWebGLAvailable()
    ) {
      return;
    }

    let cancelled = false;
    let disposeScene: (() => void) | undefined;

    const init = async () => {
      const [{ default: gsap }, { ScrollTrigger }, THREE] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("three"),
      ]);

      if (cancelled || !sectionRef.current || !canvasRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
      const layoutHeight = () => getLayoutViewportHeight();
      const videoInset = () => (isMobile() ? VIDEO_INSET_MOBILE : VIDEO_INSET_DESKTOP);
      const cardVideoRadius = () => (isMobile() ? CARD_RADIUS_MOBILE : CARD_RADIUS_DESKTOP);

      const video = document.createElement("video");
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      video.preload = "none";
      video.crossOrigin = "anonymous";
      video.setAttribute("webkit-playsinline", "true");
      Object.assign(video.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "2px",
        height: "2px",
        opacity: "0",
        pointerEvents: "none",
        zIndex: "-1",
      });
      document.body.appendChild(video);

      const playVideo = () => video.play().catch(() => {});

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);
      gsap.set(canvasRef.current, { autoAlpha: 0 });

      const revealVideo = () => {
        gsap.to(canvasRef.current, { autoAlpha: 1, duration: 0.6, ease: "power1.out" });
        if (posterRef.current) {
          gsap.to(posterRef.current, { autoAlpha: 0, duration: 0.5, ease: "power1.out" });
        }
      };

      video.addEventListener("playing", revealVideo);
      video.addEventListener("loadeddata", revealVideo);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 100);
      camera.position.z = CAMERA_Z;

      const texture = new THREE.VideoTexture(video);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const uniforms = {
        uTexture: { value: texture },
        uSize: { value: new THREE.Vector2(1, 1) },
        uRadius: { value: 0 },
        uUvScale: { value: new THREE.Vector2(1, 1) },
        uUvOffset: { value: new THREE.Vector2(0, 0) },
        uOverlay: { value: 0.3 },
        uTint: { value: 0.35 },
        uOverlayColor: { value: new THREE.Color("#0d221a") },
        uTintColor: { value: new THREE.Color("#1b3d2f") },
      };

      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const progressRef = { current: 0 };
      const videoAspectRef = { current: 16 / 9 };
      const worldPerPxRef = { current: 0.01 };
      const canvasSizeRef = { current: { w: 1, h: 1 } };
      const targetRectRef = {
        current: null as null | { left: number; top: number; width: number; height: number },
      };
      const dpr = () =>
        Math.min(window.devicePixelRatio || 1, isMobile() ? 2 : 1.5);

      const measureTarget = () => {
        const el = targetRef.current;
        const canvasEl = canvasRef.current;
        if (!el || !canvasEl) return;
        const cr = canvasEl.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        targetRectRef.current = {
          left: r.left - cr.left,
          top: r.top - cr.top,
          width: r.width,
          height: r.height,
        };
      };

      const resize = () => {
        const canvasEl = canvasRef.current;
        if (!canvasEl) return;
        const rect = canvasEl.getBoundingClientRect();
        const w = Math.max(1, rect.width);
        const h = Math.max(1, rect.height);
        canvasSizeRef.current = { w, h };
        renderer.setPixelRatio(dpr());
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const visibleHeight = 2 * Math.tan((CAMERA_FOV * Math.PI) / 360) * CAMERA_Z;
        worldPerPxRef.current = visibleHeight / h;
        measureTarget();
      };

      video.addEventListener("loadedmetadata", () => {
        if (video.videoWidth && video.videoHeight) {
          videoAspectRef.current = video.videoWidth / video.videoHeight;
        }
      });

      let rafId = 0;
      const render = () => {
        rafId = requestAnimationFrame(render);
        if (document.hidden) return;

        const p = progressRef.current;
        const motion = clamp01((p - 0.04) / 0.88);
        const e = motion;

        const vw = canvasSizeRef.current.w;
        const vh = canvasSizeRef.current.h;
        const bleed = { left: 0, top: 0, width: vw, height: vh };
        const tgt = targetRectRef.current ?? bleed;

        const width = lerp(bleed.width, tgt.width, e);
        const height = lerp(bleed.height, tgt.height, e);
        const cx = lerp(bleed.left + bleed.width / 2, tgt.left + tgt.width / 2, e);
        const cy = lerp(bleed.top + bleed.height / 2, tgt.top + tgt.height / 2, e);

        const wpp = worldPerPxRef.current;
        mesh.position.x = (cx - vw / 2) * wpp;
        mesh.position.y = -(cy - vh / 2) * wpp;
        mesh.scale.set(width * wpp, height * wpp, 1);

        const ratio = renderer.getPixelRatio();
        uniforms.uSize.value.set(width * ratio, height * ratio);
        const radiusProgress = clamp01(e / 0.4);
        uniforms.uRadius.value = lerp(0, cardVideoRadius(), radiusProgress) * ratio;

        const planeAspect = width / height;
        const videoAspect = videoAspectRef.current;
        let sx = 1;
        let sy = 1;
        if (planeAspect > videoAspect) sy = videoAspect / planeAspect;
        else sx = planeAspect / videoAspect;
        uniforms.uUvScale.value.set(sx, sy);
        uniforms.uUvOffset.value.set((1 - sx) / 2, (1 - sy) / 2);

        const filterFade = motion;
        uniforms.uTint.value = lerp(0.38, 0.0, filterFade);
        uniforms.uOverlay.value = lerp(0.55, 0.04, filterFade);

        renderer.render(scene, camera);
      };

      resize();
      render();

      const editorialScrollDistance = () =>
        Math.max(layoutHeight() * 0.4, isMobile() ? 200 : 260);

      gsap.set(heroContentRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(editorialRef.current, { y: editorialScrollDistance() });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () =>
            "+=" +
            (isMobile() ? SCROLL_DISTANCE_MOBILE : SCROLL_DISTANCE_DESKTOP) *
              layoutHeight(),
          pin: sectionRef.current,
          pinSpacing: true,
          anticipatePin: isMobile() ? 0 : 1,
          scrub: 0.35,
          invalidateOnRefresh: !isMobile(),
          onRefreshInit: () => {
            resize();
            gsap.set(editorialRef.current, { y: editorialScrollDistance() });
          },
          onRefresh: () => resize(),
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        },
      });

      tl.to(heroContentRef.current, { autoAlpha: 0, y: -100, duration: 0.2 }, 0.04);
      tl.to(
        headerRef.current,
        {
          top: videoInset(),
          left: videoInset(),
          right: videoInset(),
          duration: 0.32,
          ease: "power2.out",
        },
        0
      );
      tl.to(editorialRef.current, { y: 0, duration: 0.48, ease: "none" }, 0.1);

      let resizeTimer = 0;
      const refreshScrollTrigger = () => {
        resize();
        ScrollTrigger.refresh();
      };
      const onResize = () => {
        resize();
        if (isMobile()) return;
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(refreshScrollTrigger, 150);
      };
      const onOrientation = () => {
        window.setTimeout(refreshScrollTrigger, 120);
      };
      const onVisibility = () => {
        if (document.hidden) video.pause();
        else playVideo();
      };
      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onOrientation);
      document.addEventListener("visibilitychange", onVisibility);

      scheduleIdleWork(() => {
        if (cancelled) return;
        attachVideoSources(video, sources);
        video.preload = "auto";
        video.load();
        playVideo();
      });

      disposeScene = () => {
        cancelAnimationFrame(rafId);
        window.clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onOrientation);
        document.removeEventListener("visibilitychange", onVisibility);

        tl.scrollTrigger?.kill();
        tl.kill();

        geometry.dispose();
        material.dispose();
        texture.dispose();
        renderer.dispose();

        video.removeEventListener("playing", revealVideo);
        video.removeEventListener("loadeddata", revealVideo);
        video.pause();
        video.replaceChildren();
        video.removeAttribute("src");
        video.load();
        video.remove();
      };
    };

    init();

    return () => {
      cancelled = true;
      disposeScene?.();
    };
  }, [enabled, sources.mp4, sources.webm]);

  return {
    sectionRef,
    canvasRef,
    posterRef,
    headerRef,
    heroContentRef,
    targetRef,
    editorialRef,
    rightItemsRef,
  };
}
