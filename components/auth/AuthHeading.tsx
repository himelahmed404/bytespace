import { RiseIn } from "@/components/motion/RiseIn";

/** Eyebrow + big title at the top of the auth form card (the page's h1). */
export function AuthHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <RiseIn delay={0.15}>
      <p className="text-body-l text-primary">{eyebrow}</p>
      <h1 className="max-w-[453px] font-heading text-[34px]/[41px] font-semibold tracking-[-0.01em] text-ink sm:text-heading-m">
        {title}
      </h1>
    </RiseIn>
  );
}
