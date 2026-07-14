"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { useLoading } from "./LoadingContext";

export function Preloader() {
  const { progress, active } = useProgress();
  const { isLoaded, setIsLoaded } = useLoading();
  const [displayProgress, setDisplayProgress] = useState(0);
  const targetProgress = useRef(0);

  useEffect(() => {
    let rAF: number;
    const start = performance.now();
    const minDuration = 1500; // Minimum 1.5 seconds loading screen

    const update = () => {
      const elapsed = performance.now() - start;
      let timeProgress = (elapsed / minDuration) * 100;
      
      // If WebGL is still actively loading assets, cap at 98%
      if (active && progress < 100) {
         timeProgress = Math.min(timeProgress, 98);
      } else {
         // If no assets are loading, or they finished, let it go to 100
         timeProgress = Math.min(timeProgress, 100);
      }

      targetProgress.current = Math.max(targetProgress.current, timeProgress);

      setDisplayProgress((prev) => {
        // Smoothly interpolate towards target
        const next = prev + (targetProgress.current - prev) * 0.15;
        if (targetProgress.current === 100 && next > 99.5) {
          return 100;
        }
        return next;
      });

      rAF = requestAnimationFrame(update);
    };

    rAF = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rAF);
  }, [progress, active]);

  // Trigger isLoaded when we hit exactly 100
  useEffect(() => {
    if (displayProgress === 100) {
      const timeout = setTimeout(() => {
        setIsLoaded(true);
      }, 200); // short beat at 100%
      return () => clearTimeout(timeout);
    }
  }, [displayProgress, setIsLoaded]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#020c0c] text-white overflow-hidden touch-none"
        >
          <div className="flex flex-col items-center justify-center gap-6 relative z-10">
            <span 
              className="text-[clamp(80px,15vw,200px)] font-black leading-none tracking-tighter"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {Math.floor(displayProgress)}%
            </span>
            <span 
              className="text-[10px] uppercase tracking-[0.4em] text-[var(--site-muted)]"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              Initialising WebGL
            </span>
          </div>
          
          <div className="absolute bottom-16 left-1/2 w-[240px] max-w-[80vw] -translate-x-1/2 h-[1px] bg-white/10 overflow-hidden">
            <motion.div 
              className="h-full bg-[var(--site-accent)]"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
