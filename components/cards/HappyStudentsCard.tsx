import Image from "next/image";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { cn } from "@/lib/cn";

const avatars = Array.from({ length: 7 }, (_, i) => `/images/avatars/student-${i + 1}.png`);

type HappyStudentsCardProps = {
  /** Smaller rating line (10px, bold score) and a taller title line — used below the hero. */
  compact?: boolean;
  className?: string;
};

/** "Happy Students" social-proof card: rating + stack of student avatars. */
export function HappyStudentsCard({ compact = false, className }: HappyStudentsCardProps) {
  return (
    <div
      className={cn(
        "flex w-[258px] flex-col justify-center gap-2 rounded-lg bg-white p-4 backdrop-blur-[10px]",
        className,
      )}
    >
      <div className="flex flex-col items-start">
        <p className={cn("text-label-m font-medium text-ink", compact && "leading-6")}>
          Happy Students
        </p>
        <div className="flex items-center">
          {compact ? (
            <p className="text-[10px] leading-[1.5] text-gray-400">
              <span className="font-bold text-ink">4.5 </span>(240)
            </p>
          ) : (
            <p className="text-[12px] leading-[1.6] text-gray-400">
              <span className="text-ink">4.5 </span>(240)
            </p>
          )}
          <span className="relative size-4">
            <Image
              src="/images/icons/star.svg"
              alt=""
              width={13.1625}
              height={12.5676}
              className="absolute top-[1.1px] left-[1.4px]"
            />
          </span>
        </div>
      </div>
      <AvatarStack
        avatars={avatars}
        size={43}
        overlap={16}
        label="Over 2,000 happy students"
        more={{
          label: "2K+",
          badgeSrc: "/images/icons/badge-lime.svg",
          className: "font-bold leading-[1.5] text-ink",
        }}
      />
    </div>
  );
}
