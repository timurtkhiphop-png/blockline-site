"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ThreadLine() {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) return;

    const updateSize = () => {
      const h = Math.max(
        document.documentElement.scrollHeight,
        document.body?.scrollHeight ?? 0,
        window.innerHeight
      );
      svg.setAttribute("height", String(h));
      svg.setAttribute("viewBox", `0 0 1 ${h}`);
      path.setAttribute("d", `M0.5,0 L0.5,${h}`);
    };

    updateSize();

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const draw = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    const fade = gsap.to(path, {
      opacity: 0,
      ease: "power2.in",
      scrollTrigger: {
        trigger: document.body,
        start: "92% top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    const onResize = () => {
      updateSize();
      const newLen = path.getTotalLength();
      gsap.set(path, { strokeDasharray: newLen });
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize, { passive: true });
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", onResize);
      draw.scrollTrigger?.kill();
      fade.scrollTrigger?.kill();
      gsap.killTweensOf(path);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed left-[48px] top-0 z-30 hidden md:block"
      width={1}
      height={800}
      style={{ willChange: "transform" }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        ref={pathRef}
        d="M0.5,0 L0.5,800"
        stroke="rgba(0,212,184,0.35)"
        strokeWidth={1}
        fill="none"
        style={{ filter: "drop-shadow(0 0 3px rgba(0,212,184,0.4))" }}
      />
    </svg>
  );
}
