"use client";

import { useEffect, useRef, useState } from "react";

interface Section {
  id: string;
  label: string;
}

interface Props {
  sections: Section[];
}

export function NavScrollSpy({ sections }: Props) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  // Mirror the active id in a ref so the observer callback can short-circuit
  // no-op updates without depending on the latest React render.
  const activeRef = useRef(active);

  useEffect(() => {
    const targets = sections.flatMap((s) => {
      const el = document.getElementById(s.id);
      return el ? [el] : [];
    });
    if (!targets.length) return;

    // The visible Set must persist across callbacks: IntersectionObserver only
    // fires for sections that cross the band, not for ones already inside it.
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const next = sections.find((s) => visible.has(s.id))?.id;
        if (!next || next === activeRef.current) return;
        activeRef.current = next;
        setActive(next);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="flex flex-col gap-1.5" aria-label="Sections">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="spy-link"
          data-active={active === s.id ? "true" : "false"}
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}
