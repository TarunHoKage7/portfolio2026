import type { ReactNode } from "react";

interface Props {
  sidebar: ReactNode;
  children: ReactNode;
  /** Sidebar column span (out of 12). 5 on home for the wide name, 4 elsewhere. */
  sidebarSpan?: 4 | 5;
}

// Static maps so Tailwind's JIT picks the classes up — dynamic interpolation
// like `lg:col-span-${n}` would be erased at build time.
const SPANS = {
  4: { sb: "lg:col-span-4", main: "lg:col-span-8" },
  5: { sb: "lg:col-span-5", main: "lg:col-span-7" },
} as const;

export function PageShell({ sidebar, children, sidebarSpan = 4 }: Props) {
  const { sb, main } = SPANS[sidebarSpan];
  return (
    <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
      <div className="lg:grid lg:grid-cols-12 lg:gap-16">
        <div className={sb}>{sidebar}</div>
        <main className={`${main} py-16 lg:py-24`}>{children}</main>
      </div>
    </div>
  );
}
