import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClientShell from "@/components/ClientShell";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cases } from "@/lib/projects";
import { brand } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cases.filter((c) => !c.locked).map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = cases.find((item) => item.id === slug);

  if (!c || c.locked) {
    return { title: "Кейс не найден" };
  }

  return {
    title: `${c.title} — 8:20 LAB`,
    description: c.tagline,
    openGraph: {
      title: `${c.title} — ${brand.name}`,
      description: c.tagline,
      url: `https://${brand.domain}/projects/${c.id}`,
      siteName: brand.name,
      locale: "ru_RU",
      type: "website",
      images: c.image ? [{ url: c.image }] : undefined,
    },
  };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const currentIndex = cases.findIndex((item) => item.id === slug);
  const c = cases[currentIndex];

  if (!c || c.locked) {
    notFound();
  }

  // Find next project
  const availableCases = cases.filter(item => !item.locked);
  const currentAvailableIndex = availableCases.findIndex(item => item.id === c.id);
  const nextCase = availableCases[(currentAvailableIndex + 1) % availableCases.length];

  return (
    <ClientShell>
      <Header />
      <main className="w-full min-w-0 pb-20 pt-32 lg:pt-40 bg-[var(--site-bg)]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 xl:px-[48px]">
          
          {/* ── Back Link ── */}
          <div className="mb-12 md:mb-16">
            <a
              href="/projects"
              style={{ fontFamily: "var(--font-mono)" }}
              className="inline-flex items-center text-[10px] uppercase tracking-[0.14em] text-[var(--site-muted)] transition-colors hover:text-[var(--site-accent)]"
            >
              <span className="mr-2">←</span> Все проекты
            </a>
          </div>

          {/* ── Hero ── */}
          <div className="mb-16 md:mb-24 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span
                style={{ fontFamily: "var(--font-mono)" }}
                className="block text-[10px] uppercase tracking-[0.14em] text-[var(--site-muted)] mb-4"
              >
                {c.type}
              </span>
              <h1
                style={{ fontFamily: "var(--font-section-display), sans-serif" }}
                className="text-[clamp(32px,6vw,64px)] font-normal uppercase leading-[1.05] tracking-[0.02em] text-[var(--site-text)] mb-6"
              >
                {c.title}
              </h1>
              <p className="text-[16px] md:text-[20px] leading-relaxed text-white/80 max-w-[600px]">
                {c.tagline}
              </p>
            </div>
            
            {c.url && (
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Открыть сайт проекта ${c.title}`}
                className="inline-flex h-12 items-center justify-center rounded-[2px] border border-[var(--site-accent)] px-8 text-[12px] uppercase tracking-[0.08em] text-[var(--site-accent)] transition-colors hover:bg-[var(--site-accent)] hover:text-[#080808]"
              >
                Открыть сайт ↗
              </a>
            )}
          </div>

          {/* ── Main Image ── */}
          {c.image && (
            <div className="mb-20 md:mb-32 overflow-hidden rounded-[4px] border border-white/[0.06] bg-[#080808]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.image}
                alt={`Главный экран проекта ${c.title}`}
                className="w-full h-auto object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          )}

          {/* ── Details Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24 md:mb-40">
            {/* Left Col: Task & Solution */}
            <div className="lg:col-span-6 flex flex-col gap-12 md:gap-16">
              {c.task && (
                <div>
                  <span
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="block text-[10px] uppercase tracking-[0.14em] lab-accent-text mb-4"
                  >
                    Задача
                  </span>
                  <p className="text-[15px] md:text-[16px] leading-relaxed text-white/80">
                    {c.task}
                  </p>
                </div>
              )}
              
              {c.solution && (
                <div>
                  <span
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="block text-[10px] uppercase tracking-[0.14em] lab-accent-text mb-4"
                  >
                    Решение
                  </span>
                  <p className="text-[15px] md:text-[16px] leading-relaxed text-white/80">
                    {c.solution}
                  </p>
                </div>
              )}
            </div>

            {/* Right Col: Features & Tech */}
            <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-12 md:gap-16">
              {c.features && c.features.length > 0 && (
                <div>
                  <span
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="block text-[10px] uppercase tracking-[0.14em] text-[var(--site-muted)] mb-5"
                  >
                    Что реализовано
                  </span>
                  <ul className="flex flex-col gap-4">
                    {c.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[15px] text-white/70">
                        <span className="lab-accent-text mt-[6px] text-[8px] shrink-0">●</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {c.stack && (
                <div>
                  <span
                    style={{ fontFamily: "var(--font-mono)" }}
                    className="block text-[10px] uppercase tracking-[0.14em] text-[var(--site-muted)] mb-3"
                  >
                    Технологии
                  </span>
                  <p style={{ fontFamily: "var(--font-mono)" }} className="text-[12px] text-white/50 leading-relaxed uppercase tracking-wider">
                    {c.stack}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── Visual Part (Additional Images) ── */}
          {c.images && c.images.length > 0 && (
            <div className="mb-24 md:mb-40 flex flex-col gap-6 md:gap-10">
              {c.images.map((img, idx) => (
                <div key={idx} className="overflow-hidden rounded-[4px] border border-white/[0.06] bg-[#080808]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`Экран проекта ${c.title} ${idx + 1}`}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── Case CTA ── */}
          <div className="mb-24 md:mb-40 rounded-[4px] bg-[#0a0a0a] border border-white/[0.04] p-10 md:p-16 flex flex-col items-center text-center">
            <h2
              style={{ fontFamily: "var(--font-section-display), sans-serif" }}
              className="text-[28px] md:text-[36px] uppercase leading-tight mb-4"
            >
              Нужен проект с похожим уровнем проработки?
            </h2>
            <p className="text-[15px] text-[var(--site-muted)] mb-8 max-w-[500px]">
              Расскажите о бизнесе. Я предложу подходящий формат реализации.
            </p>
            <a
              href="/#contact"
              className="inline-flex h-14 items-center justify-center rounded-[2px] border border-[var(--site-accent)] bg-transparent px-10 text-[13px] uppercase tracking-[0.08em] text-[var(--site-accent)] transition-all duration-300 hover:bg-[var(--site-accent)] hover:text-[#080808]"
            >
              Обсудить задачу
            </a>
          </div>

          {/* ── Next Project ── */}
          {nextCase && (
            <div className="border-t border-white/[0.06] pt-16 md:pt-24 flex flex-col items-center text-center pb-10">
              <span
                style={{ fontFamily: "var(--font-mono)" }}
                className="block text-[10px] uppercase tracking-[0.14em] text-[var(--site-muted)] mb-6"
              >
                Следующий проект
              </span>
              <a href={`/projects/${nextCase.id}`} className="group inline-block">
                <h3
                  style={{ fontFamily: "var(--font-section-display), sans-serif" }}
                  className="text-[32px] md:text-[48px] uppercase leading-tight transition-colors group-hover:text-[var(--site-accent)] mb-8"
                >
                  {nextCase.title}
                </h3>
                {nextCase.image && (
                  <div className="relative w-full max-w-[800px] overflow-hidden rounded-[4px] border border-white/[0.06] bg-[#080808] transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                    <div className="aspect-[16/9]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={nextCase.image}
                        alt={`Скриншот следующего проекта: ${nextCase.title}`}
                        className="w-full h-full object-cover object-top opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                )}
              </a>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
