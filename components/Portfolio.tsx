"use client";

import type { CSSProperties } from "react";

import { brand } from "@/lib/content";
import { portfolioCases, portfolioMeta } from "@/lib/siteCopy";

export function Portfolio() {
  const titleParts = portfolioMeta.title.trim().match(/^(.+?)\s+(\S+)$/);
  const titleLead = titleParts?.[1] ?? portfolioMeta.title;
  const titleAccent = titleParts?.[2] ?? "";

  return (
    <section
      id="work"
      className="relative scroll-mt-24 bg-[#060f0f] px-6 py-24 md:px-12 md:py-32 xl:px-20"
      aria-label="Кейсы"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 hidden items-center gap-3 md:flex">
          <div className="h-px w-8 bg-[rgba(0,212,184,0.35)]" />
          <span className="section-label">{portfolioMeta.label}</span>
        </div>
        <div className="mb-10 md:hidden">
          <span className="section-label">{portfolioMeta.label}</span>
        </div>

        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-display), sans-serif" }}
            className="text-[clamp(32px,4vw,56px)] font-black leading-[1.05] tracking-[-0.03em] text-white"
          >
            {titleLead}{" "}
            <span className="text-[#00d4b8]">{titleAccent}</span>
          </h2>
          <p className="max-w-[320px] pb-1 text-[14px] leading-[1.6] text-[#6b8e8a]">{portfolioMeta.sub}</p>
        </div>

        <div className="flex flex-col gap-px border border-[rgba(0,212,184,0.08)] bg-[rgba(0,212,184,0.08)]">
          {portfolioCases.map(({ num, url, category, title, sub, task, result, tags, stack }, i) => (
            <a
              key={num}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              style={{ ["--delay" as string]: `${i * 0.08}s` } as CSSProperties}
              className="group grid cursor-pointer grid-cols-1 items-start gap-6 bg-[#060f0f] p-8 transition-colors duration-300 hover:bg-[#0c1a1a] md:grid-cols-[auto_1fr_1fr_auto] md:gap-10 md:p-10"
            >
              <div
                style={{ fontFamily: "var(--font-display), sans-serif" }}
                className="w-8 flex-shrink-0 pt-0.5 text-[11px] text-[#2e4d4a]"
              >
                {num}
              </div>

              <div>
                <span className="mb-3 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#00d4b8]">
                  {category}
                </span>
                <h3
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                  className="mb-1.5 text-[22px] font-black leading-[1.1] tracking-[-0.02em] text-white transition-colors duration-200 group-hover:text-[#00d4b8] md:text-[26px]"
                >
                  {title}
                </h3>
                <p className="text-[13px] text-[#6b8e8a]">{sub}</p>
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#2e4d4a]">
                    Задача
                  </span>
                  <p className="text-[13px] leading-[1.65] text-[#6b8e8a]">{task}</p>
                </div>
                <div>
                  <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.15em] text-[#2e4d4a]">
                    Решение
                  </span>
                  <p className="text-[13px] leading-[1.65] text-[#6b8e8a]">{result}</p>
                </div>
              </div>

              <div className="flex flex-shrink-0 flex-col items-end gap-4">
                <div className="flex flex-wrap justify-end gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="whitespace-nowrap rounded-sm border border-[rgba(0,212,184,0.12)] px-2.5 py-1 text-[11px] text-[#6b8e8a]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex translate-x-[-6px] items-center gap-2 text-[13px] text-[#00d4b8] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                  <span className="font-medium">Открыть сайт</span>
                  <span>→</span>
                </div>
                <span className="mt-auto text-[11px] text-[#2e4d4a]">{stack}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="max-w-[480px] text-[13px] leading-[1.65] text-[#2e4d4a]">
            {(() => {
              const needle = "Telegram-канале";
              const idx = portfolioMeta.emptyNote.indexOf(needle);
              if (idx === -1) return portfolioMeta.emptyNote;
              return (
                <>
                  {portfolioMeta.emptyNote.slice(0, idx)}
                  <a
                    href={brand.channel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6b8e8a] underline decoration-[rgba(0,212,184,0.35)] underline-offset-2 transition-colors hover:text-[#00d4b8]"
                  >
                    {needle}
                  </a>
                  {portfolioMeta.emptyNote.slice(idx + needle.length)}
                </>
              );
            })()}
          </p>
          <a
            href="#contact"
            className="inline-flex h-[44px] flex-shrink-0 items-center justify-center whitespace-nowrap rounded-sm border border-[rgba(0,212,184,0.25)] px-7 text-[12px] font-medium tracking-[0.06em] text-[#00d4b8] transition-all duration-200 hover:-translate-y-px hover:border-[rgba(0,212,184,0.6)]"
          >
            {portfolioMeta.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
