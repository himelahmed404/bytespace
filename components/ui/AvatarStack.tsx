"use client";

import { motion, type Variants } from "motion/react";
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
    /** Label typography & color, e.g. "font-bold leading-[18px] text-ink". */
    className: string;
  };
  /** Accessible description of the group, e.g. "2,000+ happy students". */
  label: string;
  /**
   * Deal-out entrance: the avatars start piled up on the first one, then spread out left → right
   * into place (once, when scrolled into view). `delay` lets the parent card land first.
   */
  dealIn?: { delay: number };
  className?: string;
};

/** Small tilts that make the starting pile look like hand-stacked cards. */
const PILE_TILT = [-8, 6, -4, 9, -6, 4, -9, 7];

/** Row of overlapping round avatars, optionally ending with a count bubble. */
export function AvatarStack({
  avatars,
  size,
  overlap,
  more,
  label,
  dealIn,
  className,
}: AvatarStackProps) {
  const step = size - overlap;
  const variants: Variants = {
    stacked: (i: number) => ({
      x: -i * step,
      rotate: PILE_TILT[i % PILE_TILT.length],
      scale: 0.92,
    }),
    dealt: {
      x: 0,
      rotate: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 180, damping: 20, mass: 0.8 },
    },
  };
  // Static stacks (course cards) skip the animation props entirely.
  const motionProps = (i: number) => (dealIn ? { custom: i, variants } : {});

  return (
    <motion.div
      role="img"
      aria-label={label}
      className={cn("flex items-start", className)}
      {...(dealIn && {
        initial: "stacked",
        whileInView: "dealt",
        viewport: { once: true, amount: 0.6 },
        // Deal from the top of the pile: the last item (on top) flies out first
        transition: { delayChildren: dealIn.delay, staggerChildren: 0.07, staggerDirection: -1 },
      })}
    >
      {avatars.map((src, i) => (
        <motion.span
          key={src}
          {...motionProps(i)}
          className="relative shrink-0"
          style={{ zIndex: i, marginRight: -overlap }}
        >
          <Image
            src={src}
            alt=""
            width={size}
            height={size}
            className="rounded-full object-cover"
            style={{ width: size, height: size }}
          />
        </motion.span>
      ))}
      {more && (
        <motion.span
          {...motionProps(avatars.length)}
          className="relative grid shrink-0 place-items-center"
          style={{ zIndex: avatars.length, width: size, height: size }}
        >
          <Image
            src={more.badgeSrc}
            alt=""
            width={size}
            height={size}
            className="absolute inset-0"
          />
          <span className={cn("relative text-[12px]", more.className)}>{more.label}</span>
        </motion.span>
      )}
    </motion.div>
  );
}
