import type { CSSProperties, ReactNode } from "react";
import { Float } from "@/components/motion/Float";
import { Reveal } from "@/components/motion/Reveal";
import { CardShadow } from "@/components/ui/CardShadow";
import { cn } from "@/lib/cn";

type FloatingCardProps = {
  /** Positioning classes (the wrapper is `absolute`). */
  className?: string;
  style?: CSSProperties;
  /** `mount` for above-the-fold content, `view` to play when scrolled into view. */
  trigger?: "mount" | "view";
  /** Seconds before it rises into place. */
  enter?: number;
  float: { duration: number; delay?: number; distance: number };
  children: ReactNode;
};

/** A card that rises in from below, then floats with a soft shadow underneath. */
export function FloatingCard({
  className,
  style,
  trigger = "view",
  enter = 0,
  float,
  children,
}: FloatingCardProps) {
  return (
    <Reveal
      className={cn("absolute", className)}
      style={style}
      trigger={trigger}
      y={120}
      delay={enter}
      duration={1.3}
    >
      <Float {...float} shadow={<CardShadow />}>
        {children}
      </Float>
    </Reveal>
  );
}
