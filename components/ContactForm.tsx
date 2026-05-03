import { brand } from "@/lib/content";
import { contact } from "@/lib/siteCopy";

export function ContactForm() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[80vh] scroll-mt-24 items-center justify-center overflow-hidden border-t border-[var(--site-border)] px-6 py-24 md:px-12"
    >
      <video
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      >
        <source src="/bg-loop.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/75" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[720px] text-center">
        <span className="section-label mb-8 inline-flex justify-center after:hidden">{contact.label}</span>

        <h2 data-reveal className="mb-4 flex flex-col items-center gap-0">
          <span
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="block text-[clamp(48px,10vw,120px)] font-normal uppercase leading-[0.92] tracking-[0.02em] text-[var(--site-text)]"
          >
            {contact.title}
          </span>
          <span
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="lab-accent-text block text-[clamp(48px,10vw,120px)] font-normal uppercase leading-[0.92] tracking-[0.02em]"
          >
            {contact.titleAccent}
          </span>
        </h2>

        <p data-reveal className="mb-10 text-[16px] leading-relaxed text-[var(--site-muted)]">
          {contact.sub}
        </p>

        <div data-reveal className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={brand.telegram}
            target="_blank"
            rel="noreferrer"
            className="lab-accent-bg inline-flex h-[56px] min-w-[220px] items-center justify-center rounded-[2px] px-10 text-[14px] font-medium tracking-[0.04em] text-[#080808] transition-[filter] hover:brightness-110 active:scale-[0.97]"
          >
            {contact.primaryBtn}
          </a>
          <a
            href={`mailto:${brand.email}`}
            className="inline-flex h-[56px] min-w-[220px] items-center justify-center rounded-[2px] border border-[var(--site-border)] px-10 text-[14px] font-medium tracking-[0.04em] text-[var(--site-text)] transition-colors hover:border-[var(--site-accent)] hover:lab-accent-text active:scale-[0.97]"
          >
            {contact.secondaryBtn}
          </a>
        </div>

        <p style={{ fontFamily: "var(--font-mono)" }} className="mt-8 text-[11px] text-[var(--site-muted)]">
          {contact.note}
        </p>
      </div>
    </section>
  );
}
