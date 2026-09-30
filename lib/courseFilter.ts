/**
 * Lets any section open the course grid on a given category (e.g. the learning-path cards)
 * without lifting state into a global store: a tiny window event that CourseExplorer listens to.
 */
export const COURSE_FILTER_EVENT = "bytespace:course-filter";

export function showCoursesIn(category: string) {
  window.dispatchEvent(new CustomEvent<string>(COURSE_FILTER_EVENT, { detail: category }));
  document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
}
