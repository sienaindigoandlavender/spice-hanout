import type { Metadata } from "next";
import { WORLD, WORLD_REGIONS } from "@/lib/world";
import { offers } from "@/lib/shopify";
import WorldCard from "@/components/WorldCard";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "The world's blends",
  description: "Ninety blends from the Maghreb to Montréal, ground in Marrakech: baharat, garam masala, berbéré, jerk, five-spice, herbes de Provence and more.",
};

const BG = ["#F4F0E8", "#EBE5D9"];

export default async function World() {
  const o = await offers(WORLD.map((b) => b.handle));
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-4 pt-16 pb-14 md:px-10 md:pt-24 md:pb-20">
        <p className="font-mono text-[13px] uppercase tracking-[0.16em]">The world&apos;s blends</p>
        <h1 className="mt-6 max-w-5xl font-display text-[52px] leading-[0.95] md:text-[104px]">
          The whole spice road, <em>ground in Marrakech.</em>
        </h1>
        <p className="mt-8 max-w-xl text-[18px] leading-[1.6]">
          {WORLD.length} blends from {WORLD_REGIONS.length} kitchens of the world, each made the way its own cooks make it. Our ten blends keep the hours of the day; these keep you travelling.
        </p>
        <nav className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink pt-6 text-[16px]">
          {WORLD_REGIONS.map((r) => (
            <a key={r.slug} href={`#${r.slug}`} className="hover:italic">{r.name} <span className="font-mono text-[12px]">{r.blends.length}</span></a>
          ))}
        </nav>
      </section>

      {WORLD_REGIONS.map((r, i) => (
        <section key={r.slug} id={r.slug} className="scroll-mt-16" style={{ background: BG[i % 2] }}>
          <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-10 md:py-28">
            <div className="grid gap-4 border-b border-ink pb-8 md:grid-cols-12 md:items-end">
              <h2 className="font-display text-[48px] leading-[0.92] md:col-span-6 md:text-[80px]"><em>{r.name}</em></h2>
              <p className="text-[17px] leading-[1.55] md:col-span-5 md:col-start-8">{r.intro}</p>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {r.blends.map((b) => <WorldCard key={b.handle} b={b} price={o[b.handle]?.price} />)}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
