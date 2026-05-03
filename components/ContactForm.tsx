import { brand } from "@/lib/content";
import { contactCopy } from "@/lib/siteCopy";

export function ContactForm() {
  const [contactLead, contactAccent] = contactCopy.title.split(" — ");

  return (
    <section
      id="contact"
      className="relative flex min-h-[80vh] scroll-mt-24 items-center justify-center overflow-hidden bg-[#020c0c] px-6 py-24 md:px-12"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(0,212,184,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,212,184,0.3)] to-transparent" />

      <div className="relative z-10 mx-auto max-w-[640px] text-center">
        <span className="section-label mb-8 inline-flex justify-center after:hidden">{contactCopy.label}</span>

        <h2
          data-reveal
          style={{ fontFamily: "var(--font-display), sans-serif" }}
          className="mb-6 text-[clamp(36px,5vw,72px)] font-black leading-[1.0] tracking-[-0.04em] text-white"
        >
          {contactLead} —{" "}
          <span className="text-[#00d4b8]">{contactAccent}</span>
        </h2>

        <p data-reveal className="mb-10 text-[16px] leading-[1.75] text-[#6b8e8a]">
          {contactCopy.sub}
        </p>

        <div data-reveal className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={brand.telegram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-[56px] items-center justify-center rounded-sm bg-[#00d4b8] px-10 text-[14px] font-medium tracking-[0.04em] text-[#020c0c] transition-all duration-200 hover:-translate-y-[2px] hover:opacity-85"
          >
            {contactCopy.primaryBtn}
          </a>
          <a
            href={`mailto:${brand.email}`}
            className="inline-flex h-[56px] items-center justify-center rounded-sm border border-[rgba(0,212,184,0.25)] px-10 text-[14px] font-medium tracking-[0.04em] text-[#00d4b8] transition-all duration-200 hover:-translate-y-[2px] hover:border-[rgba(0,212,184,0.6)]"
          >
            {contactCopy.secondaryBtn}
          </a>
        </div>

        <p className="mt-8 text-[13px] text-[#2e4d4a]">{contactCopy.note}</p>
      </div>
    </section>
  );
}
