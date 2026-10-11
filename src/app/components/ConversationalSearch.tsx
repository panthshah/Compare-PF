"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AiOverview from "./AiOverview";
import CompareTray, { MAX_COMPARE } from "./CompareTray";
import PromptChips from "./PromptChips";
import SearchComposer, { SparkleIcon } from "./SearchComposer";
import SearchOverlay from "./SearchOverlay";
import SearchResultCard from "./SearchResultCard";
import SiteHeader from "./SiteHeader";
import {
  answerFor,
  productById,
  recentSearchesSeed,
  suggestedPrompts,
  type SearchAnswer,
} from "../data/searchAnswers";
import { products, type Product } from "../data/specs";

type Search = { id: string; query: string; answer: SearchAnswer | null };

/** How long the mocked assistant "thinks" before answering. */
const ANSWER_DELAY_MS = 900;

/**
 * Search results led by an AI answer. Every search, typed as keywords or a
 * question, lands here: the answer on top, the product grid it picked below
 * (ordered by fit, with the reason on each card), and a follow-up field that
 * refines both. Earlier questions stay one tap away above the heading.
 */
export default function ConversationalSearch() {
  const [searches, setSearches] = useState<Search[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>(recentSearchesSeed);
  const [compareIds, setCompareIds] = useState<Product["id"][]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const active = searches.find((s) => s.id === activeId) ?? null;
  const busy = searches.some((s) => s.answer === null);

  const ask = useCallback((query: string) => {
    const id = `s${Date.now()}`;
    setOverlayOpen(false);
    setRecent((current) =>
      [query, ...current.filter((q) => q !== query)].slice(0, 5),
    );
    setSearches((current) => [...current, { id, query, answer: null }]);
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    timers.current.push(
      setTimeout(() => {
        setSearches((current) =>
          current.map((s) =>
            s.id === id ? { ...s, answer: answerFor(query) } : s,
          ),
        );
      }, ANSWER_DELAY_MS),
    );
  }, []);

  const toggleCompare = useCallback((productId: Product["id"]) => {
    setCompareIds((current) => {
      if (current.includes(productId))
        return current.filter((id) => id !== productId);
      if (current.length >= MAX_COMPARE) return current;
      return [...current, productId];
    });
  }, []);

  const closeOverlay = useCallback(() => setOverlayOpen(false), []);

  const startOver = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setSearches([]);
    setActiveId(null);
  };

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const picks = active?.answer?.picks ?? [];
  const others = products.filter(
    (p) => !picks.some((pick) => pick.productId === p.id),
  );
  const compareFull = compareIds.length >= MAX_COMPARE;

  const card = (product: Product, reason?: string) => (
    <li key={product.id}>
      <SearchResultCard
        product={product}
        reason={reason}
        selected={compareIds.includes(product.id)}
        compareDisabled={compareFull && !compareIds.includes(product.id)}
        onToggleCompare={() => toggleCompare(product.id)}
      />
    </li>
  );

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <SiteHeader onOpenSearch={() => setOverlayOpen(true)} />
      {overlayOpen && (
        <SearchOverlay
          onClose={closeOverlay}
          onSubmit={ask}
          recentSearches={recent}
          onRemoveRecent={(q) =>
            setRecent((current) => current.filter((r) => r !== q))
          }
        />
      )}

      {!active ? (
        <main className="mx-auto flex w-full max-w-[840px] flex-1 flex-col justify-center px-4 py-[64px] sm:px-8">
          <p className="font-samsung-one flex items-center gap-[8px] text-[14px] font-bold">
            <SparkleIcon className="h-[18px] w-[18px] text-ss-blue-pressed" />
            Samsung AI
          </p>
          <h1 className="font-sharp-sans mt-[16px] text-[28px] font-bold leading-[1.25] sm:text-[40px]">
            What can we help you find?
          </h1>
          <p className="font-samsung-one mt-[12px] text-[16px] leading-[24px] text-ss-gray-text">
            Search by product name, or describe what you need in your own words.
            You get an answer and the products that fit, and can compare any of
            them side by side.
          </p>
          <div className="mt-[32px]">
            <SearchComposer onSubmit={ask} autoFocus />
          </div>
          <p className="font-samsung-one mt-[24px] text-[14px] font-bold">
            Try asking
          </p>
          <PromptChips
            label="Suggested questions"
            prompts={suggestedPrompts}
            onPick={ask}
            className="mt-[12px]"
          />
          <PrototypeNote className="mt-[40px]" />
        </main>
      ) : (
        <>
          <main className="font-samsung-one mx-auto w-full max-w-[1440px] flex-1 px-4 pb-[48px] pt-[32px] sm:px-8 lg:px-[40px]">
            {searches.length > 1 && (
              <nav aria-label="Your questions" className="mb-[16px]">
                <ol className="flex gap-[8px] overflow-x-auto pb-[4px] [scrollbar-width:none]">
                  {searches.map((s) => (
                    <li key={s.id} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveId(s.id)}
                        aria-current={s.id === activeId ? "true" : undefined}
                        className={`h-[32px] max-w-[260px] truncate rounded-[16px] border px-[12px] text-[12px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                          s.id === activeId
                            ? "border-black font-bold text-black"
                            : "border-ss-divider text-ss-gray-text hover:border-black"
                        }`}
                      >
                        {s.query}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="flex flex-wrap items-end justify-between gap-[16px]">
              <div className="min-w-0">
                <p className="text-[14px] text-ss-gray-text">Results for</p>
                <h1 className="font-sharp-sans mt-[4px] text-[24px] font-bold leading-[1.25] sm:text-[32px]">
                  {active.query}
                </h1>
              </div>
              <button
                type="button"
                onClick={startOver}
                className="text-[14px] underline underline-offset-2 hover:text-ss-gray-text"
              >
                Start over
              </button>
            </div>

            {active.answer && (
              <ul
                aria-label="Understood as"
                className="mt-[16px] flex flex-wrap gap-[8px]"
              >
                {active.answer.understood.map((term) => (
                  <li
                    key={term}
                    className="rounded-[4px] border border-ss-divider px-[8px] py-[4px] text-[12px] text-ss-gray-text"
                  >
                    {term}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-[24px]">
              <AiOverview
                key={active.id}
                answer={active.answer}
                onFollowUp={ask}
                busy={busy}
              />
            </div>

            <section aria-label="Products" className="mt-[48px]">
              {!active.answer ? (
                <ul className="grid grid-cols-1 gap-[32px] sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((p) => (
                    <li
                      key={p.id}
                      aria-hidden="true"
                      className="aspect-[5/4] animate-pulse rounded-[8px] bg-ss-bg-gray"
                    />
                  ))}
                </ul>
              ) : (
                <>
                  <h2 className="font-sharp-sans text-[20px] font-bold">
                    Best matches{" "}
                    <span className="font-samsung-one text-[16px] font-normal text-ss-gray-text">
                      ({picks.length})
                    </span>
                  </h2>
                  <ul className="mt-[24px] grid grid-cols-1 gap-x-[24px] gap-y-[48px] sm:grid-cols-2 lg:grid-cols-3">
                    {picks.map((pick) =>
                      card(productById(pick.productId), pick.reason),
                    )}
                  </ul>
                  {others.length > 0 && (
                    <>
                      <h2 className="font-sharp-sans mt-[64px] border-t border-ss-divider pt-[32px] text-[20px] font-bold">
                        More refrigerators{" "}
                        <span className="font-samsung-one text-[16px] font-normal text-ss-gray-text">
                          ({others.length})
                        </span>
                      </h2>
                      <ul className="mt-[24px] grid grid-cols-1 gap-x-[24px] gap-y-[48px] sm:grid-cols-2 lg:grid-cols-3">
                        {others.map((p) => card(p))}
                      </ul>
                    </>
                  )}
                </>
              )}
            </section>
          </main>

          <div className="sticky bottom-0 z-30 bg-gradient-to-t from-white from-70% to-white/0 pt-[24px]">
            <div className="mx-auto flex max-w-[840px] flex-col gap-[12px] px-4 pb-[16px] sm:px-8">
              <CompareTray
                products={compareIds.map(productById)}
                onRemove={toggleCompare}
                onClear={() => setCompareIds([])}
              />
              <SearchComposer
                onSubmit={ask}
                disabled={busy}
                placeholder="Ask a follow-up question"
              />
              <PrototypeNote className="hidden text-center sm:block" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function PrototypeNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`font-samsung-one text-[12px] leading-[18px] text-ss-disabled ${className}`}
    >
      Prototype: answers are mocked from the refrigerator data on the compare
      page and may not reflect current samsung.com prices.
    </p>
  );
}
