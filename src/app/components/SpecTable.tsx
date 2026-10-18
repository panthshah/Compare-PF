"use client";

import {
  hasDifference,
  insights,
  tabs,
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
  const insight = insights[displayTab];
  const tabTitle = tabs.find((t) => t.key === displayTab)?.title ?? "";
  const fade = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(12px)",
    transition:
      "opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)",
  } as const;

  return (
    <div
      className="flex flex-col divide-y divide-zinc-200 border-t border-zinc-200"
      aria-live="polite"
    >
      {/* Bottom line: shown with Apply Key Differences, resolves the tab's differences into a pick */}
      {showDifferences && (
        <div className="py-[16px]" style={fade}>
          <div className="font-samsung-one flex items-start gap-[12px] rounded-[12px] border border-[#DBE4EE] bg-[#F3F6FA] px-[16px] py-[14px] text-[15px] leading-[22px] text-[#2B4A6F]">
            <Sparkle className="mt-[3px] h-[16px] w-[16px] shrink-0" />
            <p>
              <span className="font-bold">Bottom line.</span>{" "}
              {insight.bottomLine}
            </p>
          </div>
        </div>
      )}

      {/* AI takeaway: first row of every tab, same grid, lighter type, never faded or badged */}
      <section aria-label="AI takeaway" className="py-[24px]" style={fade}>
        <h3 className="font-samsung-one inline-flex items-center gap-[6px] text-[14px] font-semibold uppercase leading-[18px] tracking-[0.06em] text-[#2B4A6F]">
          <Sparkle className="h-[12px] w-[12px]" />
          AI takeaway
        </h3>
        <div className="mt-[12px] grid grid-cols-3 gap-[24px] md:gap-[48px]">
          {selectedProducts.map((p) => (
            <p
              key={p.id}
              className="font-samsung-one text-[15px] leading-[22px] text-zinc-900"
            >
              {insight.takeaways[p.id - 1]}
            </p>
          ))}
        </div>
        <p className="font-samsung-one mt-[12px] text-[12px] text-zinc-400">
          Generated from the {tabTitle.toLowerCase()} rows below and verified
          owner reviews.
        </p>
      </section>

      {rows.map((row, index) => {
        const cells = selectedProducts.map((p) => row.values[p.id - 1]);
        const differs = hasDifference(cells);
        const highlight = showDifferences && differs;
        const muted = showDifferences && !differs;
        // Badge the winning value only when the toggle is on and nothing ties it.
        const winner = row.best;
        const winnerCell = winner ? row.values[winner.product - 1] : undefined;
        const winnerTied =
          !!winner &&
          !!winnerCell &&
          cells.some(
            (c, i) =>
              selectedProducts[i].id !== winner.product &&
              c.value === winnerCell.value &&
              (c.note ?? "") === (winnerCell.note ?? ""),
          );
        const badgeProductId =
          highlight && winner && !winnerTied ? winner.product : null;

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
                  {winner && badgeProductId === selectedProducts[i].id && (
                    <span
                      className="font-samsung-one mt-[8px] inline-flex w-fit items-center gap-[6px] rounded-full bg-[#E6F4EA] px-[10px] py-[4px] text-[12px] font-semibold leading-[16px] text-[#1E6B3A]"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible
                          ? "translateY(0)"
                          : "translateY(4px)",
                        transition:
                          "opacity 400ms cubic-bezier(0.16,1,0.3,1) 120ms, transform 400ms cubic-bezier(0.16,1,0.3,1) 120ms",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="h-[10px] w-[10px]"
                      >
                        <path
                          d="M2 6.5l2.5 2.5L10 3.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {winner.label}
                    </span>
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

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M10 1l1.8 5.2L17 8l-5.2 1.8L10 15l-1.8-5.2L3 8l5.2-1.8L10 1zM16 13l.9 2.1L19 16l-2.1.9L16 19l-.9-2.1L13 16l2.1-.9L16 13z" />
    </svg>
  );
}
