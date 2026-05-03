"use client";

import type { RefObject } from "react";

import type { HeroSwellRef } from "@/components/heroSwellState";

/**
 * Заглушка для статического экспорта на Windows без компиляции Three.js (npm run build:export).
 * На проде после деплоя фон — сплошной цвет; полный WebGL остаётся в dev (`npm run dev`).
 */
type QuantumProps = {
  className?: string;
  parentRef?: RefObject<HTMLDivElement | null>;
  swellStateRef: HeroSwellRef;
};

export function QuantumBackground({ className, parentRef }: QuantumProps) {
  return (
    <div
      ref={parentRef}
      className={["pointer-events-none absolute inset-0 z-0 bg-[#051a1a]", className].filter(Boolean).join(" ")}
      style={{ minHeight: "100dvh" }}
      aria-hidden
    />
  );
}

export default QuantumBackground;
