"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import ProductSelect from "./ProductSelect";
import SpecificationTabs from "./SpecificationTabs";
import SpecTable from "./SpecTable";
import DifferencesToggle from "./DifferencesToggle";
import { products, type TabKey } from "../data/specs";

const COLUMN_GRID = "grid grid-cols-3 gap-[24px] md:gap-[48px]";

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<number[]>(
    products.map((p) => p.id),
  );
  const [activeTab, setActiveTab] = useState<TabKey>("key-specs");
  const [displayTab, setDisplayTab] = useState<TabKey>("key-specs");
  const [tableVisible, setTableVisible] = useState(true);
  const tabTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showDifferences, setShowDifferences] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  const selectedProducts = selectedIds.map(
    (id) => products.find((p) => p.id === id)!,
  );

  // Swap columns when a product already on screen is chosen for another slot.
  const handleSelect = useCallback((slot: number, productId: number) => {
    setSelectedIds((current) => {
      if (current[slot] === productId) return current;
      const next = [...current];
      const existingSlot = next.indexOf(productId);
      if (existingSlot !== -1) next[existingSlot] = current[slot];
      next[slot] = productId;
      return next;
    });
  }, []);

  // Fade the current rows out, swap the tab, then stagger the new rows in.
  const handleTabChange = useCallback((key: TabKey) => {
    setActiveTab(key);
    setTableVisible(false);
    if (tabTimer.current) clearTimeout(tabTimer.current);
    tabTimer.current = setTimeout(() => {
      setDisplayTab(key);
      setTableVisible(true);
    }, 220);
  }, []);

  useEffect(
    () => () => {
      if (tabTimer.current) clearTimeout(tabTimer.current);
    },
    [],
  );

  // Show a compact product bar once the cards have scrolled out of view.
  useEffect(() => {
    const target = cardsRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setShowStickyBar(
          !entry.isIntersecting && entry.boundingClientRect.top < 0,
        ),
      // Fire once the Buy row is within 120px of the top, so short pages still get the header.
      { threshold: 0, rootMargin: "-120px 0px 0px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Sticky header once the cards scroll off: tabs + toggle, then product names over their columns */}
      <div
        aria-hidden={!showStickyBar}
        className={`fixed inset-x-0 top-0 z-50 hidden border-b border-zinc-200 bg-white/95 backdrop-blur transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:block ${
          showStickyBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 pt-[12px] sm:px-8 lg:px-[80px]">
          <div className="flex items-center gap-[24px]">
            <div className="min-w-0 flex-1">
              <SpecificationTabs
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
            <DifferencesToggle
              checked={showDifferences}
              onChange={() => setShowDifferences((s) => !s)}
              tabIndex={showStickyBar ? 0 : -1}
            />
          </div>
          <div className={`${COLUMN_GRID} py-[14px]`}>
            {selectedProducts.map((product) => (
              <p
                key={product.id}
                className="font-sharp-sans truncate text-[16px] font-bold"
              >
                {product.title}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 pb-[80px] pt-[48px] sm:px-8 lg:px-[80px] lg:pt-[80px]">
        <h1 className="font-sharp-sans text-center text-[26px] font-bold leading-[1.25] text-[#010101] sm:text-[32px]">
          Find what product is best for you
        </h1>

        {/* Below md the three columns keep a readable width and scroll horizontally together. */}
        <div className="-mx-4 overflow-x-auto px-4 sm:-mx-8 sm:px-8 md:mx-0 md:overflow-visible md:px-0 [scrollbar-width:thin]">
          <div className="min-w-[840px] md:min-w-0">
            {/* Product selectors + cards */}
            <section
              aria-label="Products being compared"
              className="mt-[40px] sm:mt-[48px]"
            >
              <div className={COLUMN_GRID}>
                {selectedProducts.map((product, slot) => (
                  <ProductSelect
                    key={slot}
                    slot={slot}
                    selected={product}
                    onSelect={(id) => handleSelect(slot, id)}
                  />
                ))}
              </div>

              <div ref={cardsRef} className={`${COLUMN_GRID} mt-[32px]`}>
                {selectedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Specification controls */}
            <section aria-label="Specifications" className="mt-[64px]">
              <div
                className="transition-opacity duration-300"
                style={{
                  opacity: showStickyBar ? 0 : 1,
                  pointerEvents: showStickyBar ? "none" : "auto",
                }}
                aria-hidden={showStickyBar}
              >
                <div className="flex justify-end">
                  <DifferencesToggle
                    checked={showDifferences}
                    onChange={() => setShowDifferences((s) => !s)}
                  />
                </div>

                <div className="mt-[16px]">
                  <SpecificationTabs
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                  />
                </div>
              </div>

              <div className="mt-[32px]">
                <SpecTable
                  displayTab={displayTab}
                  visible={tableVisible}
                  selectedProducts={selectedProducts}
                  showDifferences={showDifferences}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
