import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MouseParallaxProvider } from "@/components/MouseParallaxProvider";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${brand.domain}`),
  title: {
    default: `${brand.name} — цифровая архитектура, сайты и запуск`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Ручной код без конструкторов: разработка, визуал и деплой в одном контуре. Ориентиры по ценам и кейсы. Тимур Темиров, 8:20 Lab.",
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description:
      "Лендинги и многостраничники на коде, прозрачные «от» на странице. Кейсы — в Telegram-канале.",
    url: `https://${brand.domain}`,
    siteName: brand.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description:
      "Цены, что входит, как работаем. Сайты на коде под задачу бизнеса.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `https://${brand.domain}` },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:ital,wght@0,400;0,500;1,400&family=Unbounded:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="relative min-h-screen overflow-x-hidden bg-[var(--site-bg)] text-[var(--site-text)] antialiased"
        suppressHydrationWarning
      >
        <MouseParallaxProvider>
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-0 grid-bg opacity-[0.18] mask-fade-b"
          />
          <NoiseOverlay />
          <ScrollProgress />
          <div className="relative z-10">{children}</div>
        </MouseParallaxProvider>
      </body>
    </html>
  );
}
