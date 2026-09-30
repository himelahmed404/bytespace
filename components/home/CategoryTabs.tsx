"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type CategoryTabsProps = {
  rows: string[][];
  active: string;
  onChange: (category: string) => void;
  className?: string;
};

/**
 * Pill-shaped category filters in centered rows. The lime "active" pill slides between
 * categories (shared layout animation).
 */
export function CategoryTabs({ rows, active, onChange, className }: CategoryTabsProps) {
  return (
    <div
      role="group"
      aria-label="Filter courses by category"
      className={cn("flex flex-col gap-[21px]", className)}
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap items-center justify-center gap-4">
          {row.map((category) => {
            const isActive = category === active;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(category)}
                className={cn(
                  "relative isolate rounded-xl px-4 py-3 text-label-m font-medium whitespace-nowrap transition-colors duration-200",
                  isActive
                    ? "text-ink"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-ink",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-category"
                    className="absolute inset-0 -z-10 rounded-xl bg-lime"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {category}
              </button>
            );
          })}
          {rowIndex === rows.length - 1 && (
            <Link
              href="#categories"
              className="text-label-m font-medium text-primary transition-opacity hover:opacity-70"
            >
              + More
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
