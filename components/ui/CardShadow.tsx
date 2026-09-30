/** Soft, blurred shadow for floating cards; pair it with `<Float shadow={<CardShadow />}>`. */
export function CardShadow() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-3 top-2.5 -bottom-2 rounded-lg bg-navy/[0.175] blur-[9px]"
    />
  );
}
