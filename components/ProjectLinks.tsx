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
            const key = `${l.kind}-${l.href}`;

            if (l.private) {
              return (
                <div
                  key={key}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-line bg-bg-panel/20 text-tx-4 text-[13.5px] cursor-default select-none"
                  title="Private repository — not publicly accessible"
                >
                  <Icon className="size-3.5" />
                  {l.label}
                  <span className="inline-flex items-center gap-1 text-tx-5 text-[11px] font-mono tracking-wide">
                    <LockIcon className="size-3" /> private
                  </span>
                </div>
              );
            }

            return (
              <a
                key={key}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-line-strong bg-bg-panel/40 text-tx text-[13.5px] hover:border-accent hover:text-accent transition-colors"
              >
                <Icon className="size-3.5" />
                {l.label}
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
