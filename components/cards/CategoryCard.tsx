"use client";

import Image from "next/image";
import { showCoursesIn } from "@/lib/courseFilter";
import type { LearningPath } from "@/lib/data";

/** 167×167 learning-path tile. Clicking it opens the course grid filtered to that path. */
export function CategoryCard({ path }: { path: LearningPath }) {
  return (
    <button
      type="button"
      onClick={() => showCoursesIn(path.courseCategory)}
      aria-label={`Show ${path.label} courses`}
      className="group flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white transition duration-300 ease-out hover:-translate-y-1.5 hover:border-primary hover:shadow-[0_24px_48px_-24px_rgb(0_59_226/0.35)] xl:size-[167px]"
    >
      <span className="grid size-[60px] place-items-center rounded-full bg-lime transition duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6">
        <Image src={path.icon} alt="" width={36} height={36} />
      </span>
      <span className="text-[20px] leading-6 font-medium text-ink">{path.label}</span>
    </button>
  );
}
