import type { Blend } from "@/lib/blends";
import HourMark from "./HourMark";

// The label (Jacqueline, 3 Nov 2026): one field in the colour of the spice itself, with a faint
// grain. The name sits low, set in Bodoni; the hour sits high, as the sun over a horizon. A hairline
// frame holds it. No patterns, no illustrations: the colour is the decoration.
// face "front" is the tin's face; face "back" is the facts panel (printed on bone).

const HOUR: Record<Blend["moment"], string> = { morning: "Morning", midday: "Midday", evening: "Evening" };

function Grain({ id }: { id: string }) {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.28] mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
      <filter id={id}><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}

export default function Label({ b, size = "card", face = "front", uid = "" }: { b: Blend; size?: "card" | "large" | "print"; face?: "front" | "back"; uid?: string }) {
  const pad = size === "card" ? "p-[7%]" : "p-[8%]";
  const isBox = b.handle === "a-whole-day";

  if (face === "back") {
    return (
      <div className={`relative aspect-[3/4] w-full select-none bg-bone text-ink ${pad}`}>
        <div className="absolute inset-[4%] border border-ink" />
        <div className="relative flex h-full flex-col px-[4%] py-[5%]">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[0.62em] uppercase tracking-[0.18em]">Spice Hanout</span>
            <HourMark moment={b.moment} size={22} />
          </div>
          <p className="mt-[6%] font-display text-[1.7em] leading-[0.95]">{b.name}</p>
          <p className="mt-[6%] font-mono text-[0.58em] uppercase tracking-[0.14em]">{isBox ? "In the box" : "Inside"}</p>
          <p className="mt-[2%] text-[0.72em] leading-[1.35]">{b.inside.map((i) => i.name).join(", ")}.</p>
          <p className="mt-[5%] font-mono text-[0.58em] uppercase tracking-[0.14em]">Use</p>
          <p className="mt-[2%] text-[0.72em] leading-[1.35]">{b.use[0]}</p>
          <div className="mt-auto grid grid-cols-2 gap-y-[3%] border-t border-ink pt-[4%] font-mono text-[0.58em] leading-[1.5]">
            <span>{b.weight}</span><span className="text-end">{HOUR[b.moment]}</span>
            <span>No. ______</span><span className="text-end">Best before ______</span>
          </div>
          <p className="mt-[4%] text-[0.6em] leading-[1.35]">Ground in small batches in Marrakech. Keep it dry, closed and away from the stove. Food, not medicine.</p>
          <p className="mt-[2%] font-mono text-[0.58em]">spicehanout.com</p>
        </div>
      </div>
    );
  }

  // Sizes follow the label's own width (container units), so the card, the big tin and the
  // printed 70 mm label keep the same proportions.
  return (
    <div className="relative aspect-[3/4] w-full select-none overflow-hidden [container-type:inline-size]" style={{ background: b.colour, color: b.ink }}>
      <Grain id={`g-${b.handle}${uid}`} />
      <div className="absolute inset-[4%] border" style={{ borderColor: b.ink, opacity: 0.55 }} />
      <div className="absolute inset-0 flex flex-col justify-between p-[9%]">
        <div className="flex items-start justify-between">
          <span className="font-mono uppercase tracking-[0.18em] text-[4.2cqw]">Spice Hanout</span>
          <span className="w-[11cqw] [&_svg]:h-auto [&_svg]:w-full"><HourMark moment={b.moment} /></span>
        </div>
        <div>
          {b.arabic && <p className="mb-[2cqw] text-[8.5cqw] leading-none" dir="rtl" lang="ar">{b.arabic}</p>}
          <p className="font-display text-[14cqw] leading-[0.92] tracking-[-0.01em]">{b.name}</p>
          <div className="mt-[5cqw] flex items-baseline justify-between border-t pt-[3cqw] font-mono text-[4.2cqw]" style={{ borderColor: b.ink }}>
            <span>{HOUR[b.moment]}{isBox ? "" : " · Marrakech"}</span>
            <span>{b.weight}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
