import { offer, offerCards, type OfferCard } from "@/lib/siteCopy";

function CardIcon({ id }: { id: OfferCard["id"] }) {
  if (id === "web") {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#00d4b8" strokeWidth="1.5" aria-hidden>
        <rect x="3" y="5" width="26" height="18" rx="2" />
        <rect x="7" y="9" width="18" height="10" rx="1" strokeOpacity=".5" />
        <line x1="11" y1="27" x2="21" y2="27" />
        <line x1="16" y1="23" x2="16" y2="27" />
      </svg>
    );
  }
  if (id === "visual") {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#00d4b8" strokeWidth="1.5" aria-hidden>
        <circle cx="16" cy="16" r="11" />
        <circle cx="16" cy="16" r="4" strokeOpacity=".5" />
        <line x1="16" y1="5" x2="16" y2="8" />
        <line x1="16" y1="24" x2="16" y2="27" />
      </svg>
    );
  }
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#00d4b8" strokeWidth="1.5" aria-hidden>
      <circle cx="16" cy="6" r="3" />
      <circle cx="6" cy="24" r="3" />
      <circle cx="26" cy="24" r="3" />
      <line x1="16" y1="9" x2="9" y2="21" strokeOpacity=".5" />
      <line x1="16" y1="9" x2="23" y2="21" strokeOpacity=".5" />
      <line x1="9" y1="24" x2="23" y2="24" strokeOpacity=".5" />
    </svg>
  );
}

export function OfferSection() {
  const [titleL1, titleL2] = offer.title.split("\n");

  return (
    <section id="product" className="relative scroll-mt-24 bg-[#0c1a1a] px-6 py-24 md:px-12 md:py-32 xl:px-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 hidden items-center gap-3 md:flex">
          <div className="h-px w-8 bg-[rgba(0,212,184,0.35)]" />
          <span className="section-label">{offer.label}</span>
        </div>
        <div className="mb-10 md:hidden">
          <span className="section-label">{offer.label}</span>
        </div>

        <div data-reveal className="mb-8">
          <h2
            style={{ fontFamily: "var(--font-display), sans-serif" }}
            className="max-w-[560px] text-[clamp(32px,4vw,56px)] font-black leading-[1.05] tracking-[-0.03em] text-white"
          >
            {titleL1}
            <br />
            <span className="text-[#00d4b8]">{titleL2}</span>
          </h2>
          <p className="mt-6 max-w-[640px] text-[15px] leading-[1.65] text-[#6b8e8a]">{offer.sub}</p>
        </div>

        <div className="grid grid-cols-1 gap-px border border-[rgba(0,212,184,0.08)] bg-[rgba(0,212,184,0.08)] md:grid-cols-3">
          {offerCards.map((card) => (
            <div
              key={card.id}
              className="group cursor-default bg-[#0c1a1a] p-10 transition-colors duration-300 hover:bg-[#112020]"
            >
              <div className="mb-7 text-[10px] font-medium tracking-[0.18em] text-[#2e4d4a]">{card.label}</div>
              <div className="mb-5">
                <CardIcon id={card.id} />
              </div>
              <h3
                style={{ fontFamily: "var(--font-display), sans-serif" }}
                className="mb-4 text-[18px] font-bold leading-[1.2] tracking-[-0.02em] text-white"
              >
                {card.heading}
              </h3>
              <p className="mb-6 text-[14px] leading-[1.7] text-[#6b8e8a]">{card.body}</p>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-[rgba(0,212,184,0.2)] px-2.5 py-1 text-[11px] tracking-[0.06em] text-[#00d4b8]"
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
