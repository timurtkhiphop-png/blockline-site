import Link from "next/link";
import { pricing } from "@/lib/siteCopy";

// ─── Компонент сетки форматов ─────────────────────────────────────────────────

function FormatCard({
  fmt,
  delay = 0,
}: {
  fmt: (typeof pricing.formats)[number];
  delay?: number;
}) {
  const isWide = fmt.wide;
  const hasPrice = !!fmt.priceNote;

  return (
    <div
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={`group relative flex flex-col gap-4 border border-[var(--site-border)] bg-[var(--site-surface)] p-6 transition-colors duration-300 hover:border-[var(--site-accent)]/30 md:p-8${
        isWide ? " col-span-1 md:col-span-2" : ""
      }`}
    >
      {/* Тонкая cyan-линия сверху при ховере */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 lab-accent-bg"
        aria-hidden
      />

      {/* Номер */}
      <span
        style={{ fontFamily: "var(--font-mono)" }}
        className="text-[11px] uppercase tracking-[0.18em] text-[var(--site-muted)] transition-colors duration-300 group-hover:lab-accent-text"
      >
        {fmt.num}
      </span>

      {/* Название + цена */}
      <div className={`flex flex-col gap-2${isWide ? " md:flex-row md:items-end md:justify-between md:gap-8" : ""}`}>
        <h3
          style={{ fontFamily: "var(--font-section-display), sans-serif" }}
          className={`font-normal uppercase leading-tight tracking-[0.02em] text-[var(--site-text)]${
            isWide
              ? " text-[clamp(20px,3vw,28px)]"
              : " text-[clamp(18px,2.5vw,24px)]"
          }`}
        >
          {fmt.name}
        </h3>

        {/* Цена */}
        <div className="flex items-baseline gap-1.5 flex-shrink-0">
          {hasPrice && (
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[11px] uppercase tracking-[0.12em] text-[var(--site-muted)]"
            >
              {fmt.priceNote}
            </span>
          )}
          <span
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className={`font-normal uppercase leading-none tracking-[0.02em]${
              isWide
                ? " text-[clamp(22px,3vw,32px)] text-[var(--site-muted)]"
                : " text-[clamp(26px,4vw,40px)] text-[var(--site-text)]"
            }`}
          >
            {hasPrice ? fmt.price.replace(/^от\s*/, "") : fmt.price}
          </span>
        </div>
      </div>

      {/* Описание */}
      <p className="text-[13px] leading-relaxed text-[var(--site-muted)] md:text-[14px]">
        {fmt.description}
      </p>
    </div>
  );
}

// ─── Основной компонент ───────────────────────────────────────────────────────

export function PricingSection() {
  const gridFormats = pricing.formats.filter((f) => !f.wide);
  const wideFormat = pricing.formats.find((f) => f.wide);

  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 bg-[var(--site-bg)] px-4 py-14 md:px-12 md:py-28 xl:px-[48px]"
    >
      {/* Верхний разделитель */}
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--site-border)]" aria-hidden />

      <div className="mx-auto max-w-[1280px]">

        {/* ── Eyebrow ─────────────────────────────────────────────────── */}
        <div className="mb-6 flex items-center gap-3 md:mb-10" data-reveal>
          <div className="lab-accent-rule shrink-0" />
          <span className="section-label">{pricing.eyebrow}</span>
        </div>

        {/* ── Заголовок + вводный текст ───────────────────────────────── */}
        <div className="mb-10 flex flex-col gap-5 md:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="text-[clamp(28px,8vw,72px)] font-normal uppercase leading-[1.04] tracking-[0.02em] text-[var(--site-text)] lg:max-w-[640px]"
          >
            {pricing.title}
            <br />
            <span className="lab-accent-text">{pricing.titleAccent}</span>
          </h2>
          <p
            data-reveal
            className="max-w-[440px] text-[13px] leading-relaxed text-[var(--site-muted)] md:text-[14px] lg:pb-1"
          >
            {pricing.sub}
          </p>
        </div>

        {/* ── Сетка форматов 2×2 ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-px bg-[var(--site-border)] md:grid-cols-2">
          {gridFormats.map((fmt, i) => (
            <FormatCard key={fmt.num} fmt={fmt} delay={i * 60} />
          ))}
          {/* Нестандартный проект — широкая строка */}
          {wideFormat && (
            <FormatCard fmt={wideFormat} delay={gridFormats.length * 60} />
          )}
        </div>

        {/* ── Что влияет на стоимость ─────────────────────────────────── */}
        <div
          data-reveal
          className="mt-8 border border-[var(--site-border)] bg-[var(--site-surface)] p-6 md:mt-10 md:p-8"
        >
          <p
            style={{ fontFamily: "var(--font-mono)" }}
            className="mb-5 text-[10px] uppercase tracking-[0.22em] text-[var(--site-muted)] md:mb-6 md:text-[11px]"
          >
            НА СТОИМОСТЬ ВЛИЯЮТ
          </p>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            {pricing.factors.map((factor) => (
              <li
                key={factor}
                className="flex items-baseline gap-3 border-b border-[var(--site-border)] py-2.5 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0 lg:[&:nth-last-child(3)]:border-b-0 md:py-3"
              >
                <span
                  className="mt-[5px] h-[3px] w-[3px] flex-shrink-0 rounded-full lab-accent-bg"
                  aria-hidden
                />
                <span className="text-[13px] leading-snug text-[var(--site-text)] md:text-[14px]">
                  {factor}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Честная формулировка ────────────────────────────────────── */}
        <div data-reveal className="mt-6 md:mt-8">
          <p
            style={{ fontFamily: "var(--font-mono)" }}
            className="max-w-[680px] text-[12px] leading-relaxed text-[var(--site-muted)] md:text-[13px]"
          >
            {pricing.clarification}
          </p>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <div data-reveal className="mt-8 flex flex-col items-start gap-3 md:mt-12">
          <Link
            href={pricing.ctaHref}
            className="inline-flex h-12 items-center justify-center rounded-[2px] lab-accent-bg px-8 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[#080808] transition-all duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-bg)] active:scale-[0.98] md:h-14 md:text-[13px]"
          >
            {pricing.cta}
          </Link>
          <p
            style={{ fontFamily: "var(--font-mono)" }}
            className="text-[11px] text-[var(--site-muted)]"
          >
            {pricing.ctaMicrocopy}
          </p>
        </div>

      </div>

      {/* Нижний разделитель */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--site-border)]" aria-hidden />
    </section>
  );
}
