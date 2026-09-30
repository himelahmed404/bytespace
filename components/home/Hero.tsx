import Image from "next/image";
import { HappyStudentsCard } from "@/components/cards/HappyStudentsCard";
import { ProgressCard } from "@/components/cards/ProgressCard";
import { TopicCard } from "@/components/cards/TopicCard";
import { HeroSearch } from "@/components/home/HeroSearch";
import { FloatingCard } from "@/components/motion/FloatingCard";
import { FloatingOrnament, type FloatingOrnamentProps } from "@/components/motion/FloatingOrnament";
import { Reveal } from "@/components/motion/Reveal";
import { SiteHeader } from "@/components/SiteHeader";
import { GridBackground } from "@/components/ui/GridBackground";
import { ORNAMENT_TINT } from "@/components/ui/Ornament";

const { lime: LIME, white: WHITE } = ORNAMENT_TINT;

/** 3D ornaments, positioned on the 1440×1024 Figma frame (x/y/size in px). */
const ornaments: Array<Omit<FloatingOrnamentProps, "trigger" | "className">> = [
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
    <section className="relative isolate h-[1024px] overflow-hidden bg-primary">
      <GridBackground />

      {/* Decorative layer, laid out on the 1440px Figma frame and centered on the page */}
      <div className="pointer-events-none absolute top-0 left-[calc(50%-720px)] h-full w-[1440px]">
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
            sizes="578px"
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

        {ornaments.map((o, i) => (
          <FloatingOrnament
            key={`${o.shape}-${i}`}
            {...o}
            enterRotate={i % 2 ? 10 : -10}
            trigger="mount"
            className="z-40"
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

      <div className="relative z-10">
        <SiteHeader />
        <div className="container-page mt-[49px] flex flex-col items-center gap-[60px] text-center">
          <div className="flex flex-col items-center gap-8">
            <Reveal trigger="mount" delay={0.1} y={30}>
              <h1 className="max-w-[935px] font-heading text-heading-l font-semibold text-white">
                Get Access to Hundreds Courses Available
              </h1>
            </Reveal>
            <Reveal trigger="mount" delay={0.25}>
              <p className="text-body-l text-gray-100">
                Unlock your creativity, gain valuable knowledge, and grow your business with our
                wide range of courses.
              </p>
            </Reveal>
          </div>
          <Reveal trigger="mount" delay={0.4}>
            <HeroSearch />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
