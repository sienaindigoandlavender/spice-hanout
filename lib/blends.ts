// The blends (Jacqueline, 3 Nov 2026). Spice Hanout sells spice blends only, organised by the hours
// of a day: morning, midday, evening. The brand is holistic: health, glow, regeneration as the
// feeling, never as a claim. We describe food, tradition and how to use it. Where science has looked
// at an ingredient, we list the source under "Further reading" and let people read it themselves.
//
// Rules for every word here:
// - No medical or health claims (no "boosts", "heals", "detox", "anti-inflammatory", "good for").
// - Tradition is told as tradition ("in Moroccan kitchens…"), never as proof.
// - Every "reading" link must be a real page on a reliable source (NIH/NCCIH, peer-reviewed reviews,
//   encyclopaedias). Check a link before adding it. `checked: false` hides it until it is checked.
// - Price, stock and the buy button come from Shopify (product handle = blend handle).

export type Moment = "morning" | "midday" | "evening";

export interface Reading {
  title: string;
  source: string;
  url: string;
  checked: boolean;
}

export interface Blend {
  handle: string;
  name: string;
  arabic?: string; // Darija / Arabic name, when the blend has one
  moment: Moment;
  colour: string; // the colour of the blend itself: the only colour on its label
  ink: string; // text on that colour
  weight: string;
  line: string; // one line under the name
  inside: { name: string; note?: string }[];
  use: string[];
  story: string[];
  reading: Reading[];
  /** lifestyle picture of the blend itself (no pack, no people) */
  image?: string;
  /** the world's blends: where the recipe is from, and its region */
  origin?: string;
  region?: string;
  /** shop-by-use keys (world blends) */
  uses?: string[];
}

export const MOMENTS: { key: Moment; title: string; line: string }[] = [
  { key: "morning", title: "Morning", line: "For the first light: warm cups, eggs, a slow breakfast." },
  { key: "midday", title: "Midday", line: "For the long lunch: the tagine, the grill, the shared table." },
  { key: "evening", title: "Evening", line: "For the end of the day: something sweet, a cup after dinner." },
];

const NCCIH = (topic: string, slug: string): Reading => ({
  title: `${topic}: usefulness and safety`,
  source: "National Center for Complementary and Integrative Health (NIH)",
  url: `https://www.nccih.nih.gov/health/${slug}`,
  checked: false, // flip to true once the page has been opened and read
});

export const BLENDS: Blend[] = [
  {
    handle: "golden-hour",
    name: "Golden Hour",
    moment: "morning",
    colour: "#D9A21B",
    ink: "#1A1714",
    weight: "50 g",
    line: "Turmeric, ginger and cinnamon, warmed with black pepper. The colour of the first sun on a white wall.",
    inside: [
      { name: "Turmeric", note: "kharkoum in Darija" },
      { name: "Ginger", note: "skinjbir" },
      { name: "Ceylon cinnamon" },
      { name: "Black pepper" },
      { name: "Green cardamom" },
    ],
    use: [
      "A teaspoon in warm milk or oat milk, with a little honey.",
      "Over scrambled eggs, or stirred into a morning bowl of porridge.",
      "In a pot of lentil soup, at the very start, in the oil.",
    ],
    story: [
      "Turmeric has coloured food from India to Morocco for thousands of years. In Marrakech it is kharkoum, the yellow behind harira and half the tagines in the medina.",
      "Black pepper has always travelled with it. Cooks never needed a reason; the pairing simply tastes finished. Ginger and cinnamon round it out into something you want to drink before the day begins.",
    ],
    reading: [NCCIH("Turmeric", "turmeric"), NCCIH("Ginger", "ginger"), NCCIH("Cinnamon", "cinnamon")],
  },
  {
    handle: "spiced-coffee",
    name: "Spiced Coffee",
    arabic: "قهوة",
    moment: "morning",
    colour: "#5A3A26",
    ink: "#F4F0E8",
    weight: "50 g",
    line: "Cinnamon, ginger, cardamom and a little black pepper, for the coffee pot. The way the medina's cafés have always made it.",
    inside: [
      { name: "Ceylon cinnamon" }, { name: "Ginger" }, { name: "Green cardamom" },
      { name: "Nutmeg" }, { name: "Clove" }, { name: "Black pepper" },
    ],
    use: [
      "Half a teaspoon with the ground coffee, before the water goes in. Any pot works.",
      "Stirred into warm milk for a coffee-free morning.",
    ],
    story: [
      "Ask for qahwa mtaybha in an old café in Marrakech or Fes and the coffee comes scented with spice. Every café keeps its own mix behind the counter.",
      "Ours goes straight into the pot with the grounds, so the first cup of the day tastes of the souk.",
    ],
    reading: [NCCIH("Cinnamon", "cinnamon"), NCCIH("Ginger", "ginger")],
  },
  {
    handle: "ras-el-hanout",
    name: "Ras el Hanout",
    arabic: "راس الحانوت",
    moment: "midday",
    colour: "#8A4B2A",
    ink: "#F4F0E8",
    weight: "50 g",
    line: "The head of the shop: the best the spice seller has, ground together. Ours holds sixteen.",
    inside: [
      { name: "Cumin" }, { name: "Coriander seed" }, { name: "Ginger" }, { name: "Turmeric" },
      { name: "Ceylon cinnamon" }, { name: "Green cardamom" }, { name: "Nutmeg" }, { name: "Mace" },
      { name: "Allspice" }, { name: "Clove" }, { name: "Black pepper" }, { name: "Long pepper" },
      { name: "Grains of paradise" }, { name: "Fennel seed" }, { name: "Dried rose petals" }, { name: "Lavender" },
    ],
    use: [
      "Rub into chicken or lamb with olive oil and salt the night before.",
      "Two pinches in couscous broth, or over roasted carrots and squash.",
      "With honey on roast vegetables, ten minutes before they come out.",
    ],
    story: [
      "Ras el hanout means the head of the shop. Every spice seller in the souk has their own, and none of them will tell you the whole recipe.",
      "Ours is ground in small batches in Marrakech, with rose and lavender at the end the way the old blends had them.",
    ],
    reading: [],
  },
  {
    handle: "chermoula",
    name: "Chermoula",
    arabic: "شرمولة",
    moment: "midday",
    colour: "#B5452B",
    ink: "#F4F0E8",
    weight: "50 g",
    line: "The Moroccan marinade, dried: cumin, paprika, garlic and preserved lemon peel. Add oil, herbs and fish.",
    inside: [
      { name: "Sweet paprika" }, { name: "Cumin" }, { name: "Coriander seed" },
      { name: "Garlic" }, { name: "Preserved lemon peel", note: "dried" }, { name: "Chilli" },
    ],
    use: [
      "Mix two tablespoons with olive oil, chopped coriander and parsley, and a squeeze of lemon.",
      "Brush over sardines or a whole fish before the grill.",
      "Toss with chickpeas and roast until crisp.",
    ],
    story: [
      "Along the coast, from Essaouira to Safi, chermoula is what fish meets before it meets the fire. Every house makes it fresh with green herbs.",
      "This is the dry half, ready for your own oil and herbs, wherever your kitchen is.",
    ],
    reading: [],
  },
  {
    handle: "moroccan-zaatar",
    name: "Moroccan Zaatar",
    arabic: "زعتر",
    moment: "midday",
    colour: "#6E7A3A",
    ink: "#F4F0E8",
    weight: "50 g",
    line: "Wild thyme from the mountains, toasted sesame and sumac. For bread, oil and the end of every salad.",
    inside: [
      { name: "Wild thyme", note: "zaatar, from the Atlas" },
      { name: "Toasted sesame" }, { name: "Sumac" }, { name: "Sea salt" },
    ],
    use: [
      "Bread, olive oil, zaatar. Breakfast or a late lunch.",
      "Over labneh or soft cheese, with a little honey.",
      "On tomatoes and cucumbers, instead of salt.",
    ],
    story: [
      "In Morocco zaatar is first of all the plant: a wild thyme picked on the slopes of the Atlas and sold by the bunch at the market. Steeped in hot water, it is the cup grandmothers make in winter.",
      "Mixed with sesame and sumac it becomes the sprinkle the whole Mediterranean shares.",
    ],
    reading: [],
  },
  {
    handle: "kemoun",
    name: "Kemoun",
    arabic: "كمون",
    moment: "midday",
    colour: "#A07A3E",
    ink: "#1A1714",
    weight: "50 g",
    line: "Toasted cumin and salt, the little dish on every Moroccan table. For eggs, beans, and everything grilled.",
    inside: [{ name: "Toasted cumin" }, { name: "Sea salt" }],
    use: [
      "A pinch on hard-boiled eggs, the street breakfast of Marrakech.",
      "Over bissara, the fava bean soup, with a thread of olive oil.",
      "On lamb straight off the grill.",
    ],
    story: [
      "Two small dishes sit on every table in Morocco: salt, and cumin with salt. You dip your egg in one, then the other.",
      "We toast the cumin before grinding, so it smells the way it does at the brochette stalls at night.",
    ],
    reading: [],
  },
  {
    handle: "dry-harissa",
    name: "Dry Harissa",
    arabic: "هريسة",
    moment: "midday",
    colour: "#9C2A1E",
    ink: "#F4F0E8",
    weight: "50 g",
    line: "Sun-dried chilli, garlic, caraway and coriander. The heat, without the jar.",
    inside: [
      { name: "Sun-dried red chilli" }, { name: "Smoked paprika" }, { name: "Garlic" },
      { name: "Caraway" }, { name: "Coriander seed" }, { name: "Sea salt" },
    ],
    use: [
      "Stir into olive oil for a quick harissa paste.",
      "Over roast potatoes, eggs or a bowl of soup.",
      "Rub on chicken thighs with lemon and garlic.",
    ],
    story: [
      "Harissa crossed the whole of North Africa. In Moroccan homes it comes out at the table, for those who want it hotter.",
      "Ours is the dry form: easy to carry home, and you decide how much oil, and how much fire.",
    ],
    reading: [],
  },
  {
    handle: "sweet-tagine",
    name: "Sweet Tagine",
    moment: "evening",
    colour: "#C27A3A",
    ink: "#1A1714",
    weight: "50 g",
    line: "Cinnamon, ginger and a thread of saffron. For prunes, apricots and the slow pot that fills the house.",
    inside: [
      { name: "Ceylon cinnamon" }, { name: "Ginger" }, { name: "Saffron", note: "from Taliouine" },
      { name: "Nutmeg" }, { name: "Dried rose petals" },
    ],
    use: [
      "With lamb, prunes and almonds, cooked low for three hours.",
      "Over baked apples or pears with honey.",
      "A pinch in hot chocolate, late.",
    ],
    story: [
      "The sweet tagines are the celebration dishes: lamb with prunes, chicken with apricots, mrouzia at Eid. The spices are gentle and the cooking is long.",
      "This is the blend for when nobody is in a hurry.",
    ],
    reading: [NCCIH("Cinnamon", "cinnamon"), NCCIH("Saffron", "saffron")],
  },
  {
    handle: "dusk",
    name: "Dusk",
    arabic: "لويزة",
    moment: "evening",
    colour: "#B7B46A",
    ink: "#1A1714",
    weight: "40 g",
    line: "Lemon verbena, chamomile, orange blossom and fennel seed. A cup for after dinner.",
    inside: [
      { name: "Lemon verbena", note: "louiza in Darija" },
      { name: "Chamomile" }, { name: "Orange blossom" }, { name: "Fennel seed" },
    ],
    use: [
      "One tablespoon in a pot of just-boiled water. Steep five minutes.",
      "Honey if you like. Drink it slowly, somewhere quiet.",
    ],
    story: [
      "In Moroccan houses, louiza is the evening glass. After the mint tea of the afternoon, verbena comes out once the light has gone.",
      "We add chamomile, a little orange blossom and fennel seed, and nothing that keeps you up.",
    ],
    reading: [NCCIH("Chamomile", "chamomile")],
  },
  {
    handle: "taliouine-saffron",
    name: "Taliouine Saffron",
    arabic: "زعفران",
    moment: "evening",
    colour: "#C0391B",
    ink: "#F4F0E8",
    weight: "1 g",
    line: "Hand-picked threads from Taliouine, in the Anti-Atlas. A few at a time, steeped in warm water first.",
    inside: [{ name: "Saffron threads", note: "Crocus sativus, Taliouine" }],
    use: [
      "Steep a few threads in two spoons of warm water for ten minutes before adding to the pot.",
      "In rice, in a fish tagine, or in milk with a little honey.",
    ],
    story: [
      "Every autumn, for a few weeks, the fields around Taliouine turn purple before sunrise. The flowers are picked by hand before the heat, and the three red threads are separated one by one.",
      "It takes about a hundred and fifty flowers for a single gram.",
    ],
    reading: [NCCIH("Saffron", "saffron")],
  },
];

export const blendBy = (handle: string) => BLENDS.find((b) => b.handle === handle);
export const blendsFor = (m: Moment) => BLENDS.filter((b) => b.moment === m);

/** The box: three tins, one for each hour. Sold as its own Shopify product (handle a-whole-day). */
export const BOX: Blend = {
  handle: "a-whole-day",
  name: "A Whole Day",
  moment: "midday",
  colour: "#1A1714",
  ink: "#F4F0E8",
  weight: "3 tins",
  line: "Golden Hour for the morning, Ras el Hanout for the long lunch, Sweet Tagine for the evening. One box, the whole day.",
  inside: [
    { name: "Golden Hour", note: "50 g, for the first light" },
    { name: "Ras el Hanout", note: "50 g, for the long lunch" },
    { name: "Sweet Tagine", note: "50 g, for the evening" },
  ],
  use: [
    "Keep it by the stove and let the hour choose the tin.",
    "Give it to someone who cooks for other people.",
  ],
  story: [
    "A Moroccan kitchen runs on three meals that never look alike: a warm, slow breakfast, a long lunch that is the real meal of the day, and something lighter and sweeter as the evening comes.",
    "The box is that day, in three tins. Open one in the morning and the kitchen smells of turmeric and ginger; by noon it is cumin and rose; by dusk, cinnamon and saffron.",
  ],
  reading: [],
};

/** Everything on the shelf, for the basket and the product pages: the house blends, the box and the world's blends. */
import { WORLD, houseImage } from "./world";
for (const b of BLENDS) b.image = b.image ?? houseImage(b.handle);
export const SHELF: Blend[] = [...BLENDS, BOX, ...WORLD];
export const itemBy = (handle: string) => SHELF.find((b) => b.handle === handle);
