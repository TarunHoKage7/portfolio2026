import Link from "next/link";
import type { Project } from "@/lib/data";
import { truncateStack } from "@/lib/utils";
import { StatusPill } from "./StatusPill";

interface Props {
  project: Project;
  /** Truncate the stack tag list at N, show "+overflow" chip for the rest. */
  maxStack?: number;
}

export function ProjectRow({ project, maxStack }: Props) {
  const [visible, overflow] = truncateStack(project.stack, maxStack);

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group grid grid-cols-[110px_1fr] gap-6 py-5 -mx-4 px-4 rounded-lg border-l-2 border-transparent hover:bg-bg-elev/70 hover:border-accent/50 transition-colors"
    >
      <div className="font-mono text-[10.5px] tracking-widest uppercase text-tx-4 pt-1">
        {project.years}
      </div>
      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[15px] font-medium text-tx group-hover:text-accent transition-colors">
            {project.name}
            {project.sub && (
              <span className="text-tx-3 font-normal"> / {project.sub}</span>
            )}
            <span className="inline-block ml-2 text-tx-3 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
              ↗
            </span>
          </span>
          <StatusPill status={project.status} label={project.statusLabel} />
        </div>
        <p className="mt-1.5 text-[14px] text-tx-2 leading-relaxed">{project.blurb}</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {visible.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
          {overflow > 0 && <span className="tag text-tx-3">+{overflow}</span>}
        </div>
      </div>
    </Link>
  );
}
