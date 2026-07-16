"use client";

import { useState } from "react";

import { faqs } from "@/lib/siteCopy";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative scroll-mt-24 bg-[var(--site-bg)] px-4 py-12 md:px-12 md:py-32 xl:px-[48px]"
    >
      <div className="mx-auto max-w-[1280px]">
        <header className="mb-10 md:mb-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="lab-accent-rule shrink-0" />
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

        <div className="mx-auto max-w-[800px] ml-0 border-t border-[var(--site-border)]" data-reveal>
          {faqs.map(({ id, question, answer }, i) => {
            const isOpen = open === i;
            const btnId = `faq-btn-${id}`;
            const panelId = `faq-panel-${id}`;

            return (
              <div key={id} className="border-b border-[var(--site-border)] last:border-0">
                <button
                  type="button"
                  id={btnId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-start justify-between gap-4 py-5 md:py-6 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)]"
                >
                  <div className="flex items-start gap-4 md:gap-6 lg:gap-8">
                    <span
                      style={{ fontFamily: "var(--font-mono)" }}
                      className="mt-[2px] md:mt-[3px] w-[20px] md:w-[24px] shrink-0 text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-[var(--site-muted)] group-hover:text-[var(--site-text)] transition-colors duration-200"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] md:text-[17px] font-medium leading-snug text-[var(--site-text)] transition-colors duration-200 group-hover:lab-accent-text">
                      {question}
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="lab-accent-text shrink-0 text-xl leading-none transition-transform duration-200 md:text-2xl mt-0.5 md:mt-0"
                  >
                    {isOpen ? "×" : "+"}
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[min(40rem,100vh)] pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex items-start gap-4 md:gap-6 lg:gap-8">
                    <span className="w-[20px] md:w-[24px] shrink-0" aria-hidden="true" />
                    <p className="max-w-[640px] text-[14px] md:text-[15px] leading-relaxed text-[var(--site-muted)]">
                      {answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

