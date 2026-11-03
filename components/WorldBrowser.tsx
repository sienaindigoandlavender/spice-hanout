"use client";
import { useMemo, useState } from "react";
import type { Blend } from "@/lib/blends";
import WorldCard from "./WorldCard";

type Region = { slug: string; name: string; intro: string; blends: Blend[] };
const BG = ["#F4F0E8", "#EBE5D9"];

// Shop the world's blends by use, by region, or by a word. Everything stays on one calm page.
export default function WorldBrowser({ regions, uses, prices }: { regions: Region[]; uses: { key: string; label: string }[]; prices: Record<string, string | undefined> }) {
  const [use, setUse] = useState<string>("");
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return regions
      .map((r) => ({
        ...r,
        blends: r.blends.filter((b) => (!use || b.uses?.includes(use)) && (!t || `${b.name} ${b.origin} ${b.line} ${b.inside.map((i) => i.name).join(" ")}`.toLowerCase().includes(t))),
      }))
      .filter((r) => r.blends.length);
  }, [regions, use, q]);
  const count = shown.reduce((n, r) => n + r.blends.length, 0);
  const chip = (on: boolean) => `border-b pb-1 text-[17px] transition-colors ${on ? "border-ink italic" : "border-transparent hover:border-ink"}`;

  return (
    <>
      <div className="sticky top-16 z-30 border-y border-ink bg-bone/95">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-4 md:flex-row md:items-end md:justify-between md:px-10">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <button className={chip(!use)} onClick={() => setUse("")}>All</button>
            {uses.map((u) => <button key={u.key} className={chip(use === u.key)} onClick={() => setUse(use === u.key ? "" : u.key)}>{u.label}</button>)}
          </div>
          <label className="flex items-end gap-3 md:w-72">
            <span className="sr-only">Search the blends</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cumin, Persia, steak…" className="w-full border-0 border-b border-ink bg-transparent px-0 py-1.5 text-[17px] placeholder:text-ink placeholder:italic focus:outline-none" />
            <span className="shrink-0 font-mono text-[12px]">{count}</span>
          </label>
        </div>
      </div>

      {shown.length === 0 && (
        <p className="mx-auto max-w-[1400px] px-4 py-24 font-display text-[32px] italic md:px-10">Nothing by that name yet. Try another word.</p>
      )}

      {shown.map((r, i) => (
        <section key={r.slug} id={r.slug} className="scroll-mt-36" style={{ background: BG[i % 2] }}>
          <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-10 md:py-28">
            <div className="grid gap-4 border-b border-ink pb-8 md:grid-cols-12 md:items-end">
              <h2 className="font-display text-[48px] leading-[0.92] md:col-span-6 md:text-[80px]"><em>{r.name}</em></h2>
              <p className="text-[17px] leading-[1.55] md:col-span-5 md:col-start-8">{r.intro}</p>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {r.blends.map((b) => <WorldCard key={b.handle} b={b} price={prices[b.handle]} />)}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
