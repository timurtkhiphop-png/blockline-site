import { why } from "@/lib/siteCopy";

type WhyBlock = (typeof why.blocks)[number];

function WhyBlockMobile({ block, isLast }: { block: WhyBlock; isLast: boolean }) {
  return (
    <article data-reveal className="relative flex gap-3">
      <div className="flex w-9 shrink-0 flex-col items-center pt-0.5">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--site-border)] bg-[var(--site-surface-2)] text-[11px] font-semibold tabular-nums lab-accent-text ring-1 ring-white/10"
          style={{ fontFamily: "var(--font-mono)" }}
          aria-hidden
        >
          {block.num}
        </div>
        {!isLast ? (
          <div
            className="mt-1 min-h-[1.25rem] w-px flex-1 bg-gradient-to-b from-[var(--site-border)] to-transparent"
            aria-hidden
          />
        ) : null}
      </div>
      <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-5"}`}>
        <div className="overflow-hidden rounded-[8px] border border-[var(--site-border)] bg-[var(--site-surface)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <span
            style={{ fontFamily: "var(--font-mono)" }}
            className="mb-2 block text-[10px] uppercase tracking-[0.16em] text-[var(--site-muted)]"
          >
            Принцип
          </span>
          <h3 className="text-[17px] font-semibold leading-snug text-[var(--site-text)]">{block.heading}</h3>
          <p className="mt-2.5 text-[13px] leading-relaxed text-[var(--site-muted)]">{block.body}</p>
        </div>
      </div>
    </article>
  );
}

function WhyBlockDesktop({ block }: { block: WhyBlock }) {
  return (
    <div
      data-reveal
      className="group border-t border-[var(--site-border)] pt-8 transition-[border-color] duration-300 hover:border-[var(--site-accent)]"
    >
      <span style={{ fontFamily: "var(--font-mono)" }} className="lab-accent-text mb-4 block text-[13px]">
        {block.num}
      </span>
      <h3 className="mb-3 text-[18px] font-semibold leading-snug text-[var(--site-text)]">{block.heading}</h3>
      <p className="text-[15px] leading-relaxed text-[var(--site-muted)]">{block.body}</p>
    </div>
  );
}

export function WhySection() {
  const [line1, line2] = why.title.split("\n");

  return (
    <section id="why" className="relative scroll-mt-24 bg-[var(--site-bg)] px-4 py-12 md:px-12 md:py-32 xl:px-[48px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-6 hidden items-center gap-3 md:mb-10 md:flex">
          <div className="lab-accent-rule shrink-0" />
          <span className="section-label">{why.label}</span>
        </div>
        <div className="mb-6 md:mb-10 md:hidden">
          <span className="section-label">{why.label}</span>
        </div>

        <div data-reveal className="mb-8 md:mb-14">
          <h2
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="max-w-[920px] text-[clamp(28px,9vw,56px)] font-normal uppercase leading-[1.02] tracking-[0.02em] text-[var(--site-text)] md:text-[clamp(48px,6vw,96px)] md:leading-[0.98]"
          >
            {line1}
            <br />
            <span className="lab-accent-text">{line2}</span>
          </h2>
        </div>

        <div className="flex flex-col md:hidden">
          {why.blocks.map((block, i) => (
            <WhyBlockMobile key={block.num} block={block} isLast={i === why.blocks.length - 1} />
          ))}
        </div>

        <div className="hidden grid-cols-1 gap-0 md:grid md:grid-cols-3 md:gap-8">
          {why.blocks.map((block) => (
            <WhyBlockDesktop key={block.num} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}
