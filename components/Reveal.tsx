"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [forceShow, setForceShow] = useState(false);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px 20% 0px",
  });

  useEffect(() => {
    const t = setTimeout(() => setForceShow(true), 2000);
    return () => clearTimeout(t);
  }, []);

  if (reduce) return <div className={className}>{children}</div>;

  const show = isInView || forceShow;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
