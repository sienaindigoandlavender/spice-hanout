# Spice Hanout (spicehanout.com) — notes for Claude

Jacqueline's spice house (3 Nov 2026): spice blends only, not a many-SKU grocery. Next.js front, headless Shopify behind it (its own new store, not Zfriti's or Tilwen's).

## The idea
- Spices for the hours of a day: **Morning, Midday, Evening**. The same rhythm as Jacqueline's work on circadian architecture (houses for rest that follow natural rhythms): Spice Hanout is the edible side of that vision.
- The brand system is meant to carry beyond spices into everything in the house: coffee, the spice boxes in the kitchen, soap, shower gel. Same rules: the hour it belongs to, the colour of what is inside, plain words, sources.
- Soul food with intention, not health food (Jacqueline, 3 Nov 2026): comfort, flavour and pleasure first, cooked and timed with care. Never diet, clean-eating, superfood or wellness talk.
- The design of everyday things: design shapes joy (the jar, the box, the label, the ritual of the hour). Joy and gluttony must be there: appetite, second helpings, bread round the plate. Never prim, never virtuous. We are not helping anyone lose weight: no calories, no portions, no guilt. Real food over the pill: dates with pumpkin seeds instead of a magnesium supplement.
- A healthy relationship with food: indulgence without guilt. Most women grew up being told they were fat; nothing we write adds to that voice (no body talk, no "good" or "bad" foods, no "treat yourself… then behave"). Calm at the table matters as much as what is on it.
- Glow and vitality only as the feeling, never as a claim. **No medical or health claims** ("heals", "boosts", "detox", "anti-inflammatory", "good for…"). Tradition is told as tradition. Where serious research exists, list it under Further reading (NIH/NCCIH, peer-reviewed reviews) and say nothing more. Every link is opened and checked before `checked: true` (`lib/blends.ts`); unchecked links stay hidden.
- Footer line everywhere: "Food, not medicine. Nothing on this site is medical advice."

## Look
- Calm: bone (#F4F0E8) and ink (#1A1714), paper (#EBE5D9) for alternate bands. Bodoni Moda (display, italics for the turn of a line), DM Sans (body), DM Mono (label facts). All bundled with @fontsource.
- Colour, yes, but restrained: **each blend has one colour, the colour of the spice itself**, as a full field on its label with a faint grain. Nothing else decorates the label: no patterns, no illustrations (the Zfriti labels were too much). The home page's band of colours is the day, in order.
- House rules: text never light grey (ink at full strength, smaller never paler); square corners; underline fields; no visible scrollbars; images can't be saved (`PhotoGuard`).

## Labels and the shop's look (3 Nov 2026)
- The label (`components/Label.tsx`): one field in the spice's colour with grain, a hairline frame, "Spice Hanout" and the hour mark (`HourMark.tsx`: the sun over a horizon, low left morning, high midday, crescent evening) at the top, Arabic and the name in Bodoni at the bottom, hour · Marrakech · weight under a rule. Type scales with the label's width (container units). The back (`face="back"`) is bone: inside, use, weight, hour, No. and Best before written by hand, care line, spicehanout.com.
- `/labels` (unlinked, noindex): every front and back at real size, 70 × 93 mm, print at 100% on A4.
- `Tin.tsx` puts the label on a brushed tin. The home opens on `HourHero.tsx`: the sky and the three tins of the hour it is in Marrakech (UTC), and the visitor can walk the day (Morning, Midday, Evening). Each hour's section has its own air (pale gold, bone, dusk).

## The world's blends (3 Nov 2026, copied from Zfriti)
- Jacqueline: repeat all of Zfriti's spice blends here, with the lifestyle pictures. `lib/world-recipes.ts` (Zfriti's `lib/blends.ts`), `lib/world-notes.ts` (use, weight, price tier), `data/world-shots.json` (one Cloudinary lifestyle picture per blend), mapped into the shelf by `lib/world.ts`. 92 blends (Zfriti's Ras el Hanout and Chermoula stay as the house blends and lend them their pictures; Za'atar's picture also goes to Moroccan Zaatar).
- All 92 are Shopify products (handle = slug, ACTIVE, Headless, picture attached), priced on Zfriti's tiers: ground 50 g 75 DH, whole/herb 35 g 70 DH, dear 50 g 95 DH, saffron-led 40 g 120 DH.
- `/world` lists them by region (`WorldCard.tsx`: picture, colour strip, name, origin, price); product pages show the picture with the tin and the back label beside it. The hour mark for a world blend is guessed from what it is for (`momentOf`).

## Shelf and prices (3 Nov 2026)
- 10 blends + the box "A Whole Day" (Golden Hour, Ras el Hanout, Sweet Tagine), all ACTIVE and published to the Headless channel in Shopify (MAD).
- Prices copied from Zfriti's tin ladder (`zfriti/lib/blend-notes.ts`): ground blend 50 g 75 DH, herb 70 DH, dear ingredients (cardamom, rose, saffron pinch) 95 DH, saffron 1 g 95 DH, the box 240 DH. Change prices in Shopify only.

## The Magazine (3 Nov 2026, built like Zfriti's)
- Markdown in `content/magazine/{stories,spices,recipes}/<slug>.md`, read by `lib/magazine.ts` (gray-matter + remark). `draft: true` hides a file. Quote every frontmatter string (colons break YAML).
- Frontmatter: title, dek (also the meta description), date, tint (page colour = the food; ink is chosen automatically), arabic, darija, hour, blends (handles: shown "From the shelf" with Add buttons, and the entry appears on those blend pages), related; recipes add serves, time, ingredients, steps.
- Link with `[[slug]]` or `[[slug|words]]`: resolves to an entry or a blend.
- Pages `/magazine`, `/magazine/[kind]`, `/magazine/[kind]/[slug]`; JSON-LD Article or Recipe + BreadcrumbList; all in the sitemap.
- Voice: soul food with intention; open on someone mid-action; specific facts; no invented named people or quotes; no health or weight talk. Recipes need Zahra's check.

## Code
- `lib/blends.ts` — every blend: handle (= Shopify product handle), name, Arabic/Darija name, moment, colour, ink, weight, line, inside, use, story, reading.
- `lib/shopify.ts` — Storefront API (`SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_TOKEN`). Prices and stock come only from Shopify; without the env vars every blend shows "Soon".
- Basket in localStorage (`components/Basket.tsx`), `/api/checkout` creates a Shopify cart and sends people to Shopify's checkout.
- `robots.ts` blocks search engines until `NEXT_PUBLIC_INDEXABLE=true`.
- Spice names in Darija can later link to darija.io.
