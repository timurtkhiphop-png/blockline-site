import type { Metadata } from "next";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cases, portfolioMeta, type Case } from "@/lib/projects";
import { brand } from "@/lib/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Проекты",
  description: "Кейсы и работы 8:20 LAB. Сайты для бизнеса под ключ.",
  openGraph: {
    title: `Проекты · ${brand.name}`,
    description: "Кейсы и работы 8:20 LAB. Сайты для бизнеса под ключ.",
    url: `https://${brand.domain}/projects`,
    siteName: brand.name,
    locale: "ru_RU",
    type: "website",
  }
};

/* ═══════════════════════════════════════════════
   1. FLAGSHIP
   ═══════════════════════════════════════════════ */
function FlagshipCase({ c }: { c: Case }) {
  const url = `/projects/${c.id}`;

  return (
    <div className="group">
      <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-[4px] border border-white/[0.06] bg-[#0a0a0a]">
        {/* Image — 8 cols */}
        <Link href={url} className="relative lg:col-span-8 block overflow-hidden">
          <div className="aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[520px]">
            {c.image && (
              <picture>
                <source srcSet={c.image.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />
                <img
                  src={c.image}
                  alt={c.title ? `Скриншот сайта: ${c.title}` : ""}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  style={{ objectPosition: "center" }}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            )}
          </div>
        </Link>

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
          </div>

          <div className="flex items-center justify-between border-t border-white/[0.06] pt-5">
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="hidden md:block text-[10px] text-white/30"
            >
              {c.stack}
            </span>
            <Link
              href={url}
              className="inline-flex w-full md:w-auto items-center justify-between md:justify-start text-[14px] font-semibold text-white transition-colors duration-300 hover:text-[var(--site-accent)]"
            >
              Смотреть кейс <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   2. EDITORIAL
   ═══════════════════════════════════════════════ */
function EditorialCase({ c, reversed = false }: { c: Case; reversed?: boolean }) {
  const url = `/projects/${c.id}`;

  return (
    <div className="group">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Image — 7 cols */}
        <Link
          href={url}
          className={`relative block overflow-hidden rounded-[4px] border border-white/[0.06] bg-[#080808] ${
            reversed ? "lg:col-span-7 lg:order-2" : "lg:col-span-7"
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
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                />
              </picture>
            )}
          </div>
        </Link>

        {/* Content — 5 cols */}
        <div
          className={`flex flex-col ${
            reversed ? "lg:col-span-5 lg:order-1" : "lg:col-span-5"
          } lg:pt-4 h-full`}
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

          <div className="flex items-center justify-between border-t border-white/[0.06] pt-5 mt-auto">
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="hidden md:block text-[10px] text-white/30"
            >
              {c.stack}
            </span>
            <Link
              href={url}
              className="inline-flex w-full md:w-auto items-center justify-between md:justify-start text-[14px] font-semibold text-white transition-colors duration-300 hover:text-[var(--site-accent)]"
            >
              Смотреть кейс <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   3. SECONDARY
   ═══════════════════════════════════════════════ */
function SecondaryCard({ c }: { c: Case }) {
  const url = `/projects/${c.id}`;

  return (
    <div className="group flex flex-col h-full">
      <Link
        href={url}
        className="relative block w-full overflow-hidden rounded-[4px] border border-white/[0.06] bg-[#080808] mb-6"
      >
        <div className="aspect-[16/9]">
          {c.image && (
            <picture>
              <source srcSet={c.image.replace(/\.(png|jpe?g)$/i, '.webp')} type="image/webp" />
              <img
                src={c.image}
                alt={c.title ? `Скриншот сайта: ${c.title}` : ""}
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
                fetchPriority="low"
                decoding="async"
              />
            </picture>
          )}
        </div>
      </Link>

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

      <p className="text-[14px] leading-relaxed text-white/60 mb-6">{c.tagline}</p>

      <Link
        href={url}
        className="mt-auto inline-flex w-full md:w-auto items-center justify-between md:justify-start text-[14px] font-semibold text-white transition-colors duration-300 hover:text-[var(--site-accent)]"
      >
        Смотреть кейс <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
      </Link>
    </div>
  );
}

export default function ProjectsPage() {
  const flagship = cases[0];
  const editorial1 = cases[1];
  const editorial2 = cases[2];
  const secondary = cases.slice(3);

  return (
    <>
      <Header />
      <main className="w-full min-w-0 pb-20 pt-32 lg:pt-40 bg-[var(--site-bg)]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 xl:px-[48px]">
          {/* ── Page Header ── */}
          <div className="mb-16 md:mb-24 max-w-4xl">
            <h1
              style={{ fontFamily: "var(--font-section-display), sans-serif" }}
              className="text-[clamp(40px,7vw,80px)] font-normal uppercase leading-[1.05] tracking-[0.02em] text-[var(--site-text)] mb-6"
            >
              {portfolioMeta.label}
              <span className="lab-accent-text">.</span>
            </h1>
            <p className="text-[16px] md:text-[20px] leading-relaxed text-[var(--site-muted)] max-w-[600px]">
              {portfolioMeta.title}
            </p>
          </div>

          {/* ── Cases Grid ── */}
          <div className="flex flex-col gap-20 md:gap-28">
            {/* 1. Flagship */}
            {flagship && !flagship.locked && <FlagshipCase c={flagship} />}

            {/* 2. Editorial 1 */}
            {editorial1 && !editorial1.locked && (
              <EditorialCase c={editorial1} reversed={false} />
            )}

            {/* 3. Editorial 2 */}
            {editorial2 && !editorial2.locked && (
              <EditorialCase c={editorial2} reversed={true} />
            )}

            {/* 4. Secondary */}
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
                  {secondary.map((c) => !c.locked && <SecondaryCard key={c.id} c={c} />)}
                </div>
              </div>
            )}
          </div>
          
          {/* ── Final CTA ── */}
          <div className="mt-32 md:mt-40 border-t border-[var(--site-border)] pt-20 pb-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <h2
                style={{ fontFamily: "var(--font-section-display), sans-serif" }}
                className="text-[32px] md:text-[48px] uppercase leading-tight mb-4"
              >
                Нужен проект?
              </h2>
              <p className="text-[15px] text-[var(--site-muted)] max-w-[400px]">
                Расскажите о бизнесе и задаче. Я посмотрю исходные данные и предложу подходящий формат.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex h-14 w-full md:w-auto items-center justify-center rounded-[2px] border border-[var(--site-accent)] px-8 text-[13px] uppercase tracking-[0.08em] text-[var(--site-accent)] transition-colors hover:bg-[var(--site-accent)] hover:text-[#080808]"
            >
              Получить оценку
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
