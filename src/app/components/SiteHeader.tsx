"use client";

import Link from "next/link";
import { SparkleIcon } from "./SearchComposer";

const NAV = [
  "Shop",
  "Mobile",
  "TV & AV",
  "Appliances",
  "Computing",
  "Wearables",
];

interface SiteHeaderProps {
  onOpenSearch: () => void;
}

/**
 * A stand-in for the samsung.com global header. The search trigger is a
 * labelled field rather than a bare icon so shoppers can see they can ask a
 * question, not only type a product name.
 */
export default function SiteHeader({ onOpenSearch }: SiteHeaderProps) {
  return (
    <header className="font-samsung-one sticky top-0 z-40 border-b border-ss-divider bg-white">
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center gap-[24px] px-4 sm:px-8 lg:px-[40px]">
        <Link
          href="/search"
          className="font-sharp-sans text-[20px] font-bold tracking-[0.12em] text-black"
        >
          SAMSUNG
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-[24px] text-[14px] font-bold">
            {NAV.map((item) => (
              <li key={item}>
                <span className="cursor-default">{item}</span>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-[16px]">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search or ask Samsung AI"
            className="flex h-[39px] items-center gap-[8px] rounded-[20px] border border-ss-divider px-[12px] text-[14px] text-ss-gray-text transition-colors hover:border-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:w-[260px] sm:px-[16px]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-[18px] w-[18px] shrink-0 text-black"
            >
              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M15.5 15.5L21 21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="hidden flex-1 text-left sm:inline">
              Search or ask anything
            </span>
            <SparkleIcon className="hidden h-[16px] w-[16px] text-ss-blue-pressed sm:block" />
          </button>
          <Link
            href="/"
            className="hidden text-[14px] font-bold text-black hover:underline md:inline"
          >
            Compare
          </Link>
        </div>
      </div>
    </header>
  );
}
