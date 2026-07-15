"use client";

import { cases, portfolioMeta, type Case } from "@/lib/siteCopy";

/* ═══════════════════════════════════════════════
   1. FLAGSHIP — Hookah Ministry
   Desktop: image 8 cols + content 4 cols (side-by-side card)
   Mobile: image on top, content below
   ═══════════════════════════════════════════════ */
function FlagshipCase({ c }: { c: Case }) {
  const url = c.url ?? "#";

  return (
    <div className="group">
      <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-[4px] border border-white/[0.06] bg-[#0a0a0a]">
        {/* Image — 8 cols */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative lg:col-span-8 block overflow-hidden"
        >
          <div className="aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[520px]">
            {c.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.image}
                alt={c.title ? `Скриншот сайта: ${c.title}` : ""}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                style={{ objectPosition: "center" }}
                loading="eager"
                decoding="async"
              />
            )}
          </div>
        </a>

        {/* Content — 4 cols */}
        <div className="lg:col-span-4 flex flex-col justify-between p-7 sm:p-8 lg:p-10 xl:p-12">
          <div>
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="hidden md:block text-[10px] uppercase tracking-[0.14em] text-white/40 mb-6"
            >
              {c.type}
            </span>

            <h3
              style={{ fontFamily: "var(--font-section-display), sans-serif" }}
              className="text-[32px] sm:text-[36px] lg:text-[40px] font-normal uppercase leading-[1] tracking-[0.02em] text-white mb-4 transition-colors duration-300 group-hover:text-[var(--site-accent)]"
            >
              {c.title}
            </h3>

            <p className="text-[14px] lg:text-[15px] leading-relaxed text-white/60 mb-6 md:mb-8">
              {c.tagline}
            </p>

            <div className="mb-4 md:mb-5">
              <span
                style={{ fontFamily: "var(--font-mono)" }}
                className="text-[10px] uppercase tracking-[0.14em] lab-accent-text mb-1 md:mb-2 block"
              >
                Задача
              </span>
              <p className="text-[14px] leading-relaxed text-white/75">{c.task}</p>
            </div>

            <div className="mb-6 md:mb-8">
              <span
                style={{ fontFamily: "var(--font-mono)" }}
                className="text-[10px] uppercase tracking-[0.14em] lab-accent-text mb-1 md:mb-2 block"
              >
                Решение
              </span>
              <p className="text-[14px] leading-relaxed text-white/75">{c.solution}</p>
            </div>

            {c.features && c.features.length > 0 && (
              <ul className="mb-8 flex flex-col gap-[6px]">
                {c.features.map((f, i) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2 text-[14px] text-white/55 ${i > 2 ? 'hidden md:flex' : ''}`}
                  >
                    <span className="lab-accent-text mt-[5px] text-[8px] shrink-0">●</span>
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.06] pt-5">
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="hidden md:block text-[10px] text-white/30"
            >
              {c.stack}
            </span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full md:w-auto items-center justify-between md:justify-start text-[14px] font-semibold text-white transition-colors duration-300 hover:text-[var(--site-accent)]"
            >
              Открыть проект <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   2. EDITORIAL — Астротех / Fortuna
   Desktop: 7 cols image + 5 cols text, or mirrored
   ═══════════════════════════════════════════════ */
function EditorialCase({ c, reversed = false }: { c: Case; reversed?: boolean }) {
  const url = c.url ?? "#";

  return (
    <div className="group">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Image — 7 cols */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative block overflow-hidden rounded-[4px] border border-white/[0.06] bg-[#080808] ${
            reversed ? "lg:col-span-7 lg:order-2" : "lg:col-span-7"
          }`}
        >
          <div className="aspect-[16/9]">
            {c.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.image}
                alt={c.title ? `Скриншот сайта: ${c.title}` : ""}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                style={{ objectPosition: "center top" }}
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        </a>

        {/* Content — 5 cols */}
        <div
          className={`flex flex-col ${
            reversed ? "lg:col-span-5 lg:order-1" : "lg:col-span-5"
          } lg:pt-4`}
        >
          <span
            style={{ fontFamily: "var(--font-mono)" }}
            className="hidden md:block text-[10px] uppercase tracking-[0.14em] text-white/40 mb-5"
          >
            {c.type}
          </span>

          <h3
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="text-[28px] sm:text-[32px] lg:text-[36px] font-normal uppercase leading-[1.05] tracking-[0.02em] text-white mb-3 transition-colors duration-300 group-hover:text-[var(--site-accent)]"
          >
            {c.title}
          </h3>

          <p className="text-[14px] lg:text-[15px] leading-relaxed text-white/60 mb-6 md:mb-8">
            {c.tagline}
          </p>

          <div className="mb-4 md:mb-5">
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[10px] uppercase tracking-[0.14em] lab-accent-text mb-1 md:mb-2 block"
            >
              Задача
            </span>
            <p className="text-[14px] leading-relaxed text-white/75">{c.task}</p>
          </div>

          <div className="mb-6">
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[10px] uppercase tracking-[0.14em] lab-accent-text mb-1 md:mb-2 block"
            >
              Решение
            </span>
            <p className="text-[14px] leading-relaxed text-white/75">{c.solution}</p>
          </div>

          {c.features && c.features.length > 0 && (
            <ul className="mb-8 flex flex-col gap-[6px]">
              {c.features.map((f, i) => (
                <li
                  key={f}
                  className={`flex items-start gap-2 text-[14px] text-white/55 ${i > 2 ? 'hidden md:flex' : ''}`}
                >
                  <span className="lab-accent-text mt-[5px] text-[8px] shrink-0">●</span>
                  {f}
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center justify-between border-t border-white/[0.06] pt-5 mt-auto">
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="hidden md:block text-[10px] text-white/30"
            >
              {c.stack}
            </span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full md:w-auto items-center justify-between md:justify-start text-[14px] font-semibold text-white transition-colors duration-300 hover:text-[var(--site-accent)]"
            >
              Смотреть проект <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   3. SECONDARY — DA REMONT / OCEAN
   Desktop: two equal wide cards side-by-side
   ═══════════════════════════════════════════════ */
function SecondaryCard({ c }: { c: Case }) {
  const url = c.url ?? "#";

  return (
    <div className="group flex flex-col">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full overflow-hidden rounded-[4px] border border-white/[0.06] bg-[#080808] mb-6"
      >
        <div className="aspect-[16/9]">
          {c.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={c.image}
              alt={c.title ? `Скриншот сайта: ${c.title}` : ""}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      </a>

      <span
        style={{ fontFamily: "var(--font-mono)" }}
        className="hidden md:block text-[10px] uppercase tracking-[0.12em] text-white/40 mb-3"
      >
        {c.type}
      </span>

      <h3
        style={{ fontFamily: "var(--font-section-display), sans-serif" }}
        className="text-[26px] sm:text-[28px] font-normal uppercase leading-[1.05] tracking-[0.02em] text-white mb-3 transition-colors duration-300 group-hover:text-[var(--site-accent)]"
      >
        {c.title}
      </h3>

      <p className="text-[14px] leading-relaxed text-white/60 mb-6">{c.task}</p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex w-full md:w-auto items-center justify-between md:justify-start text-[14px] font-semibold text-white transition-colors duration-300 hover:text-[var(--site-accent)]"
      >
        Открыть проект <span className="ml-2">→</span>
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */
export function Portfolio() {
  const flagship = cases[0]; // Hookah Ministry
  const editorial1 = cases[1]; // Астротех
  const editorial2 = cases[2]; // Fortuna Turgoyak
  const secondary = cases.slice(3); // DA REMONT, OCEAN

  return (
    <section
      id="work"
      className="relative scroll-mt-24 bg-[var(--site-bg)] px-6 py-24 md:px-12 md:py-32 xl:px-[48px]"
      aria-label="Избранные проекты"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* ── Section Header ── */}
        <div className="mb-10 hidden items-center gap-3 md:flex">
          <div className="lab-accent-rule shrink-0" />
          <span className="section-label">{portfolioMeta.label}</span>
        </div>
        <div className="mb-10 md:hidden">
          <span className="section-label">{portfolioMeta.label}</span>
        </div>

        <div className="mb-16 md:mb-24 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="text-[clamp(28px,5vw,56px)] max-w-[800px] font-normal uppercase leading-[1.05] tracking-[0.02em] text-[var(--site-text)]"
          >
            {portfolioMeta.title.replace(".", "")}
            <span className="lab-accent-text">.</span>
          </h2>
          <p className="max-w-[340px] pb-1 text-[14px] md:text-[15px] leading-relaxed text-[var(--site-muted)]">
            {portfolioMeta.sub}
          </p>
        </div>

        {/* ── Cases Grid ── */}
        <div className="flex flex-col gap-20 md:gap-28">
          {/* 1. Flagship — Hookah Ministry */}
          {flagship && !flagship.locked && <FlagshipCase c={flagship} />}

          {/* 2. Астротех — image left, text right */}
          {editorial1 && !editorial1.locked && (
            <EditorialCase c={editorial1} reversed={false} />
          )}

          {/* 3. Fortuna — text left, image right (mirror) */}
          {editorial2 && !editorial2.locked && (
            <EditorialCase c={editorial2} reversed={true} />
          )}

          {/* 4. Secondary — DA REMONT + OCEAN */}
          {secondary.length > 0 && (
            <div>
              <div className="mb-10 flex items-center gap-3">
                <div className="lab-accent-rule shrink-0" />
                <span
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-[10px] uppercase tracking-[0.14em] text-white/40"
                >
                  Ещё проекты
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                {secondary.map(
                  (c) =>
                    !c.locked && <SecondaryCard key={c.id} c={c} />
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="mt-20 md:mt-28 flex flex-col items-start justify-between gap-6 border-t border-[var(--site-border)] pt-10 md:flex-row md:items-center">
          <p className="max-w-[520px] text-[13px] leading-relaxed text-[var(--site-muted)]">
            {portfolioMeta.channelNote}{" "}
            <a
              href={portfolioMeta.channelHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--site-text)] underline decoration-[var(--site-accent)] underline-offset-4 transition-colors hover:text-[var(--site-accent)]"
            >
              {portfolioMeta.channelLabel}
            </a>
            .
          </p>
          <a
            href="#contact"
            className="inline-flex h-11 flex-shrink-0 items-center justify-center whitespace-nowrap rounded-[2px] border border-[var(--site-accent)] px-8 text-[12px] uppercase tracking-[0.06em] text-[var(--site-accent)] transition-colors hover:bg-[var(--site-accent)] hover:text-[#080808]"
          >
            {portfolioMeta.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
