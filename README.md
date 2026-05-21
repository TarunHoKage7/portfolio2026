# Sai Kalyan Tarun Vadlamudi — Portfolio

Personal portfolio and CV site. Built with Next.js 16, TypeScript, Tailwind CSS v4, and React 19.

## Stack

- **Framework** — Next.js 16 App Router, fully static (`output: "export"` compatible)
- **Styling** — Tailwind CSS v4 with custom `@theme` design tokens (Linear-inspired dark palette)
- **Fonts** — Geist Sans + Geist Mono, self-hosted as woff2 in `app/fonts/` (no Google Fonts fetch at build time)
- **Effects** — Cursor aura (rAF-throttled, `pointer: fine` gated), subtle grid background
- **Data** — All content lives in `lib/data.ts` and `lib/projects/*.ts` — zero CMS, zero database

## Structure

```
app/
  page.tsx              # Home: About, Experience, Projects, Skills, Archive, Contact
  projects/
    page.tsx            # All-projects list
    [id]/page.tsx       # Per-project detail (feature bento, arch diagram, facts, links)
  skills/page.tsx       # Skill clusters grid
  fonts/                # Self-hosted woff2 font files
  globals.css           # @theme design tokens + component classes
components/
  Sidebar.tsx           # Sticky sidebar: name, role, nav scroll-spy, social links
  NavScrollSpy.tsx      # IntersectionObserver-based active section tracking
  CursorAura.tsx        # Cursor glow effect
  PageShell.tsx         # Two-column grid layout wrapper
  ProjectRow.tsx        # Compact project row for list views
  ProjectLinks.tsx      # Link buttons with lock icon for private repos
  FeatureCard.tsx       # Icon + name + description card used in bento grid
  FeatureBento.tsx      # 3-col bento grid of feature cards
  ArchDiagramSlot.tsx   # Architecture diagram placeholder with stack chips
  StatusPill.tsx        # Coloured status badge (production/live/build/design/openToWork)
lib/
  data.ts               # Types, profile, experience, project arrays
  projects/             # One file per project (ProjectDetail)
  skills.ts             # Skill clusters with depth ratings
project/_prototype/     # Visual mood-board prototype — design reference only, not used in build
```

## Dev

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Static build
npm run lint       # ESLint
```

## Environment variables

| Variable | Default | Notes |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | `https://tarun.dev` | Used for OG `metadataBase` |

## Deploy

Push to GitHub and connect to Vercel. No environment variables are required for a basic deploy — `NEXT_PUBLIC_BASE_URL` defaults gracefully.
