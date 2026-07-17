"use client";

import { cases, portfolioMeta, type Case } from "@/lib/projects";
import Link from "next/link";

function FeaturedCase({ c, index }: { c: Case, index: number }) {
  const url = `/projects/${c.id}`;

  return (
    <div className="group flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-10 lg:gap-12 items-start">
      {/* Image — 7 cols */}
      <Link
        href={url}
        className={`relative block overflow-hidden rounded-[4px] border border-white/[0.06] bg-[#080808] w-full ${
          index % 2 !== 0 ? "md:col-span-7 md:order-2" : "md:col-span-7"
        }`}
      >
        <div className="aspect-[16/9]">
          {c.image && (
            <picture>
              <source srcSet={c.image.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />
              <img
                src={c.image}
                alt={c.title ? `Скриншот сайта: ${c.title}` : ""}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                style={{ objectPosition: "center top" }}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
                decoding="async"
              />
            </picture>
          )}
        </div>
      </Link>

      {/* Content — 5 cols */}
      <div
        className={`flex flex-col w-full ${
          index % 2 !== 0 ? "md:col-span-5 md:order-1" : "md:col-span-5"
        } md:pt-4`}
      >
        <span
          style={{ fontFamily: "var(--font-mono)" }}
          className="hidden md:block text-[10px] uppercase tracking-[0.14em] text-white/40 mb-4"
        >
          {c.type}
        </span>

        <h3
          style={{ fontFamily: "var(--font-section-display), sans-serif" }}
          className="text-[26px] sm:text-[32px] lg:text-[36px] font-normal uppercase leading-[1.05] tracking-[0.02em] text-white mb-3 transition-colors duration-300 group-hover:text-[var(--site-accent)]"
        >
          {c.title}
        </h3>

        <p className="text-[14px] lg:text-[15px] leading-relaxed text-white/70 mb-5">
          {c.tagline}
        </p>

        {c.features && c.features.length > 0 && (
          <ul className="mb-6 md:mb-8 flex flex-col gap-[6px]">
            {c.features.slice(0, 2).map((f, i) => (
              <li
                key={f}
                className="flex items-start gap-2 text-[14px] text-white/55"
              >
                <span className="lab-accent-text mt-[5px] text-[8px] shrink-0">●</span>
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between border-t border-white/[0.06] pt-5 mt-auto">
          <Link
            href={url}
            className="inline-flex w-full md:w-auto items-center justify-between md:justify-start text-[14px] font-semibold text-white transition-colors duration-300 hover:text-[var(--site-accent)]"
          >
            Смотреть кейс <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  const featuredCases = cases.filter(c => c.featured && !c.locked);

  return (
    <section
      id="projects"
      className="relative scroll-mt-24 bg-[var(--site-bg)] px-6 py-20 md:px-12 md:py-28 xl:px-[48px]"
      aria-label="Избранные проекты"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* ── Section Header ── */}
        <div className="mb-10 hidden items-center gap-3 md:flex">
          <div className="lab-accent-rule shrink-0" />
          <span className="section-label">ИЗБРАННЫЕ ПРОЕКТЫ</span>
        </div>
        <div className="mb-10 md:hidden">
          <span className="section-label">ИЗБРАННЫЕ ПРОЕКТЫ</span>
        </div>

        <div className="mb-16 md:mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="text-[clamp(28px,5vw,56px)] max-w-[800px] font-normal uppercase leading-[1.05] tracking-[0.02em] text-[var(--site-text)]"
          >
            От атмосферы бренда до сложной бизнес-структуры<span className="lab-accent-text">.</span>
          </h2>
          <p className="max-w-[340px] pb-1 text-[14px] md:text-[15px] leading-relaxed text-[var(--site-muted)]">
            Каждый проект начинается с задачи бизнеса, а не с готового шаблона.
          </p>
        </div>

        {/* ── Cases Grid ── */}
        <div className="flex flex-col gap-16 md:gap-24">
          {featuredCases.map((c, idx) => (
            <FeaturedCase key={c.id} c={c} index={idx} />
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="mt-16 md:mt-24 flex items-center justify-center md:justify-start">
          <Link
            href="/projects"
            className="inline-flex h-12 md:h-14 items-center justify-center whitespace-nowrap rounded-[2px] border border-white/20 bg-white/5 px-8 md:px-10 text-[12px] md:text-[13px] uppercase tracking-[0.08em] text-white transition-all duration-300 hover:border-[var(--site-accent)] hover:bg-[var(--site-accent)] hover:text-[#080808]"
          >
            Смотреть все проекты →
          </Link>
        </div>
      </div>
    </section>
  );
}
