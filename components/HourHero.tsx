"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Blend, Moment } from "@/lib/blends";
import Tin from "./Tin";

// The home page opens at the hour it is in Marrakech (Morocco keeps UTC). Morning before 11,
// midday until 16, evening after. The visitor can walk the day with the three words below.
const SKY: Record<Moment, { bg: string; ink: string; line: string }> = {
  morning: { bg: "linear-gradient(180deg,#F8EBCF 0%,#F4D594 55%,#EDBE6A 100%)", ink: "#1A1714", line: "First light. Warm cups, eggs in a clay dish, a breakfast that refuses to rush." },
  midday: { bg: "linear-gradient(180deg,#F6EEDD 0%,#EFD9AE 50%,#D99A4E 100%)", ink: "#1A1714", line: "The long lunch. The tagine in the middle, bread for everyone, a second helping." },
  evening: { bg: "linear-gradient(180deg,#1E1620 0%,#4A2A2C 45%,#A4532F 85%,#C9733A 100%)", ink: "#F4F0E8", line: "The day softens. Cinnamon, saffron, a cup after dinner, the table cleared slowly." },
};
const ORDER: Moment[] = ["morning", "midday", "evening"];
const TITLE: Record<Moment, string> = { morning: "Morning", midday: "Midday", evening: "Evening" };

function nowMoment(): { m: Moment; clock: string } {
  const d = new Date();
  const h = d.getUTCHours();
  const clock = `${String(h).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
  return { m: h >= 5 && h < 11 ? "morning" : h >= 11 && h < 16 ? "midday" : "evening", clock };
}

export default function HourHero({ blends, prices }: { blends: Blend[]; prices: Record<string, string | undefined> }) {
  const [m, setM] = useState<Moment>("midday");
  const [clock, setClock] = useState("");
  const [live, setLive] = useState<Moment | null>(null);
  useEffect(() => {
    const n = nowMoment();
    setM(n.m); setLive(n.m); setClock(n.clock);
    const t = setInterval(() => setClock(nowMoment().clock), 30000);
    return () => clearInterval(t);
  }, []);
  const sky = SKY[m];
  const list = blends.filter((b) => b.moment === m).slice(0, 3);

  return (
    <section className="relative overflow-hidden transition-[color] duration-700" style={{ color: sky.ink }}>
      {ORDER.map((k) => (
        <div key={k} aria-hidden className="absolute inset-0 transition-opacity duration-1000 ease-out" style={{ background: SKY[k].bg, opacity: k === m ? 1 : 0 }} />
      ))}
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-4 pt-14 pb-14 md:min-h-[calc(100svh-4rem)] md:grid-cols-12 md:items-center md:px-10 md:pt-16 md:pb-16">
        <div className="md:col-span-6">
          <p className="font-mono text-[13px] uppercase tracking-[0.16em]">
            Marrakech{clock && <> · {clock}</>}{live && <> · it is {TITLE[live].toLowerCase()}</>}
          </p>
          <h1 className="mt-8 font-display text-[54px] leading-[0.95] tracking-[-0.015em] md:text-[104px]">
            Spices for the <em>hours</em> of a day.
          </h1>
          <p key={m} className="sh-fade mt-8 max-w-md text-[18px] leading-[1.55] md:text-[19px]">{sky.line}</p>
          <div className="mt-12 flex border-t" style={{ borderColor: sky.ink }} role="tablist" aria-label="The hours">
            {ORDER.map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={k === m}
                onClick={() => setM(k)}
                className={`flex-1 py-4 text-start font-display text-[24px] transition-[font-style] md:text-[32px] ${k === m ? "italic" : ""}`}
                style={{ boxShadow: k === m ? `inset 0 2px 0 ${sky.ink}` : "none" }}
              >
                {TITLE[k]}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <div key={m} className="grid grid-cols-3 items-end gap-3 md:gap-5">
            {list.map((b, i) => (
              <Link key={b.handle} href={`/blends/${b.handle}`} className="sh-rise group block" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="transition-transform duration-500 group-hover:-translate-y-2"><Tin b={b} uid="-hero" /></div>
                <p className="mt-3 text-[14px] md:text-[15px]">{b.name}{prices[b.handle] && <span className="font-mono text-[12px] md:text-[13px]"> · {prices[b.handle]}</span>}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
