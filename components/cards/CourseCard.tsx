import Image from "next/image";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import { courseStudents, type Course } from "@/lib/data";

type CourseCardProps = {
  course: Course;
  /**
   * `grid`: the course list (26px chips, gray star, lime "26+").
   * `showcase`: the version floating in the Growth section and auth pages (32px chips, taller
   * title line, lime star, black "26+"). Both are straight from the Figma file.
   */
  variant?: "grid" | "showcase";
  className?: string;
};

const styles = {
  grid: {
    chips: "tight",
    title: "leading-[1.2]",
    meta: "leading-[1.6]",
    badge: { src: "/images/icons/badge-lime.svg", className: "font-medium leading-5 text-ink" },
    rating: "font-normal leading-[1.6]",
    star: "/images/icons/star-outline.svg",
  },
  showcase: {
    chips: "relaxed",
    title: "leading-[1.4]",
    meta: "leading-5",
    badge: { src: "/images/icons/badge-black.svg", className: "font-medium leading-5 text-white" },
    rating: "font-medium leading-7",
    star: "/images/icons/star-lime.svg",
  },
} as const;

/** 373×384 course card: thumbnail with meta chips, title, author, level, students, price, rating. */
export function CourseCard({ course, variant = "grid", className }: CourseCardProps) {
  const s = styles[variant];

  return (
    <article
      className={cn(
        "group flex h-[384px] w-[373px] flex-col rounded-xl border border-gray-200 bg-white p-4 transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgb(4_8_25/0.25)]",
        className,
      )}
    >
      <div className="relative h-[195.14px] shrink-0 overflow-hidden rounded-md bg-[#443131]">
        <Image
          src={course.thumbnail}
          alt=""
          fill
          sizes="341px"
          className="object-cover transition duration-500 ease-out group-hover:scale-105"
        />
        <ul className="absolute top-[150px] left-[13px] flex gap-3">
          <li>
            <Pill variant="glass" lineHeight={s.chips}>
              {course.lessons} Lessons
            </Pill>
          </li>
          <li>
            <Pill variant="glass" lineHeight={s.chips}>
              {course.duration}
            </Pill>
          </li>
          <li>
            <Pill variant="glass" lineHeight={s.chips}>
              {course.comments} Comments
            </Pill>
          </li>
        </ul>
      </div>

      <div className="mt-[21px] flex items-start justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <h3
              title={course.title}
              className={cn(
                "max-w-[280px] truncate font-heading text-[20px] font-semibold tracking-[-0.01em] text-black",
                s.title,
              )}
            >
              {course.title}
            </h3>
            <p className={cn("text-[12px] text-black-700", s.meta)}>
              by <span className="text-primary">{course.author}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Pill
              lineHeight={s.chips}
              icon={<Image src="/images/icons/signal.svg" alt="" width={20} height={20} />}
            >
              {course.level}
            </Pill>
            <AvatarStack
              avatars={courseStudents}
              size={32}
              overlap={8}
              label={`${courseStudents.length + course.moreStudents}+ students enrolled`}
              more={{
                label: `${course.moreStudents}+`,
                badgeSrc: s.badge.src,
                className: s.badge.className,
              }}
            />
          </div>

          <p className="flex items-end">
            <span
              className={cn(
                // 24px row in both variants, as in Figma (keeps the card at exactly 384px)
                "font-heading text-[20px] leading-6 font-semibold tracking-[-0.01em] text-primary",
              )}
            >
              {variant === "showcase" ? (
                <>
                  <span className="font-medium">$</span>
                  {course.price}
                </>
              ) : (
                `$${course.price}`
              )}
            </span>
            <span className={cn("text-[12px] text-black-700", s.meta)}>/lifetime</span>
          </p>
        </div>

        <p className={cn("flex items-center text-[18px] text-black-700", s.rating)}>
          <span className="sr-only">Rated </span>
          {course.rating}&nbsp;
          <Image src={s.star} alt="" width={24} height={24} />
        </p>
      </div>
    </article>
  );
}
