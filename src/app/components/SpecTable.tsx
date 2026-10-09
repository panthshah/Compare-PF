"use client";

import {
  hasDifference,
  specData,
  type Product,
  type TabKey,
} from "../data/specs";

interface SpecTableProps {
  /** The tab whose rows are rendered (lags `activeTab` during the cross-fade). */
  displayTab: TabKey;
  /** False while the previous rows fade out before the next tab's rows enter. */
  visible: boolean;
  selectedProducts: Product[];
  showDifferences: boolean;
}

/**
 * Spec groups: a label on its own line, then one cell per compared product.
 * Columns share the same grid as the product cards above so values line up
 * under the product they belong to.
 */
export default function SpecTable({
  displayTab,
  visible,
  selectedProducts,
  showDifferences,
}: SpecTableProps) {
  const rows = specData[displayTab] ?? [];

  return (
    <div
      className="flex flex-col divide-y divide-zinc-200 border-t border-zinc-200"
      aria-live="polite"
    >
      {rows.map((row, index) => {
        const cells = selectedProducts.map((p) => row.values[p.id - 1]);
        const differs = hasDifference(cells);
        const highlight = showDifferences && differs;
        const muted = showDifferences && !differs;

        return (
          <section
            key={`${displayTab}-${row.label}`}
            aria-label={row.label}
            className="relative py-[24px] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: visible ? (muted ? 0.4 : 1) : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transitionDelay: visible ? `${index * 50}ms` : "0ms",
            }}
          >
            {highlight && (
              <span
                aria-hidden="true"
                className="absolute bottom-[24px] left-[-16px] top-[24px] w-[3px] rounded-full bg-zinc-900"
              />
            )}
            <h3 className="font-samsung-one text-[14px] font-semibold uppercase tracking-[0.06em] leading-[18px] text-[#757575]">
              {row.label}
            </h3>
            <div className="mt-[12px] grid grid-cols-3 gap-[24px] md:gap-[48px]">
              {cells.map((cell, i) => (
                <div
                  key={selectedProducts[i].id}
                  className="font-samsung-one flex flex-col"
                >
                  <p
                    className={`text-[16px] leading-[24px] text-black ${highlight ? "font-bold" : "font-semibold"}`}
                  >
                    {cell.value}
                  </p>
                  {cell.note && (
                    <p className="text-[14px] leading-[20px] text-zinc-600">
                      {cell.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
