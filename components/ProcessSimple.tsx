import type { CSSProperties } from "react";

import { process as processCopy } from "@/lib/siteCopy";

type ProcessStep = (typeof processCopy.steps)[number];

function ProcessStepMobile({ step, isLast }: { step: ProcessStep; isLast: boolean }) {
  return (
    <article data-reveal className="relative flex gap-3">
      <div className="flex w-9 shrink-0 flex-col items-center pt-0.5">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--site-border)] bg-[var(--site-surface-2)] text-[11px] font-semibold tabular-nums lab-accent-text ring-1 ring-white/10"
          style={{ fontFamily: "var(--font-mono)" }}
          aria-hidden
        >
          {step.num}
        </div>
        {!isLast ? (
          <div
            className="mt-1 min-h-[1.25rem] w-px flex-1 bg-gradient-to-b from-[var(--site-border)] to-transparent"
            aria-hidden
          />
        ) : null}
      </div>
      <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-5"}`}>
        <div className="overflow-hidden rounded-[8px] border border-[var(--site-border)] bg-[var(--site-surface)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <span
            style={{ fontFamily: "var(--font-mono)" }}
            className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-[var(--site-muted)]"
          >
            Этап
          </span>
          <h3 className="text-[17px] font-semibold leading-snug text-[var(--site-text)]">{step.heading}</h3>
          <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--site-muted)]">{step.body}</p>
        </div>
      </div>
    </article>
  );
}

export function ProcessSimple() {
  const [titleL1] = processCopy.title.split(".");

  return (
    <section id="process" className="relative scroll-mt-24 bg-[var(--site-surface)] px-4 py-12 md:px-12 md:py-32 xl:px-[48px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-6 hidden items-center gap-3 md:mb-10 md:flex">
          <div className="lab-accent-rule shrink-0" />
          <span className="section-label">{processCopy.label}</span>
        </div>
        <div className="mb-6 md:mb-10 md:hidden">
          <span className="section-label">{processCopy.label}</span>
        </div>

        <div className="mb-8 space-y-4 md:mb-16 md:space-y-6">
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="max-w-[720px] text-[clamp(28px,9vw,56px)] font-normal uppercase leading-[1.02] tracking-[0.02em] text-[var(--site-text)] md:text-[clamp(48px,6vw,96px)]"
          >
            {titleL1}
            <span className="lab-accent-text">.</span>
          </h2>
          <p
            data-reveal
            className="max-w-[560px] text-[13px] leading-relaxed text-[var(--site-muted)] md:text-[15px]"
          >
            {processCopy.sub}
          </p>
        </div>

        {/* Десктоп — горизонтальный таймлайн */}
        <div className="relative hidden md:block">
          <div className="absolute left-0 right-0 top-[15px] h-px bg-[var(--site-border)]" />
          <div className="grid grid-cols-4 gap-6">
            {processCopy.steps.map(({ num, heading, body }, i) => (
              <div
                key={num}
                data-reveal
                style={{ ["--delay" as string]: `${i * 0.08}s` } as CSSProperties}
                className="relative pt-10"
              >
                <div className="lab-accent-ring-dot absolute left-0 top-[11px] h-2 w-2 rounded-full bg-[var(--site-surface)]" />
                <span style={{ fontFamily: "var(--font-mono)" }} className="lab-accent-text mb-3 block text-[13px]">
                  {num}
                </span>
                <h3 className="mb-2 text-[18px] font-semibold text-[var(--site-text)]">{heading}</h3>
                <p className="text-[15px] leading-relaxed text-[var(--site-muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Мобилка — те же шаги, что «Линия работ»: круги + карточки */}
        <div className="flex flex-col md:hidden">
          {processCopy.steps.map((step, i) => (
            <ProcessStepMobile
              key={step.num}
              step={step}
              isLast={i === processCopy.steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
