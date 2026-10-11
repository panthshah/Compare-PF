"use client";

import { useState, type FormEvent } from "react";

interface SearchComposerProps {
  onSubmit: (question: string) => void;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
}

/**
 * The chat-style query field. Follows the design.md Number Counter field:
 * r16, a #DDDDDD border that turns #2189FF while typing, and a filled black
 * send button that greys out (disabled fill) until there is something to send.
 */
export default function SearchComposer({
  onSubmit,
  disabled = false,
  placeholder = "Ask about Samsung refrigerators",
  autoFocus = false,
}: SearchComposerProps) {
  const [value, setValue] = useState("");
  const canSend = value.trim().length > 0 && !disabled;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!canSend) return;
    onSubmit(value.trim());
    setValue("");
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="font-samsung-one flex h-[60px] w-full items-center gap-[8px] rounded-[16px] border border-ss-divider bg-white pl-[20px] pr-[10px] transition-colors focus-within:border-ss-blue"
    >
      <SparkleIcon className="h-[20px] w-[20px] shrink-0 text-black" />
      <label htmlFor="search-question" className="sr-only">
        Ask a question
      </label>
      <input
        id="search-question"
        type="text"
        autoComplete="off"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-black outline-none placeholder:text-ss-disabled"
      />
      <button
        type="submit"
        aria-label="Send question"
        disabled={!canSend}
        className="inline-flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-ss-gray-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-ss-divider disabled:text-ss-disabled"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="h-[18px] w-[18px]"
        >
          <path
            d="M10 16V4M10 4l-5 5M10 4l5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
}

export function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M10 2.5l1.6 4.4a2 2 0 0 0 1.2 1.2l4.4 1.6-4.4 1.6a2 2 0 0 0-1.2 1.2L10 17.5l-1.6-4.4a2 2 0 0 0-1.2-1.2L2.8 10.3l4.4-1.6a2 2 0 0 0 1.2-1.2L10 2.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
