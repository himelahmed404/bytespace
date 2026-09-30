import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";

type ProgressCardProps = {
  label?: string;
  /** Percentage, 0–100. */
  value: number;
  className?: string;
};

/** White stat card with a big percentage and an animated progress bar. */
export function ProgressCard({ label = "Learning Progress", value, className }: ProgressCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg bg-white p-4 backdrop-blur-[10px]",
        className,
      )}
    >
      <p className="text-label-s font-medium text-ink">{label}</p>
      <p className="w-[200px] font-heading text-[48px] leading-[1.2] font-semibold tracking-[-0.01em] text-ink">
        {value}%
      </p>
      <ProgressBar value={value} className="w-[200px]" />
    </div>
  );
}
