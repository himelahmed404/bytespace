import { cn } from "@/lib/cn";

/**
 * The faint 120px white grid drawn over the blue sections (hero, CTA, auth pages).
 * Uses the exact Figma export (1442×1026, 12% opacity lines), centered on the page.
 */
export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-[url(/images/backgrounds/grid.svg)] bg-[length:1442px_1026px] bg-[position:calc(50%+1px)_-2px] bg-no-repeat",
        className,
      )}
    />
  );
}
