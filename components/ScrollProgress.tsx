"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useTouch } from "@/hooks/useTouch";

export function ScrollProgress() {
  const isTouch = useTouch();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.35,
  });

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-transparent via-cyan-400 to-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
    />
  );
}
