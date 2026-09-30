import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Reveal } from "@/components/motion/Reveal";
import { GlowBlob } from "@/components/ui/GlowBlob";
import { testimonials } from "@/lib/data";

/** Soft background glows, positioned on the 1440px Figma frame. */
const glows = [
  { color: "lime", opacity: 0.4, x: 842, y: -241, size: 1137 },
  { color: "lime", opacity: 0.6, x: 395, y: -138, size: 672 },
  { color: "blue", opacity: 0.24, x: -442, y: 149, size: 1137 },
] as const;

/** "Discover What Our Community Is Saying" — intro + three testimonial cards. */
export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative isolate overflow-hidden bg-canvas py-16 xl:pt-[74px] xl:pb-[57px]"
    >
      <div className="pointer-events-none absolute inset-y-0 left-[calc(50%-720px)] w-[1440px]">
        {glows.map((g, i) => (
          <GlowBlob key={i} {...g} />
        ))}
      </div>

      <div className="relative container-page flex flex-col gap-10 md:gap-14 xl:w-[1204px] xl:max-w-none xl:gap-[72px]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:gap-[43px]">
          <Reveal className="w-full xl:w-[577px] xl:shrink-0">
            <h2
              id="testimonials-title"
              className="font-heading text-[30px]/9 font-semibold tracking-[-0.01em] text-black max-lg:text-balance sm:text-[36px]/[43px] lg:text-heading-m"
            >
              Discover What Our Community Is Saying
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="w-full xl:w-[580px] xl:shrink-0">
            <p className="text-body-m text-black-700 sm:text-body-l">
              At ByteSpace, our vibrant community of learners and creators is at the heart of what
              we do. Hear directly from those who have experienced the transformative journey of
              learning and creating on our platform. Explore testimonials that reflect the diverse
              perspectives of enthusiastic learners and accomplished creators.
            </p>
          </Reveal>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 xl:flex xl:items-start xl:gap-[41px]">
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              className="md:last:col-span-2 md:last:w-[calc(50%-12px)] md:last:justify-self-center xl:last:w-auto"
            >
              <Reveal y={40} delay={i * 0.12} duration={0.7}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
