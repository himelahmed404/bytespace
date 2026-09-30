// Temporary M1 preview: header on the blue grid + shared UI components.
// The hero section replaces the blue block in M2, and the preview block is removed.
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/Button";
import { GridBackground } from "@/components/ui/GridBackground";
import { Logo } from "@/components/ui/Logo";
import { Pill } from "@/components/ui/Pill";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <main>
      <section className="relative h-[1024px] overflow-hidden bg-primary">
        <GridBackground />
        <SiteHeader />
      </section>

      <section className="container-page flex flex-col gap-16 py-20">
        <SectionHeading
          title="Discover Your Passion, Build Your Skills"
          titleClassName="max-w-[588px]"
          description="At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life."
        />
        <SectionHeading
          size="s"
          title="Explore Diverse Learning Paths at Bytespace"
          description="At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories."
        />

        <div className="flex flex-wrap items-center gap-6">
          <Button>Sign In</Button>
          <Button href="/register">Join as Creator</Button>
          <Pill>Beginner</Pill>
          <div className="rounded-md bg-ink p-3">
            <Pill variant="glass">17 Lessons</Pill>
          </div>
          <Logo tone="dark" />
        </div>
      </section>
    </main>
  );
}
