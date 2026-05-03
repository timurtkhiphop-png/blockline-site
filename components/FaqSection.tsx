"use client";

import { useState } from "react";

import { faqs } from "@/lib/siteCopy";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative scroll-mt-24 bg-[var(--site-surface)] px-6 py-24 md:px-12 md:py-32 xl:px-[48px]">
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-12 md:mb-16">
          <div className="mb-8 hidden items-center gap-3 md:flex">
            <div className="lab-accent-rule shrink-0" />
            <span className="section-label">Вопросы</span>
          </div>
          <div className="mb-8 md:hidden">
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

        <div className="max-w-[800px] space-y-0 border-t border-[var(--site-border)]">
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
