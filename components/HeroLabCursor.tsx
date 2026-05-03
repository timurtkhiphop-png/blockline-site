"use client";

import { useEffect, useRef } from "react";

const SNAP = 100;
const SMOOTH = 0.16;

type Props = { active: boolean };

/**
 * Фиксированное SVG-кольцо, «притяжение» к [data-magnetic-btn] (основные CTA).
 * Позиция обновляется через rAF + прямой DOM, без лишних ре-рендеров.
 */
export function HeroLabCursor({ active }: Props) {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const p = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    const tick = () => {
      p.x += (p.tx - p.x) * SMOOTH;
      p.y += (p.ty - p.y) * SMOOTH;
      const el = ring.current;
      if (el) {
        el.style.transform = `translate3d(${p.x}px, ${p.y}px,0) translate(-50%,-50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      p.tx = e.clientX;
      p.ty = e.clientY;
      if (e.pointerType === "mouse") {
        document.querySelectorAll<HTMLElement>("[data-magnetic-btn]").forEach((btn) => {
          const r = btn.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const d = Math.hypot(e.clientX - cx, e.clientY - cy);
          if (d < SNAP) {
            const w = 1 - d / SNAP;
            p.tx += (cx - e.clientX) * w * 0.55;
            p.ty += (cy - e.clientY) * w * 0.55;
          }
        });
      }
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={ring}
      className="pointer-events-none fixed left-0 top-0 z-[200] h-7 w-7 md:h-8 md:w-8 will-change-transform"
      aria-hidden
    >
      <svg className="h-full w-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="20"
          cy="20"
          r="12"
          className="stroke-white/25"
          strokeWidth="1.2"
        />
        <circle
          cx="20"
          cy="20"
          r="5"
          className="fill-[#00f2ff]/35"
        />
      </svg>
    </div>
  );
}
