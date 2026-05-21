import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Sidebar } from "@/components/Sidebar";
import { SkillCluster } from "@/components/SkillCluster";
import { clusters } from "@/lib/skills";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Skills — ${profile.name}`,
  description: "What I reach for, grouped by domain rather than a flat tag list.",
};

const WIDE_CLUSTER_ID = "ai";

export default function SkillsPage() {
  const total = clusters.reduce((n, c) => n + c.skills.length, 0);

  return (
    <PageShell sidebar={<Sidebar backLink />}>
      <header className="mb-12">
        <div className="eyebrow mb-4">
          Skills · {total} entries · {clusters.length} clusters
        </div>
        <h2 className="text-[32px] font-semibold tracking-tight text-tx mb-3">
          What I reach for, by cluster.
        </h2>
        <p className="lead">
          Grouped rather than listed. Cluster blurbs explain the <em>when</em>; tag depth (1/2/3)
          hints at <em>how often</em>. Where two skills sit in different clusters, that&apos;s
          intentional — the use-case decides the home.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clusters.map((c) => (
          <SkillCluster
            key={c.id}
            cluster={c}
            span={c.id === WIDE_CLUSTER_ID ? "wide" : "default"}
          />
        ))}
      </div>

      <p className="mt-12 text-[12.5px] font-mono text-tx-4 tracking-wide">
        depth · <span className="text-tx-3">1</span> touched ·
        <span className="text-tx-2"> 2</span> used in prod ·
        <span className="text-tx"> 3</span> deep
      </p>
    </PageShell>
  );
}
