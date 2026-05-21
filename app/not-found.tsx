import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "404 — Page not found",
};

export default function NotFound() {
  return (
    <PageShell sidebar={<Sidebar backLink />}>
      <div className="flex flex-col justify-center min-h-[50vh]">
        <div className="font-mono text-[11px] tracking-widest uppercase text-tx-4 mb-6">
          404
        </div>
        <h1 className="text-[40px] font-semibold tracking-tight text-tx leading-tight mb-4">
          Nothing here.
        </h1>
        <p className="lead mb-10">
          This page doesn&apos;t exist or was moved. Head back home and try a different route.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-tx border-b border-line-strong hover:text-accent hover:border-accent transition-colors pb-1 self-start"
        >
          <span aria-hidden>&#x2190;</span> Back home
        </Link>
      </div>
    </PageShell>
  );
}
