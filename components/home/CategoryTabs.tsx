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
      className={cn(
        // Phones: one swipeable row · ≥768px: the three centered rows from the design
        "-mx-4 flex w-[calc(100%+2rem)] [scrollbar-width:none] gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 md:mx-0 md:w-auto md:flex-col md:gap-[21px] md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex shrink-0 items-center gap-3 md:flex-wrap md:justify-center md:gap-4"
        >
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
              className="shrink-0 text-label-m font-medium whitespace-nowrap text-primary transition-opacity hover:opacity-70"
            >
              + More
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
