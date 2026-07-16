import Link from "next/link";

// ─── Локальные данные ────────────────────────────────────────────────────────

type Format = {
  num: string;
  title: string;
  description: string;
};

const FORMATS: Format[] = [
  {
    num: "01",
    title: "Лендинг",
    description:
      "Для одного направления, продукта, рекламной кампании или проверки нового предложения.",
  },
  {
    num: "02",
    title: "Корпоративный сайт",
    description:
      "Для компании с несколькими услугами, кейсами, информацией о бизнесе и управляемым контентом.",
  },
  {
    num: "03",
    title: "Каталог или бронирование",
    description:
      "Для структурированного выбора услуг, объектов или товаров, фильтрации, заявок и записи.",
  },
  {
    num: "04",
    title: "Интернет-магазин",
    description:
      "Для каталога, корзины, оплаты, управления товарами и дальнейшего развития проекта.",
  },
];

const INCLUDED: string[] = [
  "Погружение в задачу бизнеса",
  "Смысловая структура страниц",
  "Визуальное направление",
  "Адаптивная разработка",
  "Формы и базовая аналитика",
  "Базовая SEO-подготовка",
  "Запуск и передача проекта",
];

const ADDONS: { label: string; note?: string }[] = [
  { label: "CMS и управление контентом" },
  { label: "Формы и уведомления" },
  { label: "Аналитика и внешние интеграции" },
  { label: "Бронирование и онлайн-оплата" },
  { label: "Карты и мессенджеры" },
  {
    label: "Дополнительный визуал",
    note: "AI-графика, базовый логотип, презентация или материалы для социальных сетей — когда они нужны для цельного запуска.",
  },
];

// ─── Компонент ───────────────────────────────────────────────────────────────

export function ProductSection() {
  return (
    <section
      id="product"
      className="relative scroll-mt-24 bg-[var(--site-bg)] px-4 py-10 md:px-12 md:py-32 xl:px-[48px]"
    >
      {/* Тонкий горизонтальный разделитель сверху */}
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--site-border)]" aria-hidden />

      <div className="mx-auto max-w-[1280px]">

        {/* ── Eyebrow ──────────────────────────────────────────────────── */}
        <div className="mb-6 flex items-center gap-3 md:mb-12" data-reveal>
          <div className="lab-accent-rule shrink-0" />
          <span className="section-label">ОСНОВНОЙ ПРОДУКТ</span>
        </div>

        {/* ── Верхняя строка: заголовок + основной продукт ─────────────── */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20 lg:items-start">

          {/* Левая колонка: заголовок и вводный текст */}
          <div className="lg:w-5/12 lg:flex-shrink-0" data-reveal>
            <h2
              style={{ fontFamily: "var(--font-section-display), sans-serif" }}
              className="mb-6 text-[clamp(28px,7vw,52px)] font-normal uppercase leading-[1.05] tracking-[0.02em] text-[var(--site-text)]"
            >
              Сайт под ключ.
              <br />
              <span className="lab-accent-text">От задачи до запуска.</span>
            </h2>
            <p className="max-w-[440px] text-[14px] leading-[1.65] text-[var(--site-muted)] md:text-[15px]">
              Не продаю разрозненные этапы. Беру проект целиком: помогаю собрать структуру,
              формирую визуальное направление, разрабатываю сайт, подключаю необходимые
              инструменты и довожу всё до запуска.
            </p>
          </div>

          {/* Правая колонка: основной продукт и форматы */}
          <div className="flex flex-col lg:w-7/12">

            {/* Карточка основного продукта */}
            <div
              data-reveal
              className="mb-8 rounded-[2px] border border-[var(--site-accent)]/20 bg-[var(--site-surface)] p-6 md:p-8"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--site-surface) 97%, var(--site-accent-from) 3%), var(--site-surface))",
              }}
            >
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full lab-accent-bg flex-shrink-0"
                  aria-hidden
                />
                <span
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-[10px] uppercase tracking-[0.18em] text-[var(--site-muted)]"
                >
                  Основное направление
                </span>
              </div>
              <h3
                style={{ fontFamily: "var(--font-section-display), sans-serif" }}
                className="mt-3 text-[20px] font-normal uppercase leading-tight tracking-[0.02em] text-[var(--site-text)] md:text-[24px]"
              >
                Индивидуальный сайт для бизнеса
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-[var(--site-muted)] md:text-[14px]">
                Решение под конкретные услуги, аудиторию и процессы компании — с архитектурой,
                которую можно развивать вместе с задачами проекта.
              </p>
            </div>

            {/* Форматы */}
            <div className="flex flex-col gap-0">
              {FORMATS.map((fmt, i) => (
                <div
                  key={fmt.num}
                  data-reveal
                  className={`group flex items-start gap-4 border-t border-[var(--site-border)] py-3.5 transition-colors duration-300 hover:border-[var(--site-accent)]/40 md:gap-6 md:py-6${
                    i === FORMATS.length - 1 ? " border-b" : ""
                  }`}
                >
                  {/* Номер */}
                  <span
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="w-8 flex-shrink-0 text-[11px] font-medium tracking-[0.08em] text-[var(--site-muted)] pt-0.5 transition-colors duration-300 group-hover:lab-accent-text"
                  >
                    {fmt.num}
                  </span>
                  {/* Текст */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[15px] font-medium leading-tight text-[var(--site-text)] md:text-[16px]">
                      {fmt.title}
                    </h4>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--site-muted)]">
                      {fmt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Нижняя строка: состав + дополнительно ────────────────────── */}
        <div className="mt-10 flex flex-col gap-6 md:mt-20 lg:flex-row lg:gap-12 xl:gap-16">

          {/* В проект входит */}
          <div className="lg:w-5/12" data-reveal>
            <p
              style={{ fontFamily: "var(--font-mono)" }}
              className="mb-5 text-[10px] uppercase tracking-[0.2em] text-[var(--site-muted)] md:mb-6"
            >
              В ПРОЕКТ ВХОДИТ
            </p>
            <ul className="flex flex-col gap-0">
              {INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 border-b border-[var(--site-border)] py-2 last:border-b-0 md:py-3"
                >
                  <span
                    className="mt-[5px] h-[3px] w-[3px] flex-shrink-0 rounded-full lab-accent-bg"
                    aria-hidden
                  />
                  <span className="text-[14px] leading-snug text-[var(--site-text)]">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12px] leading-relaxed text-[var(--site-muted)]">
              CMS подключается, когда клиенту нужно самостоятельно управлять контентом.
            </p>
          </div>

          {/* Вертикальный разделитель на desktop */}
          <div
            className="hidden w-px self-stretch bg-[var(--site-border)] lg:block"
            aria-hidden
          />

          {/* Подключаю по задаче */}
          <div className="lg:flex-1" data-reveal>
            <p
              style={{ fontFamily: "var(--font-mono)" }}
              className="mb-5 text-[10px] uppercase tracking-[0.2em] text-[var(--site-muted)] md:mb-6"
            >
              ПОДКЛЮЧАЮ ПО ЗАДАЧЕ
            </p>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-0 sm:grid-cols-2">
              {ADDONS.map((addon) => (
                <li
                  key={addon.label}
                  className="flex flex-col border-b border-[var(--site-border)] py-2.5 last:border-b-0 md:py-3 sm:[&:nth-last-child(2)]:border-b-0"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span
                      className="mt-[5px] h-[3px] w-[3px] flex-shrink-0 rounded-full lab-accent-bg"
                      aria-hidden
                    />
                    <span className="text-[14px] leading-snug text-[var(--site-text)]">
                      {addon.label}
                    </span>
                  </div>
                  {addon.note && (
                    <p className="mt-1 pl-[18px] text-[12px] leading-relaxed text-[var(--site-muted)]">
                      {addon.note}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12px] leading-relaxed text-[var(--site-muted)]">
              Сложная серверная логика оценивается отдельно и при необходимости реализуется вместе с профильным backend-разработчиком.
            </p>

            {/* CTA */}
            <div className="mt-6 md:mt-10">
              <Link
                href="/#contact"
                className="inline-flex h-12 items-center justify-center rounded-[2px] lab-accent-bg px-8 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-[#080808] transition-all duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-bg)] active:scale-[0.98] md:h-14 md:text-[13px]"
              >
                Получить оценку проекта
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Тонкий горизонтальный разделитель снизу */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--site-border)]" aria-hidden />
    </section>
  );
}
