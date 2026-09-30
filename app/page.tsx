import { DiscoverCourses } from "@/components/home/DiscoverCourses";
import { Hero } from "@/components/home/Hero";
import { PartnerLogos } from "@/components/home/PartnerLogos";

export default function Home() {
  return (
    <main>
      <Hero />
      <PartnerLogos />
      <DiscoverCourses />
    </main>
  );
}
