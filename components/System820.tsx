import { system820 } from "@/lib/siteCopy";

export function System820() {
  return (
    <section id="process" className="relative scroll-mt-24 bg-[var(--site-surface)] px-4 py-16 md:px-12 md:py-32 xl:px-[48px]">
      <div className="mx-auto max-w-[1280px]">
        {/* Eyebrow Mobile */}
        <div className="mb-8 md:hidden">
          <span className="section-label">{system820.eyebrow}</span>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-24">
          
          {/* Left Column (Sticky on Desktop) */}
          <div className="lg:sticky lg:top-32 lg:w-5/12 lg:flex-shrink-0" data-reveal>
            {/* Eyebrow Desktop */}
            <div className="mb-10 hidden items-center gap-3 md:flex">
              <div className="lab-accent-rule shrink-0" />
              <span className="section-label">{system820.eyebrow}</span>
            </div>
            
            <h2
              style={{ fontFamily: "var(--font-section-display), sans-serif" }}
              className="mb-5 max-w-[320px] text-[26px] font-normal uppercase leading-[1.1] tracking-[0.02em] text-[var(--site-text)] md:mb-6 md:max-w-none md:text-[42px] md:leading-[1.05] lg:text-[46px]"
            >
              {system820.title}
            </h2>
            <p className="max-w-[440px] text-[14px] leading-relaxed text-[var(--site-muted)] md:text-[16px]">
              {system820.intro}
            </p>
          </div>

          {/* Right Column (Steps) */}
          <div className="flex flex-col lg:w-7/12">
            
            <div className="relative flex flex-col">
              {/* Unified Timeline Line */}
              <div className="absolute bottom-12 left-[7.5px] top-4 w-px bg-[var(--site-border)] md:bottom-16 md:left-[11.5px] md:top-5" />

              {/* Steps */}
              {system820.steps.map((step) => (
                <div key={step.num} data-reveal className="group relative flex gap-5 pb-7 md:gap-8 md:pb-12">
                  
                  {/* Marker */}
                  <div className="relative z-10 mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--site-surface)] md:mt-2.5 md:h-6 md:w-6">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--site-border)] transition-colors duration-300 group-hover:bg-[var(--site-accent)] md:h-2 md:w-2" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <span style={{ fontFamily: "var(--font-mono)" }} className="mb-2.5 block text-[11px] font-medium text-[var(--site-muted)] transition-colors duration-300 group-hover:text-[var(--site-accent)] md:mb-3 md:text-[13px]">
                      {step.num}
                    </span>
                    
                    <div className="overflow-hidden rounded-[8px] border border-[var(--site-border)] bg-[var(--site-bg)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-colors duration-300 group-hover:border-[var(--site-accent)]/50 md:p-7">
                      <h3 className="mb-2 text-[15px] font-semibold tracking-[0.02em] text-[var(--site-text)] md:mb-3 md:text-[17px]">
                        {step.heading}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-[var(--site-muted)] md:text-[15px]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Final Thought */}
              <div data-reveal className="group relative flex gap-5 md:gap-8">
                {/* Accent Marker */}
                <div className="relative z-10 mt-3 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--site-surface)] md:mt-4 md:h-6 md:w-6">
                  <div className="h-2 w-2 rounded-full bg-[var(--site-accent)] ring-[3px] ring-[var(--site-accent)]/20 md:h-2.5 md:w-2.5 md:ring-4" />
                </div>

                <div className="flex-1">
                  <div className="overflow-hidden rounded-[8px] border border-[var(--site-accent)]/30 bg-[var(--site-bg)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-colors duration-300 hover:border-[var(--site-accent)]/60 md:p-8">
                    <p className="mb-2 text-[14px] font-medium text-[var(--site-text)] md:mb-3 md:text-[16px]">
                      {system820.final}
                    </p>
                    <p className="text-[12px] text-[var(--site-muted)] md:text-[14px]">
                      {system820.note}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
