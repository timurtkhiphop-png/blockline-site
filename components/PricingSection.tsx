import { pricing } from "@/lib/siteCopy";

type AddonGroup = (typeof pricing.addons.groups)[number];

function AddonRows({ items }: { items: AddonGroup["items"] }) {
  return items.map((row) => (
    <li
      key={row.label}
      className="flex items-baseline justify-between gap-4 border-b border-[var(--site-border)] py-3 text-[14px] last:border-b-0"
    >
      <span className="min-w-0 text-[var(--site-text)]">{row.label}</span>
      <span style={{ fontFamily: "var(--font-mono)" }} className="flex-shrink-0 text-[13px] text-[var(--site-muted)]">
        {row.price}
      </span>
    </li>
  ));
}

function AddonCard({ group, splitWide = false }: { group: AddonGroup; splitWide?: boolean }) {
  const mid = Math.ceil(group.items.length / 2);
  const leftItems = group.items.slice(0, mid);
  const rightItems = group.items.slice(mid);

  return (
    <div className="flex h-full min-h-0 flex-col rounded-[2px] border border-[var(--site-border)] bg-[var(--site-bg)] p-5 md:p-6">
      <p
        style={{ fontFamily: "var(--font-mono)" }}
        className="mb-4 shrink-0 border-b border-[var(--site-border)] pb-3 text-[11px] uppercase tracking-[0.12em] text-[var(--site-muted)]"
      >
        {group.label}
      </p>
      {splitWide ? (
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
          <AddonRows items={group.items} />
        </ul>
      )}
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
    <section id="pricing" className="relative scroll-mt-24 bg-[var(--site-bg)] px-6 py-24 md:px-12 md:py-32 xl:px-[48px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 hidden items-center gap-3 md:flex">
          <div className="lab-accent-rule shrink-0" />
          <span className="section-label">{pricing.label}</span>
        </div>
        <div className="mb-10 md:hidden">
          <span className="section-label">{pricing.label}</span>
        </div>

        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-section-display), sans-serif" }}
            className="text-[clamp(32px,8vw,56px)] font-normal uppercase leading-[1.02] tracking-[0.02em] text-[var(--site-text)] md:text-[clamp(48px,6vw,96px)]"
          >
            {pricing.title.replace(".", "")}
            <span className="lab-accent-text">.</span>
          </h2>
          <p className="max-w-[380px] pb-1 text-[14px] leading-relaxed text-[var(--site-muted)]">{pricing.sub}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
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
                className="text-[clamp(36px,5vw,48px)] font-normal uppercase leading-none tracking-[0.02em] text-[var(--site-text)]"
              >
                {plan.price}
              </div>
              <p style={{ fontFamily: "var(--font-mono)" }} className="mt-3 text-[11px] text-[var(--site-muted)]">
                {plan.timeline}
              </p>
              <p className="mt-2 text-[14px] italic text-[var(--site-muted)]">{plan.description}</p>
              <ul className="mt-8 flex flex-1 flex-col space-y-3">
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

        <div data-reveal className="mt-14 rounded-[2px] border border-[var(--site-border)] bg-[var(--site-surface-2)] p-6 md:p-8 lg:p-10">
          <h3 style={{ fontFamily: "var(--font-mono)" }} className="mb-8 border-b border-[var(--site-border)] pb-4 text-[11px] uppercase tracking-[0.14em] text-[var(--site-muted)]">
            {pricing.addons.heading}
          </h3>

          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-6">
              <div className="flex flex-col gap-6 lg:col-span-3">
                {cms ? <AddonCard group={cms} /> : null}
                {content ? <AddonCard group={content} /> : null}
              </div>
              <div className="lg:col-span-4">{mods ? <AddonCard group={mods} /> : null}</div>
              <div className="lg:col-span-5">{integrations ? <AddonCard group={integrations} /> : null}</div>
            </div>

            {visual ? (
              <div className="border-t border-[var(--site-border)] pt-6 lg:pt-8">
                <AddonCard group={visual} splitWide />
              </div>
            ) : null}
          </div>
        </div>

        <p style={{ fontFamily: "var(--font-mono)" }} className="mt-10 text-center text-[11px] text-[var(--site-muted)]">
          {pricing.footnote}
        </p>
      </div>
    </section>
  );
}
