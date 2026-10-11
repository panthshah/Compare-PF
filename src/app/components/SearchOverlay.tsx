"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { SparkleIcon } from "./SearchComposer";
import { matchProducts, suggestedPrompts } from "../data/searchAnswers";
import { formatPrice, products } from "../data/specs";

interface SearchOverlayProps {
  onClose: () => void;
  onSubmit: (query: string) => void;
  recentSearches: string[];
  onRemoveRecent: (query: string) => void;
}

/**
 * The header search, reworked from samsung.com's top overlay. One field takes
 * both keywords and questions. Empty, it offers recent searches, questions to
 * ask and recommended products; once typing, the first option is always to
 * ask Samsung AI, with matching products beside it.
 */
export default function SearchOverlay({
  onClose,
  onSubmit,
  recentSearches,
  onRemoveRecent,
}: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const trimmed = query.trim();
  const matches = matchProducts(trimmed);
  const shownProducts = trimmed ? matches : products;

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close search"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="font-samsung-one relative max-h-[100dvh] overflow-y-auto bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] animate-[answer-in_300ms_cubic-bezier(0.16,1,0.3,1)_both]"
      >
        <div className="mx-auto max-w-[1440px] px-4 pb-[40px] pt-[24px] sm:px-8 lg:px-[40px]">
          <form
            role="search"
            onSubmit={submit}
            className="flex items-center gap-[12px] border-b border-ss-divider pb-[16px] focus-within:border-ss-blue"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-[28px] w-[28px] shrink-0"
            >
              <circle
                cx="10.5"
                cy="10.5"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M15.5 15.5L21 21"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <label htmlFor="overlay-search" className="sr-only">
              Search or ask a question
            </label>
            <input
              ref={inputRef}
              id="overlay-search"
              type="text"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search or ask anything"
              className="h-[56px] min-w-0 flex-1 bg-transparent text-[24px] font-bold text-black outline-none placeholder:text-ss-disabled sm:text-[36px]"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full hover:bg-ss-fill focus-visible:outline-2 focus-visible:outline-black"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-[24px] w-[24px]"
              >
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </form>

          <div className="mt-[24px] grid gap-[32px] md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-[48px]">
            <div className="flex flex-col gap-[32px]">
              {trimmed ? (
                <section aria-label="Search options">
                  <button
                    type="button"
                    onClick={() => onSubmit(trimmed)}
                    className="flex w-full items-start gap-[12px] rounded-[8px] bg-ss-bg-gray p-[16px] text-left transition-colors hover:bg-ss-fill focus-visible:outline-2 focus-visible:outline-black"
                  >
                    <SparkleIcon className="mt-[2px] h-[20px] w-[20px] shrink-0 text-ss-blue-pressed" />
                    <span>
                      <span className="block text-[12px] font-bold uppercase tracking-[0.04em] text-ss-blue-pressed">
                        Ask Samsung AI
                      </span>
                      <span className="mt-[4px] block text-[16px] leading-[24px] text-black">
                        “{trimmed}”
                      </span>
                    </span>
                  </button>
                  <p className="mt-[12px] text-[12px] leading-[18px] text-ss-gray-text">
                    Press Enter to get an answer with matching products.
                  </p>
                </section>
              ) : (
                <>
                  {recentSearches.length > 0 && (
                    <section>
                      <h2 className={headingClass}>Recent searches</h2>
                      <ul className="mt-[12px] flex flex-wrap gap-[8px]">
                        {recentSearches.map((recent) => (
                          <li
                            key={recent}
                            className="flex h-[39px] items-center rounded-[20px] bg-ss-fill pl-[16px] pr-[8px] text-[14px]"
                          >
                            <button
                              type="button"
                              onClick={() => onSubmit(recent)}
                              className="hover:underline"
                            >
                              {recent}
                            </button>
                            <button
                              type="button"
                              onClick={() => onRemoveRecent(recent)}
                              aria-label={`Remove ${recent} from recent searches`}
                              className="ml-[4px] flex h-[24px] w-[24px] items-center justify-center rounded-full text-ss-gray-text hover:text-black"
                            >
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 12 12"
                                fill="none"
                                className="h-[10px] w-[10px]"
                              >
                                <path
                                  d="M2 2l8 8M10 2l-8 8"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                  <section>
                    <h2
                      className={`${headingClass} flex items-center gap-[6px]`}
                    >
                      <SparkleIcon className="h-[14px] w-[14px]" />
                      Ask Samsung AI
                    </h2>
                    <ul className="mt-[8px] flex flex-col">
                      {suggestedPrompts.map((prompt) => (
                        <li key={prompt}>
                          <button
                            type="button"
                            onClick={() => onSubmit(prompt)}
                            className="w-full border-b border-ss-divider py-[12px] text-left text-[16px] leading-[24px] text-black hover:text-ss-gray-text focus-visible:outline-2 focus-visible:outline-black"
                          >
                            {prompt}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                </>
              )}
            </div>

            <section>
              <h2 className={headingClass}>
                {trimmed ? "Products" : "Recommended"}
              </h2>
              {shownProducts.length === 0 ? (
                <p className="mt-[12px] text-[14px] text-ss-gray-text">
                  No product names match. Ask Samsung AI to search by what you
                  need instead.
                </p>
              ) : (
                <ul className="mt-[12px] grid grid-cols-2 gap-[16px] sm:grid-cols-3">
                  {shownProducts.map((product) => (
                    <li key={product.id}>
                      <a href={product.learnMoreHref} className="group block">
                        <div className="flex aspect-square items-center justify-center rounded-[8px] bg-ss-bg-gray p-[20px]">
                          <Image
                            src={product.image}
                            alt=""
                            width={140}
                            height={170}
                            className="h-full w-auto object-contain"
                          />
                        </div>
                        <p className="mt-[12px] truncate text-[16px] font-bold text-black group-hover:underline">
                          {product.title}
                        </p>
                        <p className="text-[16px] font-bold text-black">
                          {formatPrice(product.price)}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

const headingClass =
  "text-[14px] font-bold uppercase tracking-[0.04em] text-ss-gray-text";
