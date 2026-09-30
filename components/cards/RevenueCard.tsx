import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";

type RevenueCardProps = {
  title: string;
  period: string;
  amount: string;
  change: string;
  /** Optional progress bar (percentage). When set, the change badge sits next to the amount. */
  progress?: number;
  className?: string;
};

function ChangeBadge({ children }: { children: string }) {
  return (
    <span className="rounded-xl bg-chartreuse px-2 py-0.5 text-[10px] leading-5 font-medium text-ink">
      {children}
    </span>
  );
}

/** Blue creator-stats card ("Total Revenue", "Year to Date"). */
export function RevenueCard({
  title,
  period,
  amount,
  change,
  progress,
  className,
}: RevenueCardProps) {
  const amountEl = (
    <p className="font-heading text-[24px] leading-8 font-semibold tracking-[-0.01em]">{amount}</p>
  );

  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg bg-primary p-4 text-gray-50 backdrop-blur-[10px]",
        className,
      )}
    >
      <div>
        <p className="text-label-m font-medium">{title}</p>
        <p className="text-[10px] leading-[1.2]">{period}</p>
      </div>
      {progress === undefined ? (
        <>
          {amountEl}
          <ChangeBadge>{change}</ChangeBadge>
        </>
      ) : (
        <>
          <div className="flex w-[200px] items-center justify-between gap-2">
            {amountEl}
            <ChangeBadge>{change}</ChangeBadge>
          </div>
          <ProgressBar value={progress} track="bg-white" className="w-[200px]" />
        </>
      )}
    </div>
  );
}
