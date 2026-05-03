"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
} from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

/**
 * Нормализованная позиция [-1, 1] + инерция.
 * pointermove: мышь, тач-перетаскивание, pen (mousemove на части девайсов не даёт ничего).
 * Не гасим «reduce motion» намеренно: ввод от пользователя — не авто-анимация; иначе на Win/mac
 * с «уменьшить движение» визуально «ничего не происходило».
 */
const SMOOTH = 0.14;

type Ctx = {
  mx: MotionValue<number>;
  my: MotionValue<number>;
};

const MouseParallaxContext = createContext<Ctx | null>(null);

export function useMouseParallax(): Ctx {
  const ctx = useContext(MouseParallaxContext);
  if (!ctx) {
    throw new Error("useMouseParallax must be used within MouseParallaxProvider");
  }
  return ctx;
}

/** Безопасно вне провайдера (например, в тестах) */
export function useMouseParallaxOptional(): Ctx | null {
  return useContext(MouseParallaxContext);
}

export function MouseParallaxProvider({ children }: { children: ReactNode }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const raf = useRef<number>(0);
  const running = useRef(false);

  const value = useMemo(() => ({ mx, my }), [mx, my]);

  useEffect(() => {
    const w = () => window.innerWidth || 1;
    const h = () => window.innerHeight || 1;

    const onMove = (e: PointerEvent) => {
      targetX.current = (e.clientX / w() - 0.5) * 2;
      targetY.current = (e.clientY / h() - 0.5) * 2;
    };

    const loop = () => {
      if (!running.current) return;
      const cx = mx.get();
      const cy = my.get();
      mx.set(cx + (targetX.current - cx) * SMOOTH);
      my.set(cy + (targetY.current - cy) * SMOOTH);
      raf.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running.current) return;
      running.current = true;
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    // старт, если сразу в центре: всё равно поедем после первого move
    start();

    return () => {
      running.current = false;
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [mx, my]);

  return (
    <MouseParallaxContext.Provider value={value}>
      {children}
    </MouseParallaxContext.Provider>
  );
}
