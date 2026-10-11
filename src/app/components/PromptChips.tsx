"use client";

interface PromptChipsProps {
  prompts: string[];
  onPick: (prompt: string) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Suggested prompts and follow-ups, styled as design.md Option Selector /
 * Label (Large): r8, 14pt, #DDDDDD 1px border that darkens on hover.
 */
export default function PromptChips({
  prompts,
  onPick,
  label,
  disabled = false,
  className = "",
}: PromptChipsProps) {
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-[8px] ${className}`}>
      {prompts.map((prompt) => (
        <li key={prompt}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onPick(prompt)}
            className="font-samsung-one min-h-[39px] rounded-[8px] border border-ss-divider bg-white px-[16px] py-[8px] text-left text-[14px] leading-[20px] text-black transition-colors hover:border-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:text-ss-disabled disabled:hover:border-ss-divider"
          >
            {prompt}
          </button>
        </li>
      ))}
    </ul>
  );
}
