"use client";

import Image from "next/image";
import { formatPrice, type Product } from "../data/specs";

interface SearchResultCardProps {
  /** Unique per answer, so the same product in two answers gets two ids. */
  turnId: string;
  product: Product;
  reason: string;
  selected: boolean;
  /** True when the compare tray is full and this card isn't in it. */
  compareDisabled: boolean;
  onToggleCompare: () => void;
}

/**
 * A compact product result inside an answer. Anatomy follows the design.md
 * Quick View sheet (tag, 2-line title, price, Action 1 + Action 2) on a
 * Spec gray row (#F7F7F7, r8), with a 20×20 design.md checkbox for compare.
 */
export default function SearchResultCard({
  turnId,
  product,
  reason,
  selected,
  compareDisabled,
  onToggleCompare,
}: SearchResultCardProps) {
  const savings = product.wasPrice - product.price;
  const checkboxId = `compare-${turnId}-${product.id}`;

  return (
    <article
      aria-label={product.title}
      className="font-samsung-one flex h-full w-[264px] shrink-0 snap-start flex-col rounded-[8px] bg-ss-bg-gray p-[20px] md:w-auto"
    >
      <label
        htmlFor={checkboxId}
        className={`flex w-fit select-none items-center gap-[8px] text-[14px] ${
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
        Compare
      </label>

      <div className="mt-[12px] flex h-[180px] items-center justify-center">
        <Image
          src={product.image}
          alt=""
          width={150}
          height={180}
          className="h-full w-auto object-contain"
        />
      </div>

      <p className="mt-[16px] text-[12px] font-bold leading-[16px] text-ss-blue-pressed">
        {product.badge}
      </p>
      <h3 className="font-sharp-sans mt-[4px] line-clamp-2 text-[18px] font-bold leading-[24px] text-black">
        {product.title}
      </h3>
      <p className="mt-[8px] flex gap-[6px] text-[14px] leading-[20px] text-ss-gray-text">
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          fill="none"
          className="mt-[4px] h-[12px] w-[12px] shrink-0"
        >
          <path
            d="M2 6.5l2.5 2.5L10 3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {reason}
      </p>

      <div className="mt-[16px]">
        <p className="flex flex-wrap items-baseline gap-x-[8px]">
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
      </div>

      {/* Popup CTA pair: Action 1 outlined, Action 2 filled on the right. */}
      <div className="mt-auto grid grid-cols-2 gap-[8px] pt-[20px]">
        <a
          href={product.learnMoreHref}
          className="inline-flex h-[39px] items-center justify-center rounded-[20px] border border-black bg-white px-[12px] text-[14px] font-bold text-black transition-colors hover:border-ss-gray-text hover:text-ss-gray-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Learn more
        </a>
        <a
          href={product.buyHref}
          className="inline-flex h-[39px] items-center justify-center rounded-[20px] bg-black px-[12px] text-[14px] font-bold text-white transition-colors hover:bg-ss-gray-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Buy now
        </a>
      </div>
    </article>
  );
}
