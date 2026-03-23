"use client";

import { useEffect, useRef, useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import { tabs, specData } from "../data/specs";

interface Props {
  activeTab: string;
  onTabChange: (key: string) => void;
}

function SpecRow({ label, values, index, isVisible }: {
  label: string;
  values: [string, string, string];
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className="py-[20px] border-b border-zinc-100"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 400ms cubic-bezier(0.16,1,0.3,1) ${index * 50}ms, transform 400ms cubic-bezier(0.16,1,0.3,1) ${index * 50}ms`,
      }}
    >
      <p
        className="text-[18px] font-bold text-zinc-900 mb-[16px]"
        style={{ fontFamily: "var(--font-samsung-one)" }}
      >
        {label}
      </p>
      <div className="flex gap-[91px]">
        {values.map((value, i) => (
          <div key={i} className="flex-1 rounded-[6px] bg-[#FAFAFA] p-[16px]">
            <p
              className="text-[16px] font-bold text-zinc-900"
              style={{ fontFamily: "var(--font-samsung-one)" }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SpecTableV4({ activeTab, onTabChange }: Props) {
  const [phase, setPhase] = useState<"enter" | "exit" | "idle">("idle");
  const [displayTab, setDisplayTab] = useState(activeTab);
  const specsRef = useRef<HTMLDivElement>(null);

  const currentSpecs = specData[displayTab] || [];

  useEffect(() => {
    if (activeTab === displayTab) return;
    setPhase("exit");
    const t = setTimeout(() => {
      setDisplayTab(activeTab);
      setPhase("enter");
    }, 200);
    return () => clearTimeout(t);
  }, [activeTab, displayTab]);

  useEffect(() => {
    if (phase === "enter") {
      const t = setTimeout(() => setPhase("idle"), 50);
      return () => clearTimeout(t);
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
    <div className="max-w-[1440px] mx-auto px-[128px]">
      <div className="sticky top-[56px] z-30 bg-white pt-[16px] pb-[48px]">
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
            tabContent: "group-data-[selected=true]:font-bold group-data-[selected=true]:text-zinc-900 group-data-[selected=true]:text-[18px] transition-all duration-300",
            cursor: "bg-white shadow-sm",
          }}
          style={{ fontFamily: "var(--font-samsung-one)" }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.key} title={tab.title} />
          ))}
        </Tabs>
      </div>

      <div ref={specsRef} className="scroll-mt-[260px]">
        {currentSpecs.map((spec, index) => (
          <SpecRow
            key={`${displayTab}-${index}`}
            label={spec.label}
            values={spec.values}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
}
