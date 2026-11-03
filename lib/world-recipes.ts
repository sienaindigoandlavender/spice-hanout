// Copied from Zfriti (3 Nov 2026, Jacqueline: repeat all the blends on Spice Hanout).
// The Spice Blends collection: the world's blends, by region, in the manner of
// Épices de Cru (Montréal), whose range is the reference. Drafted 17 Oct 2026 as
// the product line to build the Pantry's spice family from. Words are English;
// recipes are the canonical ones and need Zahra's and Jacqueline's check before
// anything is blended or priced. Each blend gets one lifestyle picture: the blend
// itself, no pack, no people (data/blend-shots.json).

export interface WorldBlend {
  slug: string;
  name: string;
  /** where the recipe is from */
  origin: string;
  /** one line, the gossip not the lesson */
  line: string;
  /** the canonical recipe, whole or ground as the kitchen does it */
  ingredients: string;
  /** the colour of the blend, for the shelf (pale to dark) and the drawing */
  tint: string;
  /** mostly whole seeds and pieces (true) or a ground powder (false): changes the picture */
  whole?: boolean;
}

export interface Region {
  slug: string;
  name: string;
  intro: string;
  blends: WorldBlend[];
}

export const REGIONS: Region[] = [
  {
    slug: 'maghreb',
    name: 'The Maghreb',
    intro: 'Our own shelf first. Every merchant on Derb Fhal Zefriti has a version of each of these, and none of them agree.',
    blends: [
      { slug: 'ras-el-hanout', name: 'Ras el Hanout', origin: 'Marrakech', line: 'The head of the shop: the best a merchant has, twenty-seven spices and a grudge against every rival\'s recipe.', ingredients: 'Cumin, coriander, turmeric, ginger, black pepper, cinnamon, cardamom, nutmeg, mace, clove, allspice, rose petals, long pepper, cubeb, grains of paradise, galangal, fennel, star anise, nigella, lavender, orris root, ash berries, monk\'s pepper, white pepper, cayenne, fenugreek, paprika', tint: '#9A5A2E' },
      { slug: 'tagine', name: 'Tagine Spices', origin: 'Morocco', line: 'The everyday blend: what goes in the pot on a Tuesday, before anyone has thought about saffron.', ingredients: 'Ginger, turmeric, cumin, coriander, black pepper, sweet paprika, cinnamon, saffron', tint: '#C4883A' },
      { slug: 'mrouzia', name: 'Mrouzia', origin: 'Fez', line: 'Lamb, honey, raisins and almonds for Eid; this is the blend that marks the calendar.', ingredients: 'Ceylon cinnamon, ginger, ras el hanout, long pepper, mace, turmeric, black pepper, nutmeg', tint: '#7A4A2A' },
      { slug: 'tanjia', name: 'Tanjia', origin: 'Marrakech', line: 'The bachelors\' dish: fill the urn, leave it at the hammam oven, come back when the man says.', ingredients: 'Cumin, saffron, ras el hanout, dried garlic, preserved lemon zest, salt', tint: '#B07A3A' },
      { slug: 'chermoula', name: 'Chermoula', origin: 'Atlantic coast', line: 'The marinade that makes a sardine worth the walk to the port.', ingredients: 'Coriander leaf, parsley, cumin, sweet paprika, garlic, cayenne, salt', tint: '#9B8F52', whole: true },
      { slug: 'kefta', name: 'Kefta Spices', origin: 'Morocco', line: 'Minced meat, an onion, these, and your hands. Nothing else is permitted.', ingredients: 'Cumin, sweet paprika, coriander, parsley, mint, cinnamon, black pepper, cayenne', tint: '#A35A32' },
      { slug: 'couscous', name: 'Couscous Spices', origin: 'Morocco', line: 'For the Friday pot: seven vegetables and the broth that decides the week.', ingredients: 'Turmeric, ginger, black pepper, coriander, saffron, cinnamon, dried mint', tint: '#D1A23C' },
      { slug: 'tabil', name: 'Tabil', origin: 'Tunisia', line: 'Coriander, caraway, garlic and chilli: Tunisia in four moves.', ingredients: 'Coriander seed, caraway, garlic, cayenne', tint: '#8F6A3C', whole: true },
      { slug: 'harissa-spices', name: 'Harissa Spices', origin: 'Tunisia', line: 'The dry half of harissa; add oil and garlic and you have the wet half.', ingredients: 'Dried red chillies, caraway, coriander seed, cumin, garlic, salt', tint: '#A8321C' },
      { slug: 'bzar', name: 'Bzar', origin: 'Libya', line: 'The blend Tripoli puts in everything, from soup to the lamb that follows it.', ingredients: 'Turmeric, black pepper, cinnamon, cumin, coriander, clove, ginger, nutmeg, cardamom', tint: '#C09A3A' },
    ],
  },
  {
    slug: 'middle-east',
    name: 'The Middle East',
    intro: 'From Aleppo to Sanaa, the blends that travelled with the caravans and never left.',
    blends: [
      { slug: 'baharat', name: 'Baharat', origin: 'The Levant', line: 'Simply "spices" in Arabic: the one jar every kitchen from Beirut to Baghdad owns.', ingredients: 'Black pepper, allspice, coriander, cumin, cinnamon, clove, nutmeg, cardamom, paprika', tint: '#8E3E22' },
      { slug: 'seven-spice-lebanese', name: 'Lebanese Seven-Spice', origin: 'Lebanon', line: 'Seven is the number; the seven themselves change with the family.', ingredients: 'Allspice, black pepper, cinnamon, clove, nutmeg, fenugreek, ginger', tint: '#7E4A2E' },
      { slug: 'seven-spice-aleppo', name: 'Aleppo Seven-Spice', origin: 'Syria', line: 'Aleppo\'s version leans sweet; the pepper that bears the city\'s name is a separate jar.', ingredients: 'Allspice, black pepper, cinnamon, cardamom, nutmeg, clove, coriander', tint: '#86503A' },
      { slug: 'zaatar', name: 'Za\'atar', origin: 'Palestine and Lebanon', line: 'Wild thyme, sumac and sesame: breakfast, with bread and oil, since before anyone wrote it down.', ingredients: 'Wild thyme, sumac, toasted sesame, salt', tint: '#8C8A55', whole: true },
      { slug: 'dukkah', name: 'Dukkah', origin: 'Egypt', line: 'Dip the bread in oil, then in this. The Egyptians solved snacks a long time ago.', ingredients: 'Roasted hazelnuts, coriander seed, cumin, toasted sesame, black pepper, salt', tint: '#B9925E', whole: true },
      { slug: 'advieh', name: 'Advieh', origin: 'Persia', line: 'Rose petals in a rice blend: Persia never saw why dinner should not smell like a garden.', ingredients: 'Rose petals, cinnamon, cardamom, cumin, coriander, turmeric, dried lime, nutmeg', tint: '#B07A62' },
      { slug: 'hawaij-soup', name: 'Hawaij for Soup', origin: 'Yemen', line: 'Yemen\'s soup blend, carried to Israel in the 1950s and never put down.', ingredients: 'Cumin, black pepper, turmeric, cardamom, coriander, clove', tint: '#B8862E' },
      { slug: 'hawaij-coffee', name: 'Hawaij for Coffee', origin: 'Yemen', line: 'The other hawaij: ginger and cardamom in the coffee pot, cinnamon if the host likes you.', ingredients: 'Ginger, cardamom, cinnamon, clove, nutmeg', tint: '#A47A4A' },
      { slug: 'kabsa', name: 'Kabsa Spices', origin: 'Arabian Peninsula', line: 'Rice, meat, dried lime and this; the dish a whole peninsula eats with its right hand.', ingredients: 'Dried black lime, cardamom, cinnamon, clove, black pepper, coriander, cumin, bay leaf, nutmeg, saffron', tint: '#9A7040' },
      { slug: 'shawarma', name: 'Shawarma Spices', origin: 'The Levant', line: 'The reason the street smells the way it does at eleven at night.', ingredients: 'Cumin, coriander, paprika, turmeric, allspice, cinnamon, cardamom, black pepper, garlic, clove', tint: '#A6603A' },
      { slug: 'falafel', name: 'Falafel Spices', origin: 'Egypt and the Levant', line: 'Chickpeas or broad beans, the argument continues; the spices do not.', ingredients: 'Coriander seed, cumin, garlic, black pepper, cayenne, parsley, coriander leaf, baking soda not included', tint: '#8F8A4A', whole: true },
      { slug: 'kofte-turkish', name: 'Turkish Köfte Spices', origin: 'Turkey', line: 'Pul biber and cumin, mostly; the rest is the butcher\'s temper.', ingredients: 'Aleppo pepper, cumin, black pepper, sumac, dried mint, oregano, garlic', tint: '#B04A32' },
      { slug: 'kebab-persian', name: 'Persian Kebab Spices', origin: 'Iran', line: 'Sumac on the table and saffron in the butter: the Iranian grill, minus the grill.', ingredients: 'Sumac, saffron, turmeric, black pepper, dried lime, onion, salt', tint: '#9A4A3A' },
    ],
  },
  {
    slug: 'africa',
    name: 'Africa',
    intro: 'The Horn and the coast: the hottest shelf in the house.',
    blends: [
      { slug: 'berbere', name: 'Berbéré', origin: 'Ethiopia', line: 'The red at the heart of every wat; a family\'s berbéré is as private as its bank balance.', ingredients: 'Dried red chillies, fenugreek, coriander, cardamom, ajwain, nigella, black pepper, allspice, clove, cinnamon, ginger, garlic, rue, korarima', tint: '#8E2A1E' },
      { slug: 'mitmita', name: 'Mitmita', origin: 'Ethiopia', line: 'Berbéré\'s hotter, smaller cousin, for raw beef and people who can take it.', ingredients: 'Bird\'s eye chilli, korarima cardamom, clove, salt', tint: '#A82A1A' },
      { slug: 'awaze', name: 'Awaze Spices', origin: 'Ethiopia', line: 'Berbéré mixed with wine or tej into a paste; this is the dry start of it.', ingredients: 'Berbéré, ginger, garlic, cardamom, black pepper, salt', tint: '#962E22' },
      { slug: 'suya', name: 'Suya Spices', origin: 'Nigeria', line: 'Peanut, ginger and chilli pressed into skewered beef on a Lagos corner.', ingredients: 'Roasted peanut, ginger, cayenne, paprika, garlic, onion, salt', tint: '#B5703A' },
      { slug: 'swahili-pilau', name: 'Pilau Masala', origin: 'Zanzibar', line: 'The spice island\'s rice: cardamom and clove from the trees down the road.', ingredients: 'Cumin, cardamom, clove, cinnamon, black pepper, ginger', tint: '#7E5A3A', whole: true },
      { slug: 'cape-malay', name: 'Cape Malay Curry', origin: 'South Africa', line: 'Indonesian cooks, Indian spices, a Dutch colony: the Cape\'s own curry.', ingredients: 'Coriander, cumin, turmeric, fennel, fenugreek, cinnamon, cardamom, clove, chilli, ginger', tint: '#C08A3A' },
    ],
  },
  {
    slug: 'india',
    name: 'India and Sri Lanka',
    intro: 'Masala means mixture. There are as many as there are grandmothers.',
    blends: [
      { slug: 'garam-masala', name: 'Garam Masala', origin: 'North India', line: 'The warming blend, added at the end, when the pot is already a success.', ingredients: 'Green cardamom, cinnamon, clove, black cumin, black pepper, nutmeg, mace, bay leaf', tint: '#6E4A32' },
      { slug: 'garam-masala-kerala', name: 'Malabar Garam Masala', origin: 'Kerala', line: 'The Spice Coast version: fennel and star anise where the north puts cumin.', ingredients: 'Fennel, cinnamon, clove, green cardamom, star anise, black pepper, nutmeg', tint: '#7A5A3A' },
      { slug: 'tandoori', name: 'Tandoori Masala', origin: 'Punjab', line: 'The red is from Kashmiri chilli, not a bottle, whatever the restaurant did.', ingredients: 'Kashmiri chilli, coriander, cumin, garlic, ginger, fenugreek leaf, garam masala, black salt, turmeric', tint: '#B43A2A' },
      { slug: 'madras-curry', name: 'Madras Curry', origin: 'Tamil Nadu', line: 'The curry powder the British took home, done the way Chennai actually does it.', ingredients: 'Coriander, cumin, turmeric, fenugreek, black pepper, chilli, curry leaf, mustard seed, cinnamon', tint: '#C89A2E' },
      { slug: 'vindaloo', name: 'Vindaloo Masala', origin: 'Goa', line: 'Portuguese wine and garlic, Goan chilli: the hottest dish on the menu, and the most misunderstood.', ingredients: 'Kashmiri chilli, cumin, mustard seed, cinnamon, clove, black pepper, turmeric, fenugreek, tamarind', tint: '#9E3A24' },
      { slug: 'vegetable-curry', name: 'Vegetable Curry Masala', origin: 'Gujarat', line: 'Gentler, sweeter, built for a plate with no meat on it.', ingredients: 'Coriander, cumin, turmeric, fennel, amchoor, cinnamon, chilli, asafoetida, fenugreek leaf', tint: '#C9A040' },
      { slug: 'panch-phoron', name: 'Panch Phoron', origin: 'Bengal', line: 'Five whole seeds, never ground, popped in hot oil before anything else goes in.', ingredients: 'Fenugreek, nigella, cumin, black mustard, fennel', tint: '#6A5A3A', whole: true },
      { slug: 'chaat-masala', name: 'Chaat Masala', origin: 'North India', line: 'Sour, salty, sulphurous: the street-snack dust that makes fruit taste like a party.', ingredients: 'Amchoor, black salt, cumin, coriander, ginger, black pepper, asafoetida, ajwain, mint', tint: '#A89060' },
      { slug: 'sambar', name: 'Sambar Powder', origin: 'Tamil Nadu', line: 'Lentils, tamarind and this, twice a day, for a few hundred million people.', ingredients: 'Coriander, chana dal, urad dal, dried chilli, fenugreek, cumin, black pepper, turmeric, curry leaf, asafoetida', tint: '#B5742E' },
      { slug: 'rasam', name: 'Rasam Powder', origin: 'South India', line: 'The pepper water that cures colds, hangovers and the end of a long week.', ingredients: 'Black pepper, cumin, coriander, dried chilli, toor dal, curry leaf, asafoetida', tint: '#8E5A3A' },
      { slug: 'biryani', name: 'Biryani Masala', origin: 'Hyderabad', line: 'A layered rice that takes all afternoon and is gone in eleven minutes.', ingredients: 'Cardamom, cinnamon, clove, bay leaf, star anise, mace, black cumin, fennel, nutmeg, saffron', tint: '#8A6A42', whole: true },
      { slug: 'korma', name: 'Korma Masala', origin: 'Mughal courts', line: 'Almonds, cream and the court\'s gentlest spices; the dish is mild, the history is not.', ingredients: 'Coriander, cumin, green cardamom, cinnamon, white pepper, fennel, mace, nutmeg, poppy seed', tint: '#C4A878' },
      { slug: 'chai', name: 'Chai Spices', origin: 'India', line: 'Cardamom, ginger and a slap of pepper in milky tea, at every station on the line.', ingredients: 'Green cardamom, ginger, cinnamon, clove, black pepper, fennel, star anise', tint: '#8F6A48', whole: true },
      { slug: 'goda-masala', name: 'Goda Masala', origin: 'Maharashtra', line: 'The sweet, dark Marathi blend with stone flower in it, which almost nobody outside Pune can name.', ingredients: 'Coriander, sesame, desiccated coconut, cinnamon, clove, black cardamom, stone flower, bay leaf, cumin, asafoetida', tint: '#5E4030' },
      { slug: 'xacuti', name: 'Xacuti Masala', origin: 'Goa', line: 'Roasted coconut, poppy seed and a dozen others: Goa\'s Sunday chicken.', ingredients: 'Roasted coconut, poppy seed, coriander, dried chilli, cinnamon, clove, star anise, black pepper, fennel, turmeric, nutmeg', tint: '#7A4A32' },
      { slug: 'ceylon-curry', name: 'Ceylon Roasted Curry', origin: 'Sri Lanka', line: 'Roasted dark before grinding; the island likes its curry the colour of its tea.', ingredients: 'Coriander, cumin, fennel, fenugreek, cinnamon, curry leaf, black pepper, cardamom, clove, dried chilli', tint: '#5A3A28' },
    ],
  },
  {
    slug: 'asia',
    name: 'East and South-East Asia',
    intro: 'The blends that balance five flavours and the ones that only want one: heat.',
    blends: [
      { slug: 'five-spice', name: 'Chinese Five-Spice', origin: 'South China', line: 'Sweet, sour, bitter, salty, pungent: the whole theory of flavour in a teaspoon.', ingredients: 'Star anise, Sichuan pepper, cassia, clove, fennel seed', tint: '#5E3E2C' },
      { slug: 'sichuan-pepper-salt', name: 'Sichuan Pepper Salt', origin: 'Sichuan', line: 'The numbing one. Dry-roasted with salt, for anything that has just come out of hot oil.', ingredients: 'Sichuan pepper, sea salt, white pepper', tint: '#8A6A5A', whole: true },
      { slug: 'mala', name: 'Mala Spices', origin: 'Chongqing', line: 'Numbing and hot, in that order, then numbing again.', ingredients: 'Dried chillies, Sichuan pepper, star anise, cassia, fennel, black cardamom, clove, bay leaf, ginger', tint: '#8E2E22' },
      { slug: 'shichimi', name: 'Shichimi Tōgarashi', origin: 'Japan', line: 'Seven flavours for the noodle bowl, sold outside temples since the 1600s.', ingredients: 'Dried chilli, sansho pepper, orange peel, black sesame, white sesame, hemp seed, nori', tint: '#B04A32', whole: true },
      { slug: 'furikake', name: 'Furikake', origin: 'Japan', line: 'Rice seasoning for people who find plain rice an insult.', ingredients: 'Toasted sesame, nori, bonito flakes, salt, sugar, dried shiso', tint: '#4A4A3A', whole: true },
      { slug: 'japanese-curry', name: 'Japanese Curry', origin: 'Japan', line: 'The navy brought it from Britain, Japan made it sweet and thick and a national dish.', ingredients: 'Coriander, turmeric, cumin, fenugreek, cinnamon, cardamom, clove, black pepper, ginger, nutmeg, star anise, orange peel', tint: '#B8862E' },
      { slug: 'korean-bbq', name: 'Korean BBQ', origin: 'Korea', line: 'Gochugaru, sesame and garlic: the dry version of the marinade in every Seoul alley.', ingredients: 'Gochugaru, toasted sesame, garlic, ginger, black pepper, brown sugar, sea salt', tint: '#B5402A' },
      { slug: 'satay', name: 'Satay Spices', origin: 'Indonesia', line: 'For the skewer, not the sauce; the peanut comes later.', ingredients: 'Coriander, cumin, turmeric, galangal, lemongrass, garlic, chilli, palm sugar, white pepper', tint: '#C49A3A' },
      { slug: 'bumbu', name: 'Bumbu Bali', origin: 'Bali', line: 'The base paste of the island, dried: galangal, turmeric, candlenut and a great deal of shallot.', ingredients: 'Shallot, garlic, galangal, turmeric, ginger, candlenut, coriander, chilli, lemongrass, kaffir lime leaf, shrimp paste', tint: '#B8782A' },
      { slug: 'rendang', name: 'Rendang Spices', origin: 'West Sumatra', line: 'Beef cooked in coconut milk until the milk is gone and the Minang say it is ready.', ingredients: 'Dried chilli, galangal, lemongrass, turmeric, ginger, coriander, cumin, star anise, cinnamon, kaffir lime leaf', tint: '#7A4A2A' },
      { slug: 'thai-red-curry', name: 'Thai Red Curry Spices', origin: 'Thailand', line: 'The dry bones of a red curry paste; pound in the fresh things and you are there.', ingredients: 'Dried red chilli, lemongrass, galangal, coriander seed, cumin, white pepper, kaffir lime, garlic, shallot', tint: '#B03A2A' },
      { slug: 'pho', name: 'Phở Spices', origin: 'Vietnam', line: 'Charred onion and these in a cloth bag, simmered all night in Hanoi.', ingredients: 'Star anise, cassia, clove, coriander seed, black cardamom, fennel', tint: '#6A4A38', whole: true },
      { slug: 'laksa', name: 'Laksa Spices', origin: 'Malaysia', line: 'Coconut, chilli and dried shrimp in a noodle soup that divides Penang from Singapore.', ingredients: 'Dried chilli, coriander, turmeric, galangal, lemongrass, candlenut, dried shrimp, shallot, garlic', tint: '#C06A2A' },
      { slug: 'adobo-filipino', name: 'Filipino Adobo Spices', origin: 'Philippines', line: 'Not the Mexican one: bay, pepper and garlic for vinegar-braised chicken.', ingredients: 'Black pepper, garlic, bay leaf, onion, paprika, oregano', tint: '#7E6A4A', whole: true },
    ],
  },
  {
    slug: 'americas',
    name: 'The Americas',
    intro: 'Chillies went out from here and came back as everyone else\'s cooking.',
    blends: [
      { slug: 'jerk', name: 'Jamaican Jerk', origin: 'Jamaica', line: 'Allspice and scotch bonnet over pimento wood; the Maroons invented it to be eaten in hiding.', ingredients: 'Allspice, scotch bonnet, thyme, brown sugar, black pepper, cinnamon, nutmeg, garlic, onion, ginger', tint: '#5E4030' },
      { slug: 'creole', name: 'Creole Spices', origin: 'Louisiana', line: 'New Orleans: paprika, herbs and pepper, three kinds, in a city that counts.', ingredients: 'Paprika, garlic, onion, oregano, thyme, basil, black pepper, white pepper, cayenne, salt', tint: '#B85A32' },
      { slug: 'cajun', name: 'Cajun Spices', origin: 'Louisiana bayou', line: 'Creole\'s country cousin: more heat, fewer herbs, blackened in a cast-iron pan.', ingredients: 'Paprika, cayenne, garlic, onion, black pepper, oregano, thyme, salt', tint: '#A8402A' },
      { slug: 'adobo-mexican', name: 'Mexican Adobo', origin: 'Mexico', line: 'Dried chillies, vinegar and oregano, the marinade that gave chipotle its sauce.', ingredients: 'Ancho chilli, guajillo chilli, Mexican oregano, cumin, garlic, cinnamon, clove, black pepper', tint: '#8E3A2A' },
      { slug: 'recado-rojo', name: 'Recado Rojo', origin: 'Yucatán', line: 'Annatto red for cochinita pibil, wrapped in banana leaf and buried with the pig.', ingredients: 'Annatto, Mexican oregano, cumin, black pepper, allspice, clove, garlic, bitter orange', tint: '#B8402A' },
      { slug: 'chili-con-carne', name: 'Chili con Carne', origin: 'Texas', line: 'No beans. That is the whole Texan position and they will defend it.', ingredients: 'Ancho chilli, cumin, Mexican oregano, garlic, paprika, cayenne, onion, cocoa', tint: '#8A3A28' },
      { slug: 'mole', name: 'Mole Spices', origin: 'Oaxaca', line: 'Thirty ingredients and a day of grinding; this is the dry third of a mole negro.', ingredients: 'Ancho, mulato and pasilla chillies, cinnamon, clove, allspice, coriander, anise, sesame, cocoa, oregano', tint: '#4A2E24' },
      { slug: 'taco', name: 'Taco Spices', origin: 'Northern Mexico', line: 'The honest version of the packet: chillies first, salt last.', ingredients: 'Ancho chilli, cumin, paprika, Mexican oregano, garlic, onion, coriander, cayenne', tint: '#A85232' },
      { slug: 'merken', name: 'Merkén', origin: 'Chile', line: 'Smoked goat\'s horn chilli, Mapuche: Chile\'s answer to pimentón, older than Chile.', ingredients: 'Smoked cacho de cabra chilli, toasted coriander seed, salt', tint: '#9E3A24' },
      { slug: 'chimichurri', name: 'Chimichurri Spices', origin: 'Argentina', line: 'Add oil and vinegar and a steak the size of a hat.', ingredients: 'Parsley, oregano, garlic, chilli flakes, black pepper, bay leaf, salt', tint: '#7A8A4A', whole: true },
      { slug: 'montreal-steak', name: 'Montréal Steak Spices', origin: 'Québec', line: 'Coarse: pepper, coriander and dill from the smoked-meat delis of the Main.', ingredients: 'Black pepper, coriander seed, dill seed, garlic, onion, paprika, chilli flakes, coarse salt', tint: '#5A4A3A', whole: true },
      { slug: 'montreal-bagel', name: 'Montréal Bagel Spices', origin: 'Québec', line: 'Everything that falls off a bagel, kept.', ingredients: 'Sesame, poppy seed, dried onion, dried garlic, caraway, coarse salt', tint: '#9A8A6A', whole: true },
      { slug: 'poultry', name: 'Poultry Spices', origin: 'Québec', line: 'Sage and savory for the Sunday bird, the way the grandmothers of Montréal did it.', ingredients: 'Sage, thyme, savory, marjoram, rosemary, black pepper, nutmeg', tint: '#8A8A5A', whole: true },
      { slug: 'east-coast-seafood', name: 'East Coast Seafood', origin: 'Atlantic Canada', line: 'Celery salt, bay and mustard for the lobster pot, and the crab after it.', ingredients: 'Celery seed, bay leaf, mustard seed, black pepper, paprika, allspice, ginger, cayenne, salt', tint: '#A86A3A' },
      { slug: 'brining', name: 'Brining Spices', origin: 'Québec', line: 'For the turkey that spends two days in a bucket and comes out a different bird.', ingredients: 'Juniper, bay leaf, black pepper, allspice, coriander, mustard seed, clove, dill seed', tint: '#6A5A48', whole: true },
      { slug: 'kansas-city-bbq', name: 'Kansas City Rub', origin: 'Missouri', line: 'Brown sugar and paprika, for ribs that have twelve hours and nowhere to be.', ingredients: 'Brown sugar, paprika, black pepper, garlic, onion, mustard, cayenne, celery seed, salt', tint: '#9E5A2E' },
      { slug: 'ranch', name: 'Ranch Spices', origin: 'California', line: 'A dressing that became a seasoning that became a national habit.', ingredients: 'Dried dill, parsley, chives, garlic, onion, black pepper, buttermilk powder, salt', tint: '#A8A878', whole: true },
      { slug: 'pumpkin-pie', name: 'Pumpkin Pie Spices', origin: 'New England', line: 'Cinnamon leads, ginger argues, clove and nutmeg settle it.', ingredients: 'Cinnamon, ginger, nutmeg, allspice, clove', tint: '#8E5A32' },
      { slug: 'maple-dessert', name: 'Maple Dessert Spices', origin: 'Québec', line: 'For the sugar-shack pudding: the spices that stand up to syrup.', ingredients: 'Cinnamon, cardamom, star anise, vanilla, clove, nutmeg', tint: '#7A4A30' },
    ],
  },
  {
    slug: 'europe',
    name: 'Europe',
    intro: 'Quieter blends, mostly; Europe spent its spices on the sweet things.',
    blends: [
      { slug: 'herbes-de-provence', name: 'Herbes de Provence', origin: 'Provence', line: 'Thyme, savory and rosemary from the hills; the lavender is a Parisian idea.', ingredients: 'Thyme, savory, rosemary, oregano, marjoram, basil, fennel seed', tint: '#8E8A5A', whole: true },
      { slug: 'quatre-epices', name: 'Quatre-Épices', origin: 'France', line: 'Four spices for the charcuterie board: pepper, clove, nutmeg, ginger. Sometimes five. Never four.', ingredients: 'White pepper, clove, nutmeg, ginger, cinnamon', tint: '#8A6A4A' },
      { slug: 'three-pepper', name: 'Three-Pepper Mill Blend', origin: 'France', line: 'Green, black and white from the same vine, picked at three ages.', ingredients: 'Black pepper, white pepper, green pepper', tint: '#5A4A40', whole: true },
      { slug: 'pain-d-epices', name: 'Pain d\'Épices Spices', origin: 'Dijon', line: 'Honey cake from Burgundy: anise and cinnamon in the proportions of 1600.', ingredients: 'Cinnamon, anise, ginger, nutmeg, clove, coriander, cardamom', tint: '#8E6A3A' },
      { slug: 'speculoos', name: 'Speculoos Spices', origin: 'Flanders', line: 'The biscuit spice of Antwerp and Saint Nicholas; cardamom is the secret, if there is one.', ingredients: 'Cinnamon, nutmeg, clove, ginger, cardamom, white pepper, anise', tint: '#7E5A3A' },
      { slug: 'mulled-wine', name: 'Mulled Wine Spices', origin: 'Alsace and the Rhine', line: 'Orange peel, cinnamon and star anise for a December that is darker than ours.', ingredients: 'Cinnamon, star anise, clove, orange peel, cardamom, allspice, ginger', tint: '#7A4A3A', whole: true },
      { slug: 'paella', name: 'Paella Spices', origin: 'Valencia', line: 'Saffron and pimentón for the rice; the rabbit and the snails you source yourself.', ingredients: 'Saffron, sweet pimentón, garlic, rosemary, black pepper, bay leaf', tint: '#D08A2E' },
      { slug: 'pinchitos', name: 'Pinchitos Morunos', origin: 'Andalusia', line: 'Moorish skewers: our ras el hanout, remembered in Spanish after five centuries.', ingredients: 'Cumin, coriander, turmeric, sweet pimentón, oregano, thyme, garlic, cayenne, saffron', tint: '#C07A2E' },
      { slug: 'porchetta', name: 'Porchetta Spices', origin: 'Umbria', line: 'Fennel pollen, rosemary and garlic rolled into a pig that feeds a village fête.', ingredients: 'Fennel seed, rosemary, garlic, black pepper, sage, lemon zest, chilli, salt', tint: '#8A8A58', whole: true },
      { slug: 'toulouse-sausage', name: 'Toulouse Sausage Spices', origin: 'South-West France', line: 'Pepper, nutmeg and garlic, coarse-ground; the cassoulet starts here.', ingredients: 'Black pepper, nutmeg, garlic, thyme, bay leaf, salt', tint: '#7A6A58' },
      { slug: 'gravlax', name: 'Gravlax Spices', origin: 'Scandinavia', line: 'Dill, juniper and white pepper to bury a salmon in salt and sugar for two days.', ingredients: 'Dill seed, juniper, white pepper, coriander, lemon peel, salt, sugar', tint: '#8A9A6A', whole: true },
      { slug: 'greek', name: 'Greek Herb Blend', origin: 'Greece', line: 'Mountain oregano and lemon for anything about to meet a grill or a block of feta.', ingredients: 'Oregano, thyme, marjoram, garlic, lemon peel, black pepper, dill, mint', tint: '#9A9A68', whole: true },
      { slug: 'goulash', name: 'Goulash Spices', origin: 'Hungary', line: 'Three paprikas and caraway; the herdsmen\'s stew that became an empire\'s.', ingredients: 'Sweet paprika, hot paprika, smoked paprika, caraway, garlic, marjoram, black pepper, bay leaf', tint: '#B04A2A' },
      { slug: 'khmeli-suneli', name: 'Khmeli-Suneli', origin: 'Georgia', line: 'Blue fenugreek and marigold: the Caucasus blend no other kitchen can imitate.', ingredients: 'Blue fenugreek, coriander, marigold petals, savory, dill, basil, bay leaf, mint, black pepper, marjoram', tint: '#8A8A4A' },
      { slug: 'svan-salt', name: 'Svanetian Salt', origin: 'Georgia', line: 'Salt pounded with garlic and wild herbs in the high villages of Svaneti.', ingredients: 'Salt, garlic, blue fenugreek, coriander, marigold, dill, caraway, chilli', tint: '#A89A6A' },
      { slug: 'pickling', name: 'Pickling Spices', origin: 'Central Europe', line: 'For the cucumbers of August, in a jar that has to last until March.', ingredients: 'Mustard seed, coriander, dill seed, bay leaf, allspice, black pepper, chilli, clove, ginger', tint: '#8A7A4A', whole: true },
    ],
  },
];

export const ALL_BLENDS: WorldBlend[] = REGIONS.flatMap((r) => r.blends);

/** The one picture per blend. Two things never change, so the shelf reads as one shoot:
 *  the table (pale sage-green zellige) and the light (soft daylight from the left, low, gentle shadow).
 *  Everything else varies from blend to blend, picked from the slug so it is stable between runs:
 *  the vessel, how the blend sits in it, what is scattered, and where it sits in the frame. */
const TABLE = 'resting on a table of pale sage-green handmade zellige tiles, small square tiles with soft irregular glaze and fine grout lines';
const LIGHT = 'soft diffused daylight from the left, no hard shadows, no window light patterns, a single soft shadow under the vessel to the right, even and calm, true muted natural colour';
const VESSELS = [
  'a small shallow unglazed terracotta dish',
  'a small hand-thrown glazed bowl in deep cobalt blue',
  'a worn brass spice scoop',
  'a small round unglazed clay saucer',
  'a small hand-carved olive-wood bowl',
  'a small white glazed Fes ceramic bowl with a fine blue rim',
  'a small pewter-grey tadelakt dish',
  'directly on the tiles, poured in a small loose heap with no vessel',
];
const SCATTER = [
  'a few whole spices from the recipe scattered at its edge',
  'a single whole spice from the recipe resting beside it',
  'a small spill of the blend trailing out across the tiles',
  'three or four whole spices from the recipe in a loose line beside it',
  'nothing beside it, the blend alone',
];
const PLACE = [
  'close-up, the vessel filling most of the frame, a narrow band of tile around it',
  'close-up, the vessel filling most of the frame and set a little off-centre',
  'close-up, the vessel slightly cropped at one edge',
  'close-up, the vessel filling most of the frame, a little more tile on the left',
];
const hash = (s: string, salt: number) => {
  let h = salt * 2654435761;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return Math.abs(h);
};
const pick = <T,>(arr: T[], slug: string, salt: number): T => arr[hash(slug, salt) % arr.length];

export function blendPrompt(b: WorldBlend): string {
  const form = b.whole
    ? 'a loose heap of the whole blend, seeds and pieces and dried leaves visible one by one'
    : 'a soft mound of the finely ground blend';
  const vessel = pick(VESSELS, b.slug, 1);
  const holder = vessel.startsWith('directly') ? vessel : `in ${vessel}`;
  return [
    `overhead still life, ${form} of ${b.name} (${b.ingredients.toLowerCase().split(', ').slice(0, 6).join(', ')}), ${holder}, ${pick(SCATTER, b.slug, 2)}, ${TABLE}, ${pick(PLACE, b.slug, 3)},`,
    `${LIGHT}, clean editorial food photography, medium format, 80mm, f/8, fine real texture`,
    '--ar 4:3 --style raw --stylize 50 --no packaging, labels, text, hands, people, napkin, cloth, glass, spoon, wooden board, garnish, window shadows, light stripes, wide shot',
  ].join(' ');
}
