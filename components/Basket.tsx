"use client";
import { createContext, useContext, useEffect, useState } from "react";

// The basket lives in this browser (localStorage). Checkout happens on Shopify.
type Line = { handle: string; qty: number };
const KEY = "sh-basket-v1";
const Ctx = createContext<{ lines: Line[]; add: (h: string) => void; set: (h: string, q: number) => void; clear: () => void }>({
  lines: [], add: () => {}, set: () => {}, clear: () => {},
});

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(() => {
    try { setLines(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch {}
  }, []);
  const save = (l: Line[]) => {
    setLines(l);
    try { localStorage.setItem(KEY, JSON.stringify(l)); } catch {}
  };
  const add = (h: string) => {
    const f = lines.find((l) => l.handle === h);
    save(f ? lines.map((l) => (l.handle === h ? { ...l, qty: l.qty + 1 } : l)) : [...lines, { handle: h, qty: 1 }]);
  };
  const set = (h: string, q: number) => save(q <= 0 ? lines.filter((l) => l.handle !== h) : lines.map((l) => (l.handle === h ? { ...l, qty: q } : l)));
  return <Ctx.Provider value={{ lines, add, set, clear: () => save([]) }}>{children}</Ctx.Provider>;
}

export const useBasket = () => useContext(Ctx);

export function BasketCount() {
  const { lines } = useBasket();
  const n = lines.reduce((s, l) => s + l.qty, 0);
  return <>{n > 0 ? `Basket (${n})` : "Basket"}</>;
}

export function AddButton({ handle, available, price }: { handle: string; available: boolean; price?: string }) {
  const { add } = useBasket();
  const [done, setDone] = useState(false);
  if (!price) return <span className="inline-block border border-ink px-7 py-3.5 text-[15px]">Soon</span>;
  if (!available) return <span className="inline-block border border-ink px-7 py-3.5 text-[15px]">Back soon</span>;
  return (
    <button
      onClick={() => { add(handle); setDone(true); setTimeout(() => setDone(false), 1600); }}
      className="bg-ink px-7 py-3.5 text-[15px] text-bone hover:bg-clay transition-colors"
    >
      {done ? "In the basket" : `Add to basket · ${price}`}
    </button>
  );
}
