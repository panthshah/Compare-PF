import type { FeatureIcon as IconName } from "../data/proposal";

const paths: Record<IconName, React.ReactNode> = {
  capacity: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M5 11h14M9 7v2M9 14v2" />
    </>
  ),
  cooling: (
    <>
      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
      <path d="M12 3l-2 2M12 3l2 2M12 21l-2-2M12 21l2-2" />
    </>
  ),
  energy: (
    <>
      <path d="M12 3C8 3 5 6 5 10c0 3 2 5 4 6v3h6v-3c2-1 4-3 4-6 0-4-3-7-7-7z" />
      <path d="M10 22h4M12 9v4" />
    </>
  ),
  metal: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 4v16M12 4v16M16 4v16" />
    </>
  ),
  water: (
    <>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />
      <path d="M9 14a3 3 0 0 0 3 3" />
    </>
  ),
  ice: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </>
  ),
  hygiene: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  compressor: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
    </>
  ),
  door: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="1.5" />
      <path d="M14 11v2M18 8l3 1v6l-3 1" />
    </>
  ),
  shelf: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 10h16M4 15h16M8 10v5M14 15v5" />
    </>
  ),
  smart: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 18h2M9.5 8.5a3.5 3.5 0 0 1 5 0M8 6.5a6 6 0 0 1 8 0" />
    </>
  ),
  grade: (
    <>
      <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" />
    </>
  ),
};

export default function FeatureIcon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
