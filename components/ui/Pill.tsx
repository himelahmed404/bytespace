import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PillProps = {
  /** `glass`: frosted chip over images · `soft`: light gray chip on white. */
  variant?: "glass" | "soft";
  /** `tight` (1.2) = 26px-tall chip · `relaxed` (20px) = 32px-tall chip. */
  lineHeight?: "tight" | "relaxed";
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

const variants = {
  glass: "bg-[rgba(246,246,246,0.6)] text-black-700 backdrop-blur-[4px]",
  soft: "bg-gray-50 text-gray-700",
};

/** Small rounded label, e.g. "17 Lessons" or "Beginner". */
export function Pill({
  variant = "soft",
  lineHeight = "tight",
  icon,
  children,
  className,
}: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-xl px-3 py-1.5 text-center text-[12px] font-medium whitespace-nowrap",
        lineHeight === "tight" ? "leading-[1.2]" : "leading-5",
        variants[variant],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
