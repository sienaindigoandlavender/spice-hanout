import type { Blend } from "@/lib/blends";

// The label: one field of the blend's own colour, the name set quietly in its corner, and a plain
// band of facts underneath. The colour is the only decoration. No patterns, no illustrations.
export default function Label({ b, size = "card" }: { b: Blend; size?: "card" | "large" }) {
  const big = size === "large";
  return (
    <div className="relative w-full select-none" style={{ background: b.colour, color: b.ink }}>
      <div className={big ? "aspect-[4/5]" : "aspect-[4/5]"} />
      {/* the grain of the ground spice */}
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.22] mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
        <filter id={`g-${b.handle}`}><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter={`url(#g-${b.handle})`} />
      </svg>
      <div className={`absolute inset-x-0 top-0 flex items-start justify-between ${big ? "p-8 md:p-10" : "p-5"}`}>
        <span className={`font-mono uppercase tracking-[0.14em] ${big ? "text-[13px]" : "text-[11px]"}`}>Spice Hanout</span>
        <span className={`font-mono ${big ? "text-[13px]" : "text-[11px]"}`}>{b.weight}</span>
      </div>
      <div className={`absolute inset-x-0 bottom-0 ${big ? "p-8 md:p-10" : "p-5"}`}>
        {b.arabic && <p className={`${big ? "text-[26px]" : "text-[18px]"} leading-none mb-2`} dir="rtl" lang="ar">{b.arabic}</p>}
        <p className={`font-display ${big ? "text-[48px] md:text-[64px]" : "text-[30px]"} leading-[0.95]`}>{b.name}</p>
      </div>
    </div>
  );
}
