"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import AnswerMessage from "./AnswerMessage";
import CompareTray, { MAX_COMPARE } from "./CompareTray";
import PromptChips from "./PromptChips";
import SearchComposer, { SparkleIcon } from "./SearchComposer";
import {
  answerFor,
  productById,
  suggestedPrompts,
  type SearchAnswer,
} from "../data/searchAnswers";
import type { Product } from "../data/specs";

type Turn = { id: string; question: string; answer: SearchAnswer | null };

/** How long the mocked assistant "thinks" before answering. */
const ANSWER_DELAY_MS = 900;

export default function ConversationalSearch() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [compareIds, setCompareIds] = useState<Product["id"][]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const latestTurnRef = useRef<HTMLLIElement>(null);

  const busy = turns.some((t) => t.answer === null);

  const ask = useCallback((question: string) => {
    const id = `t${Date.now()}`;
    setTurns((current) => [...current, { id, question, answer: null }]);
    timers.current.push(
      setTimeout(() => {
        setTurns((current) =>
          current.map((t) =>
            t.id === id ? { ...t, answer: answerFor(question) } : t,
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

  const startOver = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTurns([]);
    setCompareIds([]);
  };

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  // Bring each new question to the top of the view as it is asked.
  const turnCount = turns.length;
  useEffect(() => {
    if (turnCount === 0) return;
    latestTurnRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [turnCount]);

  const compareProducts = compareIds.map(productById);

  if (turns.length === 0) {
    return (
      <main className="flex min-h-screen flex-col bg-white text-black">
        <div className="mx-auto flex w-full max-w-[840px] flex-1 flex-col justify-center px-4 py-[64px] sm:px-8">
          <p className="font-samsung-one flex items-center gap-[8px] text-[14px] font-bold">
            <SparkleIcon className="h-[18px] w-[18px]" />
            Samsung AI
          </p>
          <h1 className="font-sharp-sans mt-[16px] text-[28px] font-bold leading-[1.25] sm:text-[40px]">
            What can we help you find?
          </h1>
          <p className="font-samsung-one mt-[12px] text-[16px] leading-[24px] text-ss-gray-text">
            Describe what you need in your own words. Answers come from
            samsung.com product details, and you can compare any results side by
            side.
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
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-white text-black">
      <header className="sticky top-0 z-30 border-b border-ss-divider bg-white">
        <div className="mx-auto flex h-[64px] max-w-[1040px] items-center justify-between px-4 sm:px-8">
          <p className="font-sharp-sans flex items-center gap-[8px] text-[18px] font-bold">
            <SparkleIcon className="h-[20px] w-[20px]" />
            Ask Samsung
          </p>
          <div className="font-samsung-one flex items-center gap-[16px]">
            <Link
              href="/"
              className="hidden text-[14px] underline underline-offset-2 hover:text-ss-gray-text sm:inline"
            >
              Compare refrigerators
            </Link>
            <button
              type="button"
              onClick={startOver}
              className="inline-flex h-[39px] items-center rounded-[20px] border border-black px-[20px] text-[14px] font-bold transition-colors hover:border-ss-gray-text hover:text-ss-gray-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              New search
            </button>
          </div>
        </div>
      </header>

      <ol
        aria-label="Conversation"
        aria-live="polite"
        className="mx-auto flex w-full max-w-[1040px] flex-1 flex-col gap-[48px] px-4 pb-[48px] pt-[32px] sm:px-8"
      >
        {turns.map((turn, index) => (
          <li
            key={turn.id}
            ref={index === turns.length - 1 ? latestTurnRef : undefined}
            className="flex scroll-mt-[96px] flex-col gap-[24px]"
          >
            <p className="font-samsung-one max-w-[80%] self-end rounded-[24px] bg-ss-bg-gray px-[20px] py-[12px] text-[16px] leading-[24px]">
              <span className="sr-only">You asked: </span>
              {turn.question}
            </p>
            <AnswerMessage
              turnId={turn.id}
              answer={turn.answer}
              compareIds={compareIds}
              compareFull={compareIds.length >= MAX_COMPARE}
              onToggleCompare={toggleCompare}
              onFollowUp={ask}
              busy={busy}
            />
          </li>
        ))}
      </ol>

      <div className="sticky bottom-0 z-30 bg-gradient-to-t from-white from-70% to-white/0 pt-[24px]">
        <div className="mx-auto flex max-w-[1040px] flex-col gap-[12px] px-4 pb-[16px] sm:px-8">
          <CompareTray
            products={compareProducts}
            onRemove={toggleCompare}
            onClear={() => setCompareIds([])}
          />
          <SearchComposer
            onSubmit={ask}
            disabled={busy}
            placeholder="Ask a follow-up question"
          />
          <PrototypeNote className="hidden sm:block" />
        </div>
      </div>
    </main>
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
