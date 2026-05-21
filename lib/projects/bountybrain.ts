import type { ProjectDetail } from "../data";

export const bountybrain: ProjectDetail = {
  id: "bountybrain",
  name: "BountyBrain V3",
  sub: "Recon-to-Evidence OS",
  years: "2025 — Present",
  status: "build",
  statusLabel: "In active build",
  blurb:
    "Human-in-the-loop bug-bounty multi-agent OS. File-based state, AI proposes / human executes, sanitize-by-default, circuit-breaker on rate limits. Any AI can pick up where the last one left off.",
  intro:
    "A human-in-the-loop bug-bounty multi-agent OS. The AI is the scientist, the human is the hands, and the file system is the recorder. Markdown ISSUE files + JSON sidecars are canonical; close the server and restart, nothing is lost. The parser deliberately refuses to extract executable commands from markdown body — AI-hallucinated commands in the human-readable view can't slip into execution. Switch from Claude to Gemini mid-investigation, no migration plumbing.",
  problem:
    "Bug-bounty workflows blur two failure modes: AI that runs commands directly (auditless, dangerous) and chat-based investigations that lose context the moment the window closes. There's no system that treats the file tree as canonical, sanitizes everything by default, and keeps the human in the approval loop without becoming a bottleneck.",
  built: [
    "Constitution-style architecture policy (10 rules) including sanitize-by-default, scope enforcement, circuit breaker, identity isolation (Rule 9), and invariant-baseline confirmation of logic breaches (Rule 10)",
    "AI proposes structured JSON commands; a deterministic Python function builds the IssueCommand; the human approves and runs; the human pastes output back",
    "Sanitizer with 12 regex patterns — JWT, Authorization headers, AWS key IDs + secret keys, session cookies, API keys, PEM private-key blocks, emails, IPv4, phones, credit cards, high-entropy secret-position values; idempotent; runs at both disk-write and Socket.IO emit boundaries",
    "Markdown + JSON sidecar dual-write (atomic via tempfile + os.replace); parser intentionally does NOT extract commands from markdown body — JSON sidecar is the only source of truth for what's executable (defense against AI hallucination in the human view)",
    "AppState.rebuild_from_disk() on startup; no Redis, no Postgres — SQLite WAL only for circuit-breaker counters",
    "Scope enforcer reads TARGET_CONFIG.json and blocks out-of-scope subdomains both in the AI prompt and at the approve_command step",
    "Rate-limit circuit breaker: 429 trips 15-min cooldown, 5+ consecutive 403s trip 10-min; UI disables approve with a countdown; manual reset is logged",
    "watchfiles-based real-time pipeline: ISSUE-*.md changes → parse → push via Socket.IO room; nuclei_results.jsonl tailed line-by-line so findings stream into the issue graph during the scan",
    "Background AI inference task pattern keeps Socket heartbeat alive during slow LLM calls (10-30s) without dropping the dashboard",
    "Real-time D3 force-directed dashboard over Socket.IO; throttled emit batches 50 log lines at a time to prevent dashboard timeouts during heavy scans",
    "Platform-agnostic AI: any model (Claude / Gemini / GPT-4) can pick up by reading the issue file — the markdown IS the prompt context",
  ],
  features: [
    {
      icon: "shield",
      name: "AI proposes, human executes",
      lead: "AI never touches a shell.",
      desc: "AI returns structured JSON. A deterministic Python function builds the command. The human reads the rationale, runs it, pastes output back. The system is the recorder.",
    },
    {
      icon: "lock",
      name: "Sanitize-by-default",
      lead: "12 patterns, idempotent, two-place redaction.",
      desc: "JWTs, Bearer headers, AWS keys, PEM blocks, session cookies, API keys, emails, IPv4, phones — auto-redacted before any string enters an ISSUE file, a Socket.IO event, or an AI prompt. Sanitizer is idempotent (running twice produces the same output); whitelist for local-dev IDs is opt-in.",
    },
    {
      icon: "flow",
      name: "State on disk + ghost-command guard",
      lead: "Markdown + JSON sidecars; parser refuses to extract commands from markdown.",
      desc: "Dual-write is atomic (tempfile + os.replace). The parser deliberately does NOT extract executable commands from the markdown body — JSON sidecar is the only source of truth for what's runnable. An AI hallucinating commands in the human-readable file can't slip them into execution.",
    },
    {
      icon: "queue",
      name: "Scope enforcer",
      lead: "Out-of-scope is blocked twice.",
      desc: "TARGET_CONFIG.json scope and out_of_scope lists are checked both in the AI prompt context (so the model doesn't even propose OOS) and at the human approval step (so a bad propose can't slip through).",
    },
    {
      icon: "scale",
      name: "Circuit breaker",
      lead: "429 / 403-spike trips a cooldown.",
      desc: "Per-subdomain. SQLite WAL-backed counters. UI disables the approve button with a countdown. No \"just one more request\" exception — the target noticed you.",
    },
    {
      icon: "ingest",
      name: "Real-time streaming",
      lead: "Nuclei JSONL tailed as it writes.",
      desc: "watchfiles detects ISSUE-*.md and nuclei_results.jsonl changes. Findings stream into the issue graph during the scan — no batch wait. Throttled emit batches 50 log lines to prevent dashboard timeouts.",
    },
    {
      icon: "audit",
      name: "Post-mortem mandatory",
      lead: "REJECTED / DUD issues require a FailedAttempt entry.",
      desc: "Rule 6: state what was tried, what the payload was, what happened, and why. The retry_condition field is required. Stops any AI from re-suggesting a dead vector.",
    },
    {
      icon: "mesh",
      name: "Platform-agnostic handoff",
      lead: "Switch AIs mid-investigation.",
      desc: "The ISSUE markdown file IS the prompt context. Cat it, paste it into any AI, ask \"generate the next 3 test commands\". The output drops back into the issue and the system picks it up. No integration plumbing.",
    },
  ],
  proof: {
    metric: "Zero external state",
    metricLabel: "files + SQLite WAL only",
    extra: "rebuilds from disk · platform-agnostic AI",
  },
  stack: [
    "FastAPI", "Socket.IO", "Pydantic V2", "watchfiles", "SQLite (WAL)",
    "aiohttp", "Playwright", "Ollama", "Gemini", "Python",
    "vanilla HTML", "D3.js",
  ],
  archCaption:
    "Markdown ISSUE files + JSON sidecars are the state. FastAPI + Socket.IO orchestrator watches the file tree; sanitizer runs at both disk and socket boundaries with 12 redaction patterns. AI proposes structured JSON commands; human approves; D3 dashboard visualizes the attack surface; Nuclei JSONL streams in real-time.",
  linksNote: "Private workspace · this page serves as the writeup",
};
