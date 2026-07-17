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

import { usePathname, useSearchParams } from "next/navigation";
import { useRef, Suspense } from "react";

function SmoothScroll() {
  const { isLoaded } = useLoading();
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Disable Lenis entirely on touch devices to rely on native scroll and fix sticky scroll bugs
    const isTouch = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    if (isTouch) {
      return;
    }
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    if (!isLoaded) {
      lenis.stop();
    } else {
      lenis.start();
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isLoaded]);

  const isPopState = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      isPopState.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    // Reset scroll on route change, but wait for next frame to let Next.js and DOM settle
    requestAnimationFrame(() => {
      if (isPopState.current) {
        // It was a Back/Forward navigation. Let native scroll restoration handle it.
        isPopState.current = false;
        return;
      }
      
      // Normal navigation. If no hash is present, scroll to top immediately.
      if (!window.location.hash) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
  }, [pathname, searchParams]);

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
      <Suspense fallback={null}>
        <SmoothScroll />
      </Suspense>
      <MouseParallaxProvider>
        {labCursorOn ? <HeroLabCursor active /> : null}
        {children}
      </MouseParallaxProvider>
    </LoadingProvider>
  );
}
