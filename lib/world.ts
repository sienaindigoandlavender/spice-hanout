// The world's blends on the Spice Hanout shelf, copied from Zfriti (Jacqueline, 3 Nov 2026), each with
// its lifestyle picture (data/world-shots.json). They become ordinary shelf items (same Blend shape),
// so the label, the tin, the basket and Shopify treat them like the house blends.
// The two that the house already makes (Ras el Hanout, Chermoula) stay as house blends and lend them
// their pictures.

import type { Blend, Moment } from "./blends";
import { REGIONS, type WorldBlend } from "./world-recipes";
import { blendNote } from "./world-notes";
import shots from "../data/world-shots.json";

const SHOTS = shots as Record<string, string>;
export const HOUSE_TWINS: Record<string, string> = { "ras-el-hanout": "ras-el-hanout", chermoula: "chermoula", zaatar: "moroccan-zaatar" };
const SKIP = new Set(["ras-el-hanout", "chermoula"]);

function inkFor(hex: string): string {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.42 ? "#F4F0E8" : "#1A1714";
}

/** The hour a blend belongs to, read from what it is for. */
function momentOf(w: WorldBlend, use: string): Moment {
  const t = `${w.name} ${w.line} ${use}`.toLowerCase();
  if (/coffee|chai|breakfast|porridge|\btea\b|eggs|toast/.test(t)) return "morning";
  if (/speculoos|mulled|pie|gingerbread|cake|dessert|biscuit|cookie|pudding|custard|waffle|compote|sweet|stew|slow|braise|curry|dinner|soup|wine/.test(t)) return "evening";
  return "midday";
}

const toBlend = (w: WorldBlend, region: string): Blend => {
  const note = blendNote(w.slug);
  return {
    handle: w.slug,
    name: w.name,
    moment: momentOf(w, note.use),
    colour: w.tint,
    ink: inkFor(w.tint),
    weight: note.weight,
    line: w.line,
    inside: w.ingredients.split(",").map((x) => ({ name: x.trim().replace(/^\w/, (c) => c.toUpperCase()) })).filter((x) => x.name),
    use: note.use ? [note.use] : [],
    story: [w.line],
    reading: [],
    image: SHOTS[w.slug],
    origin: w.origin,
    region,
    uses: USES.filter((u) => u.re.test(`${w.name} ${w.line} ${note.use} ${u.key === "hot" ? w.ingredients.split(",").slice(0, 3).join(" ") : w.ingredients}`.toLowerCase())).map((u) => u.key),
  };
};

/** Shop by use (after Spicewalla's "by use" shelves): read from the name, line, use and recipe. */
export const USES = [
  { key: "grill", label: "Grill and fire", re: /grill|bbq|barbecue|skewer|kebab|steak|\brub\b|suya|jerk|satay|shawarma|kefta|k\u00f6fte|tandoori|pinchitos|chops|coals/ },
  { key: "slow", label: "Slow pots", re: /stew|slow|braise|tagine|curry|soup|goulash|rendang|mole|chili con|wat\b|broth|biryani|pilau|couscous|dal\b|pot\b/ },
  { key: "sweet", label: "Sweet things and drinks", re: /sweet|dessert|cake|biscuit|\bpie\b|speculoos|pain d|maple|chai|coffee|mulled|compote|waffle|tea\b/ },
  { key: "hot", label: "With heat", re: /chilli|chili|cayenne|harissa|mitmita|scotch bonnet|mala|vindaloo|\bhot\b|berb\u00e9r\u00e9|awaze|merk\u00e9n|gochugaru|bird/ },
  { key: "fish", label: "Fish and vegetables", re: /fish|seafood|sardine|salmon|prawn|shrimp|vegetable|potato|cauliflower|aubergine|bean|lentil/ },
  { key: "table", label: "On the table", re: /sprinkle|finish|dip|bread|salt\b|eggs|salad|furikake|dukkah|za'atar|shake/ },
] as const;
export type UseKey = (typeof USES)[number]["key"];

export const WORLD_REGIONS = REGIONS.map((r) => ({
  slug: r.slug,
  name: r.name,
  intro: r.intro,
  blends: r.blends.filter((b) => !SKIP.has(b.slug)).map((b) => toBlend(b, r.name)),
}));

export const WORLD: Blend[] = WORLD_REGIONS.flatMap((r) => r.blends);

/** Prices as Zfriti set them (dirhams), for creating the Shopify products. */
export const WORLD_PRICES: Record<string, string> = Object.fromEntries(
  REGIONS.flatMap((r) => r.blends).filter((b) => !SKIP.has(b.slug)).map((b) => [b.slug, blendNote(b.slug).price]),
);

/** Lifestyle pictures for house blends that have a twin on Zfriti's shelf. */
export const houseImage = (handle: string) => {
  const twin = Object.entries(HOUSE_TWINS).find(([, h]) => h === handle)?.[0];
  return twin ? SHOTS[twin] : undefined;
};
