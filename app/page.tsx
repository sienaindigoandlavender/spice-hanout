import Link from "next/link";
import { BLENDS, MOMENTS, blendsFor } from "@/lib/blends";
import { offers } from "@/lib/shopify";
import Label from "@/components/Label";

export const revalidate = 300;

export default async function Home() {
  const o = await offers(BLENDS.map((b) => b.handle));
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
          has always made them, and nothing added that you would not cook with yourself.
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

      <section className="bg-ink text-bone">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <p className="font-mono text-[13px] uppercase tracking-[0.14em] md:col-span-3">How we write</p>
          <div className="md:col-span-8">
            <p className="font-display text-[32px] leading-[1.15] md:text-[48px]">
              Food, not medicine. <em>We tell you where it comes from, how it is used, and where to read more.</em>
            </p>
            <p className="mt-8 max-w-2xl text-[17px]">
              No promises on a label. Where serious research has looked at an ingredient, we list the source next to the blend, so you can read it yourself.
            </p>
            <Link href="/notes" className="mt-8 inline-block border-b border-bone pb-1 text-[15px]">Our notes</Link>
          </div>
        </div>
      </section>
    </>
  );
}
