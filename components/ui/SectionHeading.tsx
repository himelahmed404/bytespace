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
          "font-heading font-semibold text-navy",
          size === "m" ? "text-heading-m" : "text-heading-s",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {/* Figma box is 917px; Chrome measures text ~0.5% wider, so allow slack to keep Figma's line breaks */}
      {description && <p className="max-w-[926px] text-body-l text-gray-400">{description}</p>}
    </div>
  );
}
