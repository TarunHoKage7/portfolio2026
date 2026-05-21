import type { Cluster } from "@/lib/skills";

interface Props {
  cluster: Cluster;
  span?: "default" | "wide";
}

export function SkillCluster({ cluster, span = "default" }: Props) {
  return (
    <article
      className={`relative rounded-xl border border-line bg-bg-panel/60 p-6 transition-colors hover:border-line-strong ${
        span === "wide" ? "md:col-span-2" : ""
      }`}
    >
      <header className="flex items-baseline justify-between gap-4 mb-3">
        <h3 className="h-section text-tx">{cluster.name}</h3>
        <span className="font-mono text-[10.5px] tracking-widest uppercase text-tx-4">
          {cluster.skills.length}
        </span>
      </header>

      <p className="text-[14px] leading-relaxed text-tx-3 mb-5 max-w-[44ch]">
        {cluster.blurb}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {cluster.skills.map((s) => (
          <span key={s.name} className="tag" data-depth={s.depth ?? 2}>
            {s.name}
          </span>
        ))}
      </div>
    </article>
  );
}
