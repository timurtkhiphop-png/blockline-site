import { pricing } from "@/lib/siteCopy";

function accentTitle(full: string) {
  const dot = full.endsWith(".") ? "." : "";
  const core = dot ? full.slice(0, -1) : full;
  const words = core.trim().split(/\s+/);
  if (words.length < 2) {
    return <span className="text-[#00d4b8]">{full}</span>;
  }
  const last = words.pop() ?? "";
  const lead = words.join(" ");
  return (
    <>
      {lead}{" "}
      <span className="text-[#00d4b8]">
        {last}
        {dot}
      </span>
    </>
  );
}

function priceFigure(price: string) {
  return price.replace(/^от\s+/i, "");
}

export function PricingSection() {
  const pb = pricing.packagesBlock;
  const sb = pricing.standaloneBlock;

  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 bg-[#0c1a1a] px-6 py-24 md:px-12 md:py-32 xl:px-20"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 hidden items-center gap-3 md:flex">
          <div className="h-px w-8 bg-[rgba(0,212,184,0.35)]" />
          <span className="section-label">{pricing.label}</span>
        </div>
        <div className="mb-10 md:hidden">
          <span className="section-label">{pricing.label}</span>
        </div>

        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            data-reveal
            style={{ fontFamily: "var(--font-display), sans-serif" }}
            className="text-[clamp(32px,4vw,56px)] font-black leading-[1.05] tracking-[-0.03em] text-white"
          >
            {pricing.title.replace(".", "")}
            <span className="text-[#00d4b8]">.</span>
          </h2>
          <p className="max-w-[360px] pb-1 text-[14px] leading-[1.65] text-[#6b8e8a]">{pricing.sub}</p>
        </div>

        {/* База: лендинг + многостраничник */}
        <div className="mb-px grid grid-cols-1 gap-px border border-[rgba(0,212,184,0.08)] bg-[rgba(0,212,184,0.08)] md:grid-cols-2">
          {pricing.plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`group bg-[#0c1a1a] p-10 transition-colors duration-300 hover:bg-[#112020] ${
                i === 1
                  ? "border-t border-t-[#00d4b8] md:border-l md:border-t-0 md:border-l-[#00d4b8]"
                  : ""
              }`}
            >
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <span
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                    className="mb-3 block text-[11px] font-bold uppercase tracking-[0.1em] text-[#6b8e8a]"
                  >
                    {plan.name}
                  </span>
                  <div
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                    className="text-[48px] font-black leading-none tracking-[-0.04em] text-white"
                  >
                    {priceFigure(plan.price)}
                  </div>
                  <div className="mt-1 text-[13px] text-[#2e4d4a]">от</div>
                  <p className="mt-3 text-[13px] text-[#6b8e8a]">{plan.timeline}</p>
                </div>
                {i === 0 ? (
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    className="mt-1 flex-shrink-0 text-[rgba(0,212,184,0.25)] transition-colors duration-300 group-hover:text-[rgba(0,212,184,0.45)]"
                    aria-hidden
                  >
                    <rect x="6" y="4" width="28" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="12" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="12" y1="20" x2="24" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="12" y1="26" x2="20" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    className="mt-1 flex-shrink-0 text-[rgba(0,212,184,0.4)] transition-colors duration-300 group-hover:text-[rgba(0,212,184,0.65)]"
                    aria-hidden
                  >
                    <rect x="10" y="7" width="24" height="29" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="6" y="4" width="24" height="29" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="12" y1="14" x2="24" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="12" y1="19" x2="22" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </div>

              <ul className={`space-y-3 ${plan.note ? "mb-6" : "mb-10"}`}>
                {plan.features.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[13px] text-[#c8dbd8]">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#00d4b8]" />
                    {item}
                  </li>
                ))}
              </ul>

              {plan.note ? <p className="mb-8 text-[13px] leading-[1.65] text-[#2e4d4a]">{plan.note}</p> : null}

              <a
                href="#contact"
                className={`inline-flex h-[48px] items-center justify-center rounded-sm px-8 text-[13px] font-medium tracking-[0.04em] transition-all duration-200 hover:-translate-y-px ${
                  i === 0
                    ? "border border-[rgba(0,212,184,0.25)] text-[#00d4b8] hover:border-[rgba(0,212,184,0.6)]"
                    : "bg-[#00d4b8] text-[#020c0c] hover:opacity-85"
                }`}
              >
                {i === 0 ? "Обсудить лендинг" : "Обсудить проект"}
              </a>
            </div>
          ))}
        </div>

        {/* Сайт-визитка + интернет-магазин */}
        <div className="mt-20 md:mt-24">
          <div className="mb-8 md:mb-10">
            <span className="section-label">{pricing.extendedBlock.label}</span>
            <h3
              data-reveal
              style={{ fontFamily: "var(--font-display), sans-serif" }}
              className="mt-4 text-[clamp(26px,3vw,40px)] font-black leading-[1.1] tracking-[-0.03em] text-white"
            >
              {accentTitle(pricing.extendedBlock.title)}
            </h3>
            <p className="mt-3 max-w-[560px] text-[14px] leading-[1.65] text-[#6b8e8a]">{pricing.extendedBlock.sub}</p>
          </div>

          <div className="grid grid-cols-1 gap-px border border-[rgba(0,212,184,0.08)] bg-[rgba(0,212,184,0.08)] md:grid-cols-2">
            {pricing.extendedPlans.map((plan, i) => (
              <div
                key={plan.name}
                className={`group bg-[#060f0f] p-10 transition-colors duration-300 hover:bg-[#0c1414] ${
                  i === 1 ? "md:border-l md:border-l-[rgba(0,212,184,0.12)]" : ""
                }`}
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <span
                      style={{ fontFamily: "var(--font-display), sans-serif" }}
                      className="mb-3 block text-[11px] font-bold uppercase tracking-[0.1em] text-[#6b8e8a]"
                    >
                      {plan.name}
                    </span>
                    <div
                      style={{ fontFamily: "var(--font-display), sans-serif" }}
                      className="text-[40px] font-black leading-none tracking-[-0.04em] text-white md:text-[44px]"
                    >
                      {priceFigure(plan.price)}
                    </div>
                    <div className="mt-1 text-[13px] text-[#2e4d4a]">от</div>
                    <p className="mt-3 text-[13px] text-[#6b8e8a]">{plan.timeline}</p>
                  </div>
                </div>

                <ul className={`space-y-3 ${plan.note ? "mb-6" : "mb-8"}`}>
                  {plan.features.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[13px] leading-[1.55] text-[#c8dbd8]">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#00d4b8]" />
                      {item}
                    </li>
                  ))}
                </ul>

                {plan.note ? <p className="mb-8 text-[13px] leading-[1.65] text-[#2e4d4a]">{plan.note}</p> : null}

                <a
                  href="#contact"
                  className="inline-flex h-[44px] items-center justify-center rounded-sm border border-[rgba(0,212,184,0.25)] px-7 text-[12px] font-medium tracking-[0.04em] text-[#00d4b8] transition-all duration-200 hover:-translate-y-px hover:border-[rgba(0,212,184,0.55)]"
                >
                  {plan.cta ?? "Обсудить"}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Пакеты */}
        <div className="mt-20 md:mt-24">
          <div className="mb-10">
            <span className="section-label">{pb.heading}</span>
            <h3
              data-reveal
              style={{ fontFamily: "var(--font-display), sans-serif" }}
              className="mt-4 text-[clamp(26px,3vw,40px)] font-black leading-[1.1] tracking-[-0.03em] text-white"
            >
              {accentTitle(pb.title)}
            </h3>
            <p className="mt-3 max-w-[640px] text-[14px] leading-[1.65] text-[#6b8e8a]">{pb.sub}</p>
          </div>

          <div className="grid grid-cols-1 gap-px border border-[rgba(0,212,184,0.08)] bg-[rgba(0,212,184,0.08)] md:grid-cols-3">
            {pb.items.map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col bg-[#0c1a1a] p-8 transition-colors duration-300 hover:bg-[#112020] md:p-9"
              >
                <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#2e4d4a]">{pkg.tagline}</div>
                <h4
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                  className="mb-4 text-[20px] font-bold leading-[1.15] tracking-[-0.02em] text-white"
                >
                  {pkg.name}
                </h4>
                <div className="mb-1 flex flex-wrap items-baseline gap-2">
                  <span
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                    className="text-[32px] font-black tracking-[-0.03em] text-[#00d4b8]"
                  >
                    {priceFigure(pkg.price)}
                  </span>
                  <span className="text-[12px] text-[#2e4d4a]">от · {pkg.timeline}</span>
                </div>
                <ul className="mb-8 mt-6 flex flex-grow flex-col gap-2.5">
                  {pkg.includes.map((line) => (
                    <li key={line} className="flex gap-2 text-[13px] leading-[1.55] text-[#6b8e8a]">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#00d4b8]" />
                      {line}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-auto inline-flex h-[42px] items-center justify-center rounded-sm border border-[rgba(0,212,184,0.22)] text-[12px] font-medium tracking-[0.05em] text-[#c8dbd8] transition-all duration-200 hover:border-[rgba(0,212,184,0.5)] hover:text-[#00d4b8]"
                >
                  Запросить пакет
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Отдельные услуги */}
        <div className="mt-20 md:mt-24">
          <div className="mb-10">
            <span className="section-label">{sb.heading}</span>
            <h3
              data-reveal
              style={{ fontFamily: "var(--font-display), sans-serif" }}
              className="mt-4 text-[clamp(26px,3vw,40px)] font-black leading-[1.1] tracking-[-0.03em] text-white"
            >
              {accentTitle(sb.title)}
            </h3>
            <p className="mt-3 max-w-[640px] text-[14px] leading-[1.65] text-[#6b8e8a]">{sb.sub}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sb.groups.map((group) => (
              <div
                key={group.title}
                className="border border-[rgba(0,212,184,0.1)] bg-[#060f0f] p-8 transition-colors duration-300 hover:border-[rgba(0,212,184,0.18)]"
              >
                <h4
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                  className="mb-5 text-[13px] font-bold uppercase tracking-[0.08em] text-[#00d4b8]"
                >
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.items.map((row) => (
                    <li
                      key={row.name}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[rgba(0,212,184,0.06)] pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-[14px] leading-[1.5] text-[#c8dbd8]">{row.name}</span>
                      <span className="whitespace-nowrap text-[12px] text-[#2e4d4a]">{row.hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="#contact"
              className="inline-flex h-[44px] items-center justify-center rounded-sm border border-[rgba(0,212,184,0.25)] px-8 text-[12px] font-medium tracking-[0.06em] text-[#00d4b8] transition-all duration-200 hover:-translate-y-px hover:border-[rgba(0,212,184,0.55)]"
            >
              Уточнить услугу
            </a>
          </div>
        </div>

        <div className="group mt-16 border border-[rgba(0,212,184,0.08)] bg-[#060f0f] transition-colors duration-300 hover:bg-[#0c1a1a] md:mt-20">
          <div className="flex flex-col gap-6 px-10 py-8 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-6">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="mt-1 flex-shrink-0 text-[rgba(0,212,184,0.4)] transition-colors duration-300 group-hover:text-[rgba(0,212,184,0.7)]"
                aria-hidden
              >
                <circle cx="7" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="25" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="25" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" />
                <line
                  x1="11"
                  y1="14"
                  x2="21"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeOpacity=".6"
                />
                <line
                  x1="11"
                  y1="18"
                  x2="21"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeOpacity=".6"
                />
              </svg>
              <div>
                <span
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                  className="mb-3 block text-[13px] font-bold tracking-[-0.01em] text-white"
                >
                  {pricing.integrations.heading}
                </span>
                <ul className="space-y-2">
                  {pricing.integrations.items.map((line) => (
                    <li key={line} className="flex gap-2 text-[13px] leading-[1.6] text-[#6b8e8a]">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#00d4b8]" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex h-[40px] flex-shrink-0 items-center justify-center self-start whitespace-nowrap rounded-sm border border-[rgba(0,212,184,0.2)] px-6 text-[12px] font-medium tracking-[0.06em] text-[#6b8e8a] transition-all duration-200 hover:border-[rgba(0,212,184,0.5)] hover:text-[#00d4b8] md:mt-1"
            >
              Уточнить интеграции
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-[12px] text-[#2e4d4a]">{pricing.footnote}</p>
      </div>
    </section>
  );
}
