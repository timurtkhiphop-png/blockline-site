"use client";

import { useState } from "react";

import { faqs } from "@/lib/siteCopy";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 bg-[var(--site-surface)] px-4 py-12 md:px-12 md:py-32 xl:px-[48px]"
    >
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-10 md:mb-16">
          <div className="mb-6 hidden items-center gap-3 md:flex">
            <div className="lab-accent-rule shrink-0" />
            <span className="section-label">Вопросы</span>
          </div>
          <div className="mb-6 md:hidden">
            <span className="section-label">Вопросы</span>
          </div>
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="max-w-[520px] text-[clamp(32px,8vw,56px)] font-normal uppercase leading-[1.05] tracking-[0.02em] text-[var(--site-text)] md:text-[clamp(48px,6vw,96px)]"
          >
            Часто
            <br />
            спрашивают
          </h2>
        </header>

        {/* Мобилка: карточки в духе тарифов / допов */}
        <div className="mx-auto flex max-w-[800px] flex-col gap-3 md:hidden">
          {faqs.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div
                key={q}
                data-reveal
                className={`relative overflow-hidden rounded-[6px] border bg-[var(--site-surface)] transition-[box-shadow,border-color] duration-300 ${
                  isOpen
                    ? "shadow-[0_0_0_1px_rgba(0,255,255,0.14),inset_0_1px_0_rgba(255,255,255,0.05)]"
                    : "border-[var(--site-border)]"
                }`}
                style={
                  isOpen
                    ? {
                        borderColor: "color-mix(in srgb, var(--site-accent) 32%, var(--site-border))",
                      }
                    : undefined
                }
              >
                {isOpen ? (
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06]"
                    style={{
                      background: "linear-gradient(135deg, var(--site-accent-from), var(--site-accent-to))",
                    }}
                    aria-hidden
                  />
                ) : null}
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="relative flex w-full items-start gap-3 p-4 text-left transition-colors active:scale-[0.99]"
                  aria-expanded={isOpen}
                >
                  <span
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="mt-0.5 shrink-0 text-[10px] uppercase tracking-[0.16em] text-[var(--site-muted)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-[var(--site-text)]">{q}</span>
                  <span
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="lab-accent-text flex-shrink-0 text-xl leading-none"
                  >
                    {isOpen ? "×" : "+"}
                  </span>
                </button>
                <div
                  className={`relative overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[min(28rem,80vh)]" : "max-h-0"
                  }`}
                >
                  <div className="border-t border-[var(--site-border)]/80 bg-[var(--site-bg)]/45 px-4 pb-4 pt-3">
                    <p className="text-[14px] leading-relaxed text-[var(--site-muted)]">{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Десктоп: прежний список */}
        <div className="hidden max-w-[800px] space-y-0 border-t border-[var(--site-border)] md:block">
          {faqs.map(({ q, a }, i) => (
            <div key={q} className="border-b border-[var(--site-border)] last:border-0">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="group flex w-full items-center justify-between gap-4 py-6 text-left transition-colors duration-200"
              >
                <span className="text-[16px] font-semibold text-[var(--site-text)] transition-colors duration-200 group-hover:lab-accent-text">
                  {q}
                </span>
                <span
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="lab-accent-text flex-shrink-0 text-xl transition-transform duration-200"
                >
                  {open === i ? "×" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-[min(28rem,80vh)] pb-6" : "max-h-0"
                }`}
              >
                <p className="text-[15px] leading-relaxed text-[var(--site-muted)]">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
