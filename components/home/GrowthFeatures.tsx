import Image from "next/image";
import { CourseCard } from "@/components/cards/CourseCard";
import { HappyStudentsCard } from "@/components/cards/HappyStudentsCard";
import { ProgressCard } from "@/components/cards/ProgressCard";
import { RevenueCard } from "@/components/cards/RevenueCard";
import { FloatingCard } from "@/components/motion/FloatingCard";
import { FloatingOrnament } from "@/components/motion/FloatingOrnament";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { ORNAMENT_TINT } from "@/components/ui/Ornament";
import { courses, creatorBenefits, platformStats } from "@/lib/data";

const shadowA = { filter: "url(#shadow-a)" };

/** Soft background glows, positioned on the 1440px Figma frame. */
const glows = [
  { color: "blue", opacity: 0.24, x: 722, y: 788, size: 1137 },
  { color: "lime", opacity: 0.4, x: -152, y: -466, size: 1137 },
  { color: "blue", opacity: 0.16, x: -508, y: 183, size: 1137 },
  { color: "blue", opacity: 0.08, x: 811, y: -458, size: 1137 },
  { color: "lime", opacity: 0.6, x: -287, y: 946, size: 672 },
] as const;

/** Learner pitch (stats) + creator pitch (revenue, benefits), on a glowing off-white background. */
export function GrowthFeatures() {
  return (
    <section className="relative isolate overflow-hidden bg-canvas py-[120px]">
      <div className="pointer-events-none absolute inset-y-0 left-[calc(50%-720px)] w-[1440px]">
        {glows.map((g, i) => (
          <GlowBlob key={i} {...g} />
        ))}
      </div>

      <div className="relative container-page flex flex-col gap-[72px] pl-px">
        {/* ── Learners ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-[63px]">
          <Reveal className="flex w-[574px] shrink-0 flex-col gap-10">
            <h2 className="max-w-[577px] font-heading text-heading-m font-semibold text-ink">
              Your Path to Professional Growth Starts Here!
            </h2>
            <p className="max-w-[477px] text-body-l text-gray-700">
              Explore our curated selection of courses tailored to enhance your capabilities and
              accelerate your career journey. Whether you are looking to sharpen specific skills,
              gain industry expertise, or embark on a new career path entirely, we have the
              resources you need.
            </p>
            <dl className="flex items-end gap-14">
              {platformStats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="order-2 text-body-l text-gray-700">{stat.label}</dt>
                  <dd className="order-1 font-heading text-[36px] leading-[44px] font-medium tracking-[-0.01em] text-primary">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="relative h-[552px] w-[621px] shrink-0">
            <FloatingCard
              className="top-0 left-0"
              float={{ duration: 6.5, delay: 0.6, distance: -10 }}
            >
              <CourseCard course={courses[0]} variant="showcase" />
            </FloatingCard>
            <Reveal className="absolute top-3 left-0" y={60} delay={0.15} duration={1}>
              <Image
                src="/images/people/hero-student.png"
                alt="Student with headphones taking an online course on his laptop"
                width={577}
                height={540}
                sizes="577px"
                quality={90}
                style={shadowA}
              />
            </Reveal>
            <FloatingCard
              className="top-[213px] left-[345px]"
              enter={0.3}
              float={{ duration: 5, delay: 0.2, distance: -10 }}
            >
              <ProgressCard value={55} labelClassName="leading-6" />
            </FloatingCard>
            <FloatingOrnament
              shape="coil"
              tint={ORNAMENT_TINT.lime}
              x={404}
              y={67}
              size={216}
              enter={0.45}
              float={{ duration: 7, delay: 0.3, distance: -14, rotate: 4 }}
            />
          </div>
        </div>

        {/* ── Creators ─────────────────────────────────────────────── */}
        <div id="creators" className="flex scroll-mt-8 items-center gap-[79px]">
          <div className="relative h-[596px] w-[541px] shrink-0">
            <FloatingCard
              className="top-11 left-0"
              float={{ duration: 5.5, delay: 0.3, distance: -10 }}
            >
              <RevenueCard
                title="Total Revenue"
                period="July 1-28"
                amount="$120.29"
                change="+12$"
                progress={56}
              />
            </FloatingCard>
            <FloatingCard
              className="top-[194px] left-0"
              enter={0.15}
              float={{ duration: 6, delay: 1, distance: -8 }}
            >
              <RevenueCard title="Year to Date" period="2023" amount="$1,200.38" change="+12$" />
            </FloatingCard>

            {/* Figma crops the middle of a square cut-out; reproduced with an offset image. */}
            <Reveal className="absolute top-0 left-7" y={60} delay={0.1} duration={1}>
              <div className="h-[596px] w-[435px]" style={shadowA}>
                <div className="relative size-full overflow-hidden">
                  <Image
                    src="/images/people/creator-girl.png"
                    alt="Course creator with headphones holding a tablet"
                    width={683}
                    height={683}
                    sizes="683px"
                    quality={90}
                    className="absolute top-0 left-[-124px] size-[683px] max-w-none"
                  />
                </div>
              </div>
            </Reveal>

            <FloatingCard
              className="top-[413px] left-[283px]"
              enter={0.35}
              float={{ duration: 5.5, delay: 0.8, distance: -10 }}
            >
              <HappyStudentsCard compact />
            </FloatingCard>
            <FloatingOrnament
              shape="zigzag"
              tint={ORNAMENT_TINT.lime}
              x={303}
              y={114}
              size={216}
              enter={0.5}
              enterRotate={10}
              float={{ duration: 6.5, delay: 1, distance: -12, rotate: -4 }}
            />
          </div>

          <Reveal className="flex w-[580px] shrink-0 flex-col gap-10">
            <h2 className="max-w-[391px] font-heading text-heading-m font-semibold text-ink">
              Create &amp; Manage Courses Easily.
            </h2>
            <p className="max-w-[574px] text-body-l leading-7 text-gray-700">
              <strong className="font-bold text-ink">ByteSpace</strong> supports individuals or
              entities in the creation, publication, and administration of educational courses.
            </p>
            <ul className="flex flex-col gap-4">
              {creatorBenefits.map((benefit) => (
                <li key={benefit} className="flex items-end gap-2">
                  <Image src="/images/icons/check-circle.svg" alt="" width={24} height={24} />
                  <span className="text-[18px] leading-[1.2] font-medium text-ink">{benefit}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
