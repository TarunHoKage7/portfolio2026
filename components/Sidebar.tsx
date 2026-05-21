import Link from "next/link";
import { profile } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { NavScrollSpy } from "./NavScrollSpy";
import { StatusPill } from "./StatusPill";

interface Section {
  id: string;
  label: string;
}

interface Props {
  sections?: Section[];
  backLink?: boolean;
}

export function Sidebar({ sections, backLink }: Props) {
  return (
    <aside className="relative lg:sticky lg:top-0 lg:h-screen lg:py-24 py-16 flex flex-col">
      <div>
        {backLink && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-10 text-xs font-mono tracking-widest uppercase text-tx-4 hover:text-tx-2 transition-colors"
          >
            <span aria-hidden>←</span> Back home
          </Link>
        )}

        <h1 className="h-name text-tx">
          <Link href="/" className="hover:text-accent transition-colors">
            {profile.name}
          </Link>
        </h1>

        <div className="mt-4 text-[17px] text-tx font-medium">{profile.role}</div>
        {profile.cert && (
          <div className="mt-1 text-[12.5px] font-mono tracking-wide text-tx-3">
            {profile.cert}
          </div>
        )}

        <p className="mt-5 max-w-[34ch] text-[14.5px] leading-relaxed text-tx-3">
          {profile.tagline}
        </p>

        <div className="mt-7">
          <StatusPill status="openToWork" label={profile.status} pulse />
        </div>
      </div>

      {sections && (
        <div className="mt-14 lg:mt-16">
          <NavScrollSpy sections={sections} />
        </div>
      )}

      <div className="mt-auto pt-14 flex gap-4 text-tx-3">
        <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-tx transition-colors">
          <MailIcon className="size-[22px]" />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-tx transition-colors">
          <LinkedInIcon className="size-[22px]" />
        </a>
        <a href={profile.github} target="_blank" rel="noopener" aria-label="GitHub" className="hover:text-tx transition-colors">
          <GitHubIcon className="size-[22px]" />
        </a>
      </div>
    </aside>
  );
}
