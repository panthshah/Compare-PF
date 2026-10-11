"use client";

import PromptChips from "./PromptChips";
import SearchResultCard from "./SearchResultCard";
import { SparkleIcon } from "./SearchComposer";
import { productById, type SearchAnswer } from "../data/searchAnswers";
import type { Product } from "../data/specs";

interface AnswerMessageProps {
  turnId: string;
  /** Null while the answer is still being "generated". */
  answer: SearchAnswer | null;
  compareIds: Product["id"][];
  compareFull: boolean;
  onToggleCompare: (id: Product["id"]) => void;
  onFollowUp: (prompt: string) => void;
  busy: boolean;
}

/**
 * The assistant's turn: a direct answer, supporting points, product results,
 * source links and follow-up prompts. Blocks fade in with the same staggered
 * ease the compare page uses for spec rows.
 */
export default function AnswerMessage({
  turnId,
  answer,
  compareIds,
  compareFull,
  onToggleCompare,
  onFollowUp,
  busy,
}: AnswerMessageProps) {
  return (
    <div className="font-samsung-one">
      <p className="flex items-center gap-[8px] text-[14px] font-bold text-black">
        <SparkleIcon className="h-[18px] w-[18px]" />
        Samsung AI
      </p>

      {!answer ? (
        <div className="mt-[16px] flex items-center gap-[12px]" role="status">
          {/* design.md Progress / Circular, scaled down for inline use */}
          <svg
            aria-hidden="true"
            viewBox="0 0 40 40"
            className="h-[28px] w-[28px] animate-spin"
          >
            <circle
              cx="20"
              cy="20"
              r="17"
              fill="none"
              stroke="var(--color-ss-fill)"
              strokeWidth="4"
            />
            <circle
              cx="20"
              cy="20"
              r="17"
              fill="none"
              stroke="var(--color-ss-blue)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="30 200"
            />
          </svg>
          <span className="text-[14px] text-ss-gray-text">
            Searching samsung.com
          </span>
        </div>
      ) : (
        <div className="mt-[12px] flex flex-col gap-[24px]">
          <Reveal index={0}>
            <p className="text-[18px] leading-[28px] text-black">
              {answer.summary}
            </p>
            {answer.highlights.length > 0 && (
              <ul className="mt-[12px] flex list-disc flex-col gap-[8px] pl-[20px] text-[16px] leading-[24px] text-black marker:text-ss-stroke">
                {answer.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </Reveal>

          <Reveal index={1}>
            <h2 className="sr-only">Matching products</h2>
            {/* Swipeable row on small screens, a 3-column grid from md up. */}
            <div className="-mx-4 flex snap-x snap-mandatory gap-[12px] overflow-x-auto px-4 pb-[4px] [scrollbar-width:thin] sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-[16px] md:overflow-visible md:px-0">
              {answer.picks.map((pick) => {
                const selected = compareIds.includes(pick.productId);
                return (
                  <SearchResultCard
                    key={pick.productId}
                    turnId={turnId}
                    product={productById(pick.productId)}
                    reason={pick.reason}
                    selected={selected}
                    compareDisabled={compareFull && !selected}
                    onToggleCompare={() => onToggleCompare(pick.productId)}
                  />
                );
              })}
            </div>
          </Reveal>

          <Reveal index={2}>
            <p className="text-[12px] leading-[18px] text-ss-gray-text">
              <span className="font-bold">Sources: </span>
              {answer.sources.map((source, i) => (
                <span key={source.href}>
                  {i > 0 && ", "}
                  <a
                    href={source.href}
                    className="underline underline-offset-2 hover:text-black"
                  >
                    {source.label}
                  </a>
                </span>
              ))}
            </p>
            <PromptChips
              label="Follow-up questions"
              prompts={answer.followUps}
              onPick={onFollowUp}
              disabled={busy}
              className="mt-[16px]"
            />
          </Reveal>
        </div>
      )}
    </div>
  );
}

function Reveal({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="animate-[answer-in_500ms_cubic-bezier(0.16,1,0.3,1)_both]"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {children}
    </div>
  );
}
