import { CreatorCta } from "@/components/home/CreatorCta";
import { DiscoverCourses } from "@/components/home/DiscoverCourses";
import { GrowthFeatures } from "@/components/home/GrowthFeatures";
import { Hero } from "@/components/home/Hero";
import { LearningPaths } from "@/components/home/LearningPaths";
import { PartnerLogos } from "@/components/home/PartnerLogos";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <PartnerLogos />
      <DiscoverCourses />
      <LearningPaths />
      <GrowthFeatures />
      <CreatorCta />
      <Testimonials />
    </main>
  );
}
