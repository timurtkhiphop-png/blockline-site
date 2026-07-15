export const portfolioMeta = {
  label: "ПРОЕКТЫ 8:20 LAB",
  title: "Сайты для бизнеса — от атмосферных пользовательских проектов до корпоративных B2B-систем.",
  sub: "Каждый проект начинается с задачи бизнеса, а не с готового шаблона.",
  channelNote: "Новые кейсы — первыми в",
  channelLabel: "Telegram-канале",
  channelHref: "https://t.me/lab820",
  cta: "Обсудить проект",
};

export type Case = {
  id: string; // Used as slug
  locked: boolean;
  featured: boolean; // Indicates if shown on the main page
  index?: string;
  type?: string; // Niche or category
  title?: string;
  tagline?: string; // Short description
  task?: string;
  solution?: string;
  stack?: string; // Technologies
  tags?: string[];
  features?: string[]; // Implemented features
  url?: string;
  year?: string;
  image?: string; // Main image
  imageMobile?: string;
  images?: string[]; // Additional images, if they exist
  imageFit?: "cover" | "contain";
  imagePosition?: string;
};

export const cases: Case[] = [
  {
    id: "hookah-ministry",
    index: "01",
    featured: true,
    type: "Многостраничный · Премиум Лаунж",
    title: "Hookah Ministry",
    tagline: "Эталон дымной культуры. Тяжелая эстетика. Абсолютная тишина.",
    task: "Передать эстетику премиального заведения, тяжелую эстетику и абсолютную тишину через дизайн.",
    solution: "Тёмная тема с золотыми акцентами, 3D-маска в герое, плавные анимации и строгая типографика.",
    stack: "Next.js · Framer Motion · Tailwind",
    tags: ["Премиум", "Lounge", "3D"],
    features: [
      "3D-маска в герое",
      "Тёмная тема с золотыми акцентами",
      "Плавные анимации и прелоадер",
      "Строгая премиальная типографика",
    ],
    url: "https://hookahministry.ru",
    year: "2026",
    image: "/cases/hookahministry.png",
    imageMobile: "/cases/hookahministry-mobile.png",
    imageFit: "contain",
    locked: false,
  },
  {
    id: "astrotech",
    index: "02",
    featured: true,
    type: "Многостраничный · B2B",
    title: "Астротех",
    tagline: "Поставки микроэлектроники и промоборудования",
    task: "B2B-сайт с каталогом по направлениям: структура под закупки, без лишних кликов до заявки.",
    solution: "Многостраничник с навигацией по категориям, блоком доверия и формой запроса под отдел снабжения.",
    stack: "HTML · CSS · JS",
    tags: ["B2B", "Каталог", "Многостраничный"],
    features: [
      "Навигация по категориям оборудования",
      "Блок доверия и сертификации",
      "Форма запроса под отдел снабжения",
    ],
    url: "https://astrotech.su",
    year: "2026",
    image: "/cases/astrotech.png",
    imageMobile: "/cases/astrotech-mobile.png",
    imageFit: "contain",
    locked: false,
  },
  {
    id: "fortuna-turgoyak",
    index: "03",
    featured: true,
    type: "Многостраничный · Туризм и бронирование",
    title: "Fortuna Turgoyak",
    tagline: "Жильё у озера Тургояк, водные прогулки, остров Веры",
    task: "Показать спокойствие озера и понятный путь: жильё, прогулки, бронь — без шума и перегруза экрана.",
    solution: "Воздушный герой, спокойная типографика, аккуратные блоки с офферами и быстрый выход в бронь и контакты.",
    stack: "Публичный сайт · адаптив",
    tags: ["Туризм", "Бронирование", "Локация"],
    features: [
      "Блоки с офферами жилья и прогулок",
      "Быстрый выход в бронь и контакты",
      "Воздушный герой с панорамой озера",
    ],
    url: "http://xn----7sbk2alfeldqdief1p.xn--p1ai/",
    year: "2026",
    image: "/cases/fortuna-turgoyak.png",
    imageMobile: "/cases/fortuna-turgoyak-mobile.png",
    imageFit: "contain",
    locked: false,
  },
  {
    id: "da-remont",
    index: "04",
    featured: false,
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
    imageMobile: "/cases/da-remont-mobile.png",
    imageFit: "contain",
    locked: false,
  },
  {
    id: "ocean",
    index: "05",
    featured: false,
    type: "Лендинг · B2B",
    title: "Ocean",
    tagline: "Ваш Торговый Дом в Китае. Полный цикл ВЭД под ключ.",
    task: "Разработать презентабельный сайт для компании-резидента ЭСТ Урумчи, отразить масштаб и надежность партнера в сфере логистики и ВЭД.",
    solution: "Строгий дизайн в тёмных тонах с красными акцентами, передающий эстетику портовой логистики. Удобная структура для B2B-клиентов.",
    stack: "Публичный сайт · адаптив",
    tags: ["B2B", "Логистика", "ВЭД"],
    url: "https://xaietc.ru/",
    year: "2026",
    image: "/cases/ocean.png",
    imageMobile: "/cases/ocean-mobile.png",
    imageFit: "contain",
    locked: false,
  },
];
