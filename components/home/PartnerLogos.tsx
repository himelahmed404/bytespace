import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { partners } from "@/lib/data";

/**
 * Gray strip of partner logos under the hero.
 * ≥1280px: the static row from the design. Smaller screens: an endless, gently scrolling strip
 * (the list is rendered twice for a seamless loop; the copy is hidden from screen readers).
 */
export function PartnerLogos() {
  return (
    <section aria-label="Our partners" className="overflow-hidden bg-gray-50 py-12 xl:py-20">
      <ul className="container-page hidden items-end justify-center gap-[85px] xl:flex">
        {partners.map((partner, i) => (
          <li key={partner.logo}>
            <Reveal y={16} delay={i * 0.08} duration={0.6}>
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={partner.width}
                height={partner.height}
                className="transition duration-300 hover:-translate-y-0.5 hover:brightness-50"
              />
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mask-x-from-85% mask-x-to-100% xl:hidden">
        <ul className="flex w-max items-end hover:[animation-play-state:paused] motion-safe:animate-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-6">
          {[...partners, ...partners].map((partner, i) => {
            const isCopy = i >= partners.length;
            return (
              <li
                key={`${partner.logo}-${i}`}
                aria-hidden={isCopy || undefined}
                className={isCopy ? "px-6 motion-reduce:hidden sm:px-9" : "px-6 sm:px-9"}
              >
                <Image
                  src={partner.logo}
                  alt={isCopy ? "" : `${partner.name} logo`}
                  width={partner.width}
                  height={partner.height}
                  className="h-8 w-auto sm:h-[41px]"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
