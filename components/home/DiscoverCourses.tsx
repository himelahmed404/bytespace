import { CourseExplorer } from "@/components/home/CourseExplorer";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** "Discover Your Passion" — category filters and the course grid. */
export function DiscoverCourses() {
  return (
    <section id="courses" className="scroll-mt-8 pt-[72px]">
      <div className="container-page flex flex-col items-center">
        <Reveal>
          <SectionHeading
            title="Discover Your Passion, Build Your Skills"
            titleClassName="max-w-[588px]"
            description="At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life."
          />
        </Reveal>
        <CourseExplorer />
      </div>
    </section>
  );
}
