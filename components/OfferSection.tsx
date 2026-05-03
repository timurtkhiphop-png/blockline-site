import { offer, offerCards } from "@/lib/siteCopy";

export function OfferSection() {
  const [titleL1, titleL2] = offer.title.split("\n");

  return (
    <section id="product" className="relative scroll-mt-24 bg-[var(--site-surface)] px-6 py-24 md:px-12 md:py-32 xl:px-[48px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 hidden items-center gap-3 md:flex">
          <div className="lab-accent-rule shrink-0" />
          <span className="section-label">{offer.label}</span>
        </div>
        <div className="mb-10 md:hidden">
          <span className="section-label">{offer.label}</span>
        </div>

        <div data-reveal className="mb-12">
          <h2
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="max-w-[720px] text-[clamp(32px,8vw,56px)] font-normal uppercase leading-[1.02] tracking-[0.02em] text-[var(--site-text)] md:text-[clamp(48px,6vw,96px)]"
          >
            {titleL1}
            <br />
            <span className="lab-accent-text">{titleL2}</span>
          </h2>
          <p className="mt-6 max-w-[640px] text-[15px] leading-relaxed text-[var(--site-muted)]">{offer.sub}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {offerCards.map((card) => (
            <div
              key={card.num}
              data-reveal
              className="group relative min-w-0 overflow-hidden rounded-[2px] border border-[var(--site-border)] bg-[var(--site-surface)] p-8 transition-all duration-300 hover:-translate-y-1 lab-accent-border-hover md:p-9"
            >
              <div className="mb-8 flex min-w-0 items-start justify-between gap-3">
                <span
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="min-w-0 flex-1 text-balance break-words text-[10px] uppercase leading-snug tracking-[0.14em] text-[var(--site-muted)]"
                >
                  {card.category}
                </span>
                <span
                  style={{ fontFamily: "var(--font-section-display), sans-serif" }}
                  className="pointer-events-none shrink-0 text-[80px] leading-none text-[var(--site-text)] opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.12]"
                  aria-hidden
                >
                  {card.num}
                </span>
              </div>
              <h3
                style={{ fontFamily: "var(--font-section-display), sans-serif" }}
                className="mb-4 max-w-full break-words text-[clamp(26px,4vw,36px)] font-normal uppercase leading-[1.05] tracking-[0.02em] text-[var(--site-text)]"
              >
                {card.heading}
              </h3>
              <p className="mb-7 min-w-0 text-pretty break-words text-[15px] leading-relaxed text-[var(--site-muted)]">
                {card.body}
              </p>
              <div className="flex min-w-0 flex-wrap gap-2">
                {card.tags.map((t) => (
                  <span
                    key={t}
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="max-w-full break-words rounded-[2px] border border-[var(--site-border)] bg-[var(--site-surface-2)] px-2 py-[3px] text-[10px] uppercase leading-snug tracking-[0.06em] text-[var(--site-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
