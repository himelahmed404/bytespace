"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

/** Rounded progress track that fills up when it scrolls into view. */
export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-2 overflow-hidden rounded-xl bg-gray-50", className)}
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
