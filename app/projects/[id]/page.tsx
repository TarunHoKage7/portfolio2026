import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchDiagramSlot } from "@/components/ArchDiagramSlot";
import { FeatureBento } from "@/components/FeatureBento";
import { PageShell } from "@/components/PageShell";
import { ProjectFacts } from "@/components/ProjectFacts";
import { ProjectLinks } from "@/components/ProjectLinks";
import { Sidebar } from "@/components/Sidebar";
import { StatusPill } from "@/components/StatusPill";
import { featured, getProjectById, profile } from "@/lib/data";
import { ARCH_DIAGRAMS } from "@/lib/arch";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return featured.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  return {
    title: project ? project.name : "Project",
    description: project?.blurb,
    openGraph: {
      title: project ? project.name : "Project",
      description: project?.blurb,
      url: `/projects/${id}`,
    },
  };
}

export default async function ProjectDetail({ params }: PageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return (
    <PageShell sidebar={<Sidebar backLink />}>
      <div className="space-y-20">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section aria-label="Overview">
          <div className="eyebrow mb-4">{project.years}</div>
          <div className="flex items-baseline gap-4 flex-wrap mb-4">
            <h2 className="text-[36px] font-semibold tracking-tight text-tx leading-[1.05]">
              {project.name}
              {project.sub && (
                <span className="text-tx-3 font-normal"> / {project.sub}</span>
              )}
            </h2>
            <StatusPill status={project.status} label={project.statusLabel} />
          </div>
          <p className="text-tx-2 text-[16.5px] leading-relaxed max-w-[62ch]">
            {project.intro}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </section>

        {/* ── Features bento ───────────────────────────────────── */}
        <section aria-label="Features">
          <div className="eyebrow mb-5">Features · {project.features.length}</div>
          <FeatureBento features={project.features} wideIndex={0} />
        </section>

        {/* ── Architecture slot ────────────────────────────────── */}
        <section aria-label="Architecture">
          <div className="eyebrow mb-5">Architecture</div>
          <ArchDiagramSlot
            caption={project.archCaption}
            stack={project.stack}
            diagramSrc={ARCH_DIAGRAMS[project.id]}
          />
        </section>

        {/* ── Problem / Built / Proof ──────────────────────────── */}
        <section aria-label="Details">
          <ProjectFacts project={project} />
        </section>

        {/* ── Links ───────────────────────────────────────────── */}
        <section aria-label="Links">
          <div className="eyebrow mb-5">Links</div>
          <ProjectLinks links={project.links} note={project.linksNote} />
        </section>
      </div>
    </PageShell>
  );
}
