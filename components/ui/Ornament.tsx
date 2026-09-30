import Image from "next/image";
import { cn } from "@/lib/cn";

export type OrnamentShape = "zigzag" | "coil" | "torus" | "cylinder" | "pyramid";

type OrnamentProps = {
  shape: OrnamentShape;
  /** Tint color blended over the gray 3D render (e.g. lime or off-white). */
  tint: string;
  /** Rendered width & height in px (renders are square). */
  size: number;
  /** Mirror horizontally. */
  flip?: boolean;
  className?: string;
};

/**
 * A 3D ornament, colored exactly like the Figma file: a neutral gray render with a solid color
 * layer on top, masked to the shape and blended with `hard-light`. `isolate` keeps the blend
 * inside the ornament so it can float over any background.
 */
const maskUrl = (shape: OrnamentShape) => `url(/images/ornaments/${shape}-mask.webp)`;

export function Ornament({ shape, tint, size, flip = false, className }: OrnamentProps) {
  const mask = maskUrl(shape);

  return (
    <div
      aria-hidden
      className={cn("relative isolate", flip && "-scale-x-100", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src={`/images/ornaments/${shape}.png`}
        alt=""
        fill
        sizes={`${Math.ceil(size)}px`}
        quality={90}
        className="object-cover"
      />
      <div
        className="absolute inset-0 mix-blend-hard-light"
        style={{
          backgroundColor: tint,
          maskImage: mask,
          WebkitMaskImage: mask,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      />
    </div>
  );
}

/**
 * Soft cast shadow in the ornament's own silhouette: the shape mask filled with navy, blurred and
 * dropped down-right, so the ornament looks lifted off the page. Reuses the already-loaded mask
 * (no extra download); pair it with `<Float shadow={…}>` so it reacts to the floating motion.
 */
export function OrnamentShadow({
  shape,
  size,
  flip = false,
}: Pick<OrnamentProps, "shape" | "size" | "flip">) {
  const mask = maskUrl(shape);

  // The blur lives on the wrapper: CSS applies `filter` before `mask`, so blurring the masked
  // element itself would leave a hard-edged silhouette.
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        filter: `blur(${Math.round(size * 0.025)}px)`,
        translate: `${Math.round(size * 0.02)}px ${Math.round(size * 0.06)}px`,
      }}
    >
      <div
        className={cn("absolute inset-0", flip && "-scale-x-100")}
        style={{
          backgroundColor: "rgb(4 8 25 / 0.225)",
          maskImage: mask,
          WebkitMaskImage: mask,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      />
    </div>
  );
}
