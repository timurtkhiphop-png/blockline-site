import { why } from "@/lib/siteCopy";

export function WhySection() {
  const [line1, line2] = why.title.split("\n");

  return (
    <section id="why" className="relative scroll-mt-24 bg-[var(--site-bg)] px-6 py-24 md:px-12 md:py-32 xl:px-[48px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 hidden items-center gap-3 md:flex">
          <div className="lab-accent-rule shrink-0" />
          <span className="section-label">{why.label}</span>
        </div>
        <div className="mb-10 md:hidden">
          <span className="section-label">{why.label}</span>
        </div>

        <div data-reveal className="mb-14">
          <h2
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="max-w-[920px] text-[clamp(32px,8vw,56px)] font-normal uppercase leading-[1.02] tracking-[0.02em] text-[var(--site-text)] md:text-[clamp(48px,6vw,96px)] md:leading-[0.98]"
          >
            {line1}
            <br />
            <span className="lab-accent-text">{line2}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-8">
          {why.blocks.map(({ num, heading, body }) => (
            <div
              key={num}
              data-reveal
              className="group border-t border-[var(--site-border)] pt-8 transition-[border-color] duration-300 hover:border-[var(--site-accent)]"
            >
              <span style={{ fontFamily: "var(--font-mono)" }} className="lab-accent-text mb-4 block text-[13px]">
                {num}
              </span>
              <h3 className="mb-3 text-[18px] font-semibold leading-snug text-[var(--site-text)]">{heading}</h3>
              <p className="text-[15px] leading-relaxed text-[var(--site-muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
