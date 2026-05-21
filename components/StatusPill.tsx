import type { StatusKind } from "@/lib/data";

interface Props {
  status: StatusKind;
  label: string;
  pulse?: boolean;
}

export function StatusPill({ status, label, pulse }: Props) {
  return (
    <span className="pill" data-status={status} data-pulse={pulse ? "true" : undefined}>
      {label}
    </span>
  );
}
