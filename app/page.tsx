// Temporary M0 page: checks that design tokens and fonts load correctly.
// Replaced by the real landing page sections from M1 onwards.

const swatches = [
  ["primary", "bg-primary"],
  ["lime", "bg-lime"],
  ["ink", "bg-ink"],
  ["gray-700", "bg-gray-700"],
  ["gray-400", "bg-gray-400"],
  ["gray-200", "bg-gray-200"],
  ["gray-100", "bg-gray-100"],
  ["gray-50", "bg-gray-50"],
] as const;

export default function Home() {
  return (
    <main className="container-page flex flex-col gap-10 py-20">
      <p className="font-display text-[24px] font-bold text-primary">ByteSpace</p>

      <div className="flex flex-col gap-2">
        <p className="text-body-l text-primary">Design tokens</p>
        <h1 className="font-heading text-heading-m font-semibold">
          Heading M — Poppins SemiBold 44
        </h1>
        <h2 className="font-heading text-heading-xs font-semibold">
          Heading XS — Poppins SemiBold 20
        </h2>
        <p className="text-body-l">Body L — Satoshi Regular 18</p>
        <p className="text-body-m">Body M — Satoshi Regular 16</p>
        <p className="text-label-s font-medium">Label S — Satoshi Medium 14</p>
        <p className="text-label-xs font-medium">Label XS — Satoshi Medium 12</p>
      </div>

      <div className="flex flex-wrap gap-4">
        {swatches.map(([name, cls]) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <div className={`size-16 rounded-xl border border-gray-100 ${cls}`} />
            <span className="text-label-xs">{name}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
