import Image from "next/image";
import Link from "next/link";

export function FounderSection() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-[var(--site-bg)] px-4 py-12 md:px-12 md:py-32 xl:px-[48px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-20">
          
          {/* Left Column (Image) */}
          <div className="lg:w-5/12" data-reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px] border border-[var(--site-border)]/50 shadow-sm md:rounded-[24px]">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[var(--site-bg)]/30 via-transparent to-transparent" />
              <Image
                src="/images/timur-temirov.webp"
                alt="Тимур Темиров — основатель 8:20 LAB"
                fill
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                style={{ objectPosition: "42% center" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
          </div>

          {/* Right Column (Text) */}
          <div className="flex flex-col lg:w-7/12 lg:pl-4">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3 md:mb-10" data-reveal>
              <div className="lab-accent-rule shrink-0" />
              <span className="section-label">ОСНОВАТЕЛЬ 8:20 LAB</span>
            </div>

            <div className="space-y-6 md:space-y-8" data-reveal>
              <div>
                <h2
                  style={{ fontFamily: "var(--font-section-display), sans-serif" }}
                  className="mb-4 text-[30px] font-normal uppercase leading-[1.1] tracking-[0.02em] text-[var(--site-text)] md:mb-6 md:text-[42px] md:leading-[1.05] lg:text-[46px]"
                >
                  Один человек отвечает за весь проект.
                </h2>
                <div className="mb-6 border-l border-[var(--site-accent)]/30 pl-4 md:mb-12">
                  <h3 className="text-[17px] font-medium tracking-[0.02em] text-[var(--site-text)] md:text-[19px]">
                    Тимур Темиров
                  </h3>
                  <p className="mt-1 text-[14px] text-[var(--site-muted)] md:text-[15px]">
                    Соло-разработчик и основатель 8:20 LAB
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-w-[560px] text-[15px] leading-relaxed text-[var(--site-muted)] md:space-y-5 md:text-[16px] md:leading-[1.6]">
                <p>
                  Я лично веду проект от первого разговора до запуска: погружаюсь в задачу бизнеса, собираю структуру, формирую визуальное направление и разрабатываю сайт.
                </p>
                <p>
                  Вы общаетесь напрямую со специалистом, который принимает решения и отвечает за итоговый результат — без передачи проекта между менеджерами, дизайнерами и разработчиками.
                </p>
              </div>

              <div className="pt-1 md:pt-2">
                <span style={{ fontFamily: "var(--font-mono)" }} className="inline-block text-[12px] font-medium tracking-[0.05em] text-[var(--site-text)] transition-colors hover:text-[var(--site-accent)] md:text-[13px]">
                  Структура · Визуал · Разработка · Запуск
                </span>
              </div>

              <div className="pt-2 md:pt-4">
                <Link
                  href="/#contact"
                  className="inline-flex h-12 items-center justify-center rounded-[2px] border border-[var(--site-accent)] px-8 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--site-accent)] transition-all duration-300 hover:lab-accent-bg hover:text-[#080808] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--site-accent)] active:scale-[0.98] md:h-14 md:text-[13px]"
                >
                  Обсудить задачу
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
