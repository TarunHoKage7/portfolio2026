import type { ProjectDetail } from "@/lib/data";

interface Props {
  project: ProjectDetail;
}

export function ProjectFacts({ project }: Props) {
  return (
    <dl className="space-y-10">
      <Row label="Problem">
        <p className="text-tx-2 text-[14.5px] leading-relaxed max-w-[60ch]">
          {project.problem}
        </p>
      </Row>

      <Row label="What I built">
        <ul className="space-y-2 text-tx-2 text-[14.5px] leading-relaxed list-disc pl-5 marker:text-tx-5 max-w-[60ch]">
          {project.built.map((b) => <li key={b}>{b}</li>)}
        </ul>
      </Row>

      <Row label="Proof">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-tx text-[32px] font-semibold tracking-tight leading-none">
            {project.proof.metric}
          </span>
          <span className="text-tx-3 text-[14px]">{project.proof.metricLabel}</span>
          {project.proof.extra && (
            <span className="text-tx-4 text-[13px]">· {project.proof.extra}</span>
          )}
        </div>
      </Row>
    </dl>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3 md:gap-6">
      <dt className="font-mono text-[10.5px] tracking-widest uppercase text-tx-4 pt-1">
        {label}
      </dt>
      <dd>{children}</dd>
    </div>
  );
}
