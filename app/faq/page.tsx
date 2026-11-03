import type { Metadata } from "next";
import Link from "next/link";
import { Page, Section } from "@/components/Prose";

export const metadata: Metadata = { title: "Questions", description: "How long a tin keeps, how much to use, what the hours mean, and other things people ask Spice Hanout." };

const QA: [string, React.ReactNode][] = [
  ["What do the hours mean?", <>Each house blend belongs to a time of day: Morning, Midday or Evening. It is a suggestion, not a rule. Golden Hour in a dinner stew is still delicious.</>],
  ["How long does a tin keep?", <>Ground spices are best within a year, whole ones a little longer. The best-before date is written by hand on the back of each tin. Keep it closed, dry and away from the stove.</>],
  ["How much should I use?", <>Start with a teaspoon for a dish for four, taste, then add. Every blend&apos;s page has a few ways to use it.</>],
  ["Is it spicy?", <>Most of our blends are warm, not hot. The hot ones (Dry Harissa, Mitmita, Jerk and friends) say so on their page.</>],
  ["Do you add salt, sugar or anything else?", <>Only when the recipe needs it, and then it is listed on the tin.</>],
  ["Do you ship abroad?", <>Not yet. Morocco first. See <Link href="/shipping">shipping</Link>.</>],
  ["Wholesale, restaurants, gifts?", <>Yes, gladly. <Link href="/contact">Write to us</Link> with what you have in mind.</>],
];

export default function Faq() {
  return (
    <Page kicker="Help" title="Questions" intro="What people ask us most, answered short.">
      {QA.map(([q, a]) => (
        <Section key={q} title={q}><p>{a}</p></Section>
      ))}
    </Page>
  );
}
