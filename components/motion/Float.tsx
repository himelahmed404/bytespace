import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type FloatProps = {
  children: ReactNode;
  /** Seconds for one full up-and-down cycle. */
  duration?: number;
  /** Seconds to offset the cycle, so neighbours don't move in sync. */
  delay?: number;
  /** Vertical travel in px (negative = up). */
  distance?: number;
  /** Tilt in degrees at the top of the cycle. */
  rotate?: number;
  /**
   * Optional cast shadow. It stays in place and shrinks/fades while the element rises, which
   * sells the depth. Rendered behind the element.
   */
  shadow?: ReactNode;
  className?: string;
};

/**
 * Infinite, GPU-friendly floating loop (pure CSS, transform/opacity only — no JS, no repaints).
 * Disabled automatically for users who prefer reduced motion.
 */
export function Float({
  children,
  duration = 6,
  delay = 0,
  distance = -14,
  rotate = 0,
  shadow,
  className,
}: FloatProps) {
  const style = {
    "--float-duration": `${duration}s`,
    "--float-delay": `${delay}s`,
    "--float-y": `${distance}px`,
    "--float-rotate": `${rotate}deg`,
  } as CSSProperties;

  return (
    <div className={cn("relative", className)} style={style}>
      {shadow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 will-change-transform motion-safe:animate-float-shadow"
        >
          {shadow}
        </div>
      )}
      <div className="relative will-change-transform motion-safe:animate-float">{children}</div>
    </div>
  );
}
