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
      <Tabs.ListContainer className="w-full overflow-x-auto rounded-[32px] bg-[#F6F6F6] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Tabs.List
          aria-label="Specification categories"
          className="flex h-[56px] w-max min-w-full items-center gap-[8px] rounded-[32px] bg-[#F6F6F6] px-[8px] py-[6px]"
        >
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.key}
              id={tab.key}
              className="relative isolate flex h-[44px] w-auto flex-1 cursor-pointer items-center justify-center rounded-[24px] px-[12px] py-[10px] text-[16px] font-medium leading-[24px] whitespace-nowrap text-zinc-700 outline-none transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 aria-selected:font-bold aria-selected:text-zinc-900 sm:text-[18px]"
            >
              <span className="relative z-10">{tab.title}</span>
              <Tabs.Indicator className="absolute inset-0 -z-10 rounded-[24px] bg-white" />
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
