import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * Faint white grid on the blue sections (hero, CTA, auth pages).
 *
 * Matches the Figma grid exactly (2px lines at 12% opacity, 120px columns aligned to the centered
 * 1440px frame, rows at the Figma y positions) but repeats the columns so it spans any screen
 * width. Lines are drawn solid on a 12%-opacity layer, so crossings aren't brighter than lines.
 */

/** Bottom edge (px) of each 2px horizontal line, from the Figma frame. */
const ROWS = [120, 240, 360, 480, 606, 720, 840, 960];
const FRAME_HEIGHT = 1024;

const rows = `linear-gradient(to bottom, ${ROWS.map(
  (y) => `transparent ${y - 2}px, #fff ${y - 2}px, #fff ${y}px, transparent ${y}px`,
).join(", ")})`;
const columns = "linear-gradient(to right, #fff 2px, transparent 2px)";

const style: CSSProperties = {
  backgroundImage: `${rows}, ${columns}`,
  backgroundSize: `100% ${FRAME_HEIGHT}px, 120px ${FRAME_HEIGHT}px`,
  backgroundRepeat: "no-repeat, repeat-x",
  // For a 120px tile, `50% + 60px` puts a column exactly on the page center (x = 720 in Figma).
  backgroundPosition: "0 0, calc(50% + 60px) 0",
};

export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 opacity-12", className)}
      style={style}
    />
  );
}
