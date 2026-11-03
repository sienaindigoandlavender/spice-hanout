import type { Metadata } from "next";
import Link from "next/link";
import { Page, Section } from "@/components/Prose";

export const metadata: Metadata = { title: "About us", description: "Spice Hanout grinds spice blends for the hours of a day in Marrakech. Soul food, with intention." };

export default function About() {
  return (
    <Page kicker="About us" title={<>A spice house <em>in Marrakech</em></>} intro="We grind spices for the hours of a day: one for the first light, one for the long lunch, one for the evening.">
      <Section title="Why the hours">
        <p>A Moroccan day has three tempos. A warm, slow breakfast; a long lunch that is the real meal; something softer and sweeter as the light goes. We built the shelf the same way, so the tin you reach for follows the time of day.</p>
      </Section>
      <Section title="Soul food, with intention">
        <p>This is not health food. It is food for second helpings, sticky fingers and bread wiped round the plate, made with care and eaten slowly, with people you like. Joy is designed: the tin you love opening, the smell at noon, the table you stay at a little longer.</p>
      </Section>
      <Section title="How we make it">
        <p>Small batches, ground in Marrakech the way the souk has always made them, with nothing added that you would not cook with yourself. Each tin carries the colour of what is inside, a batch number and a date written by hand.</p>
      </Section>
      <Section title="The world's blends">
        <p>Alongside our ten house blends, we grind the classics of the world&apos;s kitchens, from baharat to berbéré to herbes de Provence. <Link href="/world">See them all</Link>.</p>
      </Section>
      <Section title="Say hello">
        <p>Questions, wholesale, press, or a recipe you think we should know: <Link href="/contact">write to us</Link>.</p>
      </Section>
    </Page>
  );
}
