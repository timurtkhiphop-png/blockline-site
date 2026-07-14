import { valueFacts, valueStripFrame } from "@/lib/siteCopy";

export function ValueStrip() {
  return (
    <section className="border-y border-[var(--site-border)] bg-[var(--site-surface)]">
      <div className="mx-auto max-w-[1280px] px-4 py-14 md:px-12 md:py-24 xl:px-[48px]">
        {/* Смысловая рамка — продолжает Hero и задаёт секции характер */}
        <p
          style={{ fontFamily: "var(--font-mono)" }}
          className="mb-11 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-[var(--site-muted)] md:mb-16 md:text-[12px]"
        >
          {valueStripFrame.map((word, i) => (
            <span key={word} className="flex items-center gap-x-4">
              {i > 0 && <span aria-hidden className="h-3 w-px bg-[var(--site-border)]" />}
              {word}
            </span>
          ))}
        </p>

        <div className="grid divide-y divide-[var(--site-border)] md:grid-cols-3 md:divide-x md:divide-y-0">
          {valueFacts.map((fact, i) => (
            <div
              key={fact.title}
              className="group flex flex-col py-9 first:pt-0 last:pb-0 md:px-10 md:py-0 md:first:pl-0 md:last:pr-0"
            >
              <div className="flex items-center gap-4">
                <span
                  style={{ fontFamily: "var(--font-section-display), sans-serif" }}
                  className="text-[26px] font-normal leading-none opacity-90 transition-opacity duration-300 lab-accent-text group-hover:opacity-100 md:text-[28px]"
                >
                  0{i + 1}
                </span>
                <span
                  aria-hidden
                  className="h-px w-8 origin-left opacity-60 transition-all duration-300 ease-out lab-accent-bg group-hover:w-[52px] group-hover:opacity-100"
                />
              </div>

              <span
                style={{ fontFamily: "var(--font-section-display), sans-serif" }}
                className="mt-7 block text-[21px] font-normal leading-[1.25] text-[var(--site-text)] transition-transform duration-300 ease-out group-hover:translate-x-[3px] md:text-[23px] lg:text-[25px]"
              >
                {fact.title}
              </span>

              <p className="mt-3.5 max-w-[380px] text-[14px] leading-[1.6] text-[var(--site-muted)] md:text-[15px]">
                {fact.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
