"use client";

import { useEffect, useState } from "react";
import { LinkedInIcon, GitHubIcon, MailIcon } from "./icons";
import { profile } from "@/lib/data";

interface Section {
  id: string;
  label: string;
}

interface Props {
  sections: Section[];
}

/**
 * Hamburger + slide-up drawer for section nav on mobile.
 * Hidden at lg+ breakpoint — the sticky sidebar handles those viewports.
 */
export function MobileNavMenu({ sections }: Props) {
  const [open, setOpen] = useState(false);

  // Auto-close when viewport widens past the lg breakpoint (1024px).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Lock body scroll while drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Floating hamburger button — visible only below lg */}
      <button
        className="lg:hidden fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-bg-panel border border-line-strong shadow-lg flex items-center justify-center text-tx-2 hover:text-tx hover:border-line-bright transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? (
          /* × close */
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="size-4.5">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        ) : (
          /* ≡ hamburger */
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="size-4.5">
            <path d="M3 6h14M3 10h14M3 14h14" />
          </svg>
        )}
      </button>

      {/* Backdrop + drawer */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm" />
        </div>
      )}

      <div
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-bg-panel border-t border-line-strong rounded-t-2xl px-8 pt-8 pb-10 transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!open}
      >
        {/* Drag handle */}
        <div className="w-10 h-1 rounded-full bg-line-strong mx-auto mb-8" />

        <nav className="flex flex-col gap-1 mb-10" aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 py-3 text-[18px] font-medium text-tx-2 hover:text-accent transition-colors"
            >
              <span className="w-6 h-px bg-line-bright shrink-0" />
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-5 text-tx-4">
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-tx-2 transition-colors">
            <MailIcon className="size-[22px]" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-tx-2 transition-colors">
            <LinkedInIcon className="size-[22px]" />
          </a>
          <a href={profile.github} target="_blank" rel="noopener" aria-label="GitHub" className="hover:text-tx-2 transition-colors">
            <GitHubIcon className="size-[22px]" />
          </a>
        </div>
      </div>
    </>
  );
}
