// What each blend is for, how much goes in the tin, and what it costs.
// Prices are in dirhams, TTC, placeholders drawn from the Pantry's March draft
// (tins 60–95 DH): CONFIRM every one against real spice costs before opening.
// The rule of thumb, so the shelf reads as a set:
//   ground blends      50 g  75 DH
//   herb or whole      35 g  70 DH   (lighter, bulkier)
//   dear ingredients   50 g  95 DH   (saffron, cardamom-heavy, rose, nuts, long pepper, blue fenugreek, Sichuan pepper)
//   saffron-led        40 g 120 DH

export interface BlendNote {
  /** what to do with it, one line */
  use: string;
  weight: string;
  /** dirhams, as a string like the Pantry */
  price: string;
}

type Tier = 'ground' | 'whole' | 'dear' | 'saffron';
const TIER: Record<Tier, { weight: string; price: string }> = {
  ground: { weight: '50 g', price: '75' },
  whole: { weight: '35 g', price: '70' },
  dear: { weight: '50 g', price: '95' },
  saffron: { weight: '40 g', price: '120' },
};

const NOTES: Record<string, [Tier, string]> = {
  // The Maghreb
  'ras-el-hanout': ['dear', 'A teaspoon in the tagine at the start, another in the couscous broth. Lamb, pigeon, pumpkin.'],
  tagine: ['saffron', 'Chicken with olives, lamb with prunes, any vegetable in the clay pot. Rub in with oil and leave an hour.'],
  mrouzia: ['dear', 'Lamb shoulder, honey, raisins and almonds, three hours on the lowest flame.'],
  tanjia: ['saffron', 'Beef shin in the urn with preserved lemon and smen; or a slow oven at home, five hours.'],
  chermoula: ['whole', 'Mix with oil, lemon and garlic; marinate sardines, bream or cauliflower before the grill.'],
  kefta: ['ground', 'Two teaspoons to a half-kilo of minced beef or lamb, with a grated onion. Grill or simmer in tomato.'],
  couscous: ['saffron', 'In the broth under the steaming couscous, with seven vegetables and a chickpea or two.'],
  tabil: ['whole', 'Pound into lamb for the grill, stir into shakshuka, dust on roast potatoes.'],
  'harissa-spices': ['ground', 'Add oil, garlic and a little water for a fresh harissa; or shake dry on eggs and chips.'],
  bzar: ['ground', 'Libyan lamb soup, rice, roast chicken: a teaspoon wherever cumin would go.'],
  // The Middle East
  baharat: ['ground', 'Meatballs, rice pilaf, lentil soup, roast chicken. The jar that goes in everything.'],
  'seven-spice-lebanese': ['ground', 'Kibbeh, stuffed vine leaves, lamb with rice. Sweet-warm, not hot.'],
  'seven-spice-aleppo': ['ground', 'Kebabs, stuffed aubergine, lamb and cherry stew. A pinch in the rice.'],
  zaatar: ['whole', 'Bread dipped in oil then in za\'atar; on labneh, eggs, roast chicken, hot flatbread.'],
  dukkah: ['dear', 'Bread, oil, dukkah, in that order. Scatter on roast carrots, soft eggs, grilled fish.'],
  advieh: ['dear', 'Persian rice and stews; a teaspoon in the pot with saffron water and barberries.'],
  'hawaij-soup': ['ground', 'Chicken or beef soup, lentils, roast vegetables. Yemen\'s Sunday.'],
  'hawaij-coffee': ['dear', 'Half a teaspoon in the coffee pot or the cake batter. Ginger and cardamom lead.'],
  kabsa: ['dear', 'Chicken or lamb on rice with dried lime; the whole pot, one spoon.'],
  shawarma: ['ground', 'Chicken thighs or lamb, yoghurt, lemon, overnight. Roast hot, slice thin.'],
  falafel: ['ground', 'Two tablespoons to a half-kilo of soaked chickpeas with herbs and onion.'],
  'kofte-turkish': ['ground', 'Minced lamb, grated onion, breadcrumbs, these. Shape on the skewer, grill.'],
  'kebab-persian': ['saffron', 'Koobideh and jujeh: lamb or chicken, onion juice, saffron, the mangal.'],
  // Africa
  berbere: ['dear', 'Doro wat and misir wat: fry it in the onions and butter before anything else goes in.'],
  mitmita: ['ground', 'The hot one. A pinch for kitfo and raw beef; on the side of anything grilled.'],
  awaze: ['ground', 'Mix with wine or tej and a little water for the awaze paste; serve with tibs.'],
  suya: ['dear', 'Peanut and ginger rub for thin beef on skewers, grilled fast over charcoal.'],
  'swahili-pilau': ['dear', 'Rice with meat or vegetables, a pinch at the start with the onions; Zanzibar on a plate.'],
  'cape-malay': ['ground', 'Bobotie, bredie, chicken curry: mild, fruity, meant for a whole family.'],
  // India
  'garam-masala': ['dear', 'At the end, not the start: a teaspoon over the curry in its last two minutes.'],
  'garam-masala-kerala': ['dear', 'Fish and coconut curries, beef fry, the Malabar way: fennel and star anise forward.'],
  tandoori: ['ground', 'Yoghurt, lemon, two tablespoons; chicken or paneer overnight, then the hottest oven you own.'],
  'madras-curry': ['ground', 'The curry powder of the South: lamb, chicken or lentils with tomato and tamarind.'],
  vindaloo: ['ground', 'Pork or lamb with vinegar and garlic, marinated a day. Hot, sour, Goan.'],
  'vegetable-curry': ['ground', 'Potatoes, cauliflower, beans, peas: Gujarati home cooking, a little sweet.'],
  'panch-phoron': ['whole', 'Whole seeds into hot oil until they pop, then the dal, the greens or the potatoes.'],
  'chaat-masala': ['ground', 'Over fruit, fried snacks, boiled potatoes, a cold beer. Sour, salty, surprising.'],
  sambar: ['ground', 'Lentils and vegetables in tamarind broth; two teaspoons per pot, with the idli.'],
  rasam: ['ground', 'The thin pepper soup for a cold or a hangover; tamarind, tomato, this.'],
  biryani: ['dear', 'Layered rice and marinated meat, sealed and steamed. A tablespoon in the marinade.'],
  korma: ['dear', 'Chicken or lamb in yoghurt and ground almonds; mild, rich, the court\'s dish.'],
  chai: ['dear', 'Simmer in milk and water with black tea and sugar. Ginger and cardamom first.'],
  'goda-masala': ['ground', 'Maharashtrian lentils and vegetables; coconut and sesame give it the darkness.'],
  xacuti: ['dear', 'Chicken or lamb with roasted coconut, Goan and deep; a tablespoon per kilo.'],
  'ceylon-curry': ['ground', 'Dark-roasted Sri Lankan curry: beef, jackfruit or chicken with coconut milk.'],
  // Asia
  'five-spice': ['dear', 'Pork belly, roast duck, braised beef; a half-teaspoon is enough for a kilo.'],
  'sichuan-pepper-salt': ['dear', 'Dip for fried chicken, prawns, tofu; a tingle, then salt.'],
  mala: ['dear', 'Hot pot, dry-fried beans, cold noodles. Numbing and hot together.'],
  shichimi: ['dear', 'Shake over udon, grilled chicken, rice, miso soup. Seven flavours, one tin.'],
  furikake: ['whole', 'Over a bowl of plain rice, onigiri, avocado, soft eggs.'],
  'japanese-curry': ['ground', 'Curry rice for a weeknight: onions, carrot, potato, a roux with this.'],
  'korean-bbq': ['ground', 'Bulgogi and galbi marinade with soy, pear and sesame oil; grill at the table.'],
  satay: ['ground', 'Chicken or beef on skewers, in coconut milk and this; peanut sauce on the side.'],
  bumbu: ['dear', 'The Balinese base paste in a tin: chicken, fish, tempeh, with coconut milk.'],
  rendang: ['dear', 'Beef in coconut milk for four hours until the sauce is gone and the meat is dark.'],
  'thai-red-curry': ['ground', 'Fry in coconut cream until it splits, then the chicken, aubergine and basil.'],
  pho: ['whole', 'Toast and drop into the beef or chicken broth for four hours; strain before serving.'],
  laksa: ['dear', 'Coconut noodle soup with prawns and tofu; fry the blend first in oil.'],
  'adobo-filipino': ['whole', 'Chicken or pork in soy, vinegar, garlic and these, simmered till the sauce clings.'],
  // The Americas
  jerk: ['dear', 'Rub chicken or pork, leave overnight, grill slow over wood. Allspice and scotch bonnet.'],
  creole: ['ground', 'Gumbo, jambalaya, blackened fish, red beans on Monday.'],
  cajun: ['ground', 'Blackened chicken, prawns, potatoes. Hotter than Creole, with more pepper.'],
  'adobo-mexican': ['ground', 'Pork or chicken in a paste with vinegar and garlic, then the oven or the grill.'],
  'recado-rojo': ['ground', 'Cochinita pibil: pork in annatto and sour orange, wrapped in banana leaf, baked slow.'],
  'chili-con-carne': ['ground', 'Beef and beans, three hours, two tablespoons. Cumin and ancho lead.'],
  mole: ['dear', 'Chicken or turkey; the blend into a sauce with chillies, chocolate and broth, an afternoon\'s work.'],
  taco: ['ground', 'Minced beef, chicken or beans; a tablespoon per half-kilo with a splash of water.'],
  merken: ['ground', 'Smoked chilli and coriander from the Mapuche; on eggs, potatoes, grilled meat, bread and oil.'],
  chimichurri: ['whole', 'Steep in oil and vinegar with fresh parsley and garlic; spoon over steak.'],
  'montreal-steak': ['whole', 'Press into a thick steak before the grill; coarse, salty, peppery.'],
  'montreal-bagel': ['whole', 'Sesame and poppy for the dough; also on roast squash, salads, soft cheese.'],
  poultry: ['whole', 'Under the skin of a roast chicken with butter; in the stuffing, the gravy, the soup.'],
  'east-coast-seafood': ['ground', 'Boiled prawns and crab, fish cakes, chowder. A spoon in the water.'],
  brining: ['whole', 'Salt, sugar, water and these for the turkey or the pork, overnight in the cold.'],
  'kansas-city-bbq': ['ground', 'Ribs and pork shoulder, rubbed the night before, smoked or slow-roasted.'],
  ranch: ['ground', 'Into yoghurt or mayonnaise for the dip; on roast potatoes and popcorn.'],
  'pumpkin-pie': ['ground', 'The pie, obviously; also porridge, apple cake, a latte if you must.'],
  'maple-dessert': ['ground', 'Baked apples, pancakes, pouding chômeur; a pinch with maple syrup and butter.'],
  // Europe
  'herbes-de-provence': ['whole', 'Roast chicken, tomatoes, courgettes, a leg of lamb, the pizza.'],
  'quatre-epices': ['ground', 'Pâté, terrines, pain d\'épices, a pot-au-feu. A pinch, never a spoon.'],
  'three-pepper': ['whole', 'Fill the mill. Steak, soup, salad, eggs.'],
  speculoos: ['ground', 'The biscuits before Saint Nicholas; also in waffles, apple compote, coffee.'],
  'mulled-wine': ['whole', 'A bottle of red, sugar, an orange, this, below the boil for twenty minutes.'],
  paella: ['saffron', 'Fry with the rice before the stock; chicken, rabbit, beans, or the sea.'],
  pinchitos: ['dear', 'Pork or chicken cubes, oil, lemon, overnight; small skewers over coals.'],
  porchetta: ['whole', 'Rub inside a rolled pork belly or a chicken; also on roast potatoes.'],
  'toulouse-sausage': ['ground', 'Coarse pork mince, salt, this, a casing if you have one; the cassoulet if you have a day.'],
  gravlax: ['whole', 'Salt, sugar, dill and this on a side of salmon, pressed in the fridge for two days.'],
  greek: ['whole', 'Lamb chops, feta, roast potatoes with lemon, a bowl of yoghurt and cucumber.'],
  goulash: ['ground', 'Beef and onions, slow, with two tablespoons; dumplings or bread.'],
  'khmeli-suneli': ['dear', 'Kharcho soup, chicken satsivi, bean stews. The taste of Georgia.'],
  'svan-salt': ['dear', 'A finishing salt: tomatoes, eggs, potatoes, grilled meat.'],
  pickling: ['whole', 'A tablespoon per jar of cucumbers, beetroot or onions in vinegar brine.'],
};

export function blendNote(slug: string): BlendNote {
  const n = NOTES[slug];
  const tier = n ? n[0] : 'ground';
  return { use: n ? n[1] : '', ...TIER[tier] };
}
