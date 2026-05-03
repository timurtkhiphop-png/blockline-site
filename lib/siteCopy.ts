/**
 * Копирайт секций лендинга (brand / hero — в lib/content.ts).
 * Бриф: 820lab_FINAL_PROMPT_v4.md
 */

export const nav = [
  { label: "Логика", href: "#why" },
  { label: "Услуги", href: "#product" },
  { label: "Кейсы", href: "#work" },
  { label: "Процесс", href: "#process" },
  { label: "Цены", href: "#pricing" },
  { label: "Вопросы", href: "#faq" },
  { label: "Связь", href: "#contact" },
];

export type Metric = {
  value: number;
  suffix: string;
  label: string;
  sub: string;
};

export const metrics: Metric[] = [
  { value: 47, suffix: "+", label: "Проектов", sub: "от идеи до продакшена" },
  { value: 3, suffix: "", label: "Плоскости", sub: "одна линия ответственности" },
  { value: 14, suffix: "дн", label: "До MVP", sub: "от брифа до рабочего сайта" },
];

export const why = {
  label: "ЛОГИКА",
  title: "Под задачу.\nЦельная система.",
  blocks: [
    {
      num: "01",
      heading: "Код, дизайн и визуал — один цикл.",
      body: "Не три подрядчика с разными файлами. Бриф, архитектура, сборка, запуск — без потерь при передаче.",
    },
    {
      num: "02",
      heading: "Один подрядчик, полный контур.",
      body: "Дизайн проектируется под разработку, разработка — под задачи бизнеса. Нет зазора между макетом и продуктом.",
    },
    {
      num: "03",
      heading: "Сайт — продукт, не файл.",
      body: "Сдаётся живым: деплой, базовое SEO, документация. Доработки после запуска — по запросу, объём и оплата согласуем отдельно.",
    },
  ],
};

export const offer = {
  label: "ЛИНИЯ РАБОТ",
  title: "Три плоскости.\nОдин бриф.",
  sub: "Нужна одна линия или все три — бриф и порядок работ одинаковые.",
};

export type OfferCard = {
  num: string;
  category: string;
  heading: string;
  body: string;
  tags: string[];
};

export const offerCards: OfferCard[] = [
  {
    num: "01",
    category: "Разработка",
    heading: "Сайт с системой.",
    body: "Next.js, TypeScript, HTML/CSS. Лендинги, каталоги, корпоративные сайты — под задачу, не под шаблон.",
    tags: ["Next.js", "TypeScript", "Tailwind", "HTML/CSS"],
  },
  {
    num: "02",
    category: "Визуал и упаковка",
    heading: "Бренд с характером.",
    body: "Логотип, гайдлайн, визитки, презентации, шаблоны для соцсетей. AI-визуал — когда живая съёмка не нужна или нецелесообразна.",
    tags: ["Логотип", "Айдентика", "AI-визуал", "Упаковка"],
  },
  {
    num: "03",
    category: "Запуск",
    heading: "Работает с первого дня.",
    body: "Деплой на Vercel или российский VPS, базовое SEO, аналитика, интеграции с платёжками и мессенджерами.",
    tags: ["Vercel / VPS", "SEO", "Метрика / GA4", "Интеграции"],
  },
];

export const portfolioMeta = {
  label: "КЕЙСЫ",
  title: "Работы.",
  sub: "Задача, решение, результат.",
  channelNote: "Новые кейсы — первыми в",
  channelLabel: "Telegram-канале",
  channelHref: "https://t.me/lab820",
  cta: "Обсудить проект",
};

export type Case = {
  id: string;
  locked: boolean;
  index?: string;
  type?: string;
  title?: string;
  tagline?: string;
  task?: string;
  solution?: string;
  stack?: string;
  tags?: string[];
  url?: string;
  year?: string;
  image?: string;
  /** cover — заполнить карточку (может обрезать); contain — весь скрин, с полями по краям */
  imageFit?: "cover" | "contain";
  /** CSS object-position, напр. "center 18%" — только при cover */
  imagePosition?: string;
};

export const cases: Case[] = [
  {
    id: "da-remont",
    index: "01",
    type: "Лендинг · Локальный бизнес",
    title: "DA REMONT",
    tagline: "Ремонт под ключ в Тюмени",
    task: "Превратить холодный трафик в заявки: дать понять цену и надёжность до первого звонка.",
    solution: "Лендинг с калькулятором стоимости, блоком гарантии и прямым выходом в Telegram.",
    stack: "HTML · CSS · JS",
    tags: ["Лендинг", "Калькулятор", "Telegram CTA"],
    url: "https://ck113037.tw1.ru",
    year: "2026",
    image: "/cases/da-remont.png",
    imageFit: "contain",
    locked: false,
  },
  {
    id: "astrotech",
    index: "02",
    type: "Многостраничный · B2B",
    title: "Астротех",
    tagline: "Поставки микроэлектроники и промоборудования",
    task: "B2B-сайт с каталогом по направлениям: структура под закупки, без лишних кликов до заявки.",
    solution: "Многостраничник с навигацией по категориям, блоком доверия и формой запроса под отдел снабжения.",
    stack: "HTML · CSS · JS",
    tags: ["B2B", "Каталог", "Многостраничный"],
    url: "https://astrotech.su",
    year: "2026",
    image: "/cases/astrotech.png",
    imageFit: "contain",
    locked: false,
  },
  { id: "slot-3", locked: true },
  { id: "slot-4", locked: true },
];

export const process = {
  label: "КАК ВЕДУ",
  title: "Четыре шага.",
  sub: "Без переделок — потому что всё фиксируется до начала, а не после.",
  steps: [
    {
      num: "01",
      heading: "Бриф",
      body: "Задачи, аудитория, ограничения — письменно. Это не формальность: именно отсюда всё считается.",
    },
    {
      num: "02",
      heading: "Архитектура",
      body: "Структура, стек, визуальная система. Согласовываем до вёрстки — не после.",
    },
    {
      num: "03",
      heading: "Сборка",
      body: "Разработка и дизайн в одних руках. Промежуточные показы по договорённости — правите до финала.",
    },
    {
      num: "04",
      heading: "Запуск",
      body: "Деплой, базовое SEO, передача доступов. Сдаётся живой сайт — не архив с файлами.",
    },
  ],
};

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  timeline: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
};

export const pricing = {
  label: "ОРИЕНТИРЫ",
  title: "Цены.",
  sub: "Базовая стоимость — без CMS и интеграций. Смета после брифа.",
  plans: [
    {
      id: "vizitka",
      name: "Визитка",
      price: "от 15 000 ₽",
      timeline: "от 5 дней",
      description: "Быстрый вход в сеть.",
      features: [
        "1 страница: контакты, услуги, доверие",
        "Адаптив, форма или ссылка на мессенджер",
        "Базовое SEO: meta, og, sitemap",
        "Деплой",
      ],
      cta: "Обсудить",
      highlight: false,
    },
    {
      id: "landing",
      name: "Лендинг",
      price: "от 30 000 ₽",
      timeline: "от 7 дней",
      description: "Конвертировать — главная задача.",
      features: [
        "До 6–8 секций",
        "Анимации, адаптив",
        "Базовое SEO: meta, og, sitemap, robots",
        "Форма заявки + Telegram-уведомления",
        "Деплой: Vercel или российский VPS",
      ],
      cta: "Обсудить",
      highlight: true,
    },
    {
      id: "multipage",
      name: "Многостраничный",
      price: "от 50 000 ₽",
      timeline: "от 14 дней",
      description: "Каталог, блог, корп. сайт.",
      features: [
        "Любое число страниц",
        "Роутинг, фильтры, формы",
        "Базовое SEO на каждой странице",
        "Аналитика: Метрика или GA4",
        "Деплой и поддержка запуска",
      ],
      cta: "Обсудить",
      highlight: false,
    },
  ] satisfies PricingPlan[],
  addons: {
    heading: "Дополнительно",
    groups: [
      {
        label: "CMS",
        items: [{ label: "Sanity — настройка + схема данных", price: "от 20 000 ₽" }],
      },
      {
        label: "Интеграции",
        items: [
          { label: "Робокасса / ЮKassa", price: "от 12 000 ₽" },
          { label: "Telegram-уведомления с форм", price: "от 5 000 ₽" },
          { label: "Яндекс.Метрика / GA4 + цели", price: "от 5 000 ₽" },
          { label: "Другие интеграции", price: "по смете" },
        ],
      },
      {
        label: "Доработки",
        items: [
          { label: "Доработка существующего сайта", price: "по смете" },
          { label: "Калькулятор или квиз", price: "от 8 000 ₽" },
        ],
      },
      {
        label: "Визуал и упаковка",
        items: [
          { label: "Логотип и мини-гайдлайн", price: "от 10 000 ₽" },
          { label: "Визитки (макет под печать)", price: "от 4 000 ₽" },
          { label: "Фирменный бланк / КП", price: "от 5 000 ₽" },
          { label: "Презентация / питч-дек", price: "от 10 000 ₽" },
          { label: "Обложки и шаблоны для соцсетей", price: "от 6 000 ₽" },
          { label: "AI-кадры (альтернатива съёмке)", price: "от 6 000 ₽" },
        ],
      },
      {
        label: "Контент",
        items: [{ label: "Тексты для сайта", price: "от 5 000 ₽" }],
      },
    ],
  },
  footnote: "Предоплата 50% — остаток после сдачи. Правки в рамках брифа включены.",
};

export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  {
    q: "Что входит в базовую стоимость, а что оплачивается отдельно?",
    a: "В базе: вёрстка, адаптив, анимации, базовое SEO (meta, og, sitemap), деплой. Отдельно — CMS, платёжные интеграции, съёмка и логотип. Всё фиксируется в смете до начала работ.",
  },
  {
    q: "Смогу ли я сам обновлять сайт после сдачи?",
    a: "Зависит от проекта. Если подключаем CMS — да, редактируете контент без разработчика. Если нет — передаю исходники и инструкцию; правки делаю по запросу.",
  },
  {
    q: "Вы делаете интеграции с платёжными системами?",
    a: "Да — Робокасса, ЮKassa. Другие варианты обсуждаем в брифе: если есть API и документация, разберёмся.",
  },
  {
    q: "Можно заказать только разработку по готовому макету?",
    a: "Да. Есть Figma — собираем по нему. Нет — проектируем структуру и визуальную систему внутри проекта.",
  },
  {
    q: "Сколько времени займёт проект?",
    a: "Визитка — от 5 дней, лендинг — от 7, многостраничник — от 14. Сроки фиксируются в брифе и не сдвигаются без изменения задачи.",
  },
  {
    q: "Как начать?",
    a: "Написать в Telegram или на почту. Коротко — о задаче, дальше я высылаю бриф и мы проходим четыре шага из блока «Как веду».",
  },
];

export const contact = {
  label: "СВЯЗЬ",
  title: "Есть задача.",
  titleAccent: "Обсудим.",
  sub: "Два слова о проекте — достаточно для старта.",
  note: "Отвечаю в рабочие дни в течение нескольких часов.",
  primaryBtn: "Написать в Telegram",
  secondaryBtn: "Отправить письмо",
};

export const footer = {
  logo: "8:20 lab",
  tagline: "КОД — ВИЗУАЛ — ЗАПУСК — ЦИФРОВАЯ АРХИТЕКТУРА",
};
