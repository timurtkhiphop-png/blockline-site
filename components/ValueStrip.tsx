import { metrics } from "@/lib/siteCopy";

function counterAttr(m: (typeof metrics)[number]) {
  return `${m.value}${m.suffix}`;
}

/** Число анимируется отдельно (data-counter); суффикс (+, дн) — компактным кеглем. */
function MetricFigure({ m, compact }: { m: (typeof metrics)[number]; compact?: boolean }) {
  const digitBlock = (
    <span
      data-counter={String(m.value)}
      style={{ fontFamily: "var(--font-section-display), sans-serif" }}
      className={
        compact
          ? "inline-block shrink-0 tabular-nums text-[clamp(22px,5.5vw,32px)] font-normal leading-none tracking-[0.02em] lab-accent-text"
          : "inline-block shrink-0 tabular-nums text-[clamp(36px,6.5vw,64px)] font-normal leading-none tracking-[0.02em] md:text-[clamp(42px,5vw,72px)] lab-accent-text"
      }
    >
      {m.value}
    </span>
  );

  if (!m.suffix) return digitBlock;

  return (
    <span className="inline-flex shrink-0 items-baseline gap-[0.12em] whitespace-nowrap">
      {digitBlock}
      <span
        style={{ fontFamily: "var(--font-mono)" }}
        className={
          compact
            ? "translate-y-[-0.04em] text-[11px] font-medium tracking-[0.06em] opacity-90 lab-accent-text"
            : "translate-y-[-0.05em] text-[clamp(13px,2vw,17px)] font-medium tracking-[0.06em] opacity-90 lab-accent-text"
        }
      >
        {m.suffix}
      </span>
    </span>
  );
}

export function ValueStrip() {
  return (
    <div className="border-y border-[var(--site-border)] bg-[var(--site-surface)]">
      {/* Мобилка: одна линия — три метрики с вертикальными разделителями */}
      <div className="mx-auto flex max-w-[1280px] items-stretch divide-x divide-[var(--site-border)] px-2 py-4 md:hidden">
        {metrics.map((m) => (
          <div
            key={counterAttr(m)}
            className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1.5 px-1.5 py-1 text-center first:pl-2 last:pr-2"
          >
            <MetricFigure m={m} compact />
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="block max-w-[100%] truncate text-[9px] uppercase leading-tight tracking-[0.14em] text-[var(--site-muted)]"
            >
              {m.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mx-auto hidden max-w-[1280px] flex-col divide-y divide-[var(--site-border)] px-6 md:flex md:flex-row md:divide-x md:divide-y-0 md:px-12 xl:px-[48px]">
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
