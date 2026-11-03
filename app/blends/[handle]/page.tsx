import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLENDS, MOMENTS, SHELF, BOX, itemBy } from "@/lib/blends";
import { entriesForBlend, KIND_ONE } from "@/lib/magazine";
import { offers } from "@/lib/shopify";
import Label from "@/components/Label";
import Tin from "@/components/Tin";
import { AddButton } from "@/components/Basket";

export const revalidate = 300;
export const dynamicParams = false;
export const generateStaticParams = () => SHELF.map((b) => ({ handle: b.handle }));

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const b = itemBy((await params).handle);
  return b ? { title: b.name, description: b.line } : {};
}

export default async function BlendPage({ params }: { params: Promise<{ handle: string }> }) {
  const b = itemBy((await params).handle);
  if (!b) notFound();
  const offer = (await offers([b.handle]))[b.handle];
  const moment = MOMENTS.find((m) => m.key === b.moment)!;
  const reading = b.reading.filter((r) => r.checked);
  const isBox = b.handle === BOX.handle;
  const others = isBox ? BLENDS.filter((x) => ["golden-hour", "ras-el-hanout", "sweet-tagine"].includes(x.handle)) : BLENDS.filter((x) => x.moment === b.moment && x.handle !== b.handle).slice(0, 3);
  const reads = entriesForBlend(b.handle).slice(0, 4);

  return (
    <>
      <section className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 md:grid-cols-12 md:gap-14 md:px-10 md:py-20">
        <div className="md:col-span-6"><div className="md:sticky md:top-24">
          <div className="mx-auto max-w-[520px]"><Tin b={b} size="large" uid="-hero" /></div>
          <div className="mx-auto mt-6 grid max-w-[520px] grid-cols-2 gap-4">
            <div className="text-[7px] md:text-[8px]"><Label b={b} size="print" face="back" uid="-back" /></div>
            <p className="self-end text-[14px] leading-[1.5]">The back of the tin: what is inside, how to use it, the batch and the date, written by hand.</p>
          </div>
        </div></div>
        <div className="md:col-span-5 md:col-start-8">
          <Link href={isBox ? "/#box" : `/#${b.moment}`} className="font-mono text-[13px] uppercase tracking-[0.14em] hover:underline underline-offset-4">{isBox ? "The box" : moment.title}</Link>
          <h1 className="mt-4 font-display text-[52px] leading-[0.95] md:text-[72px]">{b.name}</h1>
          {b.arabic && <p className="mt-3 text-[24px]" dir="rtl" lang="ar">{b.arabic}</p>}
          <p className="mt-6 text-[19px] leading-[1.6]">{b.line}</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <AddButton handle={b.handle} available={!!offer?.available} price={offer?.price} />
            <span className="font-mono text-[13px]">{b.weight}</span>
          </div>

          <h2 className="mt-14 border-t border-ink pt-5 font-mono text-[13px] uppercase tracking-[0.14em]">Inside</h2>
          <ul className="mt-4 space-y-1.5 text-[16px]">
            {b.inside.map((i) => <li key={i.name}>{i.name}{i.note && <span>, {i.note}</span>}</li>)}
          </ul>

          <h2 className="mt-10 border-t border-ink pt-5 font-mono text-[13px] uppercase tracking-[0.14em]">How to use it</h2>
          <ul className="mt-4 space-y-2 text-[16px]">{b.use.map((u) => <li key={u}>{u}</li>)}</ul>

          <h2 className="mt-10 border-t border-ink pt-5 font-mono text-[13px] uppercase tracking-[0.14em]">The story</h2>
          <div className="mt-4 space-y-4 text-[17px] leading-[1.7]">{b.story.map((s) => <p key={s}>{s}</p>)}</div>

          {reading.length > 0 && (
            <>
              <h2 className="mt-10 border-t border-ink pt-5 font-mono text-[13px] uppercase tracking-[0.14em]">Further reading</h2>
              <ul className="mt-4 space-y-3 text-[15px]">
                {reading.map((r) => (
                  <li key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{r.title}</a><br />{r.source}</li>
                ))}
              </ul>
              <p className="mt-4 text-[14px]">We point to the research; we don&apos;t make claims from it. Food, not medicine.</p>
            </>
          )}
        </div>
      </section>

      {reads.length > 0 && (
        <section className="border-t border-ink">
          <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-10 md:py-20">
            <p className="font-mono text-[13px] uppercase tracking-[0.14em]">In the magazine</p>
            <ul className="mt-6 border-t border-ink">
              {reads.map((e) => (
                <li key={e.slug} className="border-b border-ink">
                  <Link href={`/magazine/${e.kind}/${e.slug}`} className="group grid gap-1 py-5 md:grid-cols-12 md:items-baseline">
                    <span className="font-mono text-[13px] md:col-span-2">{KIND_ONE[e.kind]}</span>
                    <span className="font-display text-[28px] leading-tight group-hover:italic md:col-span-5">{e.title}</span>
                    <span className="text-[16px] md:col-span-5">{e.dek}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="bg-paper">
          <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-10 md:py-20">
            <p className="font-mono text-[13px] uppercase tracking-[0.14em]">{isBox ? "In the box" : `Also for the ${moment.title.toLowerCase()}`}</p>
            <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
              {others.map((x) => <Link key={x.handle} href={`/blends/${x.handle}`} className="block transition-transform duration-500 hover:-translate-y-2"><Tin b={x} uid="-o" /></Link>)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
