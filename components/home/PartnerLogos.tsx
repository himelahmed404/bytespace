import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { partners } from "@/lib/data";

/** Gray strip of partner logos under the hero. */
export function PartnerLogos() {
  return (
    <section aria-label="Our partners" className="bg-gray-50 py-20">
      <ul className="container-page flex items-end justify-center gap-[85px]">
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
    </section>
  );
}
