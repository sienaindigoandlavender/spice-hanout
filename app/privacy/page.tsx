import type { Metadata } from "next";
import { Page, Section } from "@/components/Prose";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = { title: "Privacy", description: "What Spice Hanout keeps about you, why, and for how long." };

export default function Privacy() {
  return (
    <Page kicker="Small print" title="Privacy" updated="3 November 2026" intro="We keep as little as we can, only to deliver your order and answer you.">
      <Section title="What we collect">
        <ul>
          <li>When you order: your name, address, phone and email, kept by Shopify, which runs our checkout.</li>
          <li>When you write to us: your name, email and message.</li>
          <li>Your basket is kept in your own browser, not on our servers.</li>
        </ul>
      </Section>
      <Section title="Why">
        <p>To deliver what you ordered, to answer your messages, and to keep the accounts the law asks us to keep. We don&apos;t sell or rent your details, and we don&apos;t send newsletters you didn&apos;t ask for.</p>
      </Section>
      <Section title="Who else sees it">
        <p>Shopify (checkout and orders), the courier who delivers your parcel, our email provider for messages, and Vercel, which hosts this site. Each only gets what it needs.</p>
      </Section>
      <Section title="How long">
        <p>Order records for as long as Moroccan accounting rules require; messages for as long as the conversation needs, then deleted.</p>
      </Section>
      <Section title="Your rights">
        <p>Under Moroccan law 09-08 you can ask to see, correct or delete what we hold about you. Write to {COMPANY.email} and we will answer within thirty days.</p>
      </Section>
      <Section title="Cookies">
        <p>We use no advertising or tracking cookies. Your browser stores your basket so it is still there when you come back.</p>
      </Section>
    </Page>
  );
}
