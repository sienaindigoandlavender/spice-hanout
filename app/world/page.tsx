import type { Metadata } from "next";
import { WORLD, WORLD_REGIONS, USES } from "@/lib/world";
import { offers } from "@/lib/shopify";
import WorldBrowser from "@/components/WorldBrowser";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "The world's blends",
  description: "Ninety blends from the Maghreb to Montréal, ground in Marrakech: baharat, garam masala, berbéré, jerk, five-spice, herbes de Provence and more.",
};

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

      <WorldBrowser regions={WORLD_REGIONS} uses={USES.map((u) => ({ key: u.key, label: u.label }))} prices={Object.fromEntries(Object.entries(o).map(([h, v]) => [h, v.price]))} />
    </>
  );
}
