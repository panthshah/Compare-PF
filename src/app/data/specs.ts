export type SpecRow = { label: string; values: [string, string, string] };

export const tabs = [
  { key: "key-specs", title: "Key specifications" },
  { key: "dimensions", title: "Dimensions" },
  { key: "capacity", title: "Capacity and Storage" },
  { key: "design", title: "Design and finish" },
  { key: "performance", title: "Performance" },
  { key: "smart", title: "Smart Features" },
];

// GitHub Pages serves the app under a subpath (`/Compare-PF/`).
// Use an absolute, base-path-aware URL so images work on `/v3`, `/v4`, etc.
const imageBasePath = process.env.NODE_ENV === "production" ? "/Compare-PF" : "";

export const products = [
  {
    id: 1,
    title: "Bespoke AI 4-Door French",
    badge: "Best for smart home",
    badgeColor: "text-blue-600 bg-blue-50",
    description: "Smarter cooling, seamless connectivity, engineered for modern living",
    price: "$3,599",
    image: `${imageBasePath}/products/fridge-1.png`,
  },
  {
    id: 2,
    title: "3-Door French Door",
    badge: "Best for value",
    badgeColor: "text-green-600 bg-green-50",
    description: "Dependable performance for every family, every day.",
    price: "$1,974",
    image: `${imageBasePath}/products/fridge-2.png`,
  },
  {
    id: 3,
    title: "Bespoke 4-Door Flex",
    badge: "Best for large families",
    badgeColor: "text-orange-600 bg-orange-50",
    description: "More storage options. More ways to make it yours",
    price: "$1,799",
    image: `${imageBasePath}/products/fridge-3.png`,
  },
];

export const specData: Record<string, SpecRow[]> = {
  "key-specs": [
    { label: "Total Capacity", values: ["28.6 cu. ft.", "28.2 cu. ft.", "28.6 cu. ft."] },
    { label: "Dimensions (W x H x D)", values: ['35 3/4\u2033 x 70\u2033 x 34 1/4\u2033', '35 3/4\u2033 x 70\u2033 x 35 3/8\u2033', '35 7/8\u2033 x 69 7/8\u2033 x 29 3/8\u2033'] },
    { label: "Depth Option", values: ["Full Depth", "Full Depth Only", "Full Depth"] },
    { label: "Fingerprint Resistant", values: ["Yes", "Yes", "Yes"] },
    { label: "Energy Star Certified", values: ["Yes", "Yes", "Yes"] },
    { label: "Annual Energy Use", values: ["683 kWh/yr", "645 kWh/yr", "704 kWh/yr"] },
  ],
  dimensions: [
    { label: "Width", values: ['35 3/4\u2033', '35 3/4\u2033', '35 7/8\u2033'] },
    { label: "Height", values: ['70\u2033', '70\u2033', '69 7/8\u2033'] },
    { label: "Depth (without handles)", values: ['29 3/8\u2033', '30 1/2\u2033', '29 3/8\u2033'] },
    { label: "Depth (with handles)", values: ['34 1/4\u2033', '35 3/8\u2033', '34 1/4\u2033'] },
    { label: "Weight", values: ["359 lbs", "276 lbs", "355 lbs"] },
    { label: "Required Clearance (sides)", values: ['3/8\u2033', '3/8\u2033', '3/8\u2033'] },
    { label: "Required Clearance (rear)", values: ['2\u2033', '2\u2033', '2\u2033'] },
  ],
  capacity: [
    { label: "Total Capacity", values: ["28.6 cu. ft.", "28.2 cu. ft.", "28.6 cu. ft."] },
    { label: "Refrigerator Capacity", values: ["16.5 cu. ft.", "19.6 cu. ft.", "17 cu. ft."] },
    { label: "Freezer Capacity", values: ["9 cu. ft.", "8.6 cu. ft.", "5.8 cu. ft."] },
    { label: "FlexZone Drawer", values: ["3.1 cu. ft.", "\u2014", "5.8 cu. ft."] },
    { label: "Number of Shelves", values: ["4 Spill-Proof", "5 Spill-Proof", "4 Spill-Proof"] },
    { label: "Number of Door Bins", values: ["6", "6", "6"] },
    { label: "Crisper Drawers", values: ["2 (Crisper+)", "2 Humidity-Controlled", "2 Clear Crisper"] },
  ],
  design: [
    { label: "Door Style", values: ["4-Door French Door", "3-Door French Door", "4-Door Flex"] },
    { label: "Customizable Panels", values: ["Yes (Bespoke)", "No", "Yes (Bespoke)"] },
    { label: "Handle Type", values: ["Recessed", "EZ-Open Handle", "Recessed"] },
    { label: "Finish", values: ["Charcoal Glass / Matte Black Steel", "Fingerprint Resistant Stainless Steel", "Stainless Steel / White Glass"] },
    { label: "Interior Lighting", values: ["LED", "LED", "LED"] },
    { label: "Display", values: ["Family Hub+ Touchscreen", "None", "\u2014"] },
  ],
  performance: [
    { label: "Cooling Technology", values: ["Twin Cooling Plus", "Twin Cooling Plus", "Triple Cooling + Metal Cooling"] },
    { label: "Ice Maker", values: ["Dual (Cubed + Ice Bites)", "Single (Ice Max)", "Dual (Cubed + Ice Bites)"] },
    { label: "Ice Production (per day)", values: ["5.3 lbs", "5.5 lbs", "5.3 lbs"] },
    { label: "Water Dispenser", values: ["Internal (Beverage Center)", "None", "Internal (Beverage Zone)"] },
    { label: "FlexZone Temperature Zones", values: ["5 Settings", "\u2014", "5 Settings"] },
    { label: "Power Cool / Power Freeze", values: ["Yes / Yes", "Yes / Yes", "Yes / Yes"] },
    { label: "Door Alarm", values: ["Yes", "Yes", "Yes"] },
  ],
  smart: [
    { label: "Wi-Fi Enabled", values: ["Yes", "No", "Yes"] },
    { label: "Family Hub", values: ["Family Hub+", "\u2014", "\u2014"] },
    { label: "AI Vision Inside", values: ["Yes", "No", "No"] },
    { label: "SmartThings Compatible", values: ["Yes", "No", "Yes"] },
    { label: "SmartThings Energy", values: ["Yes (up to 10% savings)", "No", "Yes (up to 10% savings)"] },
    { label: "Voice Assistant", values: ["Alexa Built-in", "\u2014", "\u2014"] },
    { label: "View Inside Remotely", values: ["Yes", "No", "No"] },
  ],
};

export function hasDifference(values: string[]): boolean {
  return new Set(values).size > 1;
}
