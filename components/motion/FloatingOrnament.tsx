import { Float } from "@/components/motion/Float";
import { Reveal } from "@/components/motion/Reveal";
import { Ornament, OrnamentShadow, type OrnamentShape } from "@/components/ui/Ornament";
import { cn } from "@/lib/cn";

export type FloatingOrnamentProps = {
  shape: OrnamentShape;
  tint: string;
  /** Position of the render's box on the section's Figma frame, in px. */
  x: number;
  y: number;
  size: number;
  flip?: boolean;
  /** Seconds before it rises into place. */
  enter?: number;
  /** Starting tilt for the entrance, in degrees. */
  enterRotate?: number;
  float: { duration: number; delay: number; distance: number; rotate: number };
  /** See `Reveal` — use `parent` inside a `RevealGroup`. */
  trigger?: "mount" | "view" | "parent";
  className?: string;
};

/** A 3D ornament that rises in, then floats forever with a cast shadow that reacts to height. */
export function FloatingOrnament({
  shape,
  tint,
  x,
  y,
  size,
  flip,
  enter = 0,
  enterRotate = -10,
  float,
  trigger = "view",
  className,
}: FloatingOrnamentProps) {
  return (
    <Reveal
      className={cn("absolute", className)}
      style={{ left: x, top: y }}
      trigger={trigger}
      y={160}
      rotate={enterRotate}
      delay={enter}
      duration={1.6}
    >
      <Float {...float} shadow={<OrnamentShadow shape={shape} size={size} flip={flip} />}>
        <Ornament shape={shape} tint={tint} size={size} flip={flip} />
      </Float>
    </Reveal>
  );
}
