import type { Product } from "./specs";
import { products } from "./specs";

/**
 * Content for the "global proposal" layout: a per-product AI summary and a
 * key-features grid where each cell carries an icon, a label and a value.
 * `values` is indexed by product id (id 1 → index 0, etc.).
 */

export type FeatureIcon =
  | "capacity"
  | "cooling"
  | "energy"
  | "metal"
  | "water"
  | "ice"
  | "hygiene"
  | "compressor"
  | "door"
  | "shelf"
  | "smart"
  | "grade";

export type FeatureRow = {
  label: string;
  icon: FeatureIcon;
  values: [string | null, string | null, string | null];
};

export const proposalProducts: Product[] = products;

export const ratings: Record<number, { stars: number; count: number }> = {
  1: { stars: 4.6, count: 1299 },
  2: { stars: 4.4, count: 2873 },
  3: { stars: 4.5, count: 964 },
};

export const capacityChip: Record<number, string> = {
  1: "28.6 cu. ft.",
  2: "28.2 cu. ft.",
  3: "28.6 cu. ft.",
};

export const summaries: Record<number, string> = {
  1: "Shoppers praise the Family Hub+ screen for recipes, calendars and seeing inside remotely, and the AI Vision camera for tracking groceries. Quiet, premium build, with SmartThings energy savings as a frequent highlight.",
  2: "Reviewers call it dependable value: consistent Twin Cooling Plus performance, a roomy fresh-food section and an easy-open handle. Praised for keeping produce crisp at a mid-range price.",
  3: "Owners love the FlexZone drawer that switches between fridge and freezer for parties and bulk shopping. Customizable Bespoke panels and a slim counter-depth profile round out the reviews.",
};

export const featureRows: FeatureRow[] = [
  {
    label: "Capacity",
    icon: "capacity",
    values: [
      "Gross total (28.6 cu. ft.)",
      "Gross total (28.2 cu. ft.)",
      "Gross total (28.6 cu. ft.)",
    ],
  },
  {
    label: "Cooling type",
    icon: "cooling",
    values: ["Twin Cooling Plus", "Twin Cooling Plus", "Triple Cooling"],
  },
  { label: "AI Energy Mode", icon: "energy", values: ["Yes", null, "Yes"] },
  {
    label: "Metal Cooling",
    icon: "metal",
    values: [null, null, "Metal Cooling"],
  },
  {
    label: "Water & ice solution",
    icon: "water",
    values: ["Internal beverage center", null, "Internal beverage zone"],
  },
  {
    label: "Icemaker",
    icon: "ice",
    values: [
      "Dual (cubed + Ice Bites)",
      "Single (Ice Max)",
      "Dual (cubed + Ice Bites)",
    ],
  },
  {
    label: "Hygiene type",
    icon: "hygiene",
    values: ["Deodorizer", null, "Deodorizer"],
  },
  {
    label: "Compressor",
    icon: "compressor",
    values: ["Digital Inverter", "Digital Inverter", "Digital Inverter"],
  },
  { label: "Auto door", icon: "door", values: ["Auto open door", null, null] },
  {
    label: "Special drawer",
    icon: "shelf",
    values: ["FlexZone (3.1 cu. ft.)", null, "FlexZone (5.8 cu. ft.)"],
  },
  {
    label: "SmartThings app support",
    icon: "smart",
    values: ["Yes", null, "Yes"],
  },
  {
    label: "Energy grade",
    icon: "grade",
    values: ["ENERGY STAR", "ENERGY STAR", "ENERGY STAR"],
  },
];
