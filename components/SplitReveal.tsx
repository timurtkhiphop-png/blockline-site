"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  asOne?: boolean;
};

/**
 * Слова поднимаются снизу. Используем один ref + useInView: при жёстком whileInView
 * на каждом слове (amount: 0.5) крупные заголовки не доходили до порога — текст
 * оставался невидимым за overflow-hidden.
 */
export function SplitReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  asOne = false,
}: Props) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLSpanElement>(null);
  const [forceShow, setForceShow] = useState(false);

  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.08,
    margin: "0px 0px 25% 0px",
  });

  useEffect(() => {
    const t = setTimeout(() => setForceShow(true), 2000);
    return () => clearTimeout(t);
  }, []);

  const show = reduce || isInView || forceShow;
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  if (asOne) {
    return (
      <span ref={containerRef} className={className} aria-label={text}>
        <motion.span
          className="inline-block overflow-hidden align-bottom"
          initial={{ y: "110%", opacity: 0 }}
          animate={show ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
          transition={{ duration: 0.9, ease, delay }}
        >
          {text}
        </motion.span>
      </span>
    );
  }

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={false}
            animate={show ? { y: 0 } : { y: "110%" }}
            transition={{
              duration: 0.9,
              ease,
              delay: delay + i * stagger,
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
