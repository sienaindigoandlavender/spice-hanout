import type { Metadata } from "next";
import Link from "next/link";
import { Page, Section } from "@/components/Prose";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Terms", description: "The terms of sale for Spice Hanout." };

export default function Terms() {
  const seller = [COMPANY.legalName || COMPANY.brand, COMPANY.address, COMPANY.city, COMPANY.rc && `RC ${COMPANY.rc}`, COMPANY.ice && `ICE ${COMPANY.ice}`].filter(Boolean).join(", ");
  return (
    <Page kicker="Small print" title={<>Terms <em>of sale</em></>} updated="3 November 2026" intro="Plain rules for buying from us.">
      <Section title="Who sells">
        <p>{seller}. Contact: {COMPANY.email}.</p>
      </Section>
      <Section title="Prices">
        <p>Prices are in Moroccan dirhams, all taxes included (TTC). Delivery is shown at checkout before you confirm. The price is the one shown when you place your order.</p>
      </Section>
      <Section title="Orders">
        <p>Your order is confirmed by email. If a blend runs out after you order, we tell you straight away and refund that part, or offer another blend if you prefer.</p>
      </Section>
      <Section title="Delivery">
        <p>Across Morocco, as set out on the <Link href="/shipping">shipping page</Link>. The risk passes to you when the parcel is handed over.</p>
      </Section>
      <Section title="Returns">
        <p>Food cannot be returned for a change of mind. If we made a mistake we replace or refund, as set out on the <Link href="/returns">returns page</Link>. This does not limit your rights under law 31-08 on consumer protection.</p>
      </Section>
      <Section title="The food">
        <p>Our blends are food, not medicine. Nothing on this site is medical advice. Every tin lists what is inside; if you have an allergy, read it, and write to us if in doubt. Keep tins closed, dry and away from the stove.</p>
      </Section>
      <Section title="The words and pictures">
        <p>The texts, labels and photographs on this site belong to Spice Hanout. Please ask before you use them.</p>
      </Section>
      <Section title="Law">
        <p>These terms follow Moroccan law. If something goes wrong, write to us first; we will try to put it right. Otherwise the courts of Marrakech decide.</p>
      </Section>
    </Page>
  );
}
