"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { CourseCard } from "@/components/cards/CourseCard";
import { CategoryTabs } from "@/components/home/CategoryTabs";
import { Button } from "@/components/ui/Button";
import { COURSE_FILTER_EVENT } from "@/lib/courseFilter";
import { categoryTabRows, courses, FEATURED } from "@/lib/data";

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

/** Category tabs + the course grid they filter. */
export function CourseExplorer() {
  const [active, setActive] = useState(FEATURED);

  // Other sections (e.g. learning-path cards) can open a category via `showCoursesIn()`.
  useEffect(() => {
    const onFilter = (event: Event) => setActive((event as CustomEvent<string>).detail);
    window.addEventListener(COURSE_FILTER_EVENT, onFilter);
    return () => window.removeEventListener(COURSE_FILTER_EVENT, onFilter);
  }, []);

  const visible =
    active === FEATURED ? courses : courses.filter((c) => c.categories.includes(active));

  return (
    <>
      <CategoryTabs
        rows={categoryTabRows}
        active={active}
        onChange={setActive}
        className="mt-[42px]"
      />

      {/* Fixed min-height (two card rows) so filtering doesn't make the page jump */}
      <div className="mt-[77px] min-h-[808px] w-full">
        <div aria-live="polite" className="sr-only">
          {visible.length} {visible.length === 1 ? "course" : "courses"} in {active}
        </div>

        <motion.ul layout className="grid grid-cols-[repeat(3,373px)] gap-10">
          <AnimatePresence mode="popLayout">
            {visible.map((course, i) => (
              <motion.li
                key={course.id}
                layout
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: easeOutQuint }}
              >
                <CourseCard course={course} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6 py-24 text-center"
          >
            <p className="font-heading text-heading-xs font-semibold text-navy">
              No {active} courses yet
            </p>
            <p className="max-w-[420px] text-body-m text-gray-400">
              New courses are added every week. Meanwhile, take a look at our featured picks.
            </p>
            <Button onClick={() => setActive(FEATURED)}>Show featured courses</Button>
          </motion.div>
        )}
      </div>
    </>
  );
}
