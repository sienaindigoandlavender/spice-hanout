import type { Metadata } from "next";
import Link from "next/link";
import { Page, Section } from "@/components/Prose";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Returns", description: "Spices are food, so there are no returns for a change of mind. If we made a mistake, we put it right." };

export default function Returns() {
  return (
    <Page kicker="Help" title="Returns" updated="3 November 2026" intro="Spices are food, so once a tin has left our kitchen we cannot take it back. If we got something wrong, it is on us.">
      <Section title="No returns for a change of mind">
        <p>We don&apos;t take back or exchange opened or unopened tins for a change of heart, a taste you didn&apos;t love or a tin ordered twice. We would rather you gave it to a friend who cooks.</p>
      </Section>
      <Section title="Unless we made a mistake">
        <p>Wrong blend, a missing tin, a damaged tin, a lid that wasn&apos;t sealed, anything not right before its best-before date: send a photo within 48 hours of delivery, with your order number, through our <Link href="/contact">contact page</Link> or to {COMPANY.email}.</p>
        <p>We send a replacement or refund you, whichever you prefer, and the delivery is on us. You don&apos;t need to send anything back.</p>
      </Section>
      <Section title="Refunds">
        <p>Refunds go back the way you paid, within ten working days of our reply. Cash orders are refunded by bank transfer.</p>
      </Section>
      <Section title="Your rights">
        <p>None of this limits your rights under Moroccan consumer law (law 31-08). The full rules are in our <Link href="/terms">terms</Link>.</p>
      </Section>
    </Page>
  );
}
