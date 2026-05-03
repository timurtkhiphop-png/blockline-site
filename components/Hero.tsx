"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useMemo } from "react";
import { hero, brand } from "@/lib/content";
import { Magnetic } from "./Magnetic";
import { useMouseParallax } from "./MouseParallaxProvider";

const wordDelay = 0.06;

/** Слои как на полноэкранных digital-сайтах: фон движется меньше, типографика — сильнее (единообразно с 3D). */
function useHeroParallaxLayers() {
  const { mx, my } = useMouseParallax();
  const bgX = useTransform(mx, (v: number) => v * 72);
  const bgY = useTransform(my, (v: number) => v * 58);
  const fgX = useTransform(mx, (v: number) => v * 150);
  const fgY = useTransform(my, (v: number) => v * 118);
  return { bgX, bgY, fgX, fgY };
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { bgX, bgY, fgX, fgY } = useHeroParallaxLayers();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.45], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.38], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  const wordGrid = useMemo(() => {
    let gi = 0;
    return hero.lines.map((line) =>
      line.map((word) => {
        const idx = gi++;
        return {
          word,
          i: idx,
          isAccent: idx === hero.accentWordIndex,
        };
      })
    );
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative box-border flex min-h-[100dvh] w-full min-w-0 flex-col justify-center overflow-x-hidden overflow-y-hidden pt-[max(4.5rem,env(safe-area-inset-top,0px))] pb-10 [min-height:100svh] md:pt-20 md:pb-12"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <motion.p
          className="pointer-events-none absolute left-1/2 top-1/2 w-[100vw] -translate-x-1/2 -translate-y-[42%] select-none text-center font-display text-[min(40vw,18rem)] font-extralight leading-none tracking-tightest text-white/[0.05]"
          style={{ x: bgX, y: bgY }}
        >
          8:20
        </motion.p>

        <motion.div
          className="absolute inset-0"
          style={{ x: bgX, y: bgY }}
        >
          <div className="absolute inset-0 bg-mesh-hero opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-ink/55 to-ink/95" />
        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(150vmin,960px)] w-[min(150vmin,960px)] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen opacity-20 blur-3xl"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, rgba(34,211,238,0.9), rgba(59,130,246,0.6), rgba(6,182,212,0.75), rgba(34,211,238,0.9))",
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          />
        )}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,rgba(34,211,238,0.18),transparent_58%)]"
          animate={{ opacity: reduceMotion ? 0.75 : [0.45, 0.9, 0.45] }}
          transition={{ duration: 9, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-1/3 top-[-10%] h-[75vmin] w-[75vmin] rounded-full bg-cyan-400/12 blur-[120px]"
          animate={{ x: [0, 22, 0], y: [0, 16, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-1/4 bottom-[-5%] h-[60vmin] w-[60vmin] rounded-full bg-blue-500/8 blur-[110px]"
          animate={{ x: [0, -18, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.14) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
          animate={{ backgroundPosition: ["0 0", "64px 64px"] }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
            backgroundSize: "200px 200px",
          }}
        />
        </motion.div>
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto w-full max-w-[min(100%,1200px)] px-5 md:px-10"
      >
        <motion.div style={{ x: fgX, y: fgY }}>
        <p className="font-mono text-[11px] tracking-[0.45em] text-cyan-300/85 md:text-[12px]">
          {hero.kicker}
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.38em] text-slate-500">
          {brand.name.toLowerCase()} · {brand.tagline.toLowerCase()}
        </p>

        <h1 className="mt-6 min-h-[1.1em] max-w-full md:mt-8">
          {wordGrid.map((line, lineIdx) => (
            <span
              key={lineIdx}
              className={`block ${
                lineIdx === 0
                  ? "text-[clamp(2.5rem,12vw,6.5rem)] font-extralight leading-[0.95] tracking-[-0.04em] text-white"
                  : "mt-1 text-[clamp(2.2rem,10.5vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.03em]"
              }`}
            >
              {line.map(({ word, i, isAccent }, wi) => (
                <motion.span
                  key={`${lineIdx}-${i}`}
                  className="inline-block overflow-hidden"
                  style={{ verticalAlign: "baseline" }}
                >
                  <motion.span
                    className={
                      isAccent
                        ? "inline-block bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(34,211,238,0.35)]"
                        : "inline-block text-white"
                    }
                    initial={reduceMotion ? { y: 0, opacity: 1 } : { y: "118%", opacity: 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={
                      reduceMotion
                        ? { duration: 0.25 }
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
                    {wi < line.length - 1 && "\u00a0"}
                  </motion.span>
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-[32rem] text-[16px] leading-[1.55] text-slate-400 md:mt-10 md:max-w-[38rem] md:text-[18px] md:leading-[1.5]"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-3 md:mt-12"
        >
          <Magnetic strength={22}>
            <motion.a
              href={hero.ctaPrimary.href}
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-cyan-400 px-7 py-4 text-[15px] font-semibold text-ink transition hover:scale-[1.02] md:px-8 md:text-[16px]"
              initial={false}
              animate={
                reduceMotion
                  ? { boxShadow: "0 0 0 0 rgba(34,211,238,0)" }
                  : {
                      boxShadow: [
                        "0 0 0 0 rgba(34,211,238,0.45)",
                        "0 0 40px 8px rgba(34,211,238,0.3)",
                        "0 0 0 0 rgba(34,211,238,0.45)",
                      ],
                    }
              }
              transition={{ duration: 2, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
            >
              {!reduceMotion && (
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
          <a
            href={hero.ctaSecondary.href}
            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-6 py-4 text-[15px] text-slate-200 backdrop-blur-sm transition hover:border-cyan-400/35 hover:bg-white/[0.06] md:text-[16px]"
          >
            {hero.ctaSecondary.label}
          </a>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 h-px w-full max-w-lg origin-left bg-gradient-to-r from-cyan-400/60 via-white/20 to-transparent md:mt-16"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.35 }}
          className="mt-2 font-mono text-[10px] uppercase tracking-[0.45em] text-slate-600"
        >
          ↓
        </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
