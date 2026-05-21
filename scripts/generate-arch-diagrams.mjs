import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, "public", "arch");

const palette = {
  bg: "#08090a",
  panel: "#0e1117",
  panel2: "#111620",
  line: "#273044",
  text: "#f1f5ff",
  muted: "#9ba6bb",
  dim: "#727d91",
  purple: "#8b8df0",
  cyan: "#67d5ff",
  green: "#6ee7b7",
  amber: "#f7c873",
};

const diagrams = [
  {
    id: "peopleops",
    title: "PeopleOps HRMS",
    subtitle: "Dual-plane HR SaaS: employee portal on AWS, platform control on Vercel",
    left: { title: "Users", items: ["Employees", "HR admins", "Platform ops", "Tenant owners"] },
    top: {
      title: "Vercel Surface",
      items: [
        { title: "React SPA", lines: ["portal, admin, payroll"] },
        { title: "/api/platform", lines: ["jobs, tenants, webhooks"] },
        { title: "Auth Split", lines: ["Cognito | Supabase Auth"] },
      ],
    },
    middle: {
      title: "HRMS Transaction Plane",
      items: [
        { title: "API Gateway", lines: ["REST boundary"] },
        { title: "Python Lambdas", lines: ["attendance, leave, payroll"] },
        { title: "Shared handlers", lines: ["db_mode selects backend"] },
      ],
    },
    right: { title: "Data + Control", items: ["Aurora or Supabase PG", "S3 documents", "Platform DB", "GitHub Actions", "HMAC callbacks"] },
    footer: ["PostGIS geofencing", "tenant RBAC", "audit ledger", "payslip/export jobs"],
  },
  {
    id: "designprep",
    title: "DesignPrep",
    subtitle: "Interior design workflow: floorplans, decisions, offline client flow, BOQ",
    left: { title: "Designer", items: ["Projects + org auth", "Floorplan markers", "Decision graph", "BOQ + briefs"] },
    top: {
      title: "Next.js App Router",
      items: [
        { title: "Designer app", lines: ["server actions"] },
        { title: "Public slug flow", lines: ["8-char links, cookies"] },
        { title: "Sync routes", lines: ["replay queue commits"] },
      ],
    },
    middle: {
      title: "Domain Engines",
      items: [
        { title: "Room graph", lines: ["ordered questions"] },
        { title: "Offline cache", lines: ["IndexedDB + replay"] },
        { title: "BOQ engine", lines: ["deterministic estimates"] },
      ],
    },
    right: { title: "Supabase + AI", items: ["Auth + RLS", "Postgres tables", "Storage buckets", "Gemini analysis", "Signed exports"] },
    footer: ["client hub", "catalog imports", "image extraction", "HTML brief snapshots"],
  },
  {
    id: "itr",
    title: "ITR Gateway",
    subtitle: "Spec-first CA filing platform with encrypted intake and audit-heavy workflows",
    left: { title: "Clients", items: ["Taxpayer mobile", "CA web portal", "Admin console", "MSG91 callbacks"] },
    top: {
      title: "API Boundary",
      items: [
        { title: "HTTP API", lines: ["47 OpenAPI paths"] },
        { title: "Auth", lines: ["JWT, OTP, RBAC"] },
        { title: "Idempotency", lines: ["safe retries"] },
      ],
    },
    middle: {
      title: "Bounded Lambdas",
      items: [
        { title: "Filings FSM", lines: ["7-state lifecycle"] },
        { title: "Documents", lines: ["AES-GCM upload flow"] },
        { title: "DSR + audit", lines: ["retention and export"] },
      ],
    },
    right: { title: "Mumbai Serverless", items: ["Supabase Postgres", "S3 documents", "SQS workers", "EventBridge jobs", "SSM parameters"] },
    footer: ["client-side crypto", "append-only audit", "DLQ retries", "PII-redacted logs"],
  },
  {
    id: "ytstudio",
    title: "Studio Engine",
    subtitle: "Single-node AI animation pipeline with serial GPU orchestration",
    left: { title: "Director UI", items: ["Script JSON", "Shot approval", "Red Pen fixes", "Remote tunnel"] },
    top: {
      title: "Python Orchestrator",
      items: [
        { title: "Watch folder", lines: ["lock, process, sort"] },
        { title: "Agent router", lines: ["Director, QC, Engineer"] },
        { title: "VRAM sentinel", lines: ["serial GPU handoff"] },
      ],
    },
    middle: {
      title: "Render Pipeline",
      items: [
        { title: "Blender", lines: ["depth, pose, normal maps"] },
        { title: "SD Forge", lines: ["ControlNet styling"] },
        { title: "Audio + lipsync", lines: ["RVC, Wav2Lip, FFmpeg"] },
      ],
    },
    right: { title: "Runtime State", items: ["Hash cache", "Frame QC", "Completed shots", "Quarantine", "WebSocket logs"] },
    footer: ["Gemini agents", "4 GB GPU budget", "guide maps", "shot-level review loop"],
  },
  {
    id: "bountybrain",
    title: "BountyBrain V3",
    subtitle: "Human-in-the-loop recon OS with file-backed state and command safety",
    left: { title: "Human Loop", items: ["Scope config", "Approve command", "Paste output", "Review evidence"] },
    top: {
      title: "FastAPI Orchestrator",
      items: [
        { title: "Issue parser", lines: ["Markdown + JSON sidecars"] },
        { title: "AI proposer", lines: ["structured JSON only"] },
        { title: "Socket.IO", lines: ["live dashboard updates"] },
      ],
    },
    middle: {
      title: "Safety Gates",
      items: [
        { title: "Sanitizer", lines: ["12 redaction patterns"] },
        { title: "Scope enforcer", lines: ["blocks out-of-scope"] },
        { title: "Circuit breaker", lines: ["429 and 403 cooldowns"] },
      ],
    },
    right: { title: "State + Evidence", items: ["ISSUE files", "JSON commands", "SQLite WAL", "Nuclei JSONL", "D3 graph"] },
    footer: ["AI proposes, human executes", "sanitize by default", "restart-safe state", "post-mortems"],
  },
  {
    id: "phonecloud",
    title: "PhoneCloud",
    subtitle: "Typed job fabric across phones and PCs with leased execution and operator visibility",
    left: { title: "Surfaces", items: ["CLI", "Python SDK", "Next.js console", "Android app"] },
    top: {
      title: "FastAPI Control Plane",
      items: [
        { title: "72 routes", lines: ["nodes, jobs, artifacts"] },
        { title: "Scheduler", lines: ["capability weighted"] },
        { title: "Telemetry", lines: ["SSE + event logs"] },
      ],
    },
    middle: {
      title: "Worker Fleet",
      items: [
        { title: "PC agents", lines: ["Python runtimes"] },
        { title: "Android workers", lines: ["foreground service"] },
        { title: "Adapters", lines: ["Ollama, llama.cpp, shell"] },
      ],
    },
    right: { title: "State + Ops", items: ["Postgres", "Redis Streams", "MinIO artifacts", "Vault leases", "Prometheus/Grafana"] },
    footer: ["mTLS pairing", "lease renewals", "DLQ recovery", "metering summaries"],
  },
  {
    id: "jobprep",
    title: "JobPrep OS",
    subtitle: "Local-first job search and interview prep workspace with adaptive planning",
    left: { title: "Workspace", items: ["Dashboard", "Job board", "Interview arena", "Learn + memory"] },
    top: {
      title: "Next.js UI",
      items: [
        { title: "Modules", lines: ["jobs, drills, graph, ops"] },
        { title: "Runtime modes", lines: ["local or deployed"] },
        { title: "Smoke tests", lines: ["Playwright flows"] },
      ],
    },
    middle: {
      title: "FastAPI Backend",
      items: [
        { title: "150 routes", lines: ["jobs, plans, SRS"] },
        { title: "Schedulers", lines: ["ingest + daily plan"] },
        { title: "LLM routing", lines: ["Ollama, optional cloud"] },
      ],
    },
    right: { title: "Persistence + Deploy", items: ["SQLite local", "PostgreSQL on EC2", "APScheduler", "S3 artifacts", "API Gateway"] },
    footer: ["source ranking", "locked daily plan", "FSRS queues", "learn-drill-review gate"],
  },
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&apos;",
  }[ch]));
}

function text(x, y, value, cls = "", attrs = "") {
  return `<text x="${x}" y="${y}" class="${cls}" ${attrs}>${esc(value)}</text>`;
}

function wrapText(value, maxChars, maxLines = 2) {
  const words = String(value).split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars || !current) {
      current = next;
      continue;
    }

    lines.push(current);
    current = word;

    if (lines.length === maxLines - 1) break;
  }

  if (current && lines.length < maxLines) lines.push(current);
  return lines;
}

function panel(x, y, w, h, title, accent = "purple") {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" class="panel"/>
    <text x="${x + 24}" y="${y + 36}" class="label ${accent}">${esc(title)}</text>`;
}

function pillList(x, y, w, items, accent = "purple") {
  return items.map((item, index) => {
    const rowY = y + index * 44;
    const lines = wrapText(item, 17, 2);
    const lineY = lines.length === 1 ? [rowY + 21] : [rowY + 15, rowY + 29];
    return `
      <rect x="${x}" y="${rowY}" width="${w}" height="32" rx="10" class="chip"/>
      <circle cx="${x + 18}" cy="${rowY + 16}" r="4" class="${accent}-fill"/>
      ${lines.map((line, lineIndex) =>
        `<text x="${x + 32}" y="${lineY[lineIndex]}" class="body strong small">${esc(line)}</text>`
      ).join("")}`;
  }).join("");
}

function wideCard(x, y, w, title, lines, accent = "purple") {
  return `
    <rect x="${x}" y="${y}" width="${w}" height="32" rx="11" class="card"/>
    <rect x="${x}" y="${y}" width="5" height="32" rx="3" class="${accent}-fill"/>
    <text x="${x + 18}" y="${y + 21}" class="body strong">${esc(title)}</text>
    <text x="${x + 162}" y="${y + 21}" class="body muted">${esc(lines[0] ?? "")}</text>`;
}

function sectionCards(section, x, y, w, accent) {
  return `
    ${panel(x, y, w, 166, section.title, accent)}
    ${section.items.map((item, index) =>
      wideCard(x + 24, y + 58 + index * 38, w - 48, item.title, item.lines, accent)
    ).join("")}`;
}

function arrow(x1, y1, x2, y2, accent = "purple", bend = "") {
  const stroke = `class="arrow ${accent}-stroke" marker-end="url(#arrow-${accent})"`;
  if (bend) return `<path d="${bend}" ${stroke}/>`;
  return `<path d="M ${x1} ${y1} L ${x2} ${y2}" ${stroke}/>`;
}

function diagramSvg(spec) {
  return `<svg viewBox="0 0 960 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(spec.title)} architecture diagram">
  <defs>
    <marker id="arrow-purple" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M 1 1 L 11 6 L 1 11 Z" fill="${palette.purple}"/>
    </marker>
    <marker id="arrow-cyan" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M 1 1 L 11 6 L 1 11 Z" fill="${palette.cyan}"/>
    </marker>
    <marker id="arrow-green" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M 1 1 L 11 6 L 1 11 Z" fill="${palette.green}"/>
    </marker>
    <style>
      .bg { fill: ${palette.bg}; }
      .grid { stroke: #161a23; stroke-width: 1; opacity: .5; }
      .frame { fill: #0a0c10; stroke: #1d2330; stroke-width: 1.4; }
      .panel { fill: ${palette.panel}; stroke: ${palette.line}; stroke-width: 1.3; }
      .card, .chip, .footer-chip { fill: ${palette.panel2}; stroke: #30384c; stroke-width: 1.1; }
      text { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .title { fill: ${palette.text}; font-size: 28px; font-weight: 780; letter-spacing: 0; }
      .subtitle { fill: ${palette.muted}; font-size: 15px; }
      .label { font-size: 13px; font-weight: 760; letter-spacing: 1.4px; text-transform: uppercase; }
      .body { fill: ${palette.text}; font-size: 14px; }
      .strong { font-weight: 720; }
      .small { font-size: 12.5px; }
      .muted { fill: ${palette.muted}; font-size: 12px; }
      .dim { fill: ${palette.dim}; font-size: 11px; }
      .purple { fill: ${palette.purple}; }
      .cyan { fill: ${palette.cyan}; }
      .green { fill: ${palette.green}; }
      .amber { fill: ${palette.amber}; }
      .purple-fill { fill: ${palette.purple}; }
      .cyan-fill { fill: ${palette.cyan}; }
      .green-fill { fill: ${palette.green}; }
      .amber-fill { fill: ${palette.amber}; }
      .arrow { fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
      .purple-stroke { stroke: ${palette.purple}; }
      .cyan-stroke { stroke: ${palette.cyan}; }
      .green-stroke { stroke: ${palette.green}; }
    </style>
  </defs>

  <rect width="960" height="560" class="bg"/>
  ${Array.from({ length: 15 }, (_, i) => `<path d="M ${40 + i * 64} 88 V 520" class="grid"/>`).join("")}
  ${Array.from({ length: 8 }, (_, i) => `<path d="M 32 ${100 + i * 52} H 928" class="grid"/>`).join("")}
  <rect x="16" y="16" width="928" height="528" rx="28" class="frame"/>
  <circle cx="825" cy="96" r="78" fill="${palette.purple}" opacity=".055"/>
  <circle cx="108" cy="476" r="58" fill="${palette.green}" opacity=".045"/>

  ${text(40, 58, spec.title, "title")}
  ${text(40, 82, spec.subtitle, "subtitle")}

  ${panel(40, 110, 200, 320, spec.left.title, "purple")}
  ${pillList(64, 174, 152, spec.left.items, "purple")}

  ${sectionCards(spec.top, 280, 110, 400, "cyan")}
  ${sectionCards(spec.middle, 280, 292, 400, "green")}

  ${panel(720, 110, 200, 320, spec.right.title, "amber")}
  ${pillList(744, 174, 152, spec.right.items, "amber")}

  <rect x="40" y="462" width="880" height="58" rx="20" class="panel"/>
  ${text(64, 497, "Key signals", "label green")}
  ${spec.footer.map((item, index) => {
    const x = 184 + index * 174;
    const lines = wrapText(item, 19, 2);
    const lineY = lines.length === 1 ? [496] : [491, 503];
    return `
      <rect x="${x}" y="478" width="144" height="26" rx="13" class="footer-chip"/>
      ${lines.map((line, lineIndex) =>
        `<text x="${x + 72}" y="${lineY[lineIndex]}" class="dim" text-anchor="middle">${esc(line)}</text>`
      ).join("")}`;
  }).join("")}

  ${arrow(240, 270, 280, 190, "purple", "M 240 270 C 260 270, 260 190, 280 190")}
  ${arrow(480, 276, 480, 292, "cyan")}
  ${arrow(680, 190, 720, 270, "cyan", "M 680 190 C 704 190, 700 270, 720 270")}
  ${arrow(680, 380, 720, 314, "green", "M 680 380 C 704 380, 700 314, 720 314")}
  ${arrow(480, 458, 480, 462, "green")}
</svg>
`;
}

mkdirSync(outDir, { recursive: true });

for (const spec of diagrams) {
  writeFileSync(join(outDir, `${spec.id}.svg`), diagramSvg(spec), "utf8");
}
