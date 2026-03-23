"use client";

import { useEffect, useRef, useState } from "react";
import { Tabs, Tab } from "@heroui/react";
import { tabs, specData, products } from "../data/specs";

interface SpecTabsV6Props {
  activeTab: string;
  onTabChange: (key: string) => void;
  showDifferences: boolean;
  setShowDifferences: (show: boolean) => void;
  isSticky: boolean;
}

export default function SpecTabsV6({ activeTab, onTabChange, showDifferences, setShowDifferences, isSticky }: SpecTabsV6Props) {
  const [phase, setPhase] = useState<"enter" | "exit" | "idle">("idle");
  const [displayTab, setDisplayTab] = useState(activeTab);
  const specsRef = useRef<HTMLDivElement>(null);

  const currentSpecs = specData[displayTab] || [];

  useEffect(() => {
    if (activeTab === displayTab) return;
    const initTimer = setTimeout(() => setPhase("exit"), 0);
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
      const t = setTimeout(() => setPhase("idle"), 50);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const isVisible = phase !== "exit" && phase !== "enter";

  const handleTabChange = (key: string) => {
    onTabChange(key);
    requestAnimationFrame(() => {
      if (specsRef.current) {
        const top = specsRef.current.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto px-[128px]">
      {/* Cross-fade: tabs fade out, product names fade in */}
      <div className="mb-[16px] relative">
        {/* Tabs — fade out on scroll */}
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

        {/* Product names — fade in on scroll */}
        <div
          style={{
            opacity: isSticky ? 1 : 0,
            transform: isSticky ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1) 80ms, transform 400ms cubic-bezier(0.16, 1, 0.3, 1) 80ms",
            pointerEvents: isSticky ? "auto" : "none",
            position: isSticky ? "relative" : "absolute",
            width: "100%",
          }}
        >
          <div className="flex gap-[32px] items-center py-[20px] border-b border-zinc-300">
            <div className="w-[200px] shrink-0 pr-[32px]">
              <span
                className="text-[11px] font-bold tracking-[0.1em] uppercase text-zinc-400"
                style={{ fontFamily: "var(--font-samsung-one)" }}
              >
                Specifications
              </span>
            </div>
            <div className="flex-1">
              <div className="flex gap-[91px]">
                {products.map((product) => (
                  <div key={product.id} className="flex-1">
                    <p
                      className="text-[18px] font-bold text-zinc-900"
                      style={{ fontFamily: "var(--font-sharp-sans)" }}
                    >
                      {product.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={specsRef} className="scroll-mt-[120px]">

        {/* Spec rows */}
        <div className="flex flex-col">
          {currentSpecs.map((spec, index) => {
            const isDifferent = spec.values.some((v) => v !== spec.values[0]);
            const shouldHighlight = showDifferences && isDifferent;

            return (
              <div
                key={`${displayTab}-${index}`}
                className={`py-[16px] transition-colors duration-300 ${
                  shouldHighlight ? "bg-[#F4F4F4] rounded-xl" : ""
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(16px)",
                  filter: isVisible ? "blur(0px)" : "blur(4px)",
                  transition: `opacity 450ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms, transform 450ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms, filter 450ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
                }}
              >
                <div className="flex gap-[32px] items-center min-h-[44px]">
                  <div className="w-[200px] shrink-0 pr-[32px] h-full flex items-center">
                    <h3
                      className="text-[16px] font-bold text-zinc-900 leading-snug"
                      style={{ fontFamily: "var(--font-samsung-one)" }}
                    >
                      {spec.label}
                    </h3>
                  </div>
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
    </div>
  );
}
