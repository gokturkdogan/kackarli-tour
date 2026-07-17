"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CAMERA_FOV = 50;
const CAMERA_Z = 10;
const VIDEO_INSET_MOBILE = 12;
const VIDEO_INSET_DESKTOP = 16;
const CARD_RADIUS_MOBILE = 20;
const CARD_RADIUS_DESKTOP = 28;

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Rounded-rectangle mask via signed-distance function + object-fit: cover UV crop.
const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uSize;      // plane size in device px
  uniform float uRadius;   // corner radius in device px
  uniform vec2 uUvScale;   // cover-crop scale
  uniform vec2 uUvOffset;  // cover-crop offset
  uniform float uOverlay;  // dark overlay strength
  uniform float uTint;     // forest-green wash strength
  uniform vec3 uOverlayColor;
  uniform vec3 uTintColor;

  float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  void main() {
    vec2 uv = vUv * uUvScale + uUvOffset;
    vec3 col = texture2D(uTexture, uv).rgb;

    // Directional green grade — mirrors the original hero gradient overlays.
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
  headerRef: React.RefObject<HTMLDivElement | null>;
  heroContentRef: React.RefObject<HTMLDivElement | null>;
  targetRef: React.RefObject<HTMLDivElement | null>;
  editorialRef: React.RefObject<HTMLDivElement | null>;
  rightItemsRef: React.RefObject<HTMLDivElement | null>;
}

interface Options {
  videoSrc: string;
  enabled: boolean;
}

export function useHeroVideoTransition({ videoSrc, enabled }: Options): HeroVideoRefs {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
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

    gsap.registerPlugin(ScrollTrigger);

    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
    const videoInset = () => (isMobile() ? VIDEO_INSET_MOBILE : VIDEO_INSET_DESKTOP);
    const cardVideoRadius = () => (isMobile() ? CARD_RADIUS_MOBILE : CARD_RADIUS_DESKTOP);

    // --- Video element (single source, reused across the whole transition) ---
    const video = document.createElement("video");
    video.src = videoSrc;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    video.preload = "metadata";
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
    playVideo();

    // --- Three.js core: one scene / renderer / camera / plane / loop ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    gsap.set(canvas, { autoAlpha: 0 });
    const revealCanvas = () => gsap.to(canvas, { autoAlpha: 1, duration: 0.6, ease: "power1.out" });
    video.addEventListener("playing", revealCanvas);
    video.addEventListener("loadeddata", revealCanvas);

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

    // --- Shared reactive values (mutated outside React render) ---
    const progressRef = { current: 0 };
    const videoAspectRef = { current: 16 / 9 };
    const worldPerPxRef = { current: 0.01 };
    const canvasSizeRef = { current: { w: 1, h: 1 } };
    const targetRectRef = {
      current: null as null | { left: number; top: number; width: number; height: number },
    };
    const dpr = () => Math.min(window.devicePixelRatio || 1, isMobile() ? 1 : 1.5);

    // Target rect measured relative to the canvas origin (canvas may be inset in a frame).
    const measureTarget = () => {
      const el = targetRef.current;
      if (!el) return;
      const cr = canvas.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      targetRectRef.current = {
        left: r.left - cr.left,
        top: r.top - cr.top,
        width: r.width,
        height: r.height,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
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

    // --- Render loop (animates refs directly, no React state) ---
    let rafId = 0;
    const render = () => {
      rafId = requestAnimationFrame(render);
      if (document.hidden) return;

      const p = progressRef.current;
      const motion = clamp01((p - 0.15) / 0.7); // plane travels between 0.15 → 0.85
      const e = easeInOutCubic(motion);

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
      // Radius grows from 0 with scroll — synced with the inset/body reveal.
      const radiusProgress = easeInOutCubic(clamp01(e / 0.45));
      uniforms.uRadius.value = lerp(0, cardVideoRadius(), radiusProgress) * ratio;

      const planeAspect = width / height;
      const videoAspect = videoAspectRef.current;
      let sx = 1;
      let sy = 1;
      if (planeAspect > videoAspect) sy = videoAspect / planeAspect;
      else sx = planeAspect / videoAspect;
      uniforms.uUvScale.value.set(sx, sy);
      uniforms.uUvOffset.value.set((1 - sx) / 2, (1 - sy) / 2);

      // Green filter at full bleed, fades out smoothly as the video shrinks.
      const filterFade = easeInOutCubic(e);
      uniforms.uTint.value = lerp(0.38, 0.0, filterFade);
      uniforms.uOverlay.value = lerp(0.55, 0.04, filterFade);

      renderer.render(scene, camera);
    };

    resize();
    render();

    // --- Scroll-driven timeline: pin + scrub ---
    const editorialScrollDistance = () =>
      Math.max(window.innerHeight * 0.55, isMobile() ? 280 : 360);

    gsap.set(heroContentRef.current, { autoAlpha: 1, y: 0 });
    gsap.set(editorialRef.current, { y: editorialScrollDistance() });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => "+=" + (isMobile() ? 1.5 : 2.1) * window.innerHeight,
        pin: section,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
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

    // Hero copy scrolls away upward like normal page content leaving the viewport.
    tl.to(heroContentRef.current, { autoAlpha: 0, y: -120, duration: 0.28 }, 0.08);
    // Header inset follows the video padding reveal.
    tl.to(
      headerRef.current,
      {
        top: videoInset(),
        left: videoInset(),
        right: videoInset(),
        duration: 0.45,
        ease: "power2.inOut",
      },
      0
    );
    // Editorial block rises from below in sync with the shrinking video — no fade-in stagger.
    tl.to(
      editorialRef.current,
      { y: 0, duration: 0.62, ease: "none" },
      0.18
    );

    // --- Listeners: resize / orientation / visibility (throttled) ---
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        ScrollTrigger.refresh();
      }, 150);
    };
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else playVideo();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    // --- Cleanup / disposal ---
    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      document.removeEventListener("visibilitychange", onVisibility);

      tl.scrollTrigger?.kill();
      tl.kill();

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();

      video.removeEventListener("playing", revealCanvas);
      video.removeEventListener("loadeddata", revealCanvas);
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.remove();
    };
  }, [enabled, videoSrc]);

  return {
    sectionRef,
    canvasRef,
    headerRef,
    heroContentRef,
    targetRef,
    editorialRef,
    rightItemsRef,
  };
}
