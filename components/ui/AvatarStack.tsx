import Image from "next/image";
import { cn } from "@/lib/cn";

type AvatarStackProps = {
  avatars: string[];
  /** Avatar diameter in px. */
  size: number;
  /** How much each avatar overlaps the next, in px. */
  overlap: number;
  /** Optional "+N" bubble at the end of the stack. */
  more?: {
    label: string;
    /** Circle image behind the label (lime, dark…). */
    badgeSrc: string;
    className?: string;
  };
  /** Accessible description of the group, e.g. "2,000+ happy students". */
  label: string;
  className?: string;
};

/** Row of overlapping round avatars, optionally ending with a count bubble. */
export function AvatarStack({ avatars, size, overlap, more, label, className }: AvatarStackProps) {
  return (
    <div role="img" aria-label={label} className={cn("flex items-start", className)}>
      {avatars.map((src) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={size}
          height={size}
          className="shrink-0 rounded-full"
          style={{ marginRight: -overlap }}
        />
      ))}
      {more && (
        <span
          className="relative grid shrink-0 place-items-center"
          style={{ width: size, height: size }}
        >
          <Image
            src={more.badgeSrc}
            alt=""
            width={size}
            height={size}
            className="absolute inset-0"
          />
          <span className={cn("relative text-[12px] leading-[1.5] font-bold", more.className)}>
            {more.label}
          </span>
        </span>
      )}
    </div>
  );
}
