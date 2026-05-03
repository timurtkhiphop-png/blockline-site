# blockline — сайт Тимура Темирова

Одностраничный Next.js 15 / React 19 / Tailwind / Framer Motion. Тёмная эстетика, зерно, mesh-градиент, скролл-хореография, магнитные кнопки, split-reveal.

## Запуск

```powershell
cd C:\Users\Marke\Desktop\blockline-site
npm install
npm run dev
```

Открыть <http://localhost:3000>.

## Сборка

```powershell
npm run build
npm run start
```

## Форма контакта

Форма шлёт POST на `/api/lead`. По умолчанию ответ в логе сервера.
Чтобы заявки падали в Telegram — скопируй `.env.example` в `.env.local`
и заполни `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`.

## Что где лежит

- `app/page.tsx` — сборка экранов
- `app/layout.tsx` — шрифты, мета, фоновые слои
- `app/globals.css` — базовые стили, переменные, grain
- `components/` — все секции, интерактивные примитивы
- `lib/motion.ts` — общие motion-варианты
- `lib/content.ts` — все тексты в одном месте, редактируй там

## Подмена контента

Тексты, список услуг, кейсов, принципов и шагов процесса — в `lib/content.ts`.
Меняешь там — меняется на всём сайте.
