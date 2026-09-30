"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Seconds before the entrance starts. */
  delay?: number;
  /** Starting vertical offset in px (positive = starts lower and rises). */
  y?: number;
  /** Starting scale. */
  scale?: number;
  /** Starting rotation in degrees. */
  rotate?: number;
  duration?: number;
  /**
   * `view` (default): play the first time the element scrolls into view.
   * `mount`: play as soon as the page loads — for above-the-fold content like the hero.
   */
  trigger?: "view" | "mount";
};

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children into place, on page load or when scrolled into view. */
export function Reveal({
  delay = 0,
  y = 24,
  scale = 1,
  rotate = 0,
  duration = 0.8,
  trigger = "view",
  children,
  ...rest
}: RevealProps) {
  const visible = { opacity: 1, y: 0, scale: 1, rotate: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, y, scale, rotate }}
      {...(trigger === "mount"
        ? { animate: visible }
        : { whileInView: visible, viewport: { once: true, amount: 0.2 } })}
      transition={{ duration, delay, ease: easeOutQuint }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
