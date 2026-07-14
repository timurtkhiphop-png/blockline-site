"use client";

import { useState } from "react";

import { pricing } from "@/lib/siteCopy";

type AddonGroup = (typeof pricing.addons.groups)[number];

function AddonRows({ items, compact }: { items: AddonGroup["items"]; compact?: boolean }) {
  return items.map((row) => (
    <li
      key={row.label}
      className={`flex items-baseline justify-between gap-3 border-b border-[var(--site-border)] last:border-b-0 ${
        compact ? "py-2.5 text-[13px]" : "py-3 text-[14px]"
      }`}
    >
      <span className="min-w-0 text-[var(--site-text)]">{row.label}</span>
      <span
        style={{ fontFamily: "var(--font-mono)" }}
        className={`whitespace-nowrap flex-shrink-0 text-[var(--site-muted)] ${compact ? "text-[12px]" : "text-[13px]"}`}
      >
        {row.price}
      </span>
    </li>
  ));
}

function AddonMobileAccordion({ groups }: { groups: AddonGroup[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-[var(--site-border)] lg:hidden">
      {groups.map((g, i) => (
        <div key={g.label} className="border-b border-[var(--site-border)] last:border-b-0">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="group flex w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-200 hover:bg-[var(--site-bg)]/30"
            aria-expanded={open === i}
          >
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[11px] uppercase tracking-[0.14em] text-[var(--site-text)] transition-colors group-hover:lab-accent-text"
            >
              {g.label}
            </span>
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="lab-accent-text flex-shrink-0 text-xl transition-transform duration-200"
            >
              {open === i ? "×" : "+"}
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              open === i ? "max-h-[min(36rem,80vh)] pb-4" : "max-h-0"
            }`}
          >
            <ul className="flex flex-col border-t border-[var(--site-border)]/60 bg-[var(--site-bg)]/40 pt-3">
              <AddonRows items={g.items} compact />
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function AddonCard({ group, splitWide = false, compact }: { group: AddonGroup; splitWide?: boolean; compact?: boolean }) {
  const mid = Math.ceil(group.items.length / 2);
  const leftItems = group.items.slice(0, mid);
  const rightItems = group.items.slice(mid);
  const pad = compact ? "p-4" : "p-5 md:p-6";

  return (
    <div className={`flex h-full min-h-0 flex-col rounded-[2px] border border-[var(--site-border)] bg-[var(--site-bg)] ${pad}`}>
      <p
        style={{ fontFamily: "var(--font-mono)" }}
        className={`shrink-0 border-b border-[var(--site-border)] text-[var(--site-muted)] ${
          compact ? "mb-3 pb-2 text-[10px] uppercase tracking-[0.14em]" : "mb-4 pb-3 text-[11px] uppercase tracking-[0.12em]"
        }`}
      >
        {group.label}
      </p>
      {splitWide && !compact ? (
        <div className="grid flex-1 grid-cols-1 gap-x-10 gap-y-0 md:grid-cols-2 lg:gap-x-14">
          <ul className="flex flex-col">
            <AddonRows items={leftItems} />
          </ul>
          <ul className="flex flex-col">
            <AddonRows items={rightItems} />
          </ul>
        </div>
      ) : (
        <ul className="flex flex-1 flex-col">
          <AddonRows items={group.items} compact={compact} />
        </ul>
      )}
    </div>
  );
}

function MobilePlanCard({
  plan,
  idx,
}: {
  plan: (typeof pricing.plans)[number];
  idx: number;
}) {
  return (
    <div
      data-reveal
      className={`relative w-[85vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-[6px] border ${
        plan.highlight
          ? "border-transparent bg-[var(--site-surface)] shadow-[0_0_0_1px_rgba(0,255,255,0.2),inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "border-[var(--site-border)] bg-[var(--site-surface)]"
      }`}
    >
      {plan.highlight ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            background: "linear-gradient(135deg, var(--site-accent-from), var(--site-accent-to))",
          }}
          aria-hidden
        />
      ) : null}
      <div className="relative p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-[10px] uppercase tracking-[0.16em] text-[var(--site-muted)]"
            >
              {String(idx + 1).padStart(2, "0")} · {plan.name}
            </span>
            <div
              style={{ fontFamily: "var(--font-section-display), sans-serif" }}
              className="mt-1.5 whitespace-nowrap text-[clamp(28px,8vw,40px)] font-normal uppercase leading-none tracking-[0.02em] text-[var(--site-text)]"
            >
              {plan.price}
            </div>
          </div>
          {plan.highlight ? (
            <span
              style={{ fontFamily: "var(--font-mono)" }}
              className="shrink-0 rounded-[4px] border border-[var(--site-accent)]/40 bg-[var(--site-bg)]/80 px-2 py-1 text-[9px] uppercase tracking-[0.12em] lab-accent-text"
            >
              Выбор
            </span>
          ) : null}
        </div>
        <p style={{ fontFamily: "var(--font-mono)" }} className="mt-2 text-[11px] text-[var(--site-muted)]">
          {plan.timeline}
        </p>
        <p className="mt-1 text-[13px] leading-snug text-[var(--site-muted)]">{plan.description}</p>
        <ul className="mt-4 mb-6 space-y-2.5 border-t border-[var(--site-border)]/80 pt-4">
          {plan.features.map((item) => (
            <li key={item} className="flex gap-2.5 text-[13px] leading-snug text-[var(--site-text)]">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full lab-accent-bg" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="mt-4 flex h-11 w-full items-center justify-center rounded-[4px] text-[13px] font-medium text-[var(--site-text)] transition-colors active:scale-[0.98]"
          style={{
            border: "1px solid color-mix(in srgb, var(--site-accent) 35%, var(--site-border))",
            background: "color-mix(in srgb, var(--site-surface-2) 92%, transparent)",
          }}
        >
          {plan.cta}
        </a>
      </div>
    </div>
  );
}

export function PricingSection() {
  const addonByLabel = Object.fromEntries(pricing.addons.groups.map((g) => [g.label, g])) as Record<string, AddonGroup>;
  const cms = addonByLabel["CMS"];
  const integrations = addonByLabel["Интеграции"];
  const mods = addonByLabel["Доработки"];
  const visual = addonByLabel["Визуал и упаковка"];
  const content = addonByLabel["Контент"];

  return (
    <section id="pricing" className="relative scroll-mt-24 bg-[var(--site-bg)] px-4 py-12 md:px-12 md:py-32 xl:px-[48px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-6 hidden items-center gap-3 md:mb-10 md:flex">
          <div className="lab-accent-rule shrink-0" />
          <span className="section-label">{pricing.label}</span>
        </div>
        <div className="mb-6 md:mb-10 md:hidden">
          <span className="section-label">{pricing.label}</span>
        </div>

        <div className="mb-8 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-6">
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="text-[clamp(28px,9vw,56px)] font-normal uppercase leading-[1.02] tracking-[0.02em] text-[var(--site-text)] md:text-[clamp(48px,6vw,96px)]"
          >
            {pricing.title.replace(".", "")}
            <span className="lab-accent-text">.</span>
          </h2>
          <p className="max-w-[380px] text-[13px] leading-relaxed text-[var(--site-muted)] md:text-[14px]">{pricing.sub}</p>
        </div>

        {/* Мобилка: горизонтальный свайп */}
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-8 pt-2 snap-x snap-mandatory no-scrollbar md:hidden">
          {pricing.plans.map((plan, idx) => (
            <MobilePlanCard key={plan.id} plan={plan} idx={idx} />
          ))}
        </div>

        <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-2 lg:grid-cols-2 xl:gap-8 md:items-stretch">
          {pricing.plans.map((plan) => (
            <div
              key={plan.id}
              data-reveal
              className={`relative flex h-full flex-col rounded-[2px] p-8 md:p-9 ${
                plan.highlight ? "lab-accent-plan-highlight" : "border border-[var(--site-border)] bg-[var(--site-surface)]"
              }`}
            >
              {plan.highlight ? (
                <span
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="lab-accent-bg absolute right-4 top-4 rounded-[2px] px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-[#080808]"
                >
                  ВЫБОР
                </span>
              ) : null}
              <span className="mb-4 block text-[16px] font-semibold uppercase tracking-[0.06em] text-[var(--site-muted)]">{plan.name}</span>
              <div
                style={{ fontFamily: "var(--font-section-display), sans-serif" }}
                className="text-[clamp(32px,4vw,48px)] font-normal uppercase leading-none tracking-[0.02em] text-[var(--site-text)] whitespace-nowrap"
              >
                {plan.price}
              </div>
              <p style={{ fontFamily: "var(--font-mono)" }} className="mt-3 text-[11px] text-[var(--site-muted)]">
                {plan.timeline}
              </p>
              <p className="mt-2 text-[14px] italic text-[var(--site-muted)]">{plan.description}</p>
              <ul className="mt-8 mb-8 flex flex-1 flex-col space-y-3">
                {plan.features.map((item) => (
                  <li key={item} className="flex gap-3 text-[14px] leading-snug text-[var(--site-text)]">
                    <span style={{ fontFamily: "var(--font-mono)" }} className="lab-accent-text mt-0.5 flex-shrink-0 text-[12px]">
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-auto inline-flex h-11 w-full items-center justify-center rounded-[2px] border border-[var(--site-border)] text-[13px] text-[var(--site-text)] transition-colors hover:border-[var(--site-accent)] hover:lab-accent-text active:scale-[0.97]"
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-8 rounded-[6px] border border-[var(--site-border)] bg-[var(--site-surface-2)] p-4 md:mt-14 md:rounded-[2px] md:p-8 lg:p-10">
          <h3 style={{ fontFamily: "var(--font-mono)" }} className="mb-5 border-b border-[var(--site-border)] pb-3 text-[10px] uppercase tracking-[0.16em] text-[var(--site-muted)] md:mb-8 md:pb-4 md:text-[11px] md:tracking-[0.14em]">
            {pricing.addons.heading}
          </h3>

          <div className="flex flex-col gap-4 md:gap-8">
            <div className="hidden grid-cols-1 items-stretch gap-6 lg:grid lg:grid-cols-12 lg:gap-6">
              <div className="flex flex-col gap-6 lg:col-span-3">
                {cms ? <AddonCard group={cms} /> : null}
                {content ? <AddonCard group={content} /> : null}
              </div>
              <div className="lg:col-span-4">{mods ? <AddonCard group={mods} /> : null}</div>
              <div className="lg:col-span-5">{integrations ? <AddonCard group={integrations} /> : null}</div>
            </div>

            <AddonMobileAccordion
              groups={
                [cms, content, mods, integrations, visual].filter(
                  (g): g is AddonGroup => g != null
                )
              }
            />

            {visual ? (
              <div className="hidden border-t border-[var(--site-border)] pt-6 lg:block md:pt-8">
                <AddonCard group={visual} splitWide />
              </div>
            ) : null}
          </div>
        </div>

        <p style={{ fontFamily: "var(--font-mono)" }} className="mt-6 text-center text-[10px] leading-relaxed text-[var(--site-muted)] md:mt-10 md:text-[11px]">
          {pricing.footnote}
        </p>
      </div>
    </section>
  );
}
