import { metrics } from "@/lib/siteCopy";

/** Совпадает с логикой анимации: суффикс после цифр, для «14 дн» — пробел перед «дн». */
function counterKey(m: (typeof metrics)[number]) {
  return m.unit ? `${m.value} ${m.unit}` : m.value;
}

export function ValueStrip() {
  return (
    <div className="border-y border-[rgba(0,212,184,0.1)] bg-[#060f0f]">
      <div className="mx-auto flex max-w-[1280px] flex-col divide-y divide-[rgba(0,212,184,0.1)] px-6 md:flex-row md:divide-x md:divide-y-0 md:px-12 xl:px-20">
        {metrics.map((m) => (
          <div
            key={counterKey(m)}
            className="flex flex-1 items-center gap-5 px-8 py-6 md:h-[88px] md:py-0"
          >
            <span
              data-counter={counterKey(m)}
              style={{ fontFamily: "var(--font-display), sans-serif" }}
              className="text-[40px] font-black leading-none tracking-[-0.04em] text-[#00d4b8]"
            >
              {counterKey(m)}
            </span>
            <div className="min-w-0 max-w-[200px] text-[13px] leading-[1.4] text-[#6b8e8a]">
              <span className="block font-medium text-[#c8dbd8]">{m.label}</span>
              <span className="block text-[#6b8e8a]">{m.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
