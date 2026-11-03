# Spice Hanout (spicehanout.com) — notes for Claude

Jacqueline's spice house (3 Nov 2026): spice blends only, not a many-SKU grocery. Next.js front, headless Shopify behind it (its own new store, not Zfriti's or Tilwen's).

## The idea
- Spices for the hours of a day: **Morning, Midday, Evening**. The same rhythm as Jacqueline's work on circadian architecture (houses for rest that follow natural rhythms): Spice Hanout is the edible side of that vision.
- The brand system is meant to carry beyond spices into everything in the house: coffee, the spice boxes in the kitchen, soap, shower gel. Same rules: the hour it belongs to, the colour of what is inside, plain words, sources.
- Holistic: health, glow, regeneration as the feeling, never as a claim. **No medical or health claims** ("heals", "boosts", "detox", "anti-inflammatory", "good for…"). Tradition is told as tradition. Where serious research exists, list it under Further reading (NIH/NCCIH, peer-reviewed reviews) and say nothing more. Every link is opened and checked before `checked: true` (`lib/blends.ts`); unchecked links stay hidden.
- Footer line everywhere: "Food, not medicine. Nothing on this site is medical advice."

## Look
- Calm: bone (#F4F0E8) and ink (#1A1714), paper (#EBE5D9) for alternate bands. Bodoni Moda (display, italics for the turn of a line), DM Sans (body), DM Mono (label facts). All bundled with @fontsource.
- Colour, yes, but restrained: **each blend has one colour, the colour of the spice itself**, as a full field on its label with a faint grain. Nothing else decorates the label: no patterns, no illustrations (the Zfriti labels were too much). The home page's band of colours is the day, in order.
- House rules: text never light grey (ink at full strength, smaller never paler); square corners; underline fields; no visible scrollbars; images can't be saved (`PhotoGuard`).

## Code
- `lib/blends.ts` — every blend: handle (= Shopify product handle), name, Arabic/Darija name, moment, colour, ink, weight, line, inside, use, story, reading.
- `lib/shopify.ts` — Storefront API (`SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_TOKEN`). Prices and stock come only from Shopify; without the env vars every blend shows "Soon".
- Basket in localStorage (`components/Basket.tsx`), `/api/checkout` creates a Shopify cart and sends people to Shopify's checkout.
- `robots.ts` blocks search engines until `NEXT_PUBLIC_INDEXABLE=true`.
- Spice names in Darija can later link to darija.io.
