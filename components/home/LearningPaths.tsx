import { CategoryCard } from "@/components/cards/CategoryCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { learningPaths } from "@/lib/data";

/** "Explore Diverse Learning Paths" — six category tiles. */
export function LearningPaths() {
  return (
    <section id="categories" className="scroll-mt-8 pt-16 pb-20 md:pt-[72px] md:pb-[120px]">
      <div className="container-page flex flex-col items-center">
        <Reveal>
          <SectionHeading
            size="s"
            title="Explore Diverse Learning Paths at Bytespace"
            description="At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories."
          />
        </Reveal>
        <ul className="mt-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:mt-[68px] lg:grid-cols-6 xl:flex xl:w-auto xl:gap-10">
          {learningPaths.map((path, i) => (
            <li key={path.label}>
              <Reveal y={32} delay={i * 0.08} duration={0.6}>
                <CategoryCard path={path} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
