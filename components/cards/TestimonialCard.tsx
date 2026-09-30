import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/lib/data";

/** White quote card: avatar, name, role and testimonial. */
export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  const { name, role, avatar, quote } = testimonial;

  return (
    <figure
      className={cn(
        "flex h-full w-full flex-col gap-6 rounded-xl bg-white p-6 transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgb(4_8_25/0.2)] xl:h-auto xl:w-[374px]",
        className,
      )}
    >
      <Image
        src={avatar}
        alt=""
        width={80}
        height={80}
        className="size-20 rounded-full object-cover"
      />
      <figcaption>
        <p className="font-heading text-heading-xs font-semibold text-black">{name}</p>
        <p className="text-body-l text-primary">{role}</p>
      </figcaption>
      <blockquote className="text-body-l text-black-700">
        <p>{quote}</p>
      </blockquote>
    </figure>
  );
}
