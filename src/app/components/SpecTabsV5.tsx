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

interface SpecTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
  isSticky: boolean;
  showDifferences: boolean;
  setShowDifferences: (show: boolean) => void;
}

export default function SpecTabsV5({ activeTab, onTabChange, isSticky, showDifferences, setShowDifferences }: SpecTabsProps) {
  const [phase, setPhase] = useState<"enter" | "exit" | "idle">("idle");
  const [displayTab, setDisplayTab] = useState(activeTab);
  const specsRef = useRef<HTMLDivElement>(null);

  const currentSpecs = specData[displayTab] || [];

  useEffect(() => {
    if (activeTab === displayTab) return;

    // Wrap in setTimeout to avoid React warning about synchronous state updates in effects
    const initTimer = setTimeout(() => {
      setPhase("exit");
    }, 0);

    const exitTimer = setTimeout(() => {
      setDisplayTab(activeTab);
      setPhase("enter");
    }, 250);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(exitTimer);
    };
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
        const top = specsRef.current.getBoundingClientRect().top + window.scrollY - 260;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  return (
      <div className="max-w-[1600px] mx-auto px-[128px]">
        <div className={`sticky z-30 bg-white pb-[32px] ${isSticky ? "top-[56px]" : "top-0"}`}>
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
              tabList: "bg-zinc-100 p-1 w-full",
              tab: "h-[48px] text-[18px] text-zinc-900 font-normal flex-1",
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

        <div ref={specsRef} className="scroll-mt-[260px] flex flex-col">
        {currentSpecs.map((spec, index) => {
          const isDifferent = spec.values.some((v) => v !== spec.values[0]);
          const shouldHighlight = showDifferences && isDifferent;

          return (
            <div
              key={`${displayTab}-${index}`}
              className={`py-[16px] border-b border-zinc-200 transition-colors duration-300 ${
                shouldHighlight ? "bg-[#F4F4F4] rounded-xl" : ""
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
              {/* THE V5 MAGIC: 4-Column Grid (Label + 3 Values) */}
              <div className="flex gap-[32px] items-center min-h-[44px]">
                
                {/* Column 1: The Anchor Label */}
                <div className="w-[200px] shrink-0 pr-[32px] h-full flex items-center">
                  <h3
                    className="text-[15px] font-bold text-zinc-900 leading-snug"
                    style={{ fontFamily: "var(--font-samsung-one)" }}
                  >
                    {spec.label}
                  </h3>
                </div>

                {/* Columns 2, 3, 4: The Values */}
                <div className="flex-1">
                  <div className="flex gap-[91px]">
                    {spec.values.map((value, i) => (
                      <div key={i} className="flex-1 flex items-center">
                        <p
                          className={`text-[16px] leading-relaxed ${
                            shouldHighlight ? "font-bold text-zinc-900" : "font-medium text-zinc-800"
                          }`}
                          style={{ fontFamily: "var(--font-samsung-one)" }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
