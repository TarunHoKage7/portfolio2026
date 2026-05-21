import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ProjectCard } from "@/components/ProjectCard";
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
      <header className="mb-12">
        <div className="eyebrow mb-4">Projects · {featured.length}</div>
        <h2 className="text-[32px] font-semibold tracking-tight text-tx leading-[1.1]">
          Things I&apos;ve built and shipped.
        </h2>
        <p className="lead mt-4">
          Serverless SaaS, local-first tools, AI pipelines, distributed infra.
          Click any card for the full writeup.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {featured.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </PageShell>
  );
}
