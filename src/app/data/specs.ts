export type SpecRow = { label: string; values: [string, string, string] };

export const tabs = [
  { key: "key-specs", title: "Key specifications" },
  { key: "dimensions", title: "Dimensions" },
  { key: "capacity", title: "Capacity and Storage" },
  { key: "design", title: "Design and finish" },
  { key: "performance", title: "Performance" },
  { key: "smart", title: "Smart Features" },
];

export const products = [
  {
    id: 1,
    title: "Bespoke AI 4-Door French",
    badge: "Best for smart home",
    badgeColor: "text-blue-600 bg-blue-50",
    description: "Smarter cooling, seamless connectivity, engineered for modern living",
    price: "$3149",
    image: "products/fridge-1.png",
  },
  {
    id: 2,
    title: "4-Door French",
    badge: "Best for value",
    badgeColor: "text-green-600 bg-green-50",
    description: "Dependable performance for every family, every day.",
    price: "$1099",
    image: "products/fridge-2.png",
  },
  {
    id: 3,
    title: "Bespoke AI 4-Door Flex",
    badge: "Best for large families",
    badgeColor: "text-orange-600 bg-orange-50",
    description: "More storage options. More ways to make it yours",
    price: "$3149",
    image: "products/fridge-3.png",
  },
];

export const specData: Record<string, SpecRow[]> = {
  "key-specs": [
    { label: "Total Capacity", values: ["29 cu. ft.", "28 cu. ft.", "28.6 cu. ft."] },
    { label: "Dimensions (W x H x D)", values: ['35 3/4" x 70" x 34 1/4"', '35 3/4" x 70" x 36 1/2"', '35 1/8" x 69 7/8" x 29 7/8"'] },
    { label: "Depth Option", values: ["Full + Counter Depth", "Full Depth Only", "Full + Counter Depth"] },
    { label: "Fingerprint Resistant", values: ["Yes", "Yes", "Yes"] },
    { label: "Energy Star Certified", values: ["Yes", "Yes", "Yes"] },
    { label: "Annual Energy Use", values: ["683 kWh/yr", "722 kWh/yr", "698 kWh/yr"] },
  ],
  dimensions: [
    { label: "Width", values: ['35 3/4"', '35 3/4"', '35 1/8"'] },
    { label: "Height", values: ['70"', '70"', '69 7/8"'] },
    { label: "Depth (without handles)", values: ['34 1/4"', '36 1/2"', '29 7/8"'] },
    { label: "Depth (with handles)", values: ['36 1/2"', '38 5/8"', '33 3/4"'] },
    { label: "Weight", values: ["358 lbs", "374 lbs", "365 lbs"] },
    { label: "Required Clearance (sides)", values: ['3/8"', '3/8"', '3/8"'] },
    { label: "Required Clearance (rear)", values: ['1"', '1"', '1"'] },
  ],
  capacity: [
    { label: "Total Capacity", values: ["29 cu. ft.", "28.15 cu. ft.", "28.6 cu. ft."] },
    { label: "Refrigerator Capacity", values: ["16.5 cu. ft.", "15.98 cu. ft.", "17 cu. ft."] },
    { label: "Freezer Capacity", values: ["9 cu. ft.", "8.35 cu. ft.", "11.6 cu. ft."] },
    { label: "FlexZone Drawer", values: ["3.1 cu. ft.", "3.82 cu. ft.", "—"] },
    { label: "Number of Shelves", values: ["4 Spill-Proof", "5 Spill-Proof", "4 Spill-Proof"] },
    { label: "Number of Door Bins", values: ["6", "6", "6"] },
    { label: "Crisper Drawers", values: ["2 (Crisper+)", "2 Humidity-Controlled", "2 (FlexCrisper)"] },
  ],
  design: [
    { label: "Door Style", values: ["4-Door French Door", "4-Door French Door", "4-Door Flex"] },
    { label: "Customizable Panels", values: ["Yes (Bespoke)", "No", "Yes (Bespoke)"] },
    { label: "Handle Type", values: ["Recessed", "Standard", "Recessed"] },
    { label: "Finish", values: ["Charcoal Glass / Matte Black Steel", "Stainless Steel / Black Stainless", "Charcoal Glass / Stainless Steel"] },
    { label: "Interior Lighting", values: ["LED", "LED", "LED"] },
    { label: "Display", values: ["Family Hub+ Touchscreen", "None", "Family Hub+ 32\u2033 Touchscreen"] },
  ],
  performance: [
    { label: "Cooling Technology", values: ["Twin Cooling Plus", "Twin Cooling Plus", "Triple Cooling + Metal Cooling"] },
    { label: "Ice Maker", values: ["Dual (Cubed + Ice Bites)", "Single (Ice Master)", "Dual (Cubed + Ice Bites)"] },
    { label: "Ice Production (per day)", values: ["5.3 lbs", "10 lbs", "5.3 lbs"] },
    { label: "Water Dispenser", values: ["Internal (Beverage Center)", "External", "Internal (Beverage Center)"] },
    { label: "FlexZone Temperature Zones", values: ["5 Settings", "4 Settings", "—"] },
    { label: "Power Cool / Power Freeze", values: ["Yes / Yes", "Yes / Yes", "Yes / Yes"] },
    { label: "Door Alarm", values: ["Yes", "Yes", "Yes"] },
  ],
  smart: [
    { label: "Wi-Fi Enabled", values: ["Yes", "No", "Yes"] },
    { label: "Family Hub", values: ["Family Hub+", "\u2014", "Family Hub+ (32\u2033 screen)"] },
    { label: "AI Vision Inside", values: ["Yes", "No", "Yes"] },
    { label: "SmartThings Compatible", values: ["Yes", "No", "Yes"] },
    { label: "SmartThings Energy", values: ["Yes (up to 10% savings)", "No", "Yes (up to 10% savings)"] },
    { label: "Voice Assistant", values: ["Alexa Built-in", "—", "Alexa Built-in"] },
    { label: "View Inside Remotely", values: ["Yes", "No", "Yes"] },
  ],
};

export function hasDifference(values: string[]): boolean {
  return new Set(values).size > 1;
}
