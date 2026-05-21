import type { LinkKind, ProjectLink } from "@/lib/data";
import { ExtIcon, GitHubIcon, LockIcon } from "./icons";

interface Props {
  links?: ProjectLink[];
  note?: string;
}

const KIND_ICON: Record<LinkKind, (p: React.SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  demo: ExtIcon,
  github: GitHubIcon,
  website: ExtIcon,
  writeup: ExtIcon,
};

export function ProjectLinks({ links, note }: Props) {
  const hasLinks = links && links.length > 0;

  if (!hasLinks && !note) return null;

  return (
    <div>
      {hasLinks && (
        <div className="flex flex-wrap gap-3">
          {links.map((l) => {
            const Icon = KIND_ICON[l.kind];
            return (
              <a
                key={`${l.kind}-${l.href}`}
                href={l.href}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-line-strong bg-bg-panel/40 text-tx text-[13.5px] hover:border-accent hover:text-accent transition-colors"
                title={l.private ? "Private — accessible to the author only" : undefined}
              >
                <Icon className="size-3.5" />
                {l.label}
                {l.private && (
                  <span className="inline-flex items-center gap-1 text-tx-4 text-[11px] font-mono tracking-wide">
                    <LockIcon className="size-3" /> private
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}
      {note && (
        <p className="text-tx-4 text-[13px] mt-3 font-mono tracking-wide">{note}</p>
      )}
    </div>
  );
}
