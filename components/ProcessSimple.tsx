import type { CSSProperties } from "react";

import { process as processCopy } from "@/lib/siteCopy";

export function ProcessSimple() {
  const [titleL1] = processCopy.title.split(".");

  return (
    <section id="process" className="relative scroll-mt-24 bg-[var(--site-surface)] px-6 py-24 md:px-12 md:py-32 xl:px-[48px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 hidden items-center gap-3 md:flex">
          <div className="lab-accent-rule shrink-0" />
          <span className="section-label">{processCopy.label}</span>
        </div>
        <div className="mb-10 md:hidden">
          <span className="section-label">{processCopy.label}</span>
        </div>

        <div className="mb-14 space-y-5 md:mb-16 md:space-y-6">
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="max-w-[720px] text-[clamp(32px,8vw,56px)] font-normal uppercase leading-[1.02] tracking-[0.02em] text-[var(--site-text)] md:text-[clamp(48px,6vw,96px)]"
          >
            {titleL1}
            <span className="lab-accent-text">.</span>
          </h2>
          <p data-reveal className="max-w-[560px] text-[15px] leading-relaxed text-[var(--site-muted)]">
            {processCopy.sub}
          </p>
        </div>

        {/* Desktop timeline */}
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

        {/* Mobile vertical */}
        <div className="relative border-l border-[var(--site-border)] pl-8 md:hidden">
          {processCopy.steps.map(({ num, heading, body }, i) => (
            <div key={num} data-reveal className="relative pb-10 last:pb-2">
              <div className="lab-accent-ring-dot absolute left-[-33px] top-1 h-2 w-2 rounded-full bg-[var(--site-surface)]" />
              <span style={{ fontFamily: "var(--font-mono)" }} className="lab-accent-text mb-2 block text-[13px]">
                {num}
              </span>
              <h3 className="mb-2 text-[18px] font-semibold text-[var(--site-text)]">{heading}</h3>
              <p className="text-[15px] leading-relaxed text-[var(--site-muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
