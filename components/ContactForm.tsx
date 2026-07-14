"use client";

import { useState } from "react";
import { brand } from "@/lib/content";
import { contact } from "@/lib/siteCopy";

function MaxIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className={className}>
      <path fill="currentColor" fillRule="evenodd" d="M50.76 0c27.53 0 49.12 22.34 49.12 49.89S77.61 99.23 51.02 99.23c-9.43 0-14.01-1.33-21.37-6.54-.5-.36-1.2-.26-1.63.19-5.66 6.04-20.17 10.28-20.83 2.03C7.19 80.53 0 71.18 0 49.61 0 21.3 23.22 0 50.76 0m.77 24.55c-13.07-.68-23.26 8.39-25.51 22.58-1.86 11.75 1.44 26.07 4.26 26.8 1.2.3 4.08-1.9 6.18-3.88.4-.37.99-.44 1.45-.15 3.27 2 6.97 3.5 11.05 3.71 13.42.7 25.3-9.8 26-23.21.71-13.42-10.01-25.14-23.43-25.85" clipRule="evenodd"/>
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

export function ContactForm() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(brand.email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/80" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[720px] text-center w-full">
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

        <p data-reveal className="mb-12 text-[16px] leading-relaxed text-[var(--site-muted)]">
          {contact.sub}
        </p>

        {/* ── Технологичная панель связи ── */}
        <div data-reveal className="mx-auto flex w-full max-w-[500px] flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
          
          {/* Telegram */}
          <a
            href={brand.telegram}
            target="_blank"
            rel="noreferrer"
            className="group flex h-14 w-full items-center justify-between rounded-xl bg-white px-6 transition-all hover:scale-[1.02] active:scale-100"
          >
            <span className="text-[15px] font-semibold text-black">Написать в Telegram</span>
            <span className="text-black transition-transform group-hover:translate-x-1">→</span>
          </a>

          {/* MAX Messenger */}
          <a
            href="https://max.ru/u/f9LHodD0cOImSQaNISqEJEH8sGjd_55FIifR1HcxtxRfob9EMSsmqsN3VEk"
            target="_blank"
            rel="noreferrer"
            className="group flex h-14 w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-6 transition-all hover:border-[var(--site-accent)] hover:bg-white/10 active:scale-95"
          >
            <div className="flex items-center gap-3">
              <MaxIcon className="h-5 w-5 text-white transition-colors group-hover:text-[var(--site-accent)]" />
              <span className="text-[15px] font-medium text-white group-hover:text-[var(--site-accent)] transition-colors">Написать в MAX</span>
            </div>
            <span className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-[var(--site-accent)]">→</span>
          </a>

          {/* Email Copy Block */}
          <button
            onClick={handleCopy}
            className="group mt-2 flex h-14 w-full items-center justify-between rounded-xl border border-dashed border-white/20 bg-transparent px-6 transition-all hover:border-[var(--site-accent)] hover:bg-[var(--site-accent)]/5 active:scale-95"
          >
            <div className="flex flex-col items-start">
              <span className="text-[10px] uppercase tracking-wider text-white/40">Электронная почта</span>
              <span className="text-[15px] font-medium text-white transition-colors group-hover:text-[var(--site-accent)]">{brand.email}</span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/50 transition-colors group-hover:bg-[var(--site-accent)] group-hover:text-black">
              {isCopied ? <CheckIcon /> : <CopyIcon />}
            </div>
          </button>
        </div>

        <p style={{ fontFamily: "var(--font-mono)" }} className="mt-8 text-[11px] text-[var(--site-muted)]">
          {contact.note}
        </p>
      </div>
    </section>
  );
}
