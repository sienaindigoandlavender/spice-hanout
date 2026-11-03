import Link from "next/link";
import { KIND_ONE, inkFor, type Entry } from "@/lib/magazine";

// A magazine card: a field in the colour of the food, the title set in it, the dek underneath.
export default function EntryCard({ e, big = false }: { e: Entry; big?: boolean }) {
  return (
    <Link href={`/magazine/${e.kind}/${e.slug}`} className="group block">
      <div className={`relative ${big ? "aspect-[4/3] md:aspect-[16/9]" : "aspect-[4/5]"}`} style={{ background: e.tint, color: inkFor(e.tint) }}>
        <div className={`absolute inset-0 flex flex-col justify-between ${big ? "p-6 md:p-10" : "p-5"}`}>
          <span className="font-mono text-[12px] uppercase tracking-[0.14em]">{KIND_ONE[e.kind]}</span>
          <div>
            {e.arabic && <p className={`${big ? "text-[26px]" : "text-[18px]"} mb-2 leading-none`} dir="rtl" lang="ar">{e.arabic}</p>}
            <p className={`font-display leading-[0.98] transition-[font-style] group-hover:italic ${big ? "text-[40px] md:text-[72px]" : "text-[28px] md:text-[32px]"}`}>{e.title}</p>
          </div>
        </div>
      </div>
      <p className={`mt-4 ${big ? "max-w-2xl text-[19px]" : "text-[16px]"} leading-snug`}>{e.dek}</p>
    </Link>
  );
}
