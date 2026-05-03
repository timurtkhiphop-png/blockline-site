import type { CSSProperties } from "react";

import { process as processCopy } from "@/lib/siteCopy";

export function ProcessSimple() {
  const [titleL1, titleL2] = processCopy.title.split("\n");

  return (
    <section id="process" className="relative scroll-mt-24 bg-[#0c1a1a] px-6 py-24 md:px-12 md:py-32 xl:px-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 hidden items-center gap-3 md:flex">
          <div className="h-px w-8 bg-[rgba(0,212,184,0.35)]" />
          <span className="section-label">{processCopy.label}</span>
        </div>
        <div className="mb-10 md:hidden">
          <span className="section-label">{processCopy.label}</span>
        </div>

        <div className="mb-16 flex flex-col items-start gap-12 md:flex-row md:gap-16">
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-display), sans-serif" }}
            className="text-[clamp(32px,4vw,56px)] font-black leading-[1.05] tracking-[-0.03em] text-white md:max-w-[480px]"
          >
            {titleL1}
            <br />
            <span className="text-[#00d4b8]">{titleL2}</span>
          </h2>
          <p data-reveal className="max-w-[360px] text-[15px] leading-[1.75] text-[#6b8e8a] md:pt-2">
            {processCopy.sub}
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-0 right-0 top-[28px] hidden h-px md:block"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(0,212,184,0.35) 50%, transparent 50%)",
              backgroundSize: "8px 1px",
            }}
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {processCopy.steps.map(({ num, heading, body }, i) => (
              <div
                key={num}
                data-reveal
                style={{ ["--delay" as string]: `${i * 0.1}s` } as CSSProperties}
                className="relative pt-12 md:pt-14"
              >
                <div className="absolute left-0 top-[22px] hidden h-3 w-3 rounded-full border border-[#00d4b8] bg-[#0c1a1a] md:block" />
                <div className="absolute left-[5px] top-[28px] hidden h-6 w-px bg-[rgba(0,212,184,0.35)] md:block" />

                <div
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                  className="mb-4 text-[40px] font-black leading-none tracking-[-0.04em] text-[#2e4d4a]"
                >
                  {num}
                </div>
                <h3
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                  className="mb-3 text-[16px] font-bold tracking-[-0.01em] text-white"
                >
                  {heading}
                </h3>
                <p className="text-[14px] leading-[1.7] text-[#6b8e8a]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
