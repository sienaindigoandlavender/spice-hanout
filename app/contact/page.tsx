import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Contact", description: "Write to Spice Hanout: orders, blends, wholesale, press." };

export default async function Contact({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-16 pb-28 md:px-10 md:pt-24">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-mono text-[13px] uppercase tracking-[0.16em]">Contact</p>
          <h1 className="mt-5 font-display text-[52px] leading-[0.95] md:text-[80px]">Say <em>hello</em></h1>
          <p className="mt-8 text-[18px] leading-[1.6]">An order, a blend, wholesale for a restaurant or a shop, a recipe you think we should know. We answer within a day.</p>
          <p className="mt-8 text-[16px] leading-[1.7]">
            {COMPANY.email}<br />{COMPANY.city}
          </p>
          <p className="mt-8 text-[16px]">Quick answers first? <Link href="/faq" className="underline underline-offset-4">Questions</Link> · <Link href="/shipping" className="underline underline-offset-4">Shipping</Link> · <Link href="/returns" className="underline underline-offset-4">Returns</Link></p>
        </div>
        <div className="md:col-span-7 md:col-start-6"><ContactForm initial={topic} /></div>
      </div>
    </section>
  );
}
