"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { useRevealAnimations } from "@/hooks/useRevealAnimations";
import { HeroLabCursor } from "@/components/HeroLabCursor";
import { MouseParallaxProvider } from "@/components/MouseParallaxProvider";
import { LoadingProvider, useLoading } from "@/components/LoadingContext";
import { Preloader } from "@/components/Preloader";

function usePointerFine() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const f = () => setOk(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return ok;
}

function SmoothScroll() {
  const { isLoaded } = useLoading();

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    if (!isLoaded) {
      lenis.stop();
    } else {
      lenis.start();
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoaded]);

  return null;
}

export default function ClientShell({ children }: { children: ReactNode }) {
  useRevealAnimations();
  const finePointer = usePointerFine();
  const reducedMotion = useReducedMotion();
  const labCursorOn = finePointer && !reducedMotion;

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("lab-site-cursor", labCursorOn);
    return () => document.body.classList.remove("lab-site-cursor");
  }, [labCursorOn]);

  return (
    <LoadingProvider>
      <Preloader />
      <SmoothScroll />
      <MouseParallaxProvider>
        {labCursorOn ? <HeroLabCursor active /> : null}
        {children}
      </MouseParallaxProvider>
    </LoadingProvider>
  );
}
