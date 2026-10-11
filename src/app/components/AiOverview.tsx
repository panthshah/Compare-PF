"use client";

import PromptChips from "./PromptChips";
import { SparkleIcon } from "./SearchComposer";
import type { SearchAnswer } from "../data/searchAnswers";

interface AiOverviewProps {
  /** Null while the answer is still being "generated". */
  answer: SearchAnswer | null;
  onFollowUp: (prompt: string) => void;
  busy: boolean;
}

/**
 * The AI answer that sits above the product grid: a direct answer, the points
 * behind it, its sources and follow-up questions. Blocks rise in with the
 * same ease the compare page uses for spec rows.
 */
export default function AiOverview({
  answer,
  onFollowUp,
  busy,
}: AiOverviewProps) {
  return (
    <section
      aria-label="Samsung AI answer"
      aria-live="polite"
      aria-busy={!answer}
      className="font-samsung-one rounded-[8px] bg-ss-bg-gray p-[20px] sm:p-[32px]"
    >
      <p className="flex items-center gap-[8px] text-[14px] font-bold text-black">
        <SparkleIcon className="h-[18px] w-[18px] text-ss-blue-pressed" />
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
              stroke="var(--color-ss-divider)"
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
            Reading samsung.com product details
          </span>
        </div>
      ) : (
        <div className="mt-[12px] grid gap-[24px] lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-[48px]">
          <Reveal index={0}>
            <p className="text-[18px] leading-[28px] text-black sm:text-[20px] sm:leading-[30px]">
              {answer.summary}
            </p>
            {answer.highlights.length > 0 && (
              <ul className="mt-[16px] flex list-disc flex-col gap-[8px] pl-[20px] text-[16px] leading-[24px] text-black marker:text-ss-stroke">
                {answer.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            <p className="mt-[16px] text-[12px] leading-[18px] text-ss-gray-text">
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
          </Reveal>

          <Reveal index={1}>
            <h2 className="text-[14px] font-bold text-black">Ask next</h2>
            <PromptChips
              label="Follow-up questions"
              prompts={answer.followUps}
              onPick={onFollowUp}
              disabled={busy}
              className="mt-[12px]"
            />
          </Reveal>
        </div>
      )}
    </section>
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
