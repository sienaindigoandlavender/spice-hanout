"use client";
import Link from "next/link";
import { useState } from "react";
import { SHELF } from "@/lib/blends";
import { useBasket } from "@/components/Basket";
import Label from "@/components/Label";

export default function BasketPage() {
  const { lines, set } = useBasket();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [note, setNote] = useState("");
  const items = lines.map((l) => ({ ...l, b: SHELF.find((x) => x.handle === l.handle) })).filter((x) => x.b);

  async function checkout() {
    setBusy(true); setMsg("");
    const r = await fetch("/api/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lines, note }) });
    const j = await r.json().catch(() => ({}));
    if (j.url) window.location.href = j.url;
    else { setMsg(j.error || "Something went wrong. Try again in a moment."); setBusy(false); }
  }

  return (
    <section className="mx-auto max-w-[900px] px-4 py-16 md:px-10 md:py-24">
      <h1 className="font-display text-[52px] leading-none md:text-[72px]">Basket</h1>
      {items.length === 0 ? (
        <p className="mt-8 text-[18px]">Nothing here yet. <Link href="/" className="underline underline-offset-4">See the blends</Link>.</p>
      ) : (
        <>
          <ul className="mt-10 border-t border-ink">
            {items.map(({ b, qty }) => (
              <li key={b!.handle} className="grid grid-cols-[80px_1fr_auto] items-center gap-5 border-b border-ink py-5">
                <div className="w-20"><Label b={b!} /></div>
                <div>
                  <p className="font-display text-[24px] leading-tight">{b!.name}</p>
                  <p className="font-mono text-[13px]">{b!.weight}</p>
                </div>
                <div className="flex items-center gap-3 text-[16px]">
                  <button onClick={() => set(b!.handle, qty - 1)} aria-label="One less" className="px-2">−</button>
                  <span className="w-6 text-center">{qty}</span>
                  <button onClick={() => set(b!.handle, qty + 1)} aria-label="One more" className="px-2">+</button>
                </div>
              </li>
            ))}
          </ul>
          <label className="mt-10 grid gap-1">
            <span className="font-mono text-[12px] uppercase tracking-[0.16em]">A note for us (optional)</span>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} maxLength={500} placeholder="A gift message, or something about the delivery" className="w-full resize-y border-0 border-b border-ink bg-transparent px-0 py-3 text-[18px] placeholder:text-ink placeholder:italic focus:outline-none" />
          </label>
          <button onClick={checkout} disabled={busy} className="mt-10 bg-ink px-8 py-4 text-[16px] text-bone hover:bg-clay transition-colors disabled:bg-paper disabled:text-ink">
            {busy ? "One moment" : "Go to checkout"}
          </button>
          {msg && <p className="mt-4 text-[15px]">{msg}</p>}
        </>
      )}
    </section>
  );
}
