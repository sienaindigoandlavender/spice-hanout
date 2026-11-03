import type { Metadata } from "next";
import Link from "next/link";
import { Page, Section } from "@/components/Prose";

export const metadata: Metadata = { title: "Shipping and taxes", description: "Spice Hanout delivers across Morocco. Prices in dirhams, all taxes included; delivery shown at checkout before you pay." };

export default function Shipping() {
  return (
    <Page kicker="Help" title={<>Shipping <em>and taxes</em></>} updated="3 November 2026" intro="We pack every order by hand in Marrakech. The price you see is the price you pay, taxes included.">
      <Section title="Where we deliver">
        <p>Anywhere in Morocco, for now. Abroad comes later, once every tin can travel with its paperwork in order.</p>
      </Section>
      <Section title="What it costs">
        <p>Delivery is shown at checkout, before you confirm, so there are no surprises at the door.</p>
      </Section>
      <Section title="How long it takes">
        <p>We hand your order to the courier within two working days. Big cities usually see it one to three working days later; further corners take a little longer. The courier calls before coming.</p>
      </Section>
      <Section title="Paying">
        <p>You pay at Shopify&apos;s secure checkout with the methods it shows you, or in cash to the courier where cash on delivery is offered. We never see or keep your card details.</p>
      </Section>
      <Section title="Taxes">
        <p>Every price on this site is in Moroccan dirhams and includes all the taxes that apply (TTC). Nothing is added later. Your confirmation email shows the full amount, delivery included.</p>
      </Section>
      <Section title="When it arrives">
        <p>Open the parcel in front of the courier. If it is crushed or clearly not what you ordered, you can refuse it and tell us; we send it again. Something wrong after that? See <Link href="/returns">returns</Link>.</p>
      </Section>
    </Page>
  );
}
