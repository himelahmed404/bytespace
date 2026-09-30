import Image from "next/image";
import type { CSSProperties } from "react";
import { HappyStudentsCard } from "@/components/cards/HappyStudentsCard";
import { ProgressCard } from "@/components/cards/ProgressCard";
import { TopicCard } from "@/components/cards/TopicCard";
import { HeroSearch } from "@/components/home/HeroSearch";
import { FloatingCard } from "@/components/motion/FloatingCard";
import { FloatingOrnament, type FloatingOrnamentProps } from "@/components/motion/FloatingOrnament";
import { Reveal } from "@/components/motion/Reveal";
import { RiseIn } from "@/components/motion/RiseIn";
import { SiteHeader } from "@/components/SiteHeader";
import { GridBackground } from "@/components/ui/GridBackground";
import { ORNAMENT_TINT } from "@/components/ui/Ornament";

const { lime: LIME, white: WHITE } = ORNAMENT_TINT;

/** 3D ornaments, positioned on the 1440×1024 Figma frame (x/y/size in px). */
/** `desktopOnly`: sits above the mobile crop of the collage, so it is hidden below 1024px. */
const ornaments: Array<
  Omit<FloatingOrnamentProps, "trigger" | "className"> & { desktopOnly?: boolean }
> = [
  {
    shape: "coil",
    enter: 0.85,
    tint: WHITE,
    x: 1123.93,
    y: 672,
    size: 331.53,
    float: { duration: 8, delay: 0.5, distance: -16, rotate: 3 },
  },
  {
    shape: "zigzag",
    enter: 0.35,
    tint: LIME,
    desktopOnly: true,
    x: -121.58,
    y: 221,
    size: 386.79,
    float: { duration: 7, delay: 0, distance: -18, rotate: 4 },
  },
  {
    shape: "zigzag",
    enter: 0.55,
    tint: WHITE,
    x: 183.82,
    y: 477,
    size: 175.81,
    flip: true,
    float: { duration: 6, delay: 1, distance: -12, rotate: -5 },
  },
  {
    shape: "torus",
    enter: 0.75,
    tint: WHITE,
    x: 14.41,
    y: 681.26,
    size: 343.68,
    float: { duration: 9, delay: 2, distance: -20, rotate: -6 },
  },
  {
    shape: "cylinder",
    desktopOnly: true,
    enter: 0.45,
    tint: LIME,
    x: 1227.11,
    y: 220.2,
    size: 371.82,
    float: { duration: 7.5, delay: 1.5, distance: -14, rotate: 5 },
  },
  {
    shape: "pyramid",
    enter: 0.65,
    tint: WHITE,
    x: 1104.03,
    y: 463.59,
    size: 188.93,
    float: { duration: 6.5, delay: 0.8, distance: -12, rotate: 8 },
  },
];

export function Hero() {
  return (
    <section className="relative isolate flex flex-col overflow-hidden bg-primary lg:block lg:h-[1024px]">
      <GridBackground />

      <SiteHeader className="z-[60]" />

      <div className="relative z-10 container-page mt-6 flex flex-col items-center gap-10 text-center lg:mt-[49px] lg:gap-[60px]">
        <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8">
          <RiseIn delay={0.05}>
            <h1 className="max-w-[935px] font-heading text-[40px]/[48px] font-semibold tracking-[-0.01em] text-white sm:text-[56px]/[67px] lg:text-heading-l">
              Get Access to Hundreds Courses Available
            </h1>
          </RiseIn>
          <RiseIn delay={0.15}>
            <p className="text-body-m text-gray-100 sm:text-body-l">
              Unlock your creativity, gain valuable knowledge, and grow your business with our wide
              range of courses.
            </p>
          </RiseIn>
        </div>
        <RiseIn delay={0.25} className="flex w-full justify-center lg:w-auto">
          <HeroSearch />
        </RiseIn>
      </div>

      {/*
        Decorative collage laid out on the 1440×1024 Figma frame.
        ≥1024px: fills the hero behind the text, exactly as designed.
        <1024px: its central lower part (x 240→1200, y 470→1024: ring, student, cards) sits below
        the text, scaled to the screen width so the composition stays intact.
      */}
      <div className="@container relative mt-8 aspect-[960/554] w-full overflow-hidden lg:@container-normal lg:absolute lg:inset-0 lg:mt-0 lg:aspect-auto lg:overflow-visible">
        <div
          className="pointer-events-none absolute top-0 left-0 h-[1024px] w-[1440px] origin-top-left max-lg:[translate:calc(-240px*var(--fit))_calc(-470px*var(--fit))] max-lg:fit-scale lg:left-[calc(50%-720px)] lg:h-full"
          style={{ "--fit-w": "960px" } as CSSProperties}
        >
          <Reveal
            className="absolute top-[582px] left-[145px]"
            trigger="mount"
            y={80}
            delay={0.2}
            duration={1}
          >
            <Image
              src="/images/backgrounds/hero-ring.svg"
              alt=""
              width={1149}
              height={1149}
              loading="eager"
            />
          </Reveal>

          <Reveal
            className="absolute top-[512px] left-[431px] z-20"
            trigger="mount"
            y={80}
            delay={0.2}
            duration={1}
          >
            <Image
              src="/images/people/hero-student.png"
              alt="Smiling student wearing headphones and holding a laptop"
              width={578}
              height={541}
              sizes="(min-width: 1024px) 578px, 40vw"
              quality={90}
              loading="eager"
              fetchPriority="high"
              style={{ filter: "url(#shadow-a)" }}
            />
          </Reveal>

          <FloatingCard
            trigger="mount"
            className="top-[651px] left-[842px] z-30"
            enter={1}
            float={{ duration: 5, delay: 0.4, distance: -10 }}
          >
            <ProgressCard value={55} />
          </FloatingCard>

          <FloatingCard
            trigger="mount"
            className="top-[837px] left-[328px] z-30"
            enter={1.1}
            float={{ duration: 5.5, delay: 1.2, distance: -10 }}
          >
            <HappyStudentsCard />
          </FloatingCard>

          {ornaments.map(({ desktopOnly, ...o }, i) => (
            <FloatingOrnament
              key={`${o.shape}-${i}`}
              {...o}
              enterRotate={i % 2 ? 10 : -10}
              trigger="mount"
              className={desktopOnly ? "z-40 max-lg:hidden" : "z-40"}
            />
          ))}

          <FloatingCard
            trigger="mount"
            className="top-[639px] left-[404px] z-50"
            enter={0.9}
            float={{ duration: 6, distance: -8 }}
          >
            <TopicCard title="UI/UX Design" courses="200 Courses" students="1000+ Students" />
          </FloatingCard>
        </div>
      </div>
    </section>
  );
}
