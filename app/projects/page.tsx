import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ProjectRow } from "@/components/ProjectRow";
import { Sidebar } from "@/components/Sidebar";
import { featured } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  openGraph: {
    title: "Projects",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <PageShell sidebar={<Sidebar backLink />}>
      <header className="mb-10">
        <div className="eyebrow mb-4">Projects · {featured.length} entries</div>
        <h2 className="text-[32px] font-semibold tracking-tight text-tx">
          Things I&apos;ve built and shipped.
        </h2>
        <p className="lead mt-3">
          Seven projects across serverless SaaS, local-first tools, AI pipelines, and distributed
          infra. Click any row for the full writeup.
        </p>
      </header>

      <div className="space-y-1">
        {featured.map((p) => <ProjectRow key={p.id} project={p} />)}
      </div>
    </PageShell>
  );
}
