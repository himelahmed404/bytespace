import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type FitToWidthProps = {
  /** Design size of the canvas in px (children are laid out on it with Figma coordinates). */
  width: number;
  height: number;
  children: ReactNode;
  className?: string;
};

/**
 * Keeps a hand-placed composition (photo + floating cards + ornaments) intact on small screens by
 * scaling the whole canvas down to the available width. Pure CSS: no measuring in JS, so no
 * layout shift, and at full width it renders 1:1.
 */
export function FitToWidth({ width, height, children, className }: FitToWidthProps) {
  return (
    <div className={cn("@container w-full", className)}>
      <div
        className="relative mx-auto w-full"
        style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left fit-scale"
          style={{ width, height, "--fit-w": `${width}px` } as CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
