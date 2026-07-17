import { valueSection } from "@/lib/siteCopy";

export function ValueSection() {
  return (
    <section className="relative bg-[var(--site-bg)] px-4 py-16 md:px-12 md:py-32 xl:px-[48px]">
      <div className="mx-auto max-w-[1280px]">
        {/* Eyebrow */}
        <div className="mb-6 hidden items-center gap-3 md:mb-12 md:flex">
          <div className="lab-accent-rule shrink-0" />
          <span className="section-label">{valueSection.eyebrow}</span>
        </div>
        <div className="mb-8 md:hidden">
          <span className="section-label">{valueSection.eyebrow}</span>
        </div>

        {/* Desktop: Asymmetric composition */}
        <div className="flex flex-col gap-10 md:gap-14 lg:flex-row lg:gap-24">
          
          {/* Left side: Titles */}
          <div className="lg:w-5/12 lg:flex-shrink-0" data-reveal>
            <h2
              style={{ fontFamily: "var(--font-section-display), sans-serif" }}
              className="mb-6 text-[clamp(28px,7vw,48px)] font-normal uppercase leading-[1.05] tracking-[0.02em] text-[var(--site-text)] md:text-[52px]"
            >
              {valueSection.title}
              <br />
              <span className="lab-accent-text">{valueSection.titleAccent}</span>
            </h2>
            <p className="max-w-[480px] text-[14px] leading-relaxed text-[var(--site-muted)] md:text-[16px]">
              {valueSection.sub}
            </p>
          </div>

          {/* Right side: Points */}
          <div className="flex flex-col gap-5 lg:w-7/12 lg:pt-2 md:gap-8">
            {valueSection.points.map((point, i) => (
              <div
                key={i}
                data-reveal
                className="group relative border-t border-[var(--site-border)] pt-5 transition-[border-color] duration-300 hover:border-[var(--site-accent)] md:pt-8 touch-pan-y"
              >
                <div className="flex gap-4 md:gap-6">
                  {/* Number marker */}
                  <div 
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--site-border)] bg-[var(--site-surface-2)] text-[10px] font-medium text-[var(--site-muted)] transition-colors duration-300 group-hover:border-[var(--site-accent)] group-hover:text-[var(--site-accent)] md:h-9 md:w-9 md:text-[12px]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    0{i + 1}
                  </div>
                  
                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="mb-2.5 text-[16px] font-semibold leading-tight text-[var(--site-text)] md:mb-3 md:text-[20px]">
                      {point.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[var(--site-muted)] md:text-[15px]">
                      {point.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
