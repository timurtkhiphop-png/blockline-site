import type { CSSProperties } from "react";

import { cases, portfolioMeta, type Case } from "@/lib/siteCopy";

function ActiveCaseCard({ c }: { c: Case }) {
  const url = c.url ?? "#";
  const imageFit = c.imageFit ?? "cover";
  const imgPosition = c.imagePosition;

  return (
    <div className="group relative min-h-[460px] overflow-hidden rounded-[2px] border border-[var(--site-border)] bg-[var(--site-surface)]">
      <div
        className={`absolute inset-0 ${imageFit === "contain" ? "bg-[#0c0c0c]" : ""}`}
      >
        {c.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={c.image}
            alt={c.title ? `Скриншот сайта: ${c.title}` : ""}
            className={`h-full w-full ${imageFit === "contain" ? "object-contain object-top" : "object-cover object-top"}`}
            style={imgPosition ? { objectPosition: imgPosition } : undefined}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="case-cover-fallback h-full w-full" />
        )}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(transparent 30%, rgba(8,8,8,0.9) 100%)",
          }}
        />
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-[460px] flex-col justify-end p-6 md:p-8">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span style={{ fontFamily: "var(--font-mono)" }} className="text-[10px] uppercase tracking-[0.12em] text-[var(--site-muted)]">
            {c.type}
          </span>
          <span style={{ fontFamily: "var(--font-mono)" }} className="text-[10px] text-[var(--site-muted)]">
            {c.year}
          </span>
        </div>
        <h3
          style={{ fontFamily: "var(--font-section-display), sans-serif" }}
          className="mb-2 text-[clamp(28px,4vw,44px)] font-normal uppercase leading-[0.98] tracking-[0.02em] text-[var(--site-text)]"
        >
          {c.title}
        </h3>
        <p className="mb-4 text-[14px] text-[var(--site-muted)]">{c.tagline}</p>
        <div className="flex flex-wrap gap-2">
          {(c.tags ?? []).map((t) => (
            <span key={t} style={{ fontFamily: "var(--font-mono)" }} className="text-[10px] uppercase tracking-[0.08em] text-[var(--site-text)]/80">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-20 translate-y-full bg-[rgba(8,8,8,0.92)] p-6 transition-transform duration-[350ms] ease-out group-hover:translate-y-0 md:p-8">
        <div className="flex h-full min-h-[420px] flex-col pt-4">
          <div className="mb-6">
            <span style={{ fontFamily: "var(--font-mono)" }} className="mb-2 block text-[10px] uppercase tracking-[0.14em] lab-accent-text">
              Задача
            </span>
            <p className="text-[14px] leading-relaxed text-[var(--site-muted)]">{c.task}</p>
          </div>
          <div className="mb-8">
            <span style={{ fontFamily: "var(--font-mono)" }} className="mb-2 block text-[10px] uppercase tracking-[0.14em] lab-accent-text">
              Решение
            </span>
            <p className="text-[14px] leading-relaxed text-[var(--site-muted)]">{c.solution}</p>
          </div>
          <span style={{ fontFamily: "var(--font-mono)" }} className="mt-auto text-[11px] text-[var(--site-muted)]">
            {c.stack}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-5 right-5 inline-flex h-10 items-center justify-center rounded-[2px] border border-[var(--site-accent)] px-4 text-[12px] text-[var(--site-accent)] transition-colors hover:lab-accent-bg hover:text-[#080808]"
          >
            Открыть сайт →
          </a>
        </div>
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cases.map((c, i) => {
            const delayStyle = { ["--delay" as string]: `${i * 0.08}s` } as CSSProperties;
            return c.locked ? (
              <div key={c.id} data-reveal style={delayStyle}>
                <LockedSlot />
              </div>
            ) : (
              <div key={c.id} data-reveal style={delayStyle}>
                <ActiveCaseCard c={c} />
              </div>
            );
          })}
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
