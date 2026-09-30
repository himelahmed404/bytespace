"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type CountUpProps = {
  /** Final number, e.g. 12 for "12K". */
  value: number;
  /** Text after the number, e.g. "K" or "+". */
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 * - Server-renders the final value (SEO / no-JS friendly).
 * - Writes straight to the text node while animating: no React re-render per frame.
 * - Skips the count for reduced-motion users.
 */
export function CountUp({ value, suffix = "", duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = textRef.current;
    if (!el || reduceMotion) return;
    const render = (v: number) => {
      el.textContent = `${Math.round(v)}${suffix}`;
    };
    if (!inView) {
      render(0);
      return;
    }
    const controls = animate(0, value, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: render });
    return () => controls.stop();
  }, [inView, reduceMotion, value, suffix, duration]);

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      <span ref={textRef} aria-hidden>
        {value}
        {suffix}
      </span>
    </span>
  );
}
