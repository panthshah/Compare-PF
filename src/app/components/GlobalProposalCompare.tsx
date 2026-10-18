"use client";

import { useState } from "react";
import Image from "next/image";
import FeatureIcon from "./FeatureIcon";
import { formatPrice } from "../data/specs";
import {
  capacityChip,
  featureRows,
  proposalProducts,
  ratings,
  summaries,
} from "../data/proposal";

const GRID = "grid grid-cols-3 gap-[24px] md:gap-[40px]";

function Stars({ value }: { value: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center gap-[2px] text-[#1A1A1A]"
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-[11px] w-[11px]"
          fill={i <= Math.round(value) ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M10 2.5l2.3 4.8 5.2.7-3.8 3.7.9 5.2L10 14.4l-4.6 2.5.9-5.2L2.5 8l5.2-.7L10 2.5z" />
        </svg>
      ))}
    </span>
  );
}

export default function GlobalProposalCompare() {
  const [differencesOnly, setDifferencesOnly] = useState(false);

  const rows = differencesOnly
    ? featureRows.filter((r) => new Set(r.values.map((v) => v ?? "")).size > 1)
    : featureRows;

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-[1120px] px-4 pb-[80px] pt-[32px] sm:px-8">
        {/* Differences only toggle, top-left as in the proposal */}
        <label className="inline-flex cursor-pointer select-none items-center gap-[8px]">
          <button
            type="button"
            role="switch"
            aria-checked={differencesOnly}
            aria-label="Differences only"
            onClick={() => setDifferencesOnly((s) => !s)}
            className={`relative inline-flex h-[18px] w-[32px] shrink-0 rounded-full transition-colors duration-300 ${
              differencesOnly ? "bg-zinc-900" : "bg-zinc-300"
            }`}
          >
            <span
              className={`pointer-events-none mt-[2px] inline-block h-[14px] w-[14px] rounded-full bg-white shadow-sm transition-transform duration-300 ${
                differencesOnly ? "translate-x-[16px]" : "translate-x-[2px]"
              }`}
            />
          </button>
          <span className="font-samsung-one text-[12px] text-zinc-700">
            Differences only
          </span>
        </label>

        {/* Product columns */}
        <section aria-label="Products" className={`${GRID} mt-[32px]`}>
          {proposalProducts.map((product) => {
            const rating = ratings[product.id];
            const savings = product.wasPrice - product.price;
            return (
              <article
                key={product.id}
                className="flex flex-col items-center text-center"
              >
                <p className="font-samsung-one text-[10px] uppercase tracking-[0.08em] text-zinc-400">
                  Refrigerator
                </p>
                <h2 className="font-sharp-sans mt-[6px] min-h-[48px] text-[16px] font-bold leading-[22px] text-zinc-900">
                  {product.title}
                </h2>
                <div className="font-samsung-one mt-[6px] flex items-center gap-[6px] text-[11px] text-zinc-700">
                  <Stars value={rating.stars} />
                  <span className="font-semibold">
                    {rating.stars.toFixed(1)}
                  </span>
                  <span className="text-zinc-500">
                    ({rating.count.toLocaleString("en-US")})
                  </span>
                </div>

                <div className="mt-[20px] flex h-[220px] w-full items-center justify-center bg-[#F7F7F7]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={180}
                    height={220}
                    className="h-[190px] w-auto object-contain"
                  />
                </div>

                {/* Color + capacity chip */}
                <p className="font-samsung-one mt-[16px] text-[10px] text-zinc-500">
                  {product.colors[0].name}
                </p>
                <div className="mt-[8px] flex items-center gap-[8px]">
                  {product.colors.slice(0, 2).map((c, i) => (
                    <span
                      key={c.name}
                      className={`inline-block h-[14px] w-[14px] rounded-full border ${i === 0 ? "ring-1 ring-zinc-900 ring-offset-2" : ""}`}
                      style={{
                        backgroundColor: c.hex,
                        borderColor: "rgba(0,0,0,0.12)",
                      }}
                    />
                  ))}
                </div>
                <span className="font-samsung-one mt-[12px] inline-flex items-center rounded-[4px] border border-zinc-900 px-[10px] py-[3px] text-[11px] font-semibold">
                  {capacityChip[product.id]}
                </span>

                {/* Info sheet + energy label */}
                <div className="font-samsung-one mt-[12px] flex items-center gap-[8px] text-[10px]">
                  <a
                    href={product.learnMoreHref}
                    className="text-zinc-700 underline underline-offset-2"
                  >
                    Product information sheet
                  </a>
                  <span className="inline-flex items-center rounded-[2px] bg-[#1E8A3A] px-[5px] py-[1px] text-[9px] font-bold leading-[12px] text-white">
                    ENERGY STAR
                  </span>
                </div>

                {/* Price */}
                <div className="font-samsung-one mt-[12px] flex items-baseline gap-[6px]">
                  <span className="text-[15px] font-bold">
                    {formatPrice(product.price)}
                  </span>
                  {savings > 0 && (
                    <span className="text-[11px] font-semibold text-[#1E8A3A]">
                      Save {formatPrice(savings)}
                    </span>
                  )}
                </div>

                <a
                  href={product.buyHref}
                  className="font-samsung-one mt-[12px] inline-flex h-[32px] items-center rounded-full bg-zinc-900 px-[18px] text-[12px] font-bold text-white hover:bg-zinc-700"
                >
                  Add to basket
                </a>
                <a
                  href={product.learnMoreHref}
                  className="font-samsung-one mt-[10px] text-[11px] font-semibold text-zinc-900 underline underline-offset-4"
                >
                  Learn more
                </a>
              </article>
            );
          })}
        </section>

        {/* Summary */}
        <section aria-label="Summary" className="mt-[56px]">
          <h3 className="font-sharp-sans border-b border-zinc-200 pb-[16px] text-[18px] font-bold">
            Summary
          </h3>
          <div className={`${GRID} mt-[24px]`}>
            {proposalProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-[8px] bg-[#EEF4FD] p-[16px]"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="h-[14px] w-[14px] text-[#2B6CB0]"
                  fill="currentColor"
                >
                  <path d="M10 1l1.8 5.2L17 8l-5.2 1.8L10 15l-1.8-5.2L3 8l5.2-1.8L10 1zM16 13l.9 2.1L19 16l-2.1.9L16 19l-.9-2.1L13 16l2.1-.9L16 13z" />
                </svg>
                <p className="font-samsung-one mt-[10px] text-[12px] leading-[18px] text-[#2B6CB0]">
                  {summaries[product.id]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Key features */}
        <section aria-label="Key features" className="mt-[48px]">
          <h3 className="font-sharp-sans border-b border-zinc-200 pb-[16px] text-[18px] font-bold">
            Key features
          </h3>
          <div className="mt-[8px] flex flex-col">
            {rows.map((row) => (
              <div
                key={row.label}
                className={`${GRID} border-b border-zinc-100 py-[20px]`}
              >
                {row.values.map((value, i) => (
                  <div
                    key={proposalProducts[i].id}
                    className="flex flex-col items-center text-center"
                  >
                    <FeatureIcon
                      name={row.icon}
                      className="h-[26px] w-[26px] text-zinc-800"
                    />
                    <p className="font-samsung-one mt-[8px] text-[10px] text-zinc-500">
                      {row.label}
                    </p>
                    <p
                      className={`font-samsung-one mt-[4px] text-[13px] leading-[18px] ${value ? "font-bold text-zinc-900" : "text-zinc-400"}`}
                    >
                      {value ?? "—"}
                    </p>
                  </div>
                ))}
              </div>
            ))}
            {rows.length === 0 && (
              <p className="font-samsung-one py-[24px] text-center text-[13px] text-zinc-500">
                These products share every key feature.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
