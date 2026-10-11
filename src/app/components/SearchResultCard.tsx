"use client";

import Image from "next/image";
import { useState } from "react";
import { specLine } from "../data/searchAnswers";
import { formatPrice, type Product } from "../data/specs";

interface SearchResultCardProps {
  product: Product;
  /** Why the AI picked this product; omitted for products it didn't pick. */
  reason?: string;
  selected: boolean;
  /** True when the compare tray is full and this card isn't in it. */
  compareDisabled: boolean;
  onToggleCompare: () => void;
}

/**
 * A product in the results grid. Keeps the samsung.com search result anatomy
 * (gray image tile, title, spec line, color chips, price, full-width Buy now
 * over Learn more) and adds the AI's reason as a blue tag on the tile and a
 * design.md 20×20 checkbox for compare.
 */
export default function SearchResultCard({
  product,
  reason,
  selected,
  compareDisabled,
  onToggleCompare,
}: SearchResultCardProps) {
  const [colorIndex, setColorIndex] = useState(0);
  const savings = product.wasPrice - product.price;
  const checkboxId = `compare-${product.id}`;

  return (
    <article
      aria-label={product.title}
      className="font-samsung-one flex h-full flex-col"
    >
      <div className="relative aspect-[5/4] rounded-[8px] bg-ss-bg-gray">
        <div className="absolute inset-[32px]">
          <Image
            src={product.image}
            alt=""
            width={200}
            height={240}
            className="h-full w-full object-contain"
          />
        </div>
        {reason && (
          <p className="absolute left-[12px] top-[12px] max-w-[calc(100%-24px)] rounded-[4px] bg-white px-[8px] py-[4px] text-[12px] font-bold leading-[16px] text-ss-blue-pressed">
            <span className="sr-only">Why it fits: </span>
            {reason}
          </p>
        )}
      </div>

      <h3 className="mt-[16px] line-clamp-2 text-[18px] font-bold leading-[24px] text-black">
        {product.title}
      </h3>
      <p className="mt-[4px] text-[14px] leading-[20px] text-ss-gray-text">
        {specLine(product)}
      </p>

      <p className="mt-[12px] text-[12px] leading-[16px] text-ss-gray-text">
        Color : {product.colors[colorIndex].name}
      </p>
      <div
        role="radiogroup"
        aria-label={`${product.title} color`}
        className="mt-[8px] flex gap-[8px]"
      >
        {product.colors.map((color, i) => (
          <button
            key={color.name}
            type="button"
            role="radio"
            aria-checked={i === colorIndex}
            aria-label={color.name}
            onClick={() => setColorIndex(i)}
            className={`flex h-[32px] w-[32px] items-center justify-center rounded-full border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
              i === colorIndex ? "border-black" : "border-transparent"
            }`}
          >
            <span
              className="h-[24px] w-[24px] rounded-full border border-black/15"
              style={{ backgroundColor: color.hex }}
            />
          </button>
        ))}
      </div>

      <p className="mt-[16px] flex flex-wrap items-baseline gap-x-[8px]">
        <span className="text-[20px] font-bold leading-[28px] text-black">
          {formatPrice(product.price)}
        </span>
        <span className="text-[14px] text-ss-disabled">
          <span className="sr-only">was </span>
          <s>{formatPrice(product.wasPrice)}</s>
        </span>
      </p>
      <p className="min-h-[20px] text-[14px] font-bold leading-[20px] text-black">
        {savings > 0 ? `Save ${formatPrice(savings)}` : ""}
      </p>

      <div className="mt-auto flex flex-col gap-[8px] pt-[16px]">
        <a
          href={product.buyHref}
          className="inline-flex h-[39px] items-center justify-center rounded-[20px] bg-black px-[12px] text-[14px] font-bold text-white transition-colors hover:bg-ss-gray-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Buy now
        </a>
        <a
          href={product.learnMoreHref}
          className="inline-flex h-[39px] items-center justify-center rounded-[20px] border border-black bg-white px-[12px] text-[14px] font-bold text-black transition-colors hover:border-ss-gray-text hover:text-ss-gray-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Learn more
        </a>
      </div>

      <label
        htmlFor={checkboxId}
        className={`mt-[16px] flex w-fit select-none items-center gap-[8px] text-[14px] ${
          compareDisabled
            ? "cursor-not-allowed text-ss-disabled"
            : "cursor-pointer text-black"
        }`}
      >
        <input
          id={checkboxId}
          type="checkbox"
          checked={selected}
          disabled={compareDisabled}
          onChange={onToggleCompare}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={`flex h-[20px] w-[20px] items-center justify-center rounded-[4px] border peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-black ${
            selected
              ? "border-black bg-black"
              : compareDisabled
                ? "border-black/20"
                : "border-ss-stroke bg-white"
          }`}
        >
          {selected && (
            <svg
              viewBox="0 0 12 12"
              fill="none"
              className="h-[12px] w-[12px] text-white"
            >
              <path
                d="M2 6.5l2.5 2.5L10 3.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        Add to compare
      </label>
    </article>
  );
}
