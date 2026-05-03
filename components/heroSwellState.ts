import type { MutableRefObject } from "react";

/** Состояние, которым герой управляет шейдером (GSAP + ScrollTrigger) */
export type HeroSwellState = {
  /** 0..1 — пробуждение по первому движению мыши */
  awakenG: number;
  /** 0..~0.35 — амплитуда волны (swell), до скролла-уплощения */
  awakenD: number;
  /** 0.97..1 — лёгкий зум плоскости (шум в vertex) */
  meshZoom: number;
  /** 0..1 — прогресс скролла по герою (ScrollTrigger) */
  scrollP: number;
};

export function createInitialHeroSwellState(): HeroSwellState {
  return {
    awakenG: 0,
    awakenD: 0,
    meshZoom: 0.97,
    scrollP: 0,
  };
}

export type HeroSwellRef = MutableRefObject<HeroSwellState>;
