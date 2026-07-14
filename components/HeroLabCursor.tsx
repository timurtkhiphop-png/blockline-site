"use client";

import { useEffect, useRef } from "react";

const SNAP = 100;

type Props = { active: boolean };

/**
 * SVG-кольцо по всему сайту; лёгкое «притяжение» к [data-magnetic-btn] и [data-lab-magnetic].
 * Позиция обновляется напрямую из pointermove — без lerp и rAF-цикла.
 */
export function HeroLabCursor({ active }: Props) {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const onMove = (e: PointerEvent) => {
      let x = e.clientX;
      let y = e.clientY;
      if (e.pointerType === "mouse") {
        document.querySelectorAll<HTMLElement>("[data-magnetic-btn], [data-lab-magnetic]").forEach((btn) => {
          const r = btn.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const d = Math.hypot(e.clientX - cx, e.clientY - cy);
          if (d < SNAP) {
            const w = 1 - d / SNAP;
            x += (cx - e.clientX) * w * 0.55;
            y += (cy - e.clientY) * w * 0.55;
          }
        });
      }
      const el = ring.current;
      if (el) {
        el.style.transform = `translate3d(${x}px, ${y}px,0) translate(-50%,-50%)`;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
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
