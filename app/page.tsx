import { SiteFooter } from "@/components/footer/SiteFooter";
import { CreatorCta } from "@/components/home/CreatorCta";
import { DiscoverCourses } from "@/components/home/DiscoverCourses";
import { GrowthFeatures } from "@/components/home/GrowthFeatures";
import { Hero } from "@/components/home/Hero";
import { LearningPaths } from "@/components/home/LearningPaths";
import { PartnerLogos } from "@/components/home/PartnerLogos";
import { Testimonials } from "@/components/home/Testimonials";
import { StickyHeader } from "@/components/StickyHeader";

export default function Home() {
  return (
    <>
      <StickyHeader />
      <main id="main">
        <Hero />
        <PartnerLogos />
        <DiscoverCourses />
        <LearningPaths />
        <GrowthFeatures />
        <CreatorCta />
        <Testimonials />
      </main>
      <SiteFooter />
    </>
  );
}
