"use client";

interface DifferencesToggleProps {
  checked: boolean;
  onChange: () => void;
  tabIndex?: number;
}

export default function DifferencesToggle({
  checked,
  onChange,
  tabIndex,
}: DifferencesToggleProps) {
  return (
    <label className="flex shrink-0 cursor-pointer select-none items-center gap-[12px]">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label="Apply key differences"
        tabIndex={tabIndex}
        onClick={onChange}
        className={`relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
          checked ? "bg-zinc-900" : "bg-zinc-300"
        }`}
      >
        <span
          className={`pointer-events-none mt-[2px] inline-block h-[20px] w-[20px] rounded-full bg-white shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            checked ? "translate-x-[22px]" : "translate-x-[2px]"
          }`}
        />
      </button>
      <span className="font-samsung-one whitespace-nowrap text-[15px] font-semibold text-zinc-900">
        Apply Key Differences
      </span>
    </label>
  );
}
