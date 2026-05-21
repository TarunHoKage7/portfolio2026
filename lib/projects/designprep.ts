import type { ProjectDetail } from "../data";

export const designprep: ProjectDetail = {
  id: "designprep",
  name: "DesignPrep",
  years: "2026 — Present",
  status: "build",
  statusLabel: "In active build",
  blurb:
    "Interior design workflow app that turns floorplans and room decisions into client journeys, collaboration hubs, draft BOQs, and signed briefs.",
  intro:
    "DesignPrep is a private workflow app for interior designers to run the pre-execution phase end-to-end: create projects, annotate floorplans, author room-level decision graphs, share a public client link, capture preferences through an offline-capable guided flow, collaborate in a hub, generate deterministic draft BOQs, and export signed HTML briefs. Gemini is wired in for chat, extraction, image analysis, and storyboard text.",
  problem:
    "Interior design discovery often gets scattered across calls, chat threads, floorplans, inspiration images, and spreadsheets, which makes decisions hard to trace and scope. Designers need a structured way to collect room-by-room preferences and turn them into deliverables clients can review.",
  built: [
    "Next.js 15 App Router app for designers, clients, org members, and platform admins",
    "8-char project slugs open public client journeys with 30-day HttpOnly session cookies",
    "Room markers on PNG/JPG/PDF floorplans drive per-room decision graphs and ordered option sets",
    "IndexedDB caches flow state, responses, messages, and a replay queue for offline sync",
    "Discussion hub combines room decisions, pins, storyboard copy, progress updates, reactions, and comments",
    "BOQ drafts use room-area shares, perimeter, wall-area heuristics, and latest client selections",
    "Approved BOQs export as signed HTML briefs; Resend hooks exist, but sender setup is still pending",
    "Catalog imports parse CSV/XLSX; public designer profiles expose portfolio and testimonials",
    "Gemini 2.0 Flash is live today; OpenAI/Claude adapters and async AI batch jobs are not built",
  ],
  features: [
    {
      icon: "flow",
      name: "Floorplan to guided flow",
      lead: "Designers tag rooms, pick an entrance, author ordered question graphs.",
      desc: "Uploaded PNG/JPG/PDF floorplans become room coordinates and room-specific decision trees. Clients start from the entrance room and resume at the first incomplete node.",
    },
    {
      icon: "queue",
      name: "Offline client sync",
      lead: "IndexedDB stores local graph state, responses, messages, and pending writes.",
      desc: "The client flow keeps browser-side caches and a replay queue that syncs through /api/p/[slug]/sync when connectivity returns. Server snapshots rebuild progress and completion is written to the audit log.",
    },
    {
      icon: "brain",
      name: "Gemini copilot",
      lead: "Gemini 2.0 Flash handles chat, image analysis, text extraction, and storyboard copy.",
      desc: "AI routes are synchronous HTTP calls with a 30 req/min in-memory throttle, 5 min cache, and 30 s timeout. OpenAI and Claude providers are scaffolded but currently throw not-configured errors.",
    },
    {
      icon: "scale",
      name: "Deterministic BOQ engine",
      lead: "Draft BOQs from room type, estimated area, and chosen options.",
      desc: "Quantity bands come from room-area shares, perimeter, wall-area, and kitchen layout factors, then flow into editable BOQ lines, approval state, catalog suggestions, and a signed HTML design brief.",
    },
    {
      icon: "shield",
      name: "RLS + signed storage",
      lead: "Private buckets, signed URLs, magic-byte validation, CSP-backed routes.",
      desc: "Supabase Row Level Security gates orgs, projects, hubs, files, BOQ, profiles, and client sessions. Uploads validate signatures for PNG/JPG/PDF/DOCX/XLSX/TXT/CSV and reject path traversal.",
    },
    {
      icon: "globe",
      name: "Collaboration + public surface",
      lead: "Teams, invites, progress updates, client hubs, public designer profiles.",
      desc: "Organizations can manage members, teams, and project assignments, while clients use progress, discussion, pin, and storyboard tabs. Designers can publish signed portfolio assets, testimonials, and parsed catalogs.",
    },
  ],
  proof: {
    metric: "129",
    metricLabel: "row-level access policies in SQL migrations",
    extra: "32 tables · 27 test/spec files",
  },
  stack: [
    "Next.js 15", "React 19", "Supabase Auth/Postgres/Storage", "TypeScript 5",
    "Tailwind CSS 4", "Zustand", "Framer Motion", "Gemini 2.0 Flash",
    "Vitest", "Playwright",
  ],
  archCaption:
    "A Next.js 15 frontend talks to Supabase Auth/Postgres/Storage; designers author rooms, flows, files, updates, and BOQ, while clients enter through 8-char slug links with cookie sessions and IndexedDB-backed sync replay.",
  links: [
    { kind: "demo",   label: "Live demo", href: "https://designprep.vercel.app/" },
    { kind: "github", label: "Source",    href: "https://github.com/TarunHoKage7/designprep", private: true },
  ],
  linksNote: "Private repo · this page serves as the writeup",
};
