import Image from "next/image";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import { courseStudents, type Course } from "@/lib/data";

type CourseCardProps = {
  course: Course;
  className?: string;
};

/** 373×384 course card: thumbnail with meta chips, title, author, level, students, price, rating. */
export function CourseCard({ course, className }: CourseCardProps) {
  return (
    <article
      className={cn(
        "group flex h-[384px] w-[373px] flex-col rounded-xl border border-gray-200 bg-white p-4 transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgb(4_8_25/0.25)]",
        className,
      )}
    >
      <div className="relative h-[195.14px] overflow-hidden rounded-md bg-[#443131]">
        <Image
          src={course.thumbnail}
          alt=""
          fill
          sizes="341px"
          className="object-cover transition duration-500 ease-out group-hover:scale-105"
        />
        <ul className="absolute top-[150px] left-[13px] flex gap-3">
          <li>
            <Pill variant="glass">{course.lessons} Lessons</Pill>
          </li>
          <li>
            <Pill variant="glass">{course.duration}</Pill>
          </li>
          <li>
            <Pill variant="glass">{course.comments} Comments</Pill>
          </li>
        </ul>
      </div>

      <div className="mt-[21px] flex items-start justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <h3
              title={course.title}
              className="max-w-[280px] truncate font-heading text-[20px] leading-[1.2] font-semibold tracking-[-0.01em] text-black"
            >
              {course.title}
            </h3>
            <p className="text-[12px] leading-[1.6] text-black-700">
              by <span className="text-primary">{course.author}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Pill icon={<Image src="/images/icons/signal.svg" alt="" width={20} height={20} />}>
              {course.level}
            </Pill>
            <AvatarStack
              avatars={courseStudents}
              size={32}
              overlap={8}
              label={`${courseStudents.length + course.moreStudents}+ students enrolled`}
              more={{
                label: `${course.moreStudents}+`,
                badgeSrc: "/images/icons/badge-lime.svg",
                className: "font-medium leading-5 text-ink",
              }}
            />
          </div>

          <p className="flex items-end">
            <span className="font-heading text-[20px] leading-[1.2] font-semibold tracking-[-0.01em] text-primary">
              ${course.price}
            </span>
            <span className="text-[12px] leading-[1.6] text-black-700">/lifetime</span>
          </p>
        </div>

        <p className="flex items-center text-[18px] leading-[1.6] text-black-700">
          <span className="sr-only">Rated </span>
          {course.rating}&nbsp;
          <Image src="/images/icons/star-outline.svg" alt="" width={24} height={24} />
        </p>
      </div>
    </article>
  );
}
