import { metrics } from "@/lib/siteCopy";

function counterAttr(m: (typeof metrics)[number]) {
  return `${m.value}${m.suffix}`;
}

/** Число анимируется отдельно (data-counter); суффикс (+, дн) — компактным кеглем. */
function MetricFigure({ m }: { m: (typeof metrics)[number] }) {
  const digitBlock = (
    <span
      data-counter={String(m.value)}
      style={{ fontFamily: "var(--font-section-display), sans-serif" }}
      className="inline-block shrink-0 tabular-nums text-[clamp(36px,6.5vw,64px)] font-normal leading-none tracking-[0.02em] md:text-[clamp(42px,5vw,72px)] lab-accent-text"
    >
      {m.value}
    </span>
  );

  if (!m.suffix) return digitBlock;

  return (
    <span className="inline-flex shrink-0 items-baseline gap-[0.15em] whitespace-nowrap">
      {digitBlock}
      <span
        style={{ fontFamily: "var(--font-mono)" }}
        className="translate-y-[-0.05em] text-[clamp(13px,2vw,17px)] font-medium tracking-[0.06em] opacity-90 lab-accent-text"
      >
        {m.suffix}
      </span>
    </span>
  );
}

export function ValueStrip() {
  return (
    <div className="border-y border-[var(--site-border)] bg-[var(--site-surface)]">
      <div className="mx-auto flex max-w-[1280px] flex-col divide-y divide-[var(--site-border)] px-6 md:flex-row md:divide-x md:divide-y-0 md:px-12 xl:px-[48px]">
        {metrics.map((m) => (
          <div
            key={counterAttr(m)}
            className="flex flex-1 flex-col gap-4 py-8 sm:flex-row sm:items-center sm:gap-5 md:min-h-[96px] md:py-6 md:pl-6 md:pr-6 lg:pl-8 lg:pr-8"
          >
            <MetricFigure m={m} />
            <div className="min-w-0 flex-1 sm:max-w-[min(100%,220px)]">
              <span
                style={{ fontFamily: "var(--font-mono)" }}
                className="mb-1 block text-[11px] uppercase tracking-[0.15em] text-[var(--site-muted)]"
              >
                {m.label}
              </span>
              <span className="block text-[13px] leading-snug text-[var(--site-muted)]">{m.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
