"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cases, portfolioMeta, type Case } from "@/lib/siteCopy";

function ActiveCaseCard({ c }: { c: Case }) {
  const url = c.url ?? "#";
  const imageFit = c.imageFit ?? "cover";
  const imgPosition = c.imagePosition;

  return (
    <div className="group relative h-[560px] w-full overflow-hidden rounded-sm border border-white/5 bg-[#0a0a0a] md:h-[640px]">
      <div
        className={`absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 ${imageFit === "contain" ? "bg-[#0c0c0c]" : ""}`}
      >
        {c.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={c.image}
            alt={c.title ? `Скриншот сайта: ${c.title}` : ""}
            className={`h-full w-full ${imageFit === "contain" ? "object-contain object-top" : "object-cover object-center"}`}
            style={imgPosition ? { objectPosition: imgPosition } : undefined}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="case-cover-fallback h-full w-full" />
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-80"
        />
      </div>

      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end p-8 md:p-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span style={{ fontFamily: "var(--font-mono)" }} className="text-[11px] uppercase tracking-[0.15em] text-white/50">
            {c.type}
          </span>
          <span style={{ fontFamily: "var(--font-mono)" }} className="text-[11px] text-white/40">
            {c.year}
          </span>
        </div>
        <h3
          style={{ fontFamily: "var(--font-section-display), sans-serif" }}
          className="mb-3 text-[clamp(32px,5vw,56px)] font-normal uppercase leading-[0.95] tracking-[0.02em] text-white transition-all duration-500 group-hover:text-[var(--site-accent)]"
        >
          {c.title}
        </h3>
        <p className="mb-6 max-w-[400px] text-[15px] leading-relaxed text-white/70">{c.tagline}</p>
        <div className="flex flex-wrap gap-2">
          {(c.tags ?? []).map((t) => (
            <span key={t} style={{ fontFamily: "var(--font-mono)" }} className="rounded-[2px] bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] text-white/80 backdrop-blur-md border border-white/10">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex translate-y-[101%] flex-col bg-black/95 p-8 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0 md:p-10">
        <div className="flex h-full flex-col justify-center">
          <div className="mb-8 transform opacity-0 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100 translate-y-4">
            <span style={{ fontFamily: "var(--font-mono)" }} className="mb-3 block text-[11px] uppercase tracking-[0.2em] lab-accent-text">
              Задача
            </span>
            <p className="text-[15px] leading-relaxed text-white/80">{c.task}</p>
          </div>
          <div className="mb-10 transform opacity-0 transition-all duration-500 delay-200 group-hover:translate-y-0 group-hover:opacity-100 translate-y-4">
            <span style={{ fontFamily: "var(--font-mono)" }} className="mb-3 block text-[11px] uppercase tracking-[0.2em] lab-accent-text">
              Решение
            </span>
            <p className="text-[15px] leading-relaxed text-white/80">{c.solution}</p>
          </div>
          <div className="mt-auto flex items-center justify-between transform opacity-0 transition-all duration-500 delay-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-4">
            <span style={{ fontFamily: "var(--font-mono)" }} className="text-[12px] text-white/40">
              {c.stack}
            </span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex h-12 items-center justify-center rounded-[2px] bg-white px-6 text-[12px] font-semibold text-black transition-all hover:bg-[var(--site-accent)]"
            >
              Открыть проект <span className="ml-2 transition-transform group-hover/btn:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Упрощённая карточка для мобилки: фото + заголовок + кнопка, без hover-overlay */
function MobileCard({ c }: { c: Case }) {
  const url = c.url ?? "#";
  const imgPosition = c.imagePosition;

  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0a0a] shadow-[0_8px_30px_rgb(0,0,0,0.8)]">
      {/* Фото: строго пропорция 16:9, чтобы десктопный скриншот смотрелся идеально */}
      <div className="relative w-full aspect-[16/10] border-b border-white/5 bg-[#050505]">
        {c.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={c.image}
            alt={c.title ? `Скриншот сайта: ${c.title}` : ""}
            className="h-full w-full object-cover object-top"
            style={imgPosition ? { objectPosition: imgPosition } : undefined}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="case-cover-fallback h-full w-full" />
        )}
      </div>

      {/* Инфо: отдельный блок без наложения на картинку */}
      <div className="flex flex-col p-6 sm:p-8">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span style={{ fontFamily: "var(--font-mono)" }} className="text-[10px] uppercase tracking-[0.12em] text-white/50">
            {c.type}
          </span>
          <span style={{ fontFamily: "var(--font-mono)" }} className="text-[10px] text-white/40">
            {c.year}
          </span>
        </div>
        <h3
          style={{ fontFamily: "var(--font-section-display), sans-serif" }}
          className="mb-2 text-[26px] font-normal uppercase leading-[1.05] tracking-[0.02em] text-white"
        >
          {c.title}
        </h3>
        <p className="mb-6 text-[14px] leading-relaxed text-white/70">{c.tagline}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-white text-[13px] font-semibold text-black transition-colors active:scale-[0.98]"
        >
          Открыть проект
        </a>
      </div>
    </div>
  );
}

function LockedSlot() {
  return (
    <div className="relative flex min-h-[460px] flex-col items-center justify-center rounded-[2px] border border-[var(--site-border)] bg-[var(--site-surface-2)] px-6 text-center">
      <p className="max-w-[280px] text-[15px] leading-snug text-[var(--site-muted)]">Здесь может быть ваш проект</p>
    </div>
  );
}

function HorizontalScrollCarousel() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the horizontal scroll percentage dynamically based on the number of items.
  // 4 items => ~-65%, 5 items => ~-72%, etc., keeping about 1.4 items visible at the end
  const endPercentage = Math.round(100 * (cases.length - 1.4) / cases.length);
  const endX = `-${endPercentage}%`;
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", endX]);

  return (
    <div ref={targetRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-12 xl:px-[48px]">
          {cases.map((c) => {
            return c.locked ? (
              <div key={c.id} className="w-[600px] flex-shrink-0 xl:w-[800px]">
                <LockedSlot />
              </div>
            ) : (
              <div key={c.id} className="w-[600px] flex-shrink-0 xl:w-[800px]">
                <ActiveCaseCard c={c} />
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

function MobileStickyStack() {
  return (
    <div className="flex flex-col gap-0 pb-[10vh] md:hidden">
      {cases.map((c, i) => (
        <div
          key={c.id}
          className="sticky w-full"
          style={{
            top: `calc(12vh + ${i * 12}px)`,
            paddingTop: `${i * 12}px`, // Slight offset so they stack visibly
            marginBottom: "32px",
            zIndex: i,
          }}
        >
          {c.locked ? <MobileLockedSlot /> : <MobileCard c={c} />}
        </div>
      ))}
    </div>
  );
}

function MobileLockedSlot() {
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-[24px] border border-white/5 bg-[#050505] px-6 shadow-2xl">
      <p className="text-[13px] text-white/40">Здесь может быть ваш проект</p>
    </div>
  );
}

export function Portfolio() {
  return (
    <section
      id="work"
      className="relative scroll-mt-24 bg-[var(--site-bg)] px-6 py-24 md:px-12 md:py-32 xl:px-[48px]"
      aria-label="Кейсы"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 hidden items-center gap-3 md:flex">
          <div className="lab-accent-rule shrink-0" />
          <span className="section-label">{portfolioMeta.label}</span>
        </div>
        <div className="mb-10 md:hidden">
          <span className="section-label">{portfolioMeta.label}</span>
        </div>

        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="text-[clamp(32px,8vw,56px)] font-normal uppercase leading-[1.02] tracking-[0.02em] text-[var(--site-text)] md:text-[clamp(48px,6vw,96px)]"
          >
            {portfolioMeta.title.replace(".", "")}
            <span className="lab-accent-text">.</span>
          </h2>
          <p className="max-w-[320px] pb-1 text-[14px] leading-relaxed text-[var(--site-muted)]">{portfolioMeta.sub}</p>
        </div>

        {/* ── Мобильный список: Sticky Stacking ── */}
        <div className="mt-8">
          <MobileStickyStack />
        </div>

        {/* ── Десктоп: Horizontal Scroll Carousel ── */}
        <div className="hidden md:block -mx-12 xl:-mx-[48px]">
          <HorizontalScrollCarousel />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-[var(--site-border)] pt-10 md:flex-row md:items-center">
          <p className="max-w-[520px] text-[13px] leading-relaxed text-[var(--site-muted)]">
            {portfolioMeta.channelNote}{" "}
            <a
              href={portfolioMeta.channelHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--site-text)] underline decoration-[var(--site-accent)] underline-offset-4 transition-colors hover:lab-accent-text"
            >
              {portfolioMeta.channelLabel}
            </a>
            .
          </p>
          <a
            href="#contact"
            className="inline-flex h-11 flex-shrink-0 items-center justify-center whitespace-nowrap rounded-[2px] border border-[var(--site-accent)] px-8 text-[12px] uppercase tracking-[0.06em] text-[var(--site-accent)] transition-colors hover:lab-accent-bg hover:text-[#080808]"
          >
            {portfolioMeta.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
