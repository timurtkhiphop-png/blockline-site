import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MouseParallaxProvider } from "@/components/MouseParallaxProvider";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { ScrollProgress } from "@/components/ScrollProgress";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${brand.domain}`),
  title: {
    default: `${brand.name} — цифровая архитектура, сайты и AI-визуал`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Ручной код без конструкторов, визуал нейросетями с доводкой, одна линия ответственности. Цены, пакеты, кейсы. Тимур Темиров, 8:20 Lab.",
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description:
      "Сайт и магазин на коде, AI-визуал пакетами, прозрачные «от» на странице. Кейсы — в ленте.",
    url: `https://${brand.domain}`,
    siteName: brand.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description:
      "Цены, что входит, как работаем. Сайты на коде и AI-визуал для бренда.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `https://${brand.domain}` },
};

export const viewport: Viewport = {
  themeColor: "#020c0c",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=JetBrains+Mono&family=Unbounded:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="relative min-h-screen overflow-x-hidden bg-surface-1 text-[#c8dbd8] antialiased"
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
