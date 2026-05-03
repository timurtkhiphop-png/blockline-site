# blockline-site — лендинг 8:20 Lab

Next.js 15 (App Router), React 19, Tailwind, статический экспорт в папку `out/` для загрузки на хостинг.

## Запуск разработки

```bash
cd путь/к/blockline-site
npm install
npm run dev
```

Сайт: **http://localhost:3010** (порт задан в `package.json`).

## Сборка для продакшена

```bash
npm run build
```

Готовые файлы — в **`out/`**. Их содержимое загружается в корень сайта на хостинге.

Другие сценарии: `npm run build:full`, `npm run build:clean`, упаковка — см. `package.json` и `TIMWEB-DEPLOY.txt`.

## Где править тексты

- **`lib/siteCopy.ts`** — секции лендинга (навигация, услуги, цены, FAQ, контакты и т.д.).
- **`lib/content.ts`** — герой и связанный контент.

## Структура

- `app/` — страницы, layout, глобальные стили
- `components/` — секции и UI
- `hooks/` — клиентские хуки (например анимации)
- `src/components/` — часть кода (динамический импорт из корня `components/`)
- `public/` — статика (`cases/`, медиа, шрифты)
