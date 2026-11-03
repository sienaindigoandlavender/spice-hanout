import Link from "next/link";
import { BLENDS, BOX, MOMENTS, blendsFor } from "@/lib/blends";
import { allEntries } from "@/lib/magazine";
import EntryCard from "@/components/EntryCard";
import { AddButton } from "@/components/Basket";
import { offers } from "@/lib/shopify";
import Label from "@/components/Label";

export const revalidate = 300;

export default async function Home() {
  const o = await offers([...BLENDS.map((b) => b.handle), BOX.handle]);
  const reads = allEntries().slice(0, 4);
  const trio = ["golden-hour", "ras-el-hanout", "sweet-tagine"].map((h) => BLENDS.find((b) => b.handle === h)!);
  return (
    <>
      {/* The idea, in one breath */}
      <section className="mx-auto max-w-[1400px] px-4 pt-20 pb-16 md:px-10 md:pt-32 md:pb-24">
        <p className="font-mono text-[13px] uppercase tracking-[0.14em]">Marrakech · small batches</p>
        <h1 className="mt-6 max-w-5xl font-display text-[48px] leading-[1] md:text-[96px]">
          Spices for the hours <em>of a day.</em>
        </h1>
        <p className="mt-8 max-w-xl text-[18px]">
          One for the first light, one for the long lunch, one for the evening. Ground in Marrakech, the way the souk
          has always made them. For second helpings, sticky fingers and bread wiped round the plate.
        </p>
        {/* the day as a band of colour: each blend's own colour, in order of the hours */}
        <div className="mt-14 flex h-3 w-full">
          {BLENDS.map((b) => <span key={b.handle} className="flex-1" style={{ background: b.colour }} />)}
        </div>
      </section>

      {MOMENTS.map((m, i) => (
        <section key={m.key} id={m.key} className={`scroll-mt-16 ${i % 2 === 0 ? "bg-paper" : "bg-bone"}`}>
          <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-10 md:py-28">
            <div className="grid gap-4 md:grid-cols-12 md:items-end">
              <h2 className="font-display text-[44px] leading-none md:col-span-4 md:text-[64px]"><em>{m.title}</em></h2>
              <p className="text-[17px] md:col-span-6 md:col-start-7">{m.line}</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
              {blendsFor(m.key).map((b) => (
                <Link key={b.handle} href={`/blends/${b.handle}`} className="group block">
                  <div className="transition-transform duration-700 group-hover:-translate-y-1"><Label b={b} /></div>
                  <p className="mt-4 text-[15px]">{b.line.split(".")[0]}.</p>
                  <p className="mt-2 font-mono text-[13px]">{o[b.handle]?.price ? `${o[b.handle].price} · ${b.weight}` : `Soon · ${b.weight}`}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* The box: the whole day in three tins */}
      <section id="box" className="scroll-mt-16 border-t border-ink">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-20 md:grid-cols-12 md:items-center md:px-10 md:py-28">
          <div className="grid grid-cols-3 gap-3 md:col-span-7">
            {trio.map((b) => <Link key={b.handle} href={`/blends/${b.handle}`} className="block"><Label b={b} /></Link>)}
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="font-mono text-[13px] uppercase tracking-[0.14em]">The box</p>
            <h2 className="mt-4 font-display text-[44px] leading-none md:text-[60px]"><Link href={`/blends/${BOX.handle}`} className="hover:italic">{BOX.name}</Link></h2>
            <p className="mt-6 text-[17px]">{BOX.line}</p>
            <div className="mt-8"><AddButton handle={BOX.handle} available={!!o[BOX.handle]?.available} price={o[BOX.handle]?.price} /></div>
          </div>
        </div>
      </section>

      {reads.length > 0 && (
        <section className="bg-paper">
          <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-10 md:py-28">
            <div className="grid gap-4 md:grid-cols-12 md:items-end">
              <h2 className="font-display text-[44px] leading-none md:col-span-5 md:text-[64px]">From the <em>magazine</em></h2>
              <Link href="/magazine" className="text-[15px] underline underline-offset-4 md:col-span-3 md:col-start-10 md:text-end">Read the magazine</Link>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
              {reads.map((e) => <EntryCard key={e.slug} e={e} />)}
            </div>
          </div>
        </section>
      )}

      <section className="bg-ink text-bone">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] md:col-span-3">What we believe</p>
          <div className="md:col-span-8">
            <p className="font-display text-[32px] leading-[1.15] md:text-[48px]">
              Joy is designed. <em>The jar you reach for, the smell at noon, the second helping nobody needs.</em>
            </p>
            <p className="mt-8 max-w-2xl text-[17px]">
              This is not health food. It is soul food, made with intention: the right spice at the right hour, in a box you love opening. Greed welcome.
            </p>
            <Link href="/notes" className="mt-8 inline-block border-b border-bone pb-1 text-[15px]">Our notes</Link>
          </div>
        </div>
      </section>
    </>
  );
}
