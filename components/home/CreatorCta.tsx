import { FloatingOrnament, type FloatingOrnamentProps } from "@/components/motion/FloatingOrnament";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { GridBackground, REGULAR_GRID_ROWS } from "@/components/ui/GridBackground";
import { ORNAMENT_TINT } from "@/components/ui/Ornament";

const { lime: LIME, white: WHITE } = ORNAMENT_TINT;

type CtaOrnament = Omit<FloatingOrnamentProps, "trigger" | "className">;

/** 3D ornaments around the banner, positioned on the 1440×488 Figma frame (Figma z-order). */
const ornaments: CtaOrnament[] = [
  {
    shape: "pyramid",
    tint: LIME,
    x: 1078,
    y: -0.4,
    size: 188.93,
    enter: 0.1,
    float: { duration: 6.5, delay: 0.4, distance: -12, rotate: 8 },
  },
  {
    shape: "coil",
    tint: LIME,
    x: 1106.93,
    y: 289,
    size: 331.53,
    enter: 0.3,
    float: { duration: 8, delay: 0.9, distance: -16, rotate: 3 },
  },
  {
    shape: "zigzag",
    tint: LIME,
    x: -121.58,
    y: -162,
    size: 386.79,
    enter: 0,
    float: { duration: 7, delay: 0, distance: -18, rotate: 4 },
  },
  {
    shape: "zigzag",
    tint: WHITE,
    x: 178.82,
    y: 5,
    size: 175.81,
    flip: true,
    enter: 0.2,
    float: { duration: 6, delay: 1.2, distance: -12, rotate: -5 },
  },
  {
    shape: "cone",
    tint: WHITE,
    x: -49.97,
    y: 224.59,
    size: 188.93,
    enter: 0.25,
    float: { duration: 7.5, delay: 0.6, distance: -14, rotate: -6 },
  },
  {
    shape: "torus",
    tint: LIME,
    x: 16.41,
    y: 298.26,
    size: 343.68,
    enter: 0.35,
    float: { duration: 9, delay: 1.8, distance: -20, rotate: -6 },
  },
  {
    shape: "cylinder",
    tint: WHITE,
    x: 1222.11,
    y: 5.2,
    size: 371.82,
    enter: 0.15,
    float: { duration: 7.5, delay: 1.4, distance: -14, rotate: 5 },
  },
];

/** Blue "become a creator" banner with floating 3D ornaments. */
export function CreatorCta() {
  return (
    <section
      aria-labelledby="creator-cta-title"
      className="relative isolate h-[488px] overflow-hidden bg-primary"
    >
      <GridBackground rows={REGULAR_GRID_ROWS} />

      <div className="relative container-page flex flex-col items-center gap-10 pt-[85px] text-center">
        <Reveal>
          <h2
            id="creator-cta-title"
            className="max-w-[710px] font-heading text-heading-m font-semibold text-gray-50"
          >
            Unlock Your Potential as a Creator with ByteSpace
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-[964px] text-body-l text-gray-50">
            Experience the collaboration of numerous creators and an expanding selection of courses.
            Register now and become a part of a community comprising over 10,000 local and
            international creators. Utilize our Course Editor, and showcase your expertise by
            publishing your finest course on the ByteSpace Course Library.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <Button href="/register">Join as Creator</Button>
        </Reveal>
      </div>

      {/* The ornaments start below the clipped banner, so the whole layer triggers their entrance */}
      <RevealGroup className="pointer-events-none absolute inset-y-0 left-[calc(50%-720px)] w-[1440px]">
        {ornaments.map((o, i) => (
          <FloatingOrnament
            key={`${o.shape}-${i}`}
            {...o}
            enterRotate={i % 2 ? 10 : -10}
            trigger="parent"
          />
        ))}
      </RevealGroup>
    </section>
  );
}
