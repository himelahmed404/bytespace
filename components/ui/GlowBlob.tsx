import { cn } from "@/lib/cn";

type GlowBlobProps = {
  color: "blue" | "lime";
  /** Figma fill opacity (0–1). */
  opacity: number;
  /** Top-left position and diameter on the section's 1440px Figma frame, in px. */
  x: number;
  y: number;
  size: number;
  className?: string;
};

const rgb = { blue: "0 59 226", lime: "203 252 1" };

/**
 * Soft radial glow used behind the light sections. Same gradient stops as Figma
 * (100% → 23% → 6% → 0%); Figma's extra layer blur is skipped because the gradient is already
 * soft and blurring 1000px layers is expensive.
 */
export function GlowBlob({ color, opacity, x, y, size, className }: GlowBlobProps) {
  const c = rgb[color];
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        opacity,
        background: `radial-gradient(closest-side, rgb(${c}) 0%, rgb(${c} / 0.23) 53%, rgb(${c} / 0.06) 75%, rgb(${c} / 0) 100%)`,
      }}
    />
  );
}
