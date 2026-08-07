"use client";

import { Tabs } from "@heroui/react";
import { tabs } from "../data/specs";

interface SpecificationTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
  className?: string;
}

export default function SpecificationTabs({
  activeTab,
  onTabChange,
  className = "",
}: SpecificationTabsProps) {
  return (
    <Tabs
      selectedKey={activeTab}
      onSelectionChange={(key) => onTabChange(String(key))}
      className={`w-full ${className}`}
      style={{ fontFamily: "var(--font-samsung-one)" }}
    >
      <Tabs.ListContainer className="w-full">
        <Tabs.List
          aria-label="Specification categories"
          className="grid min-w-[760px] grid-cols-6 rounded-full bg-zinc-100 p-1"
        >
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.key}
              id={tab.key}
              className="relative isolate flex h-10 items-center justify-center rounded-full px-3 text-center text-[18px] font-normal text-zinc-900 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 aria-selected:font-bold"
            >
              <span className="relative z-10">{tab.title}</span>
              <Tabs.Indicator className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm" />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>

      {tabs.map((tab) => (
        <Tabs.Panel key={tab.key} id={tab.key} className="sr-only">
          {tab.title} specifications are displayed below.
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
