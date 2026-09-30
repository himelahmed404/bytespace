import { ProgressStat } from "@/components/ui/ProgressStat";
import { cn } from "@/lib/cn";

type ProgressCardProps = {
  label?: string;
  /** Percentage, 0–100. */
  value: number;
  /** Seconds before the count-up starts once visible (lets the card land first). */
  countDelay?: number;
  /** Extra classes for the label, e.g. `leading-6` (the Growth section uses a taller line). */
  labelClassName?: string;
  className?: string;
};

/** White stat card: the percentage counts up from 0 while the bar fills beneath it. */
export function ProgressCard({
  label = "Learning Progress",
  value,
  countDelay,
  labelClassName,
  className,
}: ProgressCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg bg-white p-4 backdrop-blur-[10px]",
        className,
      )}
    >
      <p className={cn("text-label-s font-medium text-ink", labelClassName)}>{label}</p>
      <ProgressStat value={value} label={label} delay={countDelay} />
    </div>
  );
}
