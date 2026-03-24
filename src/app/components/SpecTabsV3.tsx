"use client";

import { useEffect, useRef, useState } from "react";
import { Tabs, Tab } from "@heroui/react";

const tabs = [
  { key: "key-specs", title: "Key specifications" },
  { key: "dimensions", title: "Dimensions" },
  { key: "capacity", title: "Capacity and Storage" },
  { key: "design", title: "Design and finish" },
  { key: "performance", title: "Performance" },
  { key: "smart", title: "Smart Features" },
];

const productNames = [
  "Bespoke AI 4-Door French",
  "3-Door French Door",
  "Bespoke 4-Door Flex",
];

type SpecRow = { label: string; values: [string, string, string] };

const specData: Record<string, SpecRow[]> = {
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

const accentColors = ["text-blue-400", "text-green-500", "text-orange-400"];

const winnerTags: Record<string, { index: number; label: string }> = {
  "key-specs|Annual Energy Use": { index: 1, label: "Most Efficient" },
  "dimensions|Depth (without handles)": { index: 0, label: "Shallowest" },
  "dimensions|Weight": { index: 1, label: "Lightest" },
  "capacity|Refrigerator Capacity": { index: 1, label: "Largest Fridge" },
  "capacity|FlexZone Drawer": { index: 2, label: "Largest FlexZone" },
  "performance|Cooling Technology": { index: 2, label: "Advanced" },
  "smart|Family Hub": { index: 0, label: "Smart Display" },
};

interface SpecTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
  isSticky: boolean;
}

export default function SpecTabsV3({ activeTab, onTabChange, isSticky }: SpecTabsProps) {
  const [showDifferences, setShowDifferences] = useState(false);
  const [phase, setPhase] = useState<"enter" | "exit" | "idle">("idle");
  const [displayTab, setDisplayTab] = useState(activeTab);
  const specsRef = useRef<HTMLDivElement>(null);

  const currentSpecs = specData[displayTab] || [];

  useEffect(() => {
    if (activeTab === displayTab) return;

    setPhase("exit");

    const exitTimer = setTimeout(() => {
      setDisplayTab(activeTab);
      setPhase("enter");
    }, 250);

    return () => clearTimeout(exitTimer);
  }, [activeTab, displayTab]);

  useEffect(() => {
    if (phase === "enter") {
      const enterTimer = setTimeout(() => setPhase("idle"), 50);
      return () => clearTimeout(enterTimer);
    }
  }, [phase]);

  const isVisible = phase !== "exit" && phase !== "enter";

  const handleTabChange = (key: string) => {
    onTabChange(key);
    requestAnimationFrame(() => {
      if (specsRef.current) {
        const top = specsRef.current.getBoundingClientRect().top + window.scrollY - 312;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto px-[128px]">
      <div className="mb-[16px] relative">
        <div
          style={{
            opacity: isSticky ? 0 : 1,
            transform: isSticky ? "translateY(-8px)" : "translateY(0)",
            transition: "opacity 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: isSticky ? "none" : "auto",
            position: isSticky ? "absolute" : "relative",
            width: "100%",
          }}
        >
          <div className="flex items-center justify-end mb-[16px]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDifferences(!showDifferences)}
                className={`relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer rounded-full transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  showDifferences ? "bg-zinc-900" : "bg-zinc-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] mt-[2px] ${
                    showDifferences ? "translate-x-[20px]" : "translate-x-[2px]"
                  }`}
                />
              </button>
              <span
                className="text-[14px] font-semibold text-zinc-900"
                style={{ fontFamily: "var(--font-samsung-one)" }}
              >
                Apply Key Differences
              </span>
            </div>
          </div>

          <Tabs
            aria-label="Specification categories"
            variant="solid"
            radius="full"
            fullWidth
            selectedKey={activeTab}
            onSelectionChange={(key) => handleTabChange(String(key))}
            classNames={{
              base: "w-full",
              tabList: "bg-zinc-100 p-1 w-full h-[48px]",
              tab: "h-[40px] text-[18px] text-zinc-900 font-normal flex-1",
              tabContent:
                "group-data-[selected=true]:font-bold group-data-[selected=true]:text-zinc-900 group-data-[selected=true]:text-[18px] transition-all duration-300",
              cursor: "bg-white shadow-sm",
            }}
            style={{ fontFamily: "var(--font-samsung-one)" }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.key} title={tab.title} />
            ))}
          </Tabs>
        </div>

      </div>

      <div ref={specsRef} className="scroll-mt-[312px] flex flex-col">
        {isSticky && (
          <div className="sticky top-[96px] z-20 bg-white border-b border-zinc-300 py-[12px]">
            <div className="flex gap-[91px] items-center">
              {productNames.map((name) => (
                <div key={name} className="flex-1">
                  <p
                    className="text-[18px] font-bold text-zinc-900 truncate"
                    style={{ fontFamily: "var(--font-sharp-sans)" }}
                  >
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {isSticky && <div className="h-[24px]" />}
        {currentSpecs.map((spec, index) => {
          const isDifferent = spec.values.some((v) => v !== spec.values[0]);
          const shouldHighlight = showDifferences && isDifferent;

          return (
            <div
              key={`${displayTab}-${index}`}
              className={`py-[24px] transition-colors duration-300 ${
                shouldHighlight ? "bg-[#F4F4F4] -mx-6 px-6 rounded-xl" : ""
              }`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
                filter: isVisible ? "blur(0px)" : "blur(4px)",
                transition: `opacity 450ms cubic-bezier(0.16, 1, 0.3, 1) ${
                  index * 60
                }ms, transform 450ms cubic-bezier(0.16, 1, 0.3, 1) ${
                  index * 60
                }ms, filter 450ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
              }}
            >
              <h3
                className="text-[14px] uppercase tracking-wider font-bold text-zinc-500 mb-4"
                style={{ fontFamily: "var(--font-samsung-one)" }}
              >
                {spec.label}
              </h3>
              <div className="flex gap-[91px]">
                {spec.values.map((value, i) => {
                  const winner = winnerTags[`${displayTab}|${spec.label}`];
                  const isWinner = winner && winner.index === i;

                  return (
                    <div key={i} className="flex-1 relative">
                      {i > 0 && (
                        <div className="absolute left-[-46px] top-1/2 -translate-y-1/2 w-px h-[24px] bg-[#DDDDDD]" />
                      )}
                      <p
                        className={`text-[16px] font-bold leading-relaxed ${
                          shouldHighlight ? "text-zinc-900" : "text-zinc-800"
                        }`}
                        style={{ fontFamily: "var(--font-samsung-one)" }}
                      >
                        {value}
                        {isWinner && (
                          <span
                            className={`ml-3 text-[16px] font-semibold ${accentColors[i]}`}
                            style={{ fontFamily: "var(--font-samsung-one)" }}
                          >
                            <span className="inline-block w-[5px] h-[5px] rounded-full bg-current mr-1.5 relative top-[-1px]" />
                            {winner.label}
                          </span>
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
