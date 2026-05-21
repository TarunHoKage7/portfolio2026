import type { Feature } from "@/lib/data";
import { FeatureCard } from "./FeatureCard";

interface Props {
  features: Feature[];
  /** Index of a feature to render full-width. Default: first one. Pass null to disable. */
  wideIndex?: number | null;
}

export function FeatureBento({ features, wideIndex = 0 }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map((f, i) => (
        <FeatureCard
          key={f.name}
          feature={f}
          span={i === wideIndex ? "wide" : "default"}
        />
      ))}
    </div>
  );
}
