import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  /** `m` = 44px (Heading M) · `s` = 36px (Heading S) */
  size?: "m" | "s";
  /** Used to match the Figma line breaks, e.g. `max-w-[588px]`. */
  titleClassName?: string;
  className?: string;
};

/** Centered section title + gray intro paragraph. */
export function SectionHeading({
  title,
  description,
  size = "m",
  titleClassName,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4 text-center", className)}>
      <h2
        className={cn(
          // Balanced wrapping below 1024px avoids a lone last word; desktop keeps Figma's breaks
          "font-heading font-semibold text-navy max-lg:text-balance",
          size === "m"
            ? "text-[30px]/9 tracking-[-0.01em] sm:text-[36px]/[43px] lg:text-heading-m"
            : "text-[26px]/8 tracking-[-0.01em] sm:text-heading-s",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {/* Figma box is 917px; Chrome measures text ~0.5% wider, so allow slack to keep Figma's line breaks */}
      {description && (
        <p className="max-w-[926px] text-body-m text-gray-400 sm:text-body-l">{description}</p>
      )}
    </div>
  );
}
