export type TabKey =
  | "key-specs"
  | "dimensions"
  | "capacity"
  | "design"
  | "performance"
  | "smart";

export const tabs: { key: TabKey; title: string }[] = [
  { key: "key-specs", title: "Key specifications" },
  { key: "dimensions", title: "Dimensions" },
  { key: "capacity", title: "Capacity & Storage" },
  { key: "design", title: "Design & Finish" },
  { key: "performance", title: "Performance" },
  { key: "smart", title: "Smart Features" },
];

// GitHub Pages serves the app under a subpath (`/Compare-PF/`).
// Use an absolute, base-path-aware URL so images resolve on both hosts.
const imageBasePath = process.env.GITHUB_ACTIONS === "true" ? "/Compare-PF" : "";

export type ProductColor = { name: string; hex: string };

export type Product = {
  id: number;
  title: string;
  badge: string;
  description: string;
  price: number;
  wasPrice: number;
  colors: ProductColor[];
  image: string;
  learnMoreHref: string;
  buyHref: string;
};

export const products: Product[] = [
  {
    id: 1,
    title: "Bespoke AI 4-Door French",
    badge: "Best for smart home",
    description:
      "Family Hub+ screen, AI Vision Inside and SmartThings energy savings built in",
    price: 3599,
    wasPrice: 4299,
    colors: [
      { name: "Charcoal Glass", hex: "#2E2E2E" },
      { name: "Matte Black Steel", hex: "#141414" },
      { name: "White Glass", hex: "#EFEDE8" },
      { name: "Morning Blue", hex: "#A9BED1" },
    ],
    image: `${imageBasePath}/products/fridge-1.png`,
    learnMoreHref: "https://www.samsung.com/us/home-appliances/refrigerators/",
    buyHref: "https://www.samsung.com/us/home-appliances/refrigerators/",
  },
  {
    id: 2,
    title: "3-Door French Door",
    badge: "Best for value",
    description:
      "Dependable Twin Cooling Plus performance for every family, every day",
    price: 1974,
    wasPrice: 2799,
    colors: [
      { name: "Stainless Steel", hex: "#B9BCC0" },
      { name: "Black Stainless", hex: "#2B2B2B" },
      { name: "White", hex: "#F2F2F2" },
      { name: "Black", hex: "#111111" },
    ],
    image: `${imageBasePath}/products/fridge-2.png`,
    learnMoreHref: "https://www.samsung.com/us/home-appliances/refrigerators/",
    buyHref: "https://www.samsung.com/us/home-appliances/refrigerators/",
  },
  {
    id: 3,
    title: "Bespoke 4-Door Flex",
    badge: "Best for large families",
    description:
      "A FlexZone drawer with five settings and more ways to make it yours",
    price: 1799,
    wasPrice: 2699,
    colors: [
      { name: "Stainless Steel", hex: "#B9BCC0" },
      { name: "White Glass", hex: "#EFEDE8" },
      { name: "Navy Steel", hex: "#2F3B4F" },
      { name: "Grey Glass", hex: "#8E9499" },
    ],
    image: `${imageBasePath}/products/fridge-3.png`,
    learnMoreHref: "https://www.samsung.com/us/home-appliances/refrigerators/",
    buyHref: "https://www.samsung.com/us/home-appliances/refrigerators/",
  },
];

/** A spec cell: the headline value, with an optional second line of detail. */
export type SpecValue = { value: string; note?: string };

/** `values` is indexed by product id (id 1 → index 0, etc.). */
export type SpecRow = { label: string; values: [SpecValue, SpecValue, SpecValue] };

const v = (value: string, note?: string): SpecValue => (note ? { value, note } : { value });

export const specData: Record<TabKey, SpecRow[]> = {
  "key-specs": [
    {
      label: "Total Capacity",
      values: [v("28.6 cu. ft.", "Full depth"), v("28.2 cu. ft.", "Full depth"), v("28.6 cu. ft.", "Full depth")],
    },
    {
      label: "Dimensions (W x H x D)",
      values: [
        v("35 3/4″ x 70″ x 34 1/4″", "With handles"),
        v("35 3/4″ x 70″ x 35 3/8″", "With handles"),
        v("35 7/8″ x 69 7/8″ x 29 3/8″", "Without handles"),
      ],
    },
    {
      label: "Cooling Technology",
      values: [v("Twin Cooling Plus"), v("Twin Cooling Plus"), v("Triple Cooling", "Metal Cooling")],
    },
    {
      label: "Smart Display",
      values: [v("Family Hub+", "32″ touchscreen"), v("None"), v("None")],
    },
    {
      label: "Energy Star Certified",
      values: [v("Yes"), v("Yes"), v("Yes")],
    },
    {
      label: "Annual Energy Use",
      values: [v("683 kWh/yr"), v("645 kWh/yr"), v("704 kWh/yr")],
    },
  ],
  dimensions: [
    { label: "Width", values: [v("35 3/4″"), v("35 3/4″"), v("35 7/8″")] },
    { label: "Height", values: [v("70″"), v("70″"), v("69 7/8″")] },
    { label: "Depth (without handles)", values: [v("29 3/8″"), v("30 1/2″"), v("29 3/8″")] },
    { label: "Depth (with handles)", values: [v("34 1/4″"), v("35 3/8″"), v("34 1/4″")] },
    { label: "Weight", values: [v("359 lbs"), v("276 lbs"), v("355 lbs")] },
    { label: "Required Clearance (sides)", values: [v("3/8″"), v("3/8″"), v("3/8″")] },
    { label: "Required Clearance (rear)", values: [v("2″"), v("2″"), v("2″")] },
  ],
  capacity: [
    { label: "Total Capacity", values: [v("28.6 cu. ft."), v("28.2 cu. ft."), v("28.6 cu. ft.")] },
    { label: "Refrigerator Capacity", values: [v("16.5 cu. ft."), v("19.6 cu. ft."), v("17 cu. ft.")] },
    { label: "Freezer Capacity", values: [v("9 cu. ft."), v("8.6 cu. ft."), v("5.8 cu. ft.")] },
    { label: "FlexZone Drawer", values: [v("3.1 cu. ft."), v("—"), v("5.8 cu. ft.")] },
    { label: "Shelves", values: [v("4", "Spill-proof"), v("5", "Spill-proof"), v("4", "Spill-proof")] },
    { label: "Door Bins", values: [v("6"), v("6"), v("6")] },
    {
      label: "Crisper Drawers",
      values: [v("2", "Crisper+"), v("2", "Humidity-controlled"), v("2", "Clear crisper")],
    },
  ],
  design: [
    { label: "Door Style", values: [v("4-Door French Door"), v("3-Door French Door"), v("4-Door Flex")] },
    { label: "Customizable Panels", values: [v("Yes", "Bespoke"), v("No"), v("Yes", "Bespoke")] },
    { label: "Handle Type", values: [v("Recessed"), v("EZ-Open Handle"), v("Recessed")] },
    {
      label: "Finish",
      values: [
        v("Charcoal Glass", "Matte Black Steel"),
        v("Stainless Steel", "Fingerprint resistant"),
        v("Stainless Steel", "White Glass"),
      ],
    },
    { label: "Interior Lighting", values: [v("LED"), v("LED"), v("LED")] },
    { label: "Display", values: [v("Family Hub+ Touchscreen"), v("None"), v("—")] },
  ],
  performance: [
    {
      label: "Cooling Technology",
      values: [v("Twin Cooling Plus"), v("Twin Cooling Plus"), v("Triple Cooling", "Metal Cooling")],
    },
    {
      label: "Ice Maker",
      values: [v("Dual", "Cubed + Ice Bites"), v("Single", "Ice Max"), v("Dual", "Cubed + Ice Bites")],
    },
    { label: "Ice Production (per day)", values: [v("5.3 lbs"), v("5.5 lbs"), v("5.3 lbs")] },
    {
      label: "Water Dispenser",
      values: [v("Internal", "Beverage Center"), v("None"), v("Internal", "Beverage Zone")],
    },
    { label: "FlexZone Temperature Zones", values: [v("5 Settings"), v("—"), v("5 Settings")] },
    { label: "Power Cool / Power Freeze", values: [v("Yes / Yes"), v("Yes / Yes"), v("Yes / Yes")] },
    { label: "Door Alarm", values: [v("Yes"), v("Yes"), v("Yes")] },
  ],
  smart: [
    { label: "Wi-Fi Enabled", values: [v("Yes"), v("No"), v("Yes")] },
    { label: "Family Hub", values: [v("Family Hub+"), v("—"), v("—")] },
    { label: "AI Vision Inside", values: [v("Yes"), v("No"), v("No")] },
    { label: "SmartThings Compatible", values: [v("Yes"), v("No"), v("Yes")] },
    {
      label: "SmartThings Energy",
      values: [v("Yes", "Up to 10% savings"), v("No"), v("Yes", "Up to 10% savings")],
    },
    { label: "Voice Assistant", values: [v("Alexa Built-in"), v("—"), v("—")] },
    { label: "View Inside Remotely", values: [v("Yes"), v("No"), v("No")] },
  ],
};

export function hasDifference(values: SpecValue[]): boolean {
  return new Set(values.map((s) => `${s.value}|${s.note ?? ""}`)).size > 1;
}

export const formatPrice = (amount: number) =>
  amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
