import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KINDS, KIND_MANY, KIND_LINE, entriesOf, type Kind } from "@/lib/magazine";
import EntryCard from "@/components/EntryCard";

export const dynamicParams = false;
export const generateStaticParams = () => KINDS.map((kind) => ({ kind }));

export async function generateMetadata({ params }: { params: Promise<{ kind: string }> }): Promise<Metadata> {
  const k = (await params).kind as Kind;
  return KINDS.includes(k) ? { title: KIND_MANY[k], description: KIND_LINE[k] } : {};
}

export default async function KindPage({ params }: { params: Promise<{ kind: string }> }) {
  const k = (await params).kind as Kind;
  if (!KINDS.includes(k)) notFound();
  const list = entriesOf(k);
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-10 md:py-24">
      <p className="font-mono text-[13px] uppercase tracking-[0.14em]"><a href="/magazine" className="hover:underline underline-offset-4">The magazine</a></p>
      <h1 className="mt-5 font-display text-[52px] leading-none md:text-[88px]"><em>{KIND_MANY[k]}</em></h1>
      <p className="mt-6 max-w-xl text-[18px]">{KIND_LINE[k]}</p>
      <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {list.map((e) => <EntryCard key={e.slug} e={e} />)}
      </div>
    </section>
  );
}
