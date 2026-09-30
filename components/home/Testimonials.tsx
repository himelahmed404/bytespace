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
      className="relative isolate overflow-hidden bg-canvas pt-[74px] pb-[57px]"
    >
      <div className="pointer-events-none absolute inset-y-0 left-[calc(50%-720px)] w-[1440px]">
        {glows.map((g, i) => (
          <GlowBlob key={i} {...g} />
        ))}
      </div>

      <div className="relative mx-auto flex w-[1204px] flex-col gap-[72px]">
        {/* 145px = Figma's rounded height of the 5-line intro; keeps the cards on the same line */}
        <div className="flex h-[145px] items-end gap-[43px]">
          <Reveal className="w-[577px] shrink-0">
            <h2
              id="testimonials-title"
              className="font-heading text-heading-m font-semibold text-black"
            >
              Discover What Our Community Is Saying
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="w-[580px] shrink-0">
            <p className="text-body-l text-black-700">
              At ByteSpace, our vibrant community of learners and creators is at the heart of what
              we do. Hear directly from those who have experienced the transformative journey of
              learning and creating on our platform. Explore testimonials that reflect the diverse
              perspectives of enthusiastic learners and accomplished creators.
            </p>
          </Reveal>
        </div>

        <ul className="flex items-start gap-[41px]">
          {testimonials.map((t, i) => (
            <li key={t.name}>
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
