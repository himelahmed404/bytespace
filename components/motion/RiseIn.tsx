import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * CSS-only fade-and-rise on page load (no JS), for above-the-fold text. Unlike `Reveal`, it
 * starts on the very first paint, which keeps the Largest Contentful Paint fast.
 */
export function RiseIn({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("motion-safe:animate-rise-in", className)}
      style={{ "--rise-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
