import { cn } from "@/lib/cn";

type TopicCardProps = {
  title: string;
  courses: string;
  students: string;
  className?: string;
};

/** Small white card summarising a topic, e.g. "UI/UX Design · 200 Courses · 1000+ Students". */
export function TopicCard({ title, courses, students, className }: TopicCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start rounded-lg bg-white p-4 whitespace-nowrap backdrop-blur-[10px]",
        className,
      )}
    >
      <p className="text-label-m font-medium text-ink">{title}</p>
      <p className="flex items-start gap-2 text-gray-400">
        <span className="text-[12px] leading-[19px]">{courses}</span>
        <span aria-hidden className="text-[10px] leading-[15px]">
          •
        </span>
        <span className="text-[12px] leading-[19px]">{students}</span>
      </p>
    </div>
  );
}
