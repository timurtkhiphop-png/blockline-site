"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
};

export function Magnetic({ children, strength = 18, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.3 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.3 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mx.set((dx / rect.width) * strength);
    my.set((dy / rect.height) * strength);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
