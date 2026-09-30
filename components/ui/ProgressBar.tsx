"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

type ProgressBarProps = {
  value: number;
  /** Accessible name, e.g. "Learning progress". */
  label: string;
  /** Track color class, e.g. `bg-white` on blue cards. */
  track?: string;
  className?: string;
};

/** Rounded progress track that fills up when it scrolls into view. */
export function ProgressBar({ value, label, track = "bg-gray-50", className }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-2 overflow-hidden rounded-xl", track, className)}
    >
      <motion.div
        className="h-full rounded-xl bg-lime"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
