import type { Feature } from "@/lib/data";
import { FEATURE_ICONS } from "./icons";

interface Props {
  feature: Feature;
  span?: "default" | "wide";
}

export function FeatureCard({ feature, span = "default" }: Props) {
  const Icon = FEATURE_ICONS[feature.icon];
  return (
    <article
      className={`group relative rounded-xl border border-line bg-bg-panel/60 p-5 transition-colors hover:border-line-strong ${
        span === "wide" ? "md:col-span-2" : ""
      }`}
    >
      <div className="size-9 rounded-lg bg-accent/10 border border-accent/30 grid place-items-center text-accent mb-4 transition-colors group-hover:bg-accent/15">
        <Icon className="size-4" />
      </div>
      <h4 className="text-tx text-[15px] font-medium leading-tight">{feature.name}</h4>
      <p className="mt-1 text-tx-2 text-[13.5px] leading-relaxed">{feature.lead}</p>
      <p className="mt-3 text-tx-4 text-[12.5px] leading-relaxed">{feature.desc}</p>
    </article>
  );
}
