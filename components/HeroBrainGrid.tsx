"use client";

import dynamic from "next/dynamic";
import {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
  type PointerEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { hero } from "@/lib/content";
import { createInitialHeroSwellState, type HeroSwellState } from "@/components/heroSwellState";
import { HeroLabCursor } from "@/components/HeroLabCursor";

gsap.registerPlugin(ScrollTrigger);

const QuantumBackground = dynamic(
  () => import("@/components/QuantumBackground").then((m) => m.QuantumBackground),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 z-0 bg-[#020c0c]" aria-hidden />
    ),
  }
);

function spawnFlashlight(host: HTMLElement, x: number, y: number) {
  const base = { left: `${x}px`, top: `${y}px`, transform: "translate(-50%, -50%)" } as const;

  const soft = document.createElement("div");
  soft.setAttribute("aria-hidden", "true");
  soft.className = "pointer-events-none absolute z-[50] box-border rounded-full";
  Object.assign(soft.style, {
    left: base.left,
    top: base.top,
    width: "0",
    height: "0",
    transform: base.transform,
    borderRadius: "50%",
    filter: "blur(18px)",
    background:
      "radial-gradient(circle, rgba(0,212,180,0.22) 0%, rgba(0,212,180,0.06) 40%, transparent 70%)",
  });
  host.appendChild(soft);
  const aSoft = soft.animate(
    [
      {
        transform: "translate(-50%, -50%)",
        width: "0",
        height: "0",
        opacity: 1,
      },
      {
        transform: "translate(-50%, -50%)",
        width: "320px",
        height: "320px",
        opacity: 0,
      },
    ],
    { duration: 750, easing: "ease-out", fill: "forwards" }
  );
  aSoft.onfinish = () => soft.remove();

  const core = document.createElement("div");
  core.setAttribute("aria-hidden", "true");
  core.className = "pointer-events-none absolute z-[50] box-border rounded-full";
  Object.assign(core.style, {
    left: base.left,
    top: base.top,
    width: "0",
    height: "0",
    transform: base.transform,
    borderRadius: "50%",
    filter: "blur(6px)",
    background: "radial-gradient(circle, rgba(0,255,220,0.5) 0%, transparent 70%)",
  });
  host.appendChild(core);
  const aCore = core.animate(
    [
      {
        transform: "translate(-50%, -50%)",
        width: "0",
        height: "0",
        opacity: 1,
      },
      {
        transform: "translate(-50%, -50%)",
        width: "80px",
        height: "80px",
        opacity: 0,
      },
    ],
    { duration: 400, easing: "ease-out", fill: "forwards" }
  );
  aCore.onfinish = () => core.remove();
}

function usePointerFine() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    const f = () => setOk(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return ok;
}

export default function HeroBrainGrid() {
  const reduced = useReducedMotion();
  const finePointer = usePointerFine();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const swellStateRef = useRef<HeroSwellState>(createInitialHeroSwellState());
  const wakenStarted = useRef(false);
  const [webglLayerOpacity, setWebglLayerOpacity] = useState(1);
  const [heroInViewport, setHeroInViewport] = useState(true);

  useLayoutEffect(() => {
    if (reduced) {
      const s = swellStateRef.current;
      s.awakenG = 1;
      s.awakenD = 0.35;
      s.meshZoom = 1;
      s.scrollP = 0;
      return;
    }

    const s = swellStateRef.current;
    const proxy: { g: number; d: number; z: number } = { g: 0, d: 0, z: 0.97 };
    const applyAwaken = () => {
      s.awakenG = proxy.g;
      s.awakenD = proxy.d;
      s.meshZoom = proxy.z;
    };

    const wake = () => {
      if (wakenStarted.current) return;
      wakenStarted.current = true;
      gsap.to(proxy, {
        g: 1,
        d: 0.35,
        z: 1,
        duration: 1.5,
        ease: "expo.inOut",
        onUpdate: applyAwaken,
        onComplete: applyAwaken,
      });
    };

    const onFirst = () => wake();
    window.addEventListener("pointermove", onFirst, { once: true, passive: true });
    window.addEventListener("touchstart", onFirst, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointermove", onFirst);
      window.removeEventListener("touchstart", onFirst);
    };
  }, [reduced]);

  useLayoutEffect(() => {
    if (!heroRef.current) return;
    const el = heroRef.current;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        swellStateRef.current.scrollP = p;
        const fade = Math.max(0, p - 0.7) / 0.3;
        const o = 1 - Math.min(1, Math.pow(fade, 1.15));
        setWebglLayerOpacity(o);
      },
    });
    return () => st.kill();
  }, []);

  useLayoutEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || reduced || !finePointer) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setHeroInViewport(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, finePointer]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (reduced || !finePointer) {
      document.body.classList.remove("lab-hero-cursor");
      return;
    }
    if (heroInViewport) {
      document.body.classList.add("lab-hero-cursor");
    } else {
      document.body.classList.remove("lab-hero-cursor");
    }
    return () => {
      document.body.classList.remove("lab-hero-cursor");
    };
  }, [reduced, finePointer, heroInViewport]);

  const onHeroPointerDownCapture = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0) return;
      if (reduced) return;
      const root = heroRef.current;
      if (!root) return;
      const r = root.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      spawnFlashlight(root, x, y);
    },
    [reduced]
  );

  return (
    <div
      id="top"
      ref={heroRef}
      onPointerDownCapture={onHeroPointerDownCapture}
      className="lab-hero-clip relative isolate min-h-[100dvh] w-full max-w-full overflow-x-hidden border-b border-white/10 bg-[#020c0c] pt-14 md:pt-16"
    >
      {finePointer && !reduced && heroInViewport && <HeroLabCursor active />}

      <div className="absolute inset-0 z-0 isolate min-h-0">
        <div
          className="absolute left-0 right-0 top-0 z-0 h-[100dvh] w-full min-h-0 overflow-hidden brightness-[0.6] saturate-[0.62] contrast-[1.02]"
          style={{
            opacity: webglLayerOpacity,
            transition: "opacity 0.15s ease-out",
          }}
          aria-hidden
        >
          <QuantumBackground swellStateRef={swellStateRef} />
        </div>

        <div
          className="hero-readability-vignette pointer-events-none absolute left-0 right-0 top-0 z-[2] h-[100dvh] min-h-0"
          aria-hidden
        />

        <div className="pointer-events-none relative z-10 flex min-h-[100dvh] w-full flex-col">
          <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 pb-28 pt-16 text-center md:px-12 md:pb-32">
            <div className="pointer-events-auto relative z-10 mx-auto flex w-full max-w-[760px] flex-col items-center">
              <p className="section-label mb-8 justify-center after:hidden">
                8:20 LAB &nbsp;·&nbsp; КОД — ВИЗУАЛ — ЗАПУСК — ЦИФРОВАЯ АРХИТЕКТУРА
              </p>

              <h1
                className="hero-headline-gradient text-center text-[clamp(52px,7.5vw,96px)] leading-[1.0] tracking-[-0.04em]"
                style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 900 }}
              >
                <span className="block">Сайт с системой.</span>
                <span className="block">Кадр с характером.</span>
              </h1>

              <p className="mt-6 max-w-[420px] text-center text-[15px] leading-[1.75] text-[#6b8e8a] md:text-[16px]">
                {hero.sub}
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  data-magnetic-btn
                  href={hero.ctaPrimary.href}
                  className="inline-flex h-[52px] items-center justify-center rounded-sm bg-[#00d4b8] px-9 text-[13px] font-medium tracking-[0.06em] text-[#020c0c] transition-all duration-200 hover:-translate-y-[2px] hover:opacity-85"
                >
                  {hero.ctaPrimary.label}
                </a>
                <a
                  data-magnetic-btn
                  href={hero.ctaSecondary.href}
                  className="inline-flex h-[52px] items-center justify-center rounded-sm border border-white/15 px-9 text-[13px] font-medium tracking-[0.06em] text-white/80 transition-all duration-200 hover:-translate-y-[2px] hover:border-white/40"
                >
                  {hero.ctaSecondary.label} →
                </a>
              </div>
            </div>

            <div
              className="pointer-events-none absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 opacity-40"
              aria-hidden
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6b8e8a]">скролл</span>
              <div className="h-8 w-px animate-bounce bg-[#00d4b8]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
