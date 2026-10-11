"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "../data/specs";

export const MAX_COMPARE = 3;

interface CompareTrayProps {
  products: Product[];
  onRemove: (id: Product["id"]) => void;
  onClear: () => void;
}

/**
 * Collects products ticked in answers and hands them to the compare page
 * (`/?compare=3,1`), which puts them in the first columns in this order.
 */
export default function CompareTray({
  products,
  onRemove,
  onClear,
}: CompareTrayProps) {
  if (products.length === 0) return null;

  const ready = products.length >= 2;
  const href = `/?compare=${products.map((p) => p.id).join(",")}`;

  return (
    <section
      aria-label="Compare tray"
      className="font-samsung-one flex flex-wrap items-center gap-x-[16px] gap-y-[12px] rounded-[8px] border border-ss-divider bg-white px-[16px] py-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="flex min-w-0 basis-full items-center gap-[16px] sm:basis-auto sm:flex-1">
        <ul
          className="flex shrink-0 gap-[8px]"
          aria-label="Products to compare"
        >
          {products.map((product) => (
            <li key={product.id} className="relative">
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[8px] bg-ss-bg-gray">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={32}
                  height={40}
                  className="h-[40px] w-auto object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => onRemove(product.id)}
                aria-label={`Remove ${product.title} from compare`}
                className="absolute -right-[6px] -top-[6px] flex h-[20px] w-[20px] items-center justify-center rounded-full border border-ss-divider bg-white text-black hover:border-black focus-visible:outline-2 focus-visible:outline-black"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="h-[8px] w-[8px]"
                >
                  <path
                    d="M2 2l8 8M10 2l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <p
          className="min-w-0 flex-1 text-[14px] leading-[20px] text-black"
          aria-live="polite"
        >
          <span className="font-bold">
            {products.length} of {MAX_COMPARE} selected
          </span>
          <span className="block text-ss-gray-text">
            {ready
              ? "Ready to compare side by side"
              : "Pick one more to compare"}
          </span>
        </p>
      </div>

      <div className="ml-auto flex items-center gap-[16px]">
        <button
          type="button"
          onClick={onClear}
          className="text-[14px] text-black underline underline-offset-2 hover:text-ss-gray-text"
        >
          Clear
        </button>
        {ready ? (
          <Link
            href={href}
            className="inline-flex h-[39px] items-center justify-center rounded-[20px] bg-black px-[24px] text-[14px] font-bold text-white transition-colors hover:bg-ss-gray-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Compare
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex h-[39px] cursor-not-allowed items-center justify-center rounded-[20px] bg-ss-divider px-[24px] text-[14px] font-bold text-ss-disabled"
          >
            Compare
          </span>
        )}
      </div>
    </section>
  );
}
