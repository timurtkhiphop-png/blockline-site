"use client";

import dynamic from "next/dynamic";
import {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
  useMemo,
  Fragment,
  type PointerEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { hero, brand } from "@/lib/content";
import { createInitialHeroSwellState, type HeroSwellState } from "@/components/heroSwellState";
import { Magnetic } from "@/components/Magnetic";
import { useMouseParallax } from "@/components/MouseParallaxProvider";
import { useLoading } from "@/components/LoadingContext";
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
      { transform: "translate(-50%, -50%)", width: "0", height: "0", opacity: 1 },
      { transform: "translate(-50%, -50%)", width: "320px", height: "320px", opacity: 0 },
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
      { transform: "translate(-50%, -50%)", width: "0", height: "0", opacity: 1 },
      { transform: "translate(-50%, -50%)", width: "80px", height: "80px", opacity: 0 },
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

function useLightweightHero() {
  const [lightweight, setLightweight] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 900px), (pointer: coarse)");
    const fn = () => setLightweight(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return lightweight;
}

export default function HeroBrainGrid() {
  const reduced = useReducedMotion();
  const finePointer = usePointerFine();
  const lightweightHero = useLightweightHero();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const swellStateRef = useRef<HeroSwellState>(createInitialHeroSwellState());
  const wakenStarted = useRef(false);
  const [webglLayerOpacity, setWebglLayerOpacity] = useState(1);
  const [heroInViewport, setHeroInViewport] = useState(true);
  const { isLoaded } = useLoading();
  
  // Mouse Parallax is no longer applied to the foreground text
  const { mx, my } = useMouseParallax();
  // We keep the hooks so we don't break the provider usage, but we won't use fgX, fgY on text.

  // Scroll Fade/Parallax for Text
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 0.45], [0, 90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const wordDelay = 0.06;
  const noAnim = reduced || lightweightHero;

  const wordGrid = useMemo(() => {
    let gi = 0;
    return hero.lines.map((line) =>
      line.map((word) => {
        const idx = gi++;
        return { word, i: idx, isAccent: idx === hero.accentWordIndex };
      })
    );
  }, []);

  useLayoutEffect(() => {
    if (reduced) {
      const s = swellStateRef.current;
      s.awakenG = 1; s.awakenD = 0.35; s.meshZoom = 1; s.scrollP = 0;
      return;
    }
    if (lightweightHero) {
      const s = swellStateRef.current;
      s.awakenG = 1; s.awakenD = 0.35; s.meshZoom = 1; s.scrollP = 0;
      return;
    }

    const s = swellStateRef.current;
    const proxy: { g: number; d: number; z: number } = { g: 0, d: 0, z: 0.97 };
    const applyAwaken = () => { s.awakenG = proxy.g; s.awakenD = proxy.d; s.meshZoom = proxy.z; };

    const wake = () => {
      if (wakenStarted.current) return;
      wakenStarted.current = true;
      gsap.to(proxy, { g: 1, d: 0.35, z: 1, duration: 1.5, ease: "expo.inOut", onUpdate: applyAwaken, onComplete: applyAwaken });
    };

    const onFirst = () => wake();
    window.addEventListener("pointermove", onFirst, { once: true, passive: true });
    window.addEventListener("touchstart", onFirst, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointermove", onFirst);
      window.removeEventListener("touchstart", onFirst);
    };
  }, [reduced, lightweightHero]);

  useLayoutEffect(() => {
    if (lightweightHero || !heroRef.current) return;
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
  }, [lightweightHero]);

  useLayoutEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [lightweightHero]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || reduced || !finePointer) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroInViewport(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, finePointer]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (reduced || !finePointer) { document.body.classList.remove("lab-hero-cursor"); return; }
    if (heroInViewport) { document.body.classList.add("lab-hero-cursor"); }
    else { document.body.classList.remove("lab-hero-cursor"); }
    return () => { document.body.classList.remove("lab-hero-cursor"); };
  }, [reduced, finePointer, heroInViewport]);

  const onHeroPointerDownCapture = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.button !== 0 || reduced || lightweightHero) return;
      const root = heroRef.current;
      if (!root) return;
      const r = root.getBoundingClientRect();
      spawnFlashlight(root, e.clientX - r.left, e.clientY - r.top);
    },
    [reduced, lightweightHero]
  );

  return (
    <div
      id="top"
      ref={heroRef}
      onPointerDownCapture={lightweightHero ? undefined : onHeroPointerDownCapture}
      className="lab-hero-clip relative isolate min-h-[100svh] w-full max-w-full touch-pan-y border-b border-white/10 bg-[#020c0c] pt-14 md:pt-16 md:min-h-[100dvh]"
    >

      <div className="absolute inset-0 z-0 isolate min-h-0">
        {lightweightHero ? (
          /* Мобилка: CSS-фон без WebGL */
          <div
            className="absolute left-0 right-0 top-0 z-0 h-full w-full min-h-0"
            aria-hidden
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#061a1a] via-[#0c2422] to-[#020c0c]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 140% 60% at 50% 0%, rgba(0,212,184,0.18), transparent 55%), radial-gradient(ellipse 80% 50% at 90% 90%, rgba(0,90,82,0.3), transparent 50%)",
              }}
            />
          </div>
        ) : (
          /* Десктоп: полный WebGL */
          <div
            className="absolute left-0 right-0 top-0 z-0 h-[100dvh] w-full min-h-0 overflow-hidden brightness-[0.6] saturate-[0.62] contrast-[1.02]"
            style={{ opacity: webglLayerOpacity, transition: "opacity 0.15s ease-out" }}
            aria-hidden
          >
            <QuantumBackground swellStateRef={swellStateRef} />
          </div>
        )}

        <div
          className="hero-readability-vignette pointer-events-none absolute left-0 right-0 top-0 z-[2] h-[100dvh] min-h-0"
          aria-hidden
        />

        <div className="pointer-events-none relative z-10 flex min-h-[100svh] w-full flex-col md:min-h-[100dvh]">
          <div className="relative flex min-h-[100svh] w-full flex-col items-center justify-center px-4 pb-16 pt-24 text-center sm:px-10 md:min-h-[100dvh] lg:px-20 md:pb-32 md:items-start md:text-left">
            
            <motion.div 
              style={noAnim ? {} : { y: textY, opacity: textOpacity, scale: textScale }}
              className="pointer-events-auto relative z-10 w-full max-w-[900px]"
            >
              <div className="flex flex-col items-center md:items-start w-full">
                
                <p className="section-label mb-6 justify-center md:justify-start after:hidden text-[10px] tracking-[0.2em] md:mb-8 md:text-[12px] md:tracking-[0.25em]">
                  {brand.name.toUpperCase()} &nbsp;·&nbsp; {hero.kicker.toUpperCase()}
                </p>

                <h1
                  className="hero-headline-gradient leading-[0.95] tracking-[-0.04em] min-h-[1.1em] ml-[-0.02em] flex flex-col w-full items-center text-center md:w-max md:items-start md:text-left max-w-none"
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(34px, 9vw, 90px)",
                  }}
                >
                  {wordGrid.map((line, lineIdx) => (
                    <span key={lineIdx} className="block mt-1 whitespace-pre-wrap md:whitespace-nowrap">
                      {line.map(({ word, i, isAccent }, wi) => (
                        <Fragment key={`${lineIdx}-${i}`}>
                        <motion.span
                          key={`${lineIdx}-${i}`}
                          className="inline-block overflow-hidden pb-2 px-[0.3em] -mx-[0.3em]"
                          style={{ verticalAlign: "baseline" }}
                        >
                          <motion.span
                            className={
                              (isAccent
                                ? "inline-block bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(34,211,238,0.35)]"
                                : "inline-block") + " px-[0.3em] -mx-[0.3em]"
                            }
                            initial={noAnim ? { y: 0, opacity: 1 } : { y: "120%", opacity: 1 }}
                            animate={isLoaded || noAnim ? { y: 0, opacity: 1 } : { y: "120%", opacity: 1 }}
                            transition={
                              noAnim
                                ? { duration: 0 }
                                : {
                                    type: "spring",
                                    stiffness: 320,
                                    damping: 24,
                                    mass: 0.65,
                                    delay: 0.05 + i * wordDelay,
                                  }
                            }
                          >
                            {word}
                          </motion.span>
                        </motion.span>
                        {wi < line.length - 1 && (wi === 0 ? "\u00A0" : " ")}
                        </Fragment>
                      ))}
                    </span>
                  ))}
                </h1>

                <motion.p
                  initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={isLoaded || noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={noAnim ? { duration: 0 } : { delay: 0.58, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-5 max-w-[340px] text-center text-[15px] leading-[1.6] text-[var(--site-muted)] sm:max-w-[420px] md:mt-8 md:max-w-[480px] md:text-left md:text-[17px] md:leading-[1.7]"
                >
                  {hero.sub}
                </motion.p>

                <motion.div
                  initial={noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  animate={isLoaded || noAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={noAnim ? { duration: 0 } : { delay: 0.8, duration: 0.45 }}
                  className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row md:mt-10 md:justify-start"
                >
                  <Magnetic strength={22}>
                    <motion.a
                      href={hero.ctaPrimary.href}
                      className="relative flex w-full sm:inline-flex sm:w-auto h-[52px] overflow-hidden items-center justify-center rounded-sm bg-[#00d4b8] px-8 text-[13px] font-medium tracking-[0.06em] text-[#020c0c] transition hover:scale-[1.02] md:h-[52px] md:px-9"
                      initial={false}
                      animate={
                        noAnim
                          ? { boxShadow: "0 0 0 0 rgba(0,212,184,0)" }
                          : {
                              boxShadow: [
                                "0 0 0 0 rgba(0,212,184,0.45)",
                                "0 0 40px 8px rgba(0,212,184,0.3)",
                                "0 0 0 0 rgba(0,212,184,0.45)",
                              ],
                            }
                      }
                      transition={{ duration: 2, repeat: noAnim ? 0 : Infinity, ease: "easeInOut" }}
                    >
                      {!noAnim && (
                        <motion.span
                          className="pointer-events-none absolute inset-0 w-[200%] opacity-30"
                          style={{
                            background:
                              "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.7) 50%, transparent 60%)",
                          }}
                          initial={{ x: "-60%" }}
                          animate={{ x: "40%" }}
                          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      <span className="relative z-10">{hero.ctaPrimary.label}</span>
                    </motion.a>
                  </Magnetic>
                  
                  <Magnetic strength={15}>
                    <a
                      href={hero.ctaSecondary.href}
                      className="flex w-full sm:inline-flex sm:w-auto h-[52px] items-center justify-center rounded-sm border border-white/15 bg-white/[0.03] backdrop-blur-sm px-8 text-[13px] font-medium tracking-[0.06em] text-white/80 transition-all duration-200 hover:border-[#00d4b8]/40 hover:bg-white/[0.06] hover:text-[#00d4b8] md:px-9"
                    >
                      {hero.ctaSecondary.label} →
                    </a>
                  </Magnetic>
                </motion.div>

              </div>
            </motion.div>

            <div
              className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 opacity-40 md:bottom-10"
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
