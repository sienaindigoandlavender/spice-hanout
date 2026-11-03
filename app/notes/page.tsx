import type { Metadata } from "next";

export const metadata: Metadata = { title: "How we write about spices", description: "Food, not medicine: tradition, use, and sources you can read yourself." };

export default function Notes() {
  return (
    <section className="mx-auto max-w-[760px] px-4 py-16 md:px-10 md:py-24">
      <p className="font-mono text-[13px] uppercase tracking-[0.14em]">Notes</p>
      <h1 className="mt-5 font-display text-[48px] leading-[1] md:text-[68px]">How we write <em>about spices</em></h1>
      <div className="mt-10 space-y-6 text-[18px] leading-[1.75]">
        <p>Spices have been part of how people take care of themselves for as long as there have been kitchens. We love that, and we take it seriously enough not to make promises about it.</p>
        <p>So on every blend you will find three things: what is inside and where it comes from, how it is used in Moroccan kitchens and in ours, and its story. When serious research has looked at an ingredient, we add the source, from places like the US National Institutes of Health, so you can read it for yourself.</p>
        <p>What you will not find: claims that a spice heals, cures, detoxes or boosts anything. Food, not medicine. If you have a health question, ask your doctor, and enjoy your dinner.</p>
      </div>
    </section>
  );
}
