"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useRevealAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.set(el, { y: 0, opacity: 1 });
      });
      return;
    }

    const revealTweens: gsap.core.Tween[] = [];
    const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");

    reveals.forEach((el) => {
      const delayStr =
        el.style.getPropertyValue("--delay").trim() ||
        getComputedStyle(el).getPropertyValue("--delay").trim();
      const delay = delayStr ? parseFloat(delayStr) || 0 : 0;
      const tw = gsap.fromTo(
        el,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          delay,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
      revealTweens.push(tw);
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      revealTweens.forEach((tw) => {
        const st = tw.scrollTrigger;
        if (st && st.progress > 0) {
          tw.progress(1, false);
        }
      });
    });

    const counterTriggers: ScrollTrigger[] = [];
    const counters = document.querySelectorAll<HTMLElement>("[data-counter]");
    counters.forEach((el) => {
      const raw = el.dataset.counter ?? "";
      const num = parseInt(raw.replace(/\D/g, ""), 10);
      if (Number.isNaN(num)) return;
      const suffix = raw.replace(/\d/g, "");
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          let done = false;
          const start = performance.now();
          const duration = 1400;
          const step = (now: number) => {
            if (done) return;
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * num) + suffix;
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              done = true;
            }
          };
          requestAnimationFrame(step);
        },
      });
      counterTriggers.push(st);
    });

    return () => {
      revealTweens.forEach((t) => t.kill());
      counterTriggers.forEach((t) => t.kill());
    };
  }, []);
}
