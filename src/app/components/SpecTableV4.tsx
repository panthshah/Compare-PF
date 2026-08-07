"use client";

import { useEffect, useRef, useState } from "react";
import { specData } from "../data/specs";
import SpecificationTabs from "./SpecificationTabs";

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
    const initTimer = setTimeout(() => setPhase("exit"), 0);
    const t = setTimeout(() => {
      setDisplayTab(activeTab);
      setPhase("enter");
    }, 200);
    return () => {
      clearTimeout(initTimer);
      clearTimeout(t);
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
        const top = specsRef.current.getBoundingClientRect().top + window.scrollY - 260;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto px-[128px]">
      <div className="sticky top-[56px] z-30 bg-white pt-[16px] pb-[48px]">
        <SpecificationTabs activeTab={activeTab} onTabChange={handleTabChange} />
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
