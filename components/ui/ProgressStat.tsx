"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type ProgressStatProps = {
  /** Percentage, 0–100. */
  value: number;
  /** Accessible name for the progress bar. */
  label: string;
  /** Seconds to wait after scrolling into view (e.g. until the card has landed). */
  delay?: number;
  duration?: number;
  className?: string;
};

/**
 * Big percentage + progress bar that count up together from 0. One motion value drives both, so
 * the number and the bar can never drift apart. Reduced-motion users see the final state.
 */
export function ProgressStat({
  value,
  label,
  delay = 0.2,
  duration = 1.8,
  className,
}: ProgressStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const width = useTransform(progress, (v) => `${v}%`);

  useEffect(() => {
    const render = (v: number) => {
      if (numberRef.current) numberRef.current.textContent = `${Math.round(v)}%`;
    };
    if (reduceMotion) {
      progress.set(value);
      render(value);
      return;
    }
    if (!inView) {
      progress.set(0);
      render(0);
      return;
    }
    const controls = animate(progress, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: render,
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, delay, duration, progress]);

  return (
    <div ref={ref} className={cn("flex flex-col gap-2", className)}>
      <p className="w-[200px] font-heading text-[48px] leading-[58px] font-semibold tracking-[-0.01em] text-ink">
        <span className="sr-only">{value}%</span>
        <span ref={numberRef} aria-hidden>
          {value}%
        </span>
      </p>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-[200px] overflow-hidden rounded-xl bg-gray-50"
      >
        <motion.div className="h-full rounded-xl bg-lime" style={{ width }} />
      </div>
    </div>
  );
}
