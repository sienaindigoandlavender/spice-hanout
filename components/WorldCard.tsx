import Link from "next/link";
import type { Blend } from "@/lib/blends";

export const smallShot = (url: string, w = 800) => url.replace("w_1400", `w_${w}`);

// A card for the world's blends: the lifestyle picture, a strip of the blend's colour, the name.
export default function WorldCard({ b, price }: { b: Blend; price?: string }) {
  return (
    <Link href={`/blends/${b.handle}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: b.colour }}>
        {b.image && <img src={smallShot(b.image)} alt={b.name} loading="lazy" draggable={false} className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" />}
      </div>
      <div className="h-1.5 w-full" style={{ background: b.colour }} />
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <p className="font-display text-[22px] leading-tight group-hover:italic md:text-[26px]">{b.name}</p>
        <p className="shrink-0 font-mono text-[13px]">{price ?? "Soon"}</p>
      </div>
      <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.12em]">{b.origin}</p>
      <p className="mt-2 text-[15px] leading-[1.5]">{b.line}</p>
    </Link>
  );
}
