import type { Metadata } from "next";
import Link from "next/link";
import { KINDS, KIND_MANY, KIND_LINE, allEntries, entriesOf } from "@/lib/magazine";
import EntryCard from "@/components/EntryCard";

export const metadata: Metadata = {
  title: "The magazine",
  description: "Stories, spices and recipes from Spice Hanout: soul food with intention, from a Marrakech kitchen.",
};

export default function Magazine() {
  const [lead, ...rest] = allEntries();
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-4 pt-16 pb-12 md:px-10 md:pt-24">
        <p className="font-mono text-[13px] uppercase tracking-[0.14em]">The magazine</p>
        <h1 className="mt-5 max-w-5xl font-display text-[48px] leading-[1] md:text-[96px]">
          Soul food, <em>with intention.</em>
        </h1>
        <p className="mt-8 max-w-xl text-[18px]">
          Stories from the table, the spices in the tins, and recipes for second helpings. Slow down, cook, eat well, eat again.
        </p>
      </section>

      {lead && (
        <section className="mx-auto max-w-[1400px] px-4 pb-20 md:px-10">
          <EntryCard e={lead} big />
        </section>
      )}

      {KINDS.map((k, i) => {
        const list = entriesOf(k).filter((e) => e !== lead);
        if (!list.length) return null;
        return (
          <section key={k} className={i % 2 === 0 ? "bg-paper" : "bg-bone"}>
            <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-10 md:py-24">
              <div className="grid gap-4 md:grid-cols-12 md:items-end">
                <h2 className="font-display text-[44px] leading-none md:col-span-4 md:text-[64px]"><em>{KIND_MANY[k]}</em></h2>
                <p className="text-[17px] md:col-span-5 md:col-start-7">{KIND_LINE[k]}</p>
                <Link href={`/magazine/${k}`} className="text-[15px] underline underline-offset-4 md:col-span-2 md:text-end">All {KIND_MANY[k].toLowerCase()}</Link>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
                {list.slice(0, 8).map((e) => <EntryCard key={e.slug} e={e} />)}
              </div>
            </div>
          </section>
        );
      })}
      {rest.length === 0 && null}
    </>
  );
}
