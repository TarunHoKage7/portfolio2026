import type { ProjectDetail } from "../data";

export const jobprep: ProjectDetail = {
  id: "jobprep",
  name: "JobPrep OS",
  sub: "Job Prep & Search OS",
  years: "2026 — Present",
  status: "build",
  statusLabel: "In active build",
  blurb:
    "Local-first operating system for job-search execution, interview drills, spaced repetition, and track-based technical study.",
  intro:
    "JobPrep OS combines a ranked job board, a locked daily execution planner, interview drill workspaces, FSRS review queues, and curriculum pipelines in one local-first app. The backend is FastAPI + SQLAlchemy with scheduled jobs and optional local/remote LLM routing; the frontend is a Next.js workspace UI that can run locally or behind API Gateway and EC2.",
  problem:
    "Job-search execution and interview prep usually live across spreadsheets, notes, flashcards, and generic task apps, which makes consistency hard and feedback loops weak. This project centralizes intake, planning, drills, review, and track rotation in one system with explicit gates and measurable state.",
  built: [
    "FastAPI API with 150 routes across jobs, planning, drills, SRS, graph, imports, diagnostics, and runtime ops",
    "Next.js 14 workspace UI with 8 modules for dashboard, jobs, arena, learn, memory, graph, ops, and articles",
    "Local-first by default with SQLite; EC2 Docker deployment swaps the backend to PostgreSQL 15",
    "Job ingestion from RSS, HTML, embedded JSON, SPA/browser render, and manual-link inboxes with URL dedupe",
    "Daily plans lock core tasks before flex work using prior completion, 7-day scores, fatigue, and fun-time signals",
    "FSRS review queues track due, new, learning, and lapsed cards with per-track retention targets and intake caps",
    "Learn → drill → review gating writes notes, recall scores, artifacts, ledger atoms, and graph updates",
    "AWS CDK v2 deploys EC2 + API Gateway + S3; Netlify builds the frontend and Playwright covers smoke flows",
  ],
  features: [
    {
      icon: "ingest",
      name: "Source ingestion + ranking",
      lead: "Pulls jobs from feeds, HTML pages, SPAs, and manual links.",
      desc: "Sources are defined in YAML and fetched via RSS, HTML selectors, embedded JSON, or browser rendering. Ranking blends skill overlap, title match, remote/recency bonuses, and tiers results from SS to F.",
    },
    {
      icon: "flow",
      name: "Locked daily planner",
      lead: "Nightly plans enforce required work before optional tasks.",
      desc: "The planner persists a locked day and blocks flex tasks until core items are done. Core work includes system design, DSA, company deep dive, SRS, and learning blocks, with intensity adjusted from completion, scores, fatigue, errors, and screen time.",
    },
    {
      icon: "queue",
      name: "FSRS review engine",
      lead: "Per-track memory queues with adaptive new-card budgets.",
      desc: "SRS cards store FSRS difficulty, stability, retrievability, interval, and history across new, learning, relearning, and review states. Track targets range from 0.88 to 0.92 retention; daily intake drops when backlog or recall quality worsens.",
    },
    {
      icon: "audit",
      name: "Learn-to-graph pipeline",
      lead: "Curriculum notes become graded recall, ledger entries, and graph state.",
      desc: "Each playlist item unlocks sequentially through learn, drill, and review. Recall is graded out of 30, review unlocks at 18+, and notes are converted into knowledge-ledger atoms plus graph nodes and edges.",
    },
    {
      icon: "ingest",
      name: "GitHub repo curriculum import",
      lead: "Converts a GitHub repo into ordered study packets.",
      desc: "GitHub repos are parsed via tree and raw-file fetches, then ranked by docs/code paths to extract topics. The importer generates prerequisites, playlist items, recall questions, and drill prompts; GitHub is the only supported host today.",
    },
    {
      icon: "split",
      name: "Local-first LLM routing",
      lead: "Interactive critique stays local; batch work can offload.",
      desc: "The default path uses Ollama with Qwen2.5 7B Instruct and DeepSeek Coder 6.7B. OpenAI/Gemini audits and PhoneCloud batch execution are optional, with runtime diagnostics and automatic desktop fallback when remote execution is unavailable.",
    },
  ],
  proof: {
    metric: "150",
    metricLabel: "FastAPI routes implemented",
    extra: "27 pytest modules + Playwright smoke tests",
  },
  stack: [
    "FastAPI 0.116", "Next.js 14.2", "React 18", "TypeScript 5.7",
    "SQLAlchemy 2.0", "SQLite", "PostgreSQL 15", "Alembic 1.14",
    "APScheduler 3.11", "Ollama",
    "AWS CDK v2", "API Gateway", "EC2", "S3", "Netlify", "Playwright",
  ],
  archCaption:
    "Next.js 14 UI talks to a FastAPI API that runs against SQLite locally or PostgreSQL 15 in Docker on EC2; APScheduler drives ingestion and plan jobs, Ollama handles local LLM tasks, and API Gateway/S3 front the deployed runtime.",
  links: [
    { kind: "github", label: "Source", href: "https://github.com/TarunHoKage7/JobSearch", private: true },
  ],
  linksNote: "Private repo · this page serves as the technical writeup",
};
