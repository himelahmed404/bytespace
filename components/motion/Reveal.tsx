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
   * `parent`: play when the surrounding `RevealGroup` scrolls into view — for elements that start
   * outside a clipped section, where their own visibility can't be observed.
   */
  trigger?: "view" | "mount" | "parent";
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
  const hidden = { opacity: 0, y, scale, rotate };
  const visible = { opacity: 1, y: 0, scale: 1, rotate: 0 };
  const transition = { duration, delay, ease: easeOutQuint };

  if (trigger === "parent") {
    return (
      <motion.div variants={{ hidden, visible: { ...visible, transition } }} {...rest}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={hidden}
      {...(trigger === "mount"
        ? { animate: visible }
        : { whileInView: visible, viewport: { once: true, amount: 0.2 } })}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Starts the entrance of every `<Reveal trigger="parent">` inside it once this wrapper is
 * scrolled into view.
 */
export function RevealGroup({
  amount = 0.3,
  children,
  ...rest
}: HTMLMotionProps<"div"> & { amount?: number }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount }} {...rest}>
      {children}
    </motion.div>
  );
}
