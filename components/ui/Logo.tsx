import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** Wordmark color: light on blue backgrounds, dark on white. */
  tone?: "light" | "dark";
  /** Hide the "ByteSpace" wordmark and show only the mark. */
  markOnly?: boolean;
  className?: string;
};

export function Logo({ tone = "light", markOnly = false, className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="ByteSpace home"
      className={cn("inline-flex items-start gap-2", className)}
    >
      <Image src="/images/brand/logo-mark.svg" alt="" width={28.875} height={31.5} />
      {!markOnly && (
        <span
          className={cn(
            "mt-[5px] font-display text-[24px] leading-normal font-bold",
            tone === "light" ? "text-gray-50" : "text-ink",
          )}
        >
          ByteSpace
        </span>
      )}
    </Link>
  );
}
