"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import ProductSelect from "./ProductSelect";
import SpecificationTabs from "./SpecificationTabs";
import SpecTable from "./SpecTable";
import { formatPrice, products, type TabKey } from "../data/specs";

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
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Compact sticky bar: product names + Buy, aligned to the spec columns */}
      <div
        aria-hidden={!showStickyBar}
        className={`fixed inset-x-0 top-0 z-50 hidden border-b border-zinc-200 bg-white/95 backdrop-blur transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:block ${
          showStickyBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-4 py-[12px] sm:px-8 lg:px-[80px]">
          <div className={COLUMN_GRID}>
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="flex min-w-0 items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="font-sharp-sans truncate text-[16px] font-bold">
                    {product.title}
                  </p>
                  <p className="font-samsung-one text-[13px] text-zinc-600">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <a
                  href={product.buyHref}
                  tabIndex={showStickyBar ? 0 : -1}
                  className="font-samsung-one inline-flex h-[32px] shrink-0 items-center rounded-full bg-zinc-900 px-[18px] text-[13px] font-bold text-white transition-colors hover:bg-zinc-700"
                >
                  Buy
                </a>
              </div>
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
              <div className="flex justify-end">
                <label className="flex cursor-pointer select-none items-center gap-[12px]">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={showDifferences}
                    aria-label="Apply key differences"
                    onClick={() => setShowDifferences((s) => !s)}
                    className={`relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
                      showDifferences ? "bg-zinc-900" : "bg-zinc-300"
                    }`}
                  >
                    <span
                      className={`pointer-events-none mt-[2px] inline-block h-[20px] w-[20px] rounded-full bg-white shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        showDifferences
                          ? "translate-x-[22px]"
                          : "translate-x-[2px]"
                      }`}
                    />
                  </button>
                  <span className="font-samsung-one text-[15px] font-semibold text-zinc-900">
                    Apply Key Differences
                  </span>
                </label>
              </div>

              <div className="mt-[16px]">
                <SpecificationTabs
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />
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
