import type { BezierDefinition, Variants } from "framer-motion";

export const ease: BezierDefinition = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease } },
};

export const stagger = (delayChildren = 0.05, staggerChildren = 0.08): Variants => ({
  hidden: {},
  show: {
    transition: { delayChildren, staggerChildren },
  },
});

export const splitChar: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease },
  },
};
