// All inline-SVG icons in one place. Each accepts standard SVG props; size and
// stroke color flow in via className + currentColor.

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.4 } as const;
const solid = { fill: "currentColor" } as const;

// ─── Feature icons ──────────────────────────────────────────────────────

export function ShieldIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} {...p}>
      <path d="M10 2L4 4v6c0 3.5 2.5 6.5 6 8 3.5-1.5 6-4.5 6-8V4l-6-2z" />
    </svg>
  );
}
export function GlobeIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} {...p}>
      <circle cx="10" cy="10" r="7" />
      <path d="M3 10h14M10 3c2.5 2 3.5 4.5 3.5 7s-1 5-3.5 7c-2.5-2-3.5-4.5-3.5-7s1-5 3.5-7z" />
    </svg>
  );
}
export function FlowIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} {...p}>
      <rect x="2" y="4" width="6" height="4" rx="1" />
      <rect x="12" y="4" width="6" height="4" rx="1" />
      <rect x="2" y="12" width="6" height="4" rx="1" />
      <rect x="12" y="12" width="6" height="4" rx="1" />
      <path d="M8 6h4M8 14h4M5 8v4M15 8v4" />
    </svg>
  );
}
export function ScaleIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} {...p}>
      <path d="M3 4h14M3 10h10M3 16h6" />
    </svg>
  );
}
export function QueueIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} {...p}>
      <rect x="2" y="6" width="3" height="8" />
      <rect x="7" y="6" width="3" height="8" />
      <rect x="12" y="6" width="3" height="8" />
      <path d="M16 10h2" />
    </svg>
  );
}
export function LockIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} {...p}>
      <rect x="4" y="9" width="12" height="8" rx="1" />
      <path d="M7 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}
export function SplitIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} {...p}>
      <path d="M10 2v6M10 14v4M5 11h10M5 11l-2 2M5 11l-2-2M15 11l2 2M15 11l2-2" />
    </svg>
  );
}
export function MeshIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} {...p}>
      <circle cx="5" cy="5" r="1.5" />
      <circle cx="15" cy="5" r="1.5" />
      <circle cx="10" cy="10" r="1.5" />
      <circle cx="5" cy="15" r="1.5" />
      <circle cx="15" cy="15" r="1.5" />
      <path d="M5 5l5 5M15 5l-5 5M10 10l-5 5M10 10l5 5M5 5l10 10M15 5L5 15" />
    </svg>
  );
}
export function ChartIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} {...p}>
      <path d="M3 16h14M5 13l3-4 3 2 4-6" />
    </svg>
  );
}
export function BrainIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} {...p}>
      <path d="M7 3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H7zM10 5v10M7 9h6M7 13h6" />
    </svg>
  );
}
export function IngestIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} {...p}>
      <path d="M10 3v10M6 9l4 4 4-4M3 17h14" />
    </svg>
  );
}
export function AuditIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} {...p}>
      <circle cx="9" cy="9" r="5" />
      <path d="M13 13l4 4" />
    </svg>
  );
}

// ─── Social icons ──────────────────────────────────────────────────────

export function MailIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} strokeWidth={1.5} {...p}>
      <rect x="3" y="5" width="14" height="11" rx="1.5" />
      <path d="M3 7l7 5 7-5" />
    </svg>
  );
}
export function LinkedInIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...solid} {...p}>
      <path d="M16 16h-2.7v-4.2c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2V16H7.6V7.5h2.6v1.16h.04c.36-.68 1.24-1.4 2.55-1.4 2.73 0 3.23 1.8 3.23 4.13V16zM4.55 6.34a1.56 1.56 0 1 1 0-3.13 1.56 1.56 0 0 1 0 3.13zM5.9 16H3.2V7.5h2.7V16zM17.34 0H2.66C1.93 0 1.34.57 1.34 1.28v17.44c0 .7.59 1.28 1.32 1.28h14.67c.73 0 1.33-.58 1.33-1.28V1.28C18.66.57 18.07 0 17.34 0z" />
    </svg>
  );
}
export function GitHubIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...solid} {...p}>
      <path d="M10 1.5A8.5 8.5 0 0 0 1.5 10c0 3.76 2.44 6.95 5.83 8.07.43.08.58-.18.58-.41 0-.2-.01-.74-.01-1.45-2.37.51-2.87-1.14-2.87-1.14-.39-.99-.95-1.25-.95-1.25-.78-.53.06-.52.06-.52.86.06 1.31.88 1.31.88.76 1.31 2 .93 2.5.71.08-.55.3-.93.55-1.15-1.89-.21-3.88-.95-3.88-4.21 0-.93.33-1.69.88-2.29-.09-.22-.38-1.09.08-2.28 0 0 .71-.23 2.33.87.68-.19 1.4-.28 2.12-.28.72 0 1.44.1 2.12.28 1.62-1.1 2.33-.87 2.33-.87.46 1.19.17 2.06.08 2.28.55.6.88 1.36.88 2.29 0 3.27-1.99 4-3.89 4.21.31.27.58.79.58 1.6 0 1.16-.01 2.09-.01 2.38 0 .23.15.5.59.41A8.5 8.5 0 0 0 18.5 10 8.5 8.5 0 0 0 10 1.5z" />
    </svg>
  );
}

// ─── Utility ──────────────────────────────────────────────────────

export function ArrowIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} strokeWidth={1.5} {...p}>
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}
export function ExtIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" {...stroke} strokeWidth={1.5} {...p}>
      <path d="M7 5h8v8M15 5l-9 9" />
    </svg>
  );
}

// ─── Feature-icon registry ──────────────────────────────────────────────

import type { FeatureIcon } from "@/lib/data";

export const FEATURE_ICONS: Record<FeatureIcon, (p: IconProps) => React.JSX.Element> = {
  shield: ShieldIcon,
  globe: GlobeIcon,
  flow: FlowIcon,
  scale: ScaleIcon,
  queue: QueueIcon,
  lock: LockIcon,
  split: SplitIcon,
  mesh: MeshIcon,
  chart: ChartIcon,
  brain: BrainIcon,
  ingest: IngestIcon,
  audit: AuditIcon,
};
