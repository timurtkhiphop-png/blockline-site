import { why } from "@/lib/siteCopy";

export function WhySection() {
  const [titleLead, titleAccent] = why.title.split(", ");

  return (
    <section id="why" className="relative scroll-mt-24 bg-[#060f0f] px-6 py-24 md:px-12 md:py-32 xl:px-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 hidden items-center gap-3 md:flex">
          <div className="h-px w-8 bg-[rgba(0,212,184,0.35)]" />
          <span className="section-label">{why.label}</span>
        </div>
        <div className="mb-10 md:hidden">
          <span className="section-label">{why.label}</span>
        </div>

        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
          <div data-reveal>
            <h2
              style={{ fontFamily: "var(--font-display), sans-serif" }}
              className="text-[clamp(32px,4vw,56px)] font-black leading-[1.05] tracking-[-0.03em] text-white"
            >
              {titleLead},{" "}
              <span className="text-[#00d4b8]">{titleAccent}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {why.blocks.map(({ num, heading, body }) => (
              <div
                key={num}
                data-reveal
                className="flex gap-6 border-b border-[rgba(0,212,184,0.08)] pb-8 last:border-0 last:pb-0"
              >
                <span
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                  className="flex-shrink-0 pt-1 text-[11px] font-normal text-[#2e4d4a]"
                >
                  {num}
                </span>
                <div>
                  <h3
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                    className="mb-2 text-[16px] font-bold tracking-[-0.01em] text-white"
                  >
                    {heading}
                  </h3>
                  <p className="text-[14px] leading-[1.7] text-[#6b8e8a]">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
