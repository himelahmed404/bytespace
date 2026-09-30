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
    // Fluid in the responsive grid (the card is a size container for its compact-chip query)
    width: "w-full max-w-[373px]",
    chips: "tight",
    title: "leading-6",
    meta: "leading-[19px]",
    badge: { src: "/images/icons/badge-lime.svg", className: "font-medium leading-5 text-ink" },
    rating: "font-normal leading-[29px]",
    star: "/images/icons/star-outline.svg",
  },
  showcase: {
    // Always placed in absolutely-positioned collages, which size to content: needs a real width
    width: "w-[373px]",
    chips: "relaxed",
    title: "leading-7",
    meta: "leading-5",
    badge: { src: "/images/icons/badge-black.svg", className: "font-medium leading-5 text-white" },
    rating: "font-medium leading-7",
    star: "/images/icons/star-lime.svg",
  },
} as const;

/**
 * 373×384 course card: thumbnail with meta chips, title, author, level, students, price, rating.
 * Padding is 15px + the 1px border: Figma draws strokes inside the frame without taking space, so
 * this keeps the content 16px from the edge (and the thumbnail 341px wide) exactly as designed.
 */
export function CourseCard({ course, variant = "grid", className }: CourseCardProps) {
  const s = styles[variant];

  return (
    <article
      className={cn(
        "group @container flex h-[384px] flex-col rounded-xl border border-gray-200 bg-white p-[15px] transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgb(4_8_25/0.25)]",
        s.width,
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
        {/* Cards narrower than the design (content < 341px, i.e. small screens) get tighter chips */}
        <ul className="absolute top-[150px] left-[13px] flex gap-3 @max-[341px]:gap-2">
          <li>
            <Pill variant="glass" lineHeight={s.chips} className="@max-[341px]:px-2.5">
              {course.lessons} Lessons
            </Pill>
          </li>
          <li>
            <Pill variant="glass" lineHeight={s.chips} className="@max-[341px]:px-2.5">
              {course.duration}
            </Pill>
          </li>
          <li>
            <Pill variant="glass" lineHeight={s.chips} className="@max-[341px]:px-2.5">
              {course.comments} Comments
            </Pill>
          </li>
        </ul>
      </div>

      <div className="mt-[21px] flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-4">
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

        <p className={cn("flex shrink-0 items-center text-[18px] text-black-700", s.rating)}>
          <span className="sr-only">Rated </span>
          {course.rating}&nbsp;
          <Image src={s.star} alt="" width={24} height={24} />
        </p>
      </div>
    </article>
  );
}
