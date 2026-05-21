import Link from "next/link";
import { profile } from "@/lib/data";
import type { NavSection } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { NavScrollSpy } from "./NavScrollSpy";
import { StatusPill } from "./StatusPill";

interface Props {
  sections?: NavSection[];
  backLink?: boolean;
}

export function Sidebar({ sections, backLink }: Props) {
  return (
    <aside className="relative lg:sticky lg:top-0 lg:h-screen lg:py-24 py-16 flex flex-col">
      {/* ── Top cluster: identity ─────────────────────────── */}
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

        <div className="mt-3 text-[19px] font-semibold text-tx-2">{profile.role}</div>
        {profile.cert && (
          <div className="mt-2 text-[12px] font-mono tracking-wide text-tx-4">
            {profile.cert}
          </div>
        )}

        <p className="mt-6 max-w-[32ch] text-[14px] leading-[1.7] text-tx-3">
          {profile.tagline}
        </p>

        <div className="mt-8">
          <StatusPill status="openToWork" label={profile.status} pulse />
        </div>
      </div>

      {/* ── Bottom cluster: nav + social ─────────────────── */}
      {/* mt-auto pushes this group to the lower half of the sidebar,
          matching the visual rhythm where navigation sits near the bottom */}
      <div className="mt-auto flex flex-col gap-10">
        {sections && <NavScrollSpy sections={sections} />}

        <div className="flex gap-5 text-tx-4">
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-tx transition-colors">
            <MailIcon className="size-[22px]" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-tx transition-colors">
            <LinkedInIcon className="size-[22px]" />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-tx transition-colors">
            <GitHubIcon className="size-[22px]" />
          </a>
        </div>
      </div>
    </aside>
  );
}
