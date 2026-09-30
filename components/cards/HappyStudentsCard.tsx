import Image from "next/image";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { cn } from "@/lib/cn";

const avatars = Array.from({ length: 7 }, (_, i) => `/images/avatars/student-${i + 1}.png`);

type HappyStudentsCardProps = {
  /**
   * `white` (hero): lime star + lime "2K+" badge.
   * `lime` (auth pages): lime card, blue star, dark "2K+" badge. Always uses the compact type.
   */
  tone?: "white" | "lime";
  /** Smaller rating line (10px, bold score) and a taller title line — used below the hero. */
  compact?: boolean;
  /** Seconds before the avatars deal out of their pile (lets the card land first). */
  dealDelay?: number;
  className?: string;
};

/** "Happy Students" social-proof card: rating + stack of student avatars. */
export function HappyStudentsCard({
  tone = "white",
  compact = false,
  dealDelay = 0.4,
  className,
}: HappyStudentsCardProps) {
  const lime = tone === "lime";
  const small = compact || lime;

  return (
    <div
      className={cn(
        "flex w-[258px] flex-col justify-center gap-2 rounded-lg p-4 backdrop-blur-[10px]",
        lime ? "bg-lime" : "bg-white",
        className,
      )}
    >
      <div className="flex flex-col items-start">
        <p className={cn("text-label-m font-medium text-ink", small && "leading-6")}>
          Happy Students
        </p>
        <div className="flex items-center">
          {small ? (
            <p
              className={cn("text-[10px] leading-[15px]", lime ? "text-gray-800" : "text-gray-400")}
            >
              <span className="font-bold text-ink">4.5 </span>(240)
            </p>
          ) : (
            <p className="text-[12px] leading-[19px] text-gray-400">
              <span className="text-ink">4.5 </span>(240)
            </p>
          )}
          {lime ? (
            <span className="grid size-4 place-items-center">
              <Image src="/images/icons/star-blue.svg" alt="" width={14} height={13} />
            </span>
          ) : (
            <span className="relative size-4">
              <Image
                src="/images/icons/star.svg"
                alt=""
                width={13.1625}
                height={12.5676}
                className="absolute top-[1.1px] left-[1.4px]"
              />
            </span>
          )}
        </div>
      </div>
      <AvatarStack
        avatars={avatars}
        size={43}
        overlap={16}
        label="Over 2,000 happy students"
        dealIn={{ delay: dealDelay }}
        more={
          lime
            ? {
                label: "2K+",
                badgeSrc: "/images/icons/badge-dark.svg",
                className: "font-bold leading-[18px] text-gray-50",
              }
            : {
                label: "2K+",
                badgeSrc: "/images/icons/badge-lime.svg",
                className: "font-bold leading-[18px] text-ink",
              }
        }
      />
    </div>
  );
}
