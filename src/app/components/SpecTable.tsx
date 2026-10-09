"use client";

import { hasDifference, specData, type Product, type TabKey } from "../data/specs";

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
export default function SpecTable({ displayTab, visible, selectedProducts, showDifferences }: SpecTableProps) {
  const rows = specData[displayTab] ?? [];

  return (
    <div className="flex flex-col gap-[48px]" aria-live="polite">
      {rows.map((row, index) => {
        const cells = selectedProducts.map((p) => row.values[p.id - 1]);
        const differs = hasDifference(cells);
        const highlight = showDifferences && differs;
        const muted = showDifferences && !differs;

        return (
          <section
            key={`${displayTab}-${row.label}`}
            aria-label={row.label}
            className={`rounded-[12px] transition-[opacity,transform,background-color,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              highlight ? "-mx-[16px] bg-[#F4F4F4] px-[16px] py-[16px]" : ""
            } ${muted ? "opacity-40" : ""}`}
            style={{
              opacity: visible ? (muted ? 0.4 : 1) : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transitionDelay: visible ? `${index * 50}ms` : "0ms",
            }}
          >
            <h3 className="font-samsung-one text-[20px] font-bold leading-[20px] text-[#757575]">
              {row.label}
            </h3>
            <div className="mt-[20px] grid grid-cols-3 gap-[24px] md:gap-[48px]">
              {cells.map((cell, i) => (
                <div key={selectedProducts[i].id} className="font-samsung-one flex flex-col">
                  <p className="text-[16px] font-bold leading-[24px] text-black">{cell.value}</p>
                  {cell.note && (
                    <p className="text-[16px] font-bold leading-[24px] text-black">{cell.note}</p>
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
