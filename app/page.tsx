import Link from "next/link";
import { BLENDS, BOX, MOMENTS, blendsFor, type Moment } from "@/lib/blends";
import { offers } from "@/lib/shopify";
import { allEntries } from "@/lib/magazine";
import Tin from "@/components/Tin";
import HourHero from "@/components/HourHero";
import EntryCard from "@/components/EntryCard";
import HourMark from "@/components/HourMark";
import { AddButton } from "@/components/Basket";
import { WORLD } from "@/lib/world";
import WorldCard from "@/components/WorldCard";

export const revalidate = 300;

// Each hour has its own air: pale gold at first light, warm bone at noon, dusk after.
const AIR: Record<Moment, { bg: string; ink: string; hours: string }> = {
  morning: { bg: "#F6EAD0", ink: "#1A1714", hours: "05:00 to 11:00" },
  midday: { bg: "#F4F0E8", ink: "#1A1714", hours: "11:00 to 16:00" },
  evening: { bg: "#231A1F", ink: "#F4F0E8", hours: "16:00 until late" },
};

export default async function Home() {
  const o = await offers([...BLENDS.map((b) => b.handle), BOX.handle, "baharat", "garam-masala", "berbere", "jerk"]);
  const prices = Object.fromEntries(Object.entries(o).map(([h, v]) => [h, v.price]));
  const reads = allEntries().slice(0, 4);
  const travel = ["baharat", "garam-masala", "berbere", "jerk"].map((h) => WORLD.find((b) => b.handle === h)!).filter(Boolean);
  const trio = ["golden-hour", "ras-el-hanout", "sweet-tagine"].map((h) => BLENDS.find((b) => b.handle === h)!);

  return (
    <>
      <HourHero blends={BLENDS} prices={prices} />

      {/* the day as a band of colour: each blend's own colour, in order of the hours */}
      <div className="flex h-4 w-full" aria-hidden>
        {BLENDS.map((b) => <span key={b.handle} className="flex-1" style={{ background: b.colour }} />)}
      </div>

      <section className="mx-auto grid max-w-[1400px] gap-8 px-4 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <p className="font-mono text-[13px] uppercase tracking-[0.16em] md:col-span-3">The idea</p>
        <div className="md:col-span-8">
          <p className="font-display text-[34px] leading-[1.12] md:text-[56px]">
            Ten blends, three hours. <em>Cook with the time of day and the day sorts itself out.</em>
          </p>
          <p className="mt-8 max-w-2xl text-[18px] leading-[1.6]">
            Ground in small batches in Marrakech, the way the souk has always made them. For second helpings, sticky fingers and bread wiped round the plate. Soul food, with intention.
          </p>
        </div>
      </section>

      {MOMENTS.map((m) => {
        const air = AIR[m.key];
        return (
          <section key={m.key} id={m.key} className="scroll-mt-16" style={{ background: air.bg, color: air.ink }}>
            <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-10 md:py-28">
              <div className="grid gap-6 border-b pb-8 md:grid-cols-12 md:items-end" style={{ borderColor: air.ink }}>
                <div className="flex items-end gap-5 md:col-span-6">
                  <h2 className="font-display text-[56px] leading-[0.9] md:text-[96px]"><em>{m.title}</em></h2>
                  <span className="mb-2 md:mb-4"><HourMark moment={m.key} size={44} /></span>
                </div>
                <div className="md:col-span-5 md:col-start-8">
                  <p className="font-mono text-[13px]">{air.hours}</p>
                  <p className="mt-2 text-[17px] leading-[1.55]">{m.line}</p>
                </div>
              </div>
              <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
                {blendsFor(m.key).map((b) => (
                  <Link key={b.handle} href={`/blends/${b.handle}`} className="group block">
                    <div className="transition-transform duration-500 ease-out group-hover:-translate-y-2"><Tin b={b} /></div>
                    <div className="mt-5 flex items-baseline justify-between gap-3">
                      <p className="font-display text-[24px] leading-tight group-hover:italic md:text-[28px]">{b.name}</p>
                      <p className="shrink-0 font-mono text-[13px]">{prices[b.handle] ?? "Soon"}</p>
                    </div>
                    <p className="mt-2 text-[15px] leading-[1.5]">{b.line.split(".")[0]}.</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section id="box" className="scroll-mt-16 bg-ink text-bone">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-24 md:grid-cols-12 md:items-center md:px-10 md:py-32">
          <div className="grid grid-cols-3 items-end gap-3 md:col-span-7 md:gap-5">
            {trio.map((b, i) => (
              <Link key={b.handle} href={`/blends/${b.handle}`} className={`block transition-transform duration-500 hover:-translate-y-2 ${i === 1 ? "md:-translate-y-6" : ""}`}><Tin b={b} uid="-box" /></Link>
            ))}
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="font-mono text-[13px] uppercase tracking-[0.16em]">The box</p>
            <h2 className="mt-5 font-display text-[52px] leading-[0.92] md:text-[76px]"><Link href={`/blends/${BOX.handle}`} className="hover:italic">{BOX.name}</Link></h2>
            <p className="mt-6 text-[18px] leading-[1.55]">{BOX.line}</p>
            <div className="mt-10 [&_button]:bg-bone [&_button]:text-ink [&_button:hover]:bg-[#D9A21B] [&_span]:border-bone">
              <AddButton handle={BOX.handle} available={!!o[BOX.handle]?.available} price={o[BOX.handle]?.price} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone">
        <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-10 md:py-32">
          <div className="grid gap-4 border-b border-ink pb-8 md:grid-cols-12 md:items-end">
            <h2 className="font-display text-[48px] leading-[0.95] md:col-span-7 md:text-[80px]">And the <em>world&apos;s blends</em></h2>
            <div className="md:col-span-4 md:col-start-9 md:text-end">
              <p className="text-[17px] leading-[1.55]">{WORLD.length} more, from Beirut to Montréal, ground here.</p>
              <Link href="/world" className="mt-3 inline-block text-[16px] underline underline-offset-4">See them all</Link>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {travel.map((b) => <WorldCard key={b.handle} b={b} price={prices[b.handle]} />)}
          </div>
        </div>
      </section>

      {reads.length > 0 && (
        <section className="bg-paper">
          <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-10 md:py-32">
            <div className="grid gap-4 border-b border-ink pb-8 md:grid-cols-12 md:items-end">
              <h2 className="font-display text-[48px] leading-none md:col-span-7 md:text-[80px]">From the <em>magazine</em></h2>
              <Link href="/magazine" className="text-[16px] underline underline-offset-4 md:col-span-3 md:col-start-10 md:text-end">Read the magazine</Link>
            </div>
            <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
              {reads.map((e) => <EntryCard key={e.slug} e={e} />)}
            </div>
          </div>
        </section>
      )}

      <section className="bg-bone">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-24 md:grid-cols-12 md:px-10 md:py-36">
          <p className="font-mono text-[13px] uppercase tracking-[0.16em] md:col-span-3">What we believe</p>
          <div className="md:col-span-8">
            <p className="font-display text-[36px] leading-[1.12] md:text-[60px]">
              Joy is designed. <em>The jar you reach for, the smell at noon, the second helping nobody needs.</em>
            </p>
            <p className="mt-8 max-w-2xl text-[18px] leading-[1.6]">
              This is not health food. It is soul food, made with intention: the right spice at the right hour, in a tin you love opening. Greed welcome.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
