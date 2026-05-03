"use client";

import { useState } from "react";

import { faqs } from "@/lib/siteCopy";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative scroll-mt-24 bg-[#0c1a1a] px-6 py-24 md:px-12 md:py-32 xl:px-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 hidden items-center gap-3 md:flex">
          <div className="h-px w-8 bg-[rgba(0,212,184,0.35)]" />
          <span className="section-label">ВОПРОСЫ</span>
        </div>
        <div className="mb-10 md:hidden">
          <span className="section-label">ВОПРОСЫ</span>
        </div>

        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-display), sans-serif" }}
            className="text-[clamp(32px,4vw,56px)] font-black leading-[1.05] tracking-[-0.03em] text-white"
          >
            Часто
            <br />
            спрашивают
          </h2>

          <div className="space-y-0">
            {faqs.map(({ q, a }, i) => (
              <div key={q} className="border-b border-[rgba(0,212,184,0.1)] last:border-0">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="group flex w-full items-center justify-between gap-4 py-6 text-left transition-colors duration-200 hover:text-[#00d4b8]"
                >
                  <span className="text-[15px] font-medium text-white transition-colors duration-200 group-hover:text-[#00d4b8]">
                    {q}
                  </span>
                  <span
                    className={`flex-shrink-0 text-xl text-[#00d4b8] transition-transform duration-200 ${
                      open === i ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === i ? "max-h-[min(28rem,80vh)] pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-[14px] leading-[1.75] text-[#6b8e8a]">{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
