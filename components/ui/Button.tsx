import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary";

const base =
  "inline-flex shrink-0 items-center justify-center rounded-xl px-6 py-3 text-label-l font-medium whitespace-nowrap transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-lime text-ink hover:shadow-[0_8px_24px_-8px_rgba(212,251,32,0.7)]",
};

type Common = { variant?: Variant; className?: string };
type AsButton = Common & ComponentProps<"button"> & { href?: undefined };
type AsLink = Common & ComponentProps<typeof Link> & { href: string };

/** Lime pill button. Renders a Next.js `<Link>` when `href` is given. */
export function Button(props: AsButton | AsLink) {
  const { variant = "primary", className, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if (rest.href !== undefined) {
    return <Link {...(rest as ComponentProps<typeof Link>)} className={classes} />;
  }
  return <button type="button" {...(rest as ComponentProps<"button">)} className={classes} />;
}
