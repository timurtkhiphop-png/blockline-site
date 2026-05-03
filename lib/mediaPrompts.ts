/**
 * Генерация картинок (Nano Banana, Midjourney, Krea и т.д.)
 *
 * СТРУКТУРА ИДЕИ САЙТА (для согласованности):
 * 1. Герой: широкий кадр, цифровая «архитектура», не стоковая рука с ручкой, без циферблата
 * 2. Кейс 1 (Ozon / маркетплейс): серия плоских карточек / ряд превью, холодный свет, разные палитры в одной сетке
 * 3. Кейс 2 (ремонт): тёмный UI, зелёные акценты, крупные фото интерьеров в сетке, премиальная ниша
 * 4. Кейс 3 (витрина): много negative space, один герой-кадр, tech-минимализм
 * 5. Опционально: фон блока «направления» — плоский lay инструментов, без клавиатурного штампа
 *
 * NEGATIVE (добавляйте ко всем): no clock, no watch, no time numbers 8:20, no text on screen, no watermarks, no extra logos
 *
 * SUFFIX (единая стилистика):
 */
export const IMAGE_STYLE_SUFFIX =
  "ultra high resolution, no readable text, no brand logos, no clock faces, dark premium tech atmosphere, subtle cyan and cold blue light accents, not vintage, not sepia, not parchment";

// ---

/**
 * ХЕРО-ФОН (hero.png)
 * Референс-луп: туннель/решётка из тёмных рам, перспектива в глубину, циан по рёбрам, туман в центре.
 * — Под заливку Hero: в коде идут затемнение и градиенты — картинку можно держать чуть ярче в генерации.
 * — Соотношение: 16:9 или 21:9, ширина ≥ 1920px.
 */
export const HERO = {
  path: "public/media/hero.png",
  idea:
    "3D туннель из чёрных рам и тёмного стекла, сходящиеся линии в vanishing point, тонкий циан на рёбрах, лёгкий туман вдали — как в текущем рефе.",
  /** Основной промт (англ.) — повторяемый стиль под этот визуал */
  prompt: `First person view inside a long dark 3D tunnel made of interlocking black metallic rectangular frames and dark smoked-glass panes, strong one-point perspective toward a soft foggy white void in the distance, very dark matte beams, thin electric cyan and teal light along selected frame edges only, high-end minimalist sci-fi, octane render look, no stars, no sky, no city, no floor texture, no characters, no letters, 8k, ${IMAGE_STYLE_SUFFIX}`,
  /** Короткий вариант, если лимит символов */
  promptShort: `Dark 3D grid tunnel, rectangular frames, perspective into fog, cyan edge light, black glass, no text, ${IMAGE_STYLE_SUFFIX}`,
  /** Русский смысл — бриф */
  promptRu: `Смотришь вглубь туннеля из тёмных прямоугольных рам и глубоко-тёмного стекла, линии сходятся в центр; вдали — молочный туман; тонкие линии циан/бирюзы только по части рёбер; максимум чёрного, футуристично и чисто; без людей, букв, неба и космоса.`,
  negative:
    "text, letters, numbers, clock, watch, dial, watermark, logo, brand, stock photo, smartphone, laptop screen with UI, keyboard closeup, hands, face, planet earth, milky way, stars, nebula, bright sunset, lens flare spam, oversaturated rainbow, vintage, sepia, wooden floor, hotel lobby, isometric room",
};

export const CASE_VISUAL_SERIES = {
  path: "public/media/case-03.png",
  idea: "Кампания: четыре разных настроения / аудитории в одной визуальной линии — как арт-директор серии для бренда, не «фото в карточку»",
  prompt: `Campaign visual series, four split panels, four distinct atmospheres in one frame: industrial B2B cold light, warm domestic scene, fresh organic, corporate logistics, photoreal, cohesive art direction, magazine spread layout, no readable text, no UI mockup chrome, no logos, ${IMAGE_STYLE_SUFFIX}`,
};

export const CASE_REPAIR = {
  path: "public/media/case-01.png",
  idea: "Сайт ремонтной компании: тёмный фон, зелёный акцент, сетка с реальными фото — не stock smiling workers",
  prompt: `Web design still dark theme, deep charcoal background, emerald green accent lines and UI highlights, large interior photos in refined grid, premium renovation company aesthetic, no people faces, no text, mockup of website layout without readable letters, ${IMAGE_STYLE_SUFFIX}`,
};

export const CASE_VITRINE = {
  path: "public/media/case-02.png",
  idea: "Продуктовая витрина: воздух, сетка, дашборд-спокойствие",
  prompt: `Product showcase web layout still, generous whitespace, one hero visual area, dark mode UI, subtle blue highlights, data cards silhouette, no readable interface text, sharp and calm, ${IMAGE_STYLE_SUFFIX}`,
};

export const SERVICES_OPTIONAL = {
  path: "public/media/services.png",
  idea: "Если снова используете в блоке — тёмный стол, 1–2 устройства, тень циан, без кофейной «уютной» каши",
  prompt: `Top view minimal developer desk, single laptop half closed, one pen, dark matte table surface, single cyan light reflection strip, very tidy, no coffee steam cliché, ${IMAGE_STYLE_SUFFIX}`,
};

/**
 * Список с заменой файлов
 */
export const allAssets = [HERO, CASE_VISUAL_SERIES, CASE_REPAIR, CASE_VITRINE, SERVICES_OPTIONAL] as const;
