import Link from "next/link";
import type { Project } from "@/lib/data";
import { truncateStack } from "@/lib/utils";
import { StatusPill } from "./StatusPill";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const [visible, overflow] = truncateStack(project.stack, 5);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="spotlight group relative flex flex-col rounded-xl border border-line bg-bg-panel p-6 transition-all duration-200 hover:bg-bg-elev/50"
    >
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[10px] tracking-widest uppercase text-tx-5">
          {project.years}
        </span>
        <StatusPill status={project.status} label={project.statusLabel} />
      </div>

      <div className="flex-1">
        <div className="flex items-baseline gap-2 flex-wrap mb-2.5">
          <h3 className="text-[15px] font-semibold text-tx group-hover:text-accent transition-colors leading-snug">
            {project.name}
          </h3>
          {project.sub && (
            <span className="text-tx-4 text-[12px]">/ {project.sub}</span>
          )}
        </div>
        <p className="text-[13.5px] text-tx-3 leading-relaxed line-clamp-3">
          {project.blurb}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {visible.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
          {overflow > 0 && (
            <span className="tag text-tx-3">+{overflow}</span>
          )}
        </div>
        <span className="shrink-0 text-[14px] text-tx-4 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
          ↗
        </span>
      </div>
    </Link>
  );
}
