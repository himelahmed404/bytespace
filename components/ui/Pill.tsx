import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PillProps = {
  /** `glass`: frosted chip over images · `soft`: light gray chip on white. */
  variant?: "glass" | "soft";
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

const variants = {
  glass: "bg-[rgba(246,246,246,0.6)] text-black-700 backdrop-blur-[4px]",
  soft: "bg-gray-50 text-gray-700",
};

/** Small rounded label, e.g. "17 Lessons" or "Beginner". */
export function Pill({ variant = "soft", icon, children, className }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-xl px-3 py-1.5 text-center text-label-xs font-medium whitespace-nowrap",
        variants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
