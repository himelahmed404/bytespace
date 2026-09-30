import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";

type ProgressCardProps = {
  label?: string;
  /** Percentage, 0–100. */
  value: number;
  /** Extra classes for the label, e.g. `leading-6` (the Growth section uses a taller line). */
  labelClassName?: string;
  className?: string;
};

/** White stat card with a big percentage and an animated progress bar. */
export function ProgressCard({
  label = "Learning Progress",
  value,
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
      <p className="w-[200px] font-heading text-[48px] leading-[58px] font-semibold tracking-[-0.01em] text-ink">
        {value}%
      </p>
      <ProgressBar value={value} label={label} className="w-[200px]" />
    </div>
  );
}
