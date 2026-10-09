"use client";

import { Tabs } from "@heroui/react";
import { tabs, type TabKey } from "../data/specs";

interface SpecificationTabsProps {
  activeTab: TabKey;
  onTabChange: (key: TabKey) => void;
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
      onSelectionChange={(key) => onTabChange(String(key) as TabKey)}
      className={`font-samsung-one w-full ${className}`}
    >
      <Tabs.ListContainer className="w-full overflow-x-auto rounded-full bg-[#F4F4F4] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Tabs.List
          aria-label="Specification categories"
          className="flex h-[56px] w-max min-w-full items-center gap-1 rounded-full bg-[#F4F4F4] p-[4px]"
        >
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.key}
              id={tab.key}
              className="relative isolate flex h-[48px] w-auto flex-1 shrink-0 cursor-pointer items-center justify-center rounded-full px-[20px] text-[15px] font-medium whitespace-nowrap text-zinc-700 outline-none transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 aria-selected:font-bold aria-selected:text-zinc-900 sm:px-[24px] sm:text-[16px]"
            >
              <span className="relative z-10">{tab.title}</span>
              <Tabs.Indicator className="absolute inset-0 -z-10 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)]" />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>

      {tabs.map((tab) => (
        <Tabs.Panel key={tab.key} id={tab.key} className="sr-only">
          {tab.title} are displayed below.
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}
