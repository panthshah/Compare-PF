import { products, specData, type Product } from "./specs";

/** A product the assistant recommends, with the reason it fits the question. */
export type AnswerPick = { productId: Product["id"]; reason: string };

export type SearchAnswer = {
  id: string;
  /** How the question was understood, shown as chips above the answer. */
  understood: string[];
  /** Short lead sentence, the direct answer. */
  summary: string;
  /** Supporting points shown as a list under the summary. */
  highlights: string[];
  picks: AnswerPick[];
  followUps: string[];
  sources: { label: string; href: string }[];
};

type MockIntent = SearchAnswer & {
  /** Words that route a free-text question to this answer. */
  keywords: string[];
};

const REFRIGERATORS_HREF =
  "https://www.samsung.com/us/home-appliances/refrigerators/";
const BESPOKE_HREF = "https://www.samsung.com/us/home-appliances/bespoke/";
const SMARTTHINGS_HREF = "https://www.samsung.com/us/smartthings/";

export const suggestedPrompts = [
  "Which fridge is best for a family of five?",
  "Show me smart fridges with a screen",
  "Best value French door fridge under $2,000",
  "Which fridge uses the least energy?",
];

// Mocked answers. Each one is written from the product and spec data in
// specs.ts so the numbers match what the compare page shows.
const intents: MockIntent[] = [
  {
    id: "family",
    understood: ["Family of 5", "Most space", "Refrigerators"],
    keywords: [
      "family",
      "families",
      "kids",
      "five",
      "large",
      "big",
      "space",
      "capacity",
      "storage",
    ],
    summary:
      "For a family of five, the Bespoke 4-Door Flex is the strongest fit. It has 28.6 cu. ft. of space and the biggest FlexZone drawer in the range.",
    highlights: [
      "The 5.8 cu. ft. FlexZone drawer switches between fridge and freezer with five settings, so it can hold snacks one week and a party's worth of drinks the next.",
      "If you mostly need everyday fridge space, the 3-Door French Door has the most at 19.6 cu. ft., plus five shelves.",
      "Both are Energy Star certified and need the same 3/8″ side clearance, so either fits a standard 36″ opening.",
    ],
    picks: [
      { productId: 3, reason: "Largest FlexZone drawer (5.8 cu. ft.)" },
      { productId: 2, reason: "Most fridge space (19.6 cu. ft.)" },
      { productId: 1, reason: "Most freezer space (9 cu. ft.)" },
    ],
    followUps: [
      "Which of these makes the most ice?",
      "Will it fit a 36 inch opening?",
      "Which fridge uses the least energy?",
    ],
    sources: [
      { label: "Samsung refrigerators", href: REFRIGERATORS_HREF },
      { label: "Bespoke appliances", href: BESPOKE_HREF },
    ],
  },
  {
    id: "smart",
    understood: ["Smart features", "Touchscreen", "Refrigerators"],
    keywords: [
      "smart",
      "screen",
      "display",
      "family hub",
      "hub",
      "alexa",
      "wifi",
      "wi-fi",
      "vision",
      "touchscreen",
    ],
    summary:
      "The Bespoke AI 4-Door French is the only fridge here with a screen. Its 32″ Family Hub+ touchscreen runs SmartThings and has Alexa built in.",
    highlights: [
      "AI Vision Inside recognizes what you put in and lets you check the shelves from your phone.",
      "SmartThings Energy can cut its energy use by up to 10%.",
      "The Bespoke 4-Door Flex is Wi-Fi and SmartThings ready too, but it has no screen.",
    ],
    picks: [
      { productId: 1, reason: "32″ Family Hub+ touchscreen" },
      { productId: 3, reason: "SmartThings, without a screen" },
    ],
    followUps: [
      "How much does the Family Hub model cost?",
      "Which fridge is best for a family of five?",
      "Compare all three fridges",
    ],
    sources: [
      { label: "Samsung refrigerators", href: REFRIGERATORS_HREF },
      { label: "SmartThings", href: SMARTTHINGS_HREF },
    ],
  },
  {
    id: "value",
    understood: ["Under $2,000", "Best value", "French door"],
    keywords: [
      "value",
      "cheap",
      "cheapest",
      "budget",
      "price",
      "under",
      "deal",
      "save",
      "afford",
      "cost",
      "$",
    ],
    summary:
      "Two fridges come in under $2,000 today. The Bespoke 4-Door Flex is the lowest price at $1,799.00, and the 3-Door French Door is $1,974.00.",
    highlights: [
      "The Bespoke 4-Door Flex saves you $900.00 and adds a 5.8 cu. ft. FlexZone drawer.",
      "The 3-Door French Door saves you $825.00 and is the most efficient fridge in the range at 645 kWh a year.",
      "The Bespoke AI 4-Door French is $3,599.00 if you want the Family Hub+ screen.",
    ],
    picks: [
      { productId: 3, reason: "Lowest price, $900.00 off" },
      { productId: 2, reason: "Best value for everyday use" },
    ],
    followUps: [
      "Which fridge uses the least energy?",
      "Which fridge is best for a family of five?",
      "Compare all three fridges",
    ],
    sources: [{ label: "Samsung refrigerators", href: REFRIGERATORS_HREF }],
  },
  {
    id: "energy",
    understood: ["Energy use", "Energy Star", "Refrigerators"],
    keywords: [
      "energy",
      "efficient",
      "efficiency",
      "kwh",
      "electric",
      "power",
      "bill",
      "green",
      "eco",
    ],
    summary:
      "The 3-Door French Door uses the least energy, about 645 kWh a year. All three are Energy Star certified.",
    highlights: [
      "The Bespoke AI 4-Door French uses 683 kWh a year, and SmartThings Energy can lower that by up to 10%.",
      "The Bespoke 4-Door Flex uses 704 kWh a year, also with SmartThings Energy savings.",
    ],
    picks: [
      { productId: 2, reason: "Most efficient, 645 kWh/yr" },
      { productId: 1, reason: "683 kWh/yr, up to 10% less with SmartThings" },
      { productId: 3, reason: "704 kWh/yr, up to 10% less with SmartThings" },
    ],
    followUps: [
      "Best value French door fridge under $2,000",
      "Show me smart fridges with a screen",
    ],
    sources: [
      { label: "Samsung refrigerators", href: REFRIGERATORS_HREF },
      { label: "SmartThings", href: SMARTTHINGS_HREF },
    ],
  },
  {
    id: "ice",
    understood: ["Ice maker", "Water dispenser", "Refrigerators"],
    keywords: ["ice", "water", "dispenser", "drinks"],
    summary:
      "The 3-Door French Door makes the most ice, about 5.5 lbs a day, but it has no water dispenser.",
    highlights: [
      "Both Bespoke models have dual ice makers for cubes and Ice Bites, at about 5.3 lbs a day.",
      "The Bespoke models also have an internal water dispenser.",
    ],
    picks: [
      { productId: 2, reason: "Most ice, 5.5 lbs a day" },
      { productId: 1, reason: "Dual ice maker + Beverage Center" },
      { productId: 3, reason: "Dual ice maker + Beverage Zone" },
    ],
    followUps: [
      "Which fridge is best for a family of five?",
      "Compare all three fridges",
    ],
    sources: [{ label: "Samsung refrigerators", href: REFRIGERATORS_HREF }],
  },
  {
    id: "fit",
    understood: ["36″ opening", "Dimensions", "Refrigerators"],
    keywords: [
      "fit",
      "opening",
      "inch",
      "inches",
      "dimension",
      "dimensions",
      "width",
      "depth",
      "height",
      "size",
      "kitchen",
    ],
    summary:
      "All three fit a standard 36″ opening. They are between 35 3/4″ and 35 7/8″ wide and need 3/8″ of clearance on each side.",
    highlights: [
      "The Bespoke 4-Door Flex is the shallowest at 29 3/8″ deep without handles.",
      "The 3-Door French Door is the deepest at 35 3/8″ with handles.",
      "Leave 2″ behind every model for airflow.",
    ],
    picks: [
      { productId: 3, reason: "Shallowest, 29 3/8″ without handles" },
      { productId: 1, reason: "34 1/4″ deep with handles" },
      { productId: 2, reason: "35 3/8″ deep with handles" },
    ],
    followUps: [
      "Compare all three fridges",
      "Which fridge is best for a family of five?",
    ],
    sources: [{ label: "Samsung refrigerators", href: REFRIGERATORS_HREF }],
  },
];

const fallback: SearchAnswer = {
  id: "all",
  understood: ["Refrigerators"],
  summary:
    "Here are the three refrigerators in this lineup. Pick two or three to compare them side by side.",
  highlights: [
    "The Bespoke AI 4-Door French is best for a smart home.",
    "The 3-Door French Door is the best value.",
    "The Bespoke 4-Door Flex is best for large families.",
  ],
  picks: products.map((p) => ({ productId: p.id, reason: p.badge })),
  followUps: suggestedPrompts.slice(0, 3),
  sources: [{ label: "Samsung refrigerators", href: REFRIGERATORS_HREF }],
};

// A keyword matches at the start of a word, so "ice" doesn't match "price".
const startsWord = (text: string, keyword: string) =>
  /^\W/.test(keyword)
    ? text.includes(keyword)
    : new RegExp(`(^|[^a-z])${keyword}`).test(text);

/** Route a question to the mocked answer whose keywords it matches best. */
export function answerFor(question: string): SearchAnswer {
  const q = question.toLowerCase();
  let bestIntent: MockIntent | null = null;
  let bestScore = 0;
  for (const intent of intents) {
    const score = intent.keywords.filter((k) => startsWord(q, k)).length;
    if (score > bestScore) {
      bestIntent = intent;
      bestScore = score;
    }
  }
  return bestIntent ?? fallback;
}

export const productById = (id: Product["id"]) =>
  products.find((p) => p.id === id)!;

/** One-line spec summary for a result card, from the compare page's key specs. */
export function specLine(product: Product): string {
  const cell = (label: string) =>
    specData["key-specs"].find((row) => row.label === label)?.values[
      product.id - 1
    ].value;
  return [
    cell("Total Capacity"),
    cell("Cooling Technology"),
    cell("Smart Display"),
  ]
    .filter((v) => v && v !== "None")
    .join(" | ");
}

const STOP_WORDS = new Set([
  "the",
  "for",
  "and",
  "with",
  "fridge",
  "fridges",
  "refrigerator",
  "refrigerators",
  "best",
  "which",
  "what",
  "show",
]);

/**
 * Products for the overlay as the shopper types: any meaningful word that
 * appears in the name or "best for" badge counts, most matches first.
 */
export function matchProducts(query: string): Product[] {
  const words = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));
  if (words.length === 0) return [];
  const score = (p: Product) => {
    const text = `${p.title} ${p.badge}`.toLowerCase();
    return words.filter((w) => text.includes(w)).length;
  };
  return products
    .map((p) => ({ p, s: score(p) }))
    .filter(({ s }) => s > 0)
    .sort((x, y) => y.s - x.s)
    .map(({ p }) => p);
}

/** Seed for the overlay's recent searches, as if the shopper had been here. */
export const recentSearchesSeed = ["Bespoke refrigerator"];
