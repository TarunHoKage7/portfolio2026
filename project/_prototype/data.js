// Project data — single source of truth, shared across all pages.
// Window-scoped because Babel scripts don't share module scope.

window.PROFILE = {
  name: "Sai Kalyan Tarun Vadlamudi",
  nameShort: "Sai Kalyan Tarun",
  role: "Cloud & AI Engineer",
  roleCert: "AWS Certified Solutions Architect · SAA-C03",
  tagline: "I architect and ship serverless SaaS, multi-tenant systems, distributed infra, and AI pipelines.",
  location: "Hyderabad, India",
  status: "Open to work",
  email: "saikalyantarun2001@gmail.com",
  linkedin: "https://www.linkedin.com/in/tarunsaikalyanvadlamudi/",
  github: "https://github.com/TarunHoKage7",
  cert: {
    title: "AWS Certified Solutions Architect — Associate",
    code: "SAA-C03",
    issuer: "Amazon Web Services",
    year: "2024",
  },
};

// Shared feature lists — used by detail pages.
// Each feature: { icon, name, lead, desc }
// icon names defined in components.jsx Icon object.

window.FEATURED = [
  {
    id: "peopleops",
    name: "PeopleOps",
    sub: "MYHRMS",
    years: "2025 — Present",
    status: "production",
    statusLabel: "Production-ready",
    prop: "Multi-tenant HRMS SaaS for SMBs and Indian cooperative banks. Serverless backend, banking-grade RBAC, geofenced attendance.",
    intro: "A multi-tenant HRMS designed for small cooperative banks and SMBs that were priced out of enterprise HR vendors. Built serverless from day one so per-tenant cost holds at low seat counts.",
    problem: "SMBs and small institutions get HRMS solutions priced for enterprises, with infra economics that don't pencil at <500 seats.",
    built: [
      "Multi-tenant serverless backend on AWS CDK — IAC for every env",
      "Aurora PostgreSQL Serverless v2 with PostGIS for geofencing",
      "API Gateway decoupled from Lambda via SQS for bulk operations",
      "Cognito + Secrets Manager + strict RBAC for banking compliance",
      "Configurable workflow engine: multi-level approvals, leave proration, dynamic payroll, LOP/overtime/statutory hooks",
      "Cursor-based pagination across APIs for O(1) at scale",
    ],
    stack: ["AWS CDK", "Lambda", "API Gateway", "SQS", "Cognito", "Aurora PG Serverless v2", "PostGIS", "S3", "EventBridge", "Python", "RDS Proxy"],
    proof: { metric: "~90%", metricLabel: "infra cost cut vs EC2", extra: "~₹28/user/mo infra cost" },
    features: [
      { icon: "shield", name: "Banking-grade RBAC", lead: "Per-tenant role trees, scoped resource policies.", desc: "Every endpoint audits the actor, tenant, and resource. Compliance hooks for cooperative-bank IT review." },
      { icon: "globe",  name: "PostGIS geofencing", lead: "Branch-radius attendance with anomaly + regularization.", desc: "Geo-indexed punches against per-branch geofences. Outlier reporting + a regularization workflow for genuine field cases." },
      { icon: "flow",   name: "Workflow engine", lead: "Configurable multi-level approval chains.", desc: "Leave, payroll exceptions, documents — every workflow is a configured graph. Tenants edit chains without code." },
      { icon: "scale",  name: "Cursor pagination", lead: "O(1) reads across every multi-tenant table.", desc: "Cursor-based pagination + SQS-decoupled bulk lanes keep latency flat even when one tenant runs a payroll close." },
      { icon: "queue",  name: "Bulk lanes via SQS", lead: "API Gateway decoupled from Lambda for batch ops.", desc: "Payroll generation, document workflows, and statutory reports run on their own lanes. The synchronous API stays responsive." },
      { icon: "lock",   name: "Secrets + KMS",     lead: "Per-tenant secrets, audited rotations.", desc: "Secrets Manager + KMS for credential isolation. Every read is logged; rotation is a one-click op." },
    ],
    screenshots: [
      { label: "Admin dashboard · tenant overview" },
      { label: "Geofenced attendance map" },
      { label: "Workflow editor · multi-level approvals" },
      { label: "Payroll close · audit trail" },
    ],
    links: {
      demo: null,        // Live tenant demo by request only
      github: null,      // Private repo
    },
  },

  {
    id: "phonecloud",
    name: "PhoneCloud",
    sub: "SelfCloud",
    years: "2024 — Present",
    status: "live",
    statusLabel: "Live",
    prop: "API-first local cloud fabric. Phones, laptops, and desktops become heterogeneous compute nodes on a closed Tailscale mesh.",
    intro: "What if your old phones became serious compute? PhoneCloud is a self-hosted cloud orchestrator that treats heterogeneous personal hardware as a fleet of nodes — lease-based jobs, DLQ, observability.",
    problem: "Local inference and personal workloads need cloud-style orchestration — but commercial clouds don't run on phones, and self-hosting tools assume homogeneous nodes.",
    built: [
      "Control plane / data plane split — Postgres durable state, Redis Streams queue, MinIO artifacts",
      "Lease-based job execution: ACK/NACK, retries, DLQ, visibility-timeout reclaim",
      "Tailscale mesh networking — every node addressable without public IPs",
      "Prometheus + Grafana observability across heterogeneous node types",
      "Next.js console, CLI, Android node agent with QR onboarding",
      "Pluggable runtime backends — local inference farm is the headline use case",
    ],
    stack: ["Postgres", "Redis Streams", "MinIO", "Tailscale", "Next.js", "Kotlin", "Jetpack Compose", "Prometheus", "Grafana", "Ollama"],
    proof: { metric: "5 nodes", metricLabel: "running today", extra: "phones + PCs + planned pseudo-nodes" },
    features: [
      { icon: "split", name: "Control / data split", lead: "Postgres state, Redis queue, MinIO blobs.", desc: "Three boring building blocks instead of a custom database. Easy to back up, easy to reason about." },
      { icon: "queue", name: "Lease + DLQ",          lead: "Visibility-timeout reclaim, retries, DLQ.", desc: "SQS semantics on top of Redis Streams. Jobs that crash a node are reclaimed and either retried or dead-lettered." },
      { icon: "mesh",  name: "Tailscale mesh",       lead: "Every phone is a node. No public IPs.", desc: "Zero port-forwarding, zero NAT gymnastics. Adding a device is a QR scan from the Android agent." },
      { icon: "chart", name: "Observability",        lead: "Prom/Grafana for latency, lease churn, node health.", desc: "Heterogeneous nodes get a uniform metric surface. Slow phones show up in the latency histograms instantly." },
      { icon: "flow",  name: "Android agent",        lead: "QR onboarding for new phone nodes.", desc: "Native Kotlin agent registers, leases jobs, and reports back. New devices ship runnable in under a minute." },
      { icon: "brain", name: "Pluggable runtimes",   lead: "Ollama, Stable Diffusion, anything that takes a job.", desc: "Runtime backends are pluggable per node. The headline use case is a personal local inference farm." },
    ],
    screenshots: [
      { label: "Console · node fleet overview" },
      { label: "Job lease lifecycle" },
      { label: "Android agent · QR onboarding" },
      { label: "Grafana · lease latency by node" },
    ],
    links: { demo: null, github: null },
  },

  {
    id: "jobprep",
    name: "JobPrep",
    sub: "",
    years: "2024 — Present",
    status: "live",
    statusLabel: "Live",
    prop: "Local-first job search + interview-capability OS. Ingestion, ranking, daily locked plans, and a private LLM audit loop.",
    intro: "Job hunt as software. Ingestion across boards, a daily plan that locks once generated, capability tracks for DSA / system design / company deep-dives, and a local LLM that never sends your resume anywhere.",
    problem: "Job hunting tools are either ad-funded aggregators or LLM toys. Neither maintains a coherent personal corpus — resume versions, source manager, daily plan, capability gaps.",
    built: [
      "Job ingestion from RSS, HTML scrapers, and company pages",
      "Workflow states + tier ranking + a daily plan that locks after generation",
      "DSA + system design + SRS + flashcards + company deep-dive modules",
      "Resume upload/versioning, career-asset library, source manager",
      "Local Ollama by default; optional OpenAI/Gemini audit pass",
      "Optional executor path through PhoneCloud",
    ],
    stack: ["FastAPI", "SQLite", "Alembic", "Next.js", "Ollama", "OpenAI", "Gemini"],
    proof: { metric: "Local-first", metricLabel: "by default", extra: "EC2 / Netlify deployment path documented" },
    features: [
      { icon: "ingest", name: "Source manager",     lead: "RSS, HTML, company pages — one stream.", desc: "Normalized job-listing pipeline. Sources are pluggable; deduping is content-hashed." },
      { icon: "lock",   name: "Daily locked plan",  lead: "Plan is generated, then locked.", desc: "No re-rolling away from hard things. The day's plan commits at generation; deltas land tomorrow." },
      { icon: "brain",  name: "Capability OS",      lead: "DSA, system design, SRS, flashcards, deep dives.", desc: "Everything versioned. Spaced repetition over the capability gaps your applications imply." },
      { icon: "audit",  name: "LLM audit loop",     lead: "Local Ollama default. Optional remote audit.", desc: "Resume / answers / cover letters audited locally. Remote pass only when you opt in, per-call." },
      { icon: "flow",   name: "Resume versioning",  lead: "Per-application resume + cover letter snapshots.", desc: "Every submission captures the exact resume, cover, and answers used. Easy to A/B." },
      { icon: "split",  name: "Optional cloud exec", lead: "Push heavy passes through PhoneCloud.", desc: "Remote audit jobs can run on a PhoneCloud fleet — keeps the laptop cool during prep marathons." },
    ],
    screenshots: [
      { label: "Daily locked plan" },
      { label: "Source manager · jobs" },
      { label: "Capability tracker · DSA" },
      { label: "Resume version diff" },
    ],
    links: { demo: null, github: null },
  },
];

window.ACTIVE = [
  {
    id: "bugbounty",
    name: "Bug Bounty OS",
    years: "2024 — Present",
    status: "live",
    statusLabel: "Live",
    prop: "Private recon-to-evidence automation. Issue graph, dedupe, AI outlier analyzer.",
    intro: "A private workflow OS for security recon. Ingests HAR + nuclei + Wayback, deduplicates findings against a deterministic issue ID, and surfaces outliers via an LLM analyzer.",
    problem: "Recon tools produce a flood of noisy output and no shared workflow. Findings get lost, dedupe is manual, and there's no canonical record of what was tested when.",
    built: [
      "Target intel briefing + Wayback historical endpoint discovery",
      "HAR parsing, nuclei ingestion, deterministic issue IDs",
      "Finding dedupe/update logic, status workflow, dashboard",
      "AI analyzer for recon outliers",
    ],
    stack: ["Node.js", "Python", "Wayback", "nuclei", "Graph", "LLM"],
    proof: { metric: "Issue graph", metricLabel: "dedupe + workflow" },
    features: [
      { icon: "ingest", name: "Multi-source ingest",  lead: "HAR, nuclei, Wayback — one pipeline.", desc: "Heterogeneous recon outputs normalized into a single issue graph." },
      { icon: "flow",   name: "Deterministic IDs",    lead: "Same finding = same ID across runs.", desc: "Stable hashing across signature + endpoint + parameter set. Easy to track over time." },
      { icon: "brain",  name: "AI outlier analyzer",  lead: "LLM flags interesting endpoints.", desc: "Surfaces low-signal-but-high-interest findings the noise filter would otherwise drop." },
      { icon: "chart",  name: "Status workflow",      lead: "Dashboard with finding states.", desc: "Open / triaged / suppressed / confirmed. Plain workflow, no SaaS lock-in." },
    ],
    screenshots: [
      { label: "Issue graph · recon outputs" },
      { label: "Finding dedupe · history" },
      { label: "Dashboard · status workflow" },
    ],
    links: { demo: null, github: null },
  },

  {
    id: "cinema",
    name: "AI Cinematography Studio",
    years: "2024",
    status: "live",
    statusLabel: "Live",
    prop: "AI-driven media pipeline. Python orchestrators, SD, Unreal Engine 5, optional distributed render via PhoneCloud.",
    intro: "A pipeline for short-form animated content where the human directs and the system shoots. LLM agents drive shot lists, Stable Diffusion handles stills, Unreal Engine 5 renders cinematic scenes.",
    problem: "Generating short-form animated content end-to-end requires stitching disjoint tools. There's no single pipeline that goes from prompt to rendered scene with consistent direction.",
    built: [
      "Python scripts + LLM agents drive shot generation",
      "Stable Diffusion for stills, Unreal Engine 5 for cinematic scenes",
      "Distributed render/inference path via PhoneCloud",
      "Director-style interface — text prompts produce shot lists, not raw frames",
    ],
    stack: ["Python", "Stable Diffusion", "Unreal Engine 5", "LLM agents"],
    proof: { metric: "~80%", metricLabel: "manual labor cut" },
    features: [
      { icon: "brain",  name: "LLM shot list",         lead: "Prompt → director-style shot breakdown.", desc: "Agents convert intent into a shot list (angles, durations, camera moves) before any rendering starts." },
      { icon: "ingest", name: "SD stills",             lead: "Stable Diffusion handles concept frames.", desc: "Style-locked stills used as scene refs and storyboards into UE5." },
      { icon: "flow",   name: "Unreal Engine 5",       lead: "Cinematic scenes rendered in-engine.", desc: "Per-shot UE5 scenes. Director controls camera; system handles lighting and materials." },
      { icon: "split",  name: "Distributed render",    lead: "Optional PhoneCloud fleet for jobs.", desc: "Long renders can be queued onto a PhoneCloud fleet; shorter ones run locally." },
    ],
    screenshots: [
      { label: "Shot list editor" },
      { label: "UE5 scene preview" },
      { label: "Render queue" },
    ],
    links: { demo: null, github: null },
  },

  {
    id: "designprep",
    name: "DesignPrep",
    years: "2025",
    status: "build",
    statusLabel: "In Build",
    prop: "Vertical SaaS for interior designers. AI pre-meeting client briefing + persistent project chat through engagement lifecycle.",
    intro: "A vertical AI assistant for interior designers. Briefs clients before the first meeting and carries a persistent project memory through every engagement phase.",
    problem: "Designers re-build briefing context at every client meeting. There's no persistent AI memory of a project from intake through handoff.",
    built: [
      "Pre-meeting client briefing summarized by AI",
      "Persistent project briefing/chat carried across engagement phases",
      "Studio-grade onboarding UX",
      "Vertical SaaS direction — built for the workflow, not a generic chatbot",
    ],
    stack: ["FastAPI", "Next.js", "LLM"],
    proof: { metric: "Vertical SaaS", metricLabel: "interior design" },
    features: [
      { icon: "brain",  name: "Pre-meeting brief",   lead: "AI-prepped client context.", desc: "Drops a structured brief into the designer's hands before the first call. Pulls from prior chats, uploads, and intake form." },
      { icon: "flow",   name: "Persistent project",  lead: "One thread per engagement.", desc: "Context, decisions, and refs carry across phases — concept, schematic, dev, handoff." },
      { icon: "ingest", name: "Asset memory",        lead: "Uploads + extracted refs.", desc: "Mood boards, samples, and notes are searchable. Nothing lives in WhatsApp anymore." },
      { icon: "shield", name: "Studio multi-tenant", lead: "Per-studio data isolation.", desc: "Designed for small studios with multiple designers. Roles + project-level access controls." },
    ],
    screenshots: [
      { label: "Pre-meeting brief" },
      { label: "Project thread · concept phase" },
      { label: "Asset memory · mood boards" },
    ],
    links: { demo: null, github: null },
  },

  {
    id: "lithe",
    name: "Lithe",
    years: "2024",
    status: "live",
    statusLabel: "Live",
    prop: "Mobile-first health optimization PWA. Real-time CV meal analysis on Gemini 1.5 Flash.",
    intro: "A health-tracking PWA where you point the camera at your meal and the model does the rest. Serverless, mobile-first, installable.",
    problem: "Calorie-tracking apps require manual entry. People drop off in week two.",
    built: [
      "Serverless on AWS CDK + Cognito",
      "Gemini 1.5 Flash for real-time computer-vision meal analysis",
      "PWA shell, mobile-first UX, installable on iOS/Android",
      "Per-user state on Cognito-backed auth",
    ],
    stack: ["AWS CDK", "Cognito", "Gemini 1.5 Flash", "PWA"],
    proof: { metric: "Real-time", metricLabel: "CV meal analysis" },
    features: [
      { icon: "globe",  name: "Real-time CV",     lead: "Gemini 1.5 Flash on the meal frame.", desc: "Point the camera; estimates land in seconds. No tedious food-by-food entry." },
      { icon: "flow",   name: "Installable PWA",  lead: "Lives on the home screen.", desc: "No app stores, no friction. Same code path for iOS, Android, desktop." },
      { icon: "shield", name: "Cognito auth",     lead: "Per-user state, serverless.", desc: "Auth + sync handled by Cognito. State scoped per user; nothing shared." },
      { icon: "chart",  name: "Trend tracking",   lead: "Daily / weekly intake views.", desc: "Lightweight charts. Trends matter; individual meals don't." },
    ],
    screenshots: [
      { label: "Camera capture · meal scan" },
      { label: "Daily intake view" },
      { label: "Weekly trend chart" },
    ],
    links: { demo: null, github: null },
  },

  {
    id: "itr",
    name: "ITR Gateway",
    years: "2024 · design",
    status: "design",
    statusLabel: "Design + Docs Done",
    prop: "CA-managed Indian income-tax filing gateway. Specced end-to-end with DPDP/PII + India data residency handled.",
    intro: "A CA-facing workflow + taxpayer mobile app for managed income-tax filing in India. Specced end-to-end — architecture, data model, DPDP handling — not yet built.",
    problem: "CAs juggle WhatsApp, email, and physical docs every filing season. There's no purpose-built workflow with audit-trail and DPDP-compliant storage.",
    built: [
      "Taxpayer mobile app + CA web portal — both fully designed",
      "Document collection, status tracking, manual payment reconciliation, audit trail",
      "DPDP/PII handling, India data residency constraints",
      "Specced stack: FastAPI, React/Vite/TypeScript, Kotlin/Compose, AWS Lambda, API Gateway, S3, SQS, EventBridge",
      "Architecture diagrams, data model, and ops runbooks complete",
    ],
    stack: ["FastAPI", "React", "Vite", "TypeScript", "Kotlin", "Jetpack Compose", "Lambda", "API Gateway", "S3", "SQS"],
    proof: { metric: "Spec complete", metricLabel: "architecture + docs", extra: "Not deployable today" },
    features: [
      { icon: "flow",   name: "CA workflow",       lead: "Per-filing status workflow.", desc: "CAs manage many filings simultaneously. Each gets a state machine + audit trail." },
      { icon: "globe",  name: "Taxpayer app",      lead: "Kotlin / Compose native.", desc: "Document upload, status, and payment surfaced cleanly. Replaces WhatsApp PDF chains." },
      { icon: "shield", name: "DPDP-compliant",    lead: "PII handling baked into the data model.", desc: "India data residency on AWS Mumbai. Per-record access logs, configurable retention." },
      { icon: "lock",   name: "Audit trail",       lead: "Every state change logged.", desc: "Immutable audit log on EventBridge → S3 + CloudWatch. Easy export for compliance." },
    ],
    screenshots: [
      { label: "Taxpayer app · upload flow" },
      { label: "CA portal · filing list" },
      { label: "Architecture diagram" },
    ],
    links: { demo: null, github: null },
  },
];

window.EXPERIENCE = [
  {
    when: "Mar 2025 – Present",
    role: "Founder & Lead Engineer",
    company: "MYHRMS",
    sub: "formerly PeopleOps",
    bullets: [
      "Architected a multi-tenant serverless backend on AWS CDK with Cognito, Secrets Manager, and strict RBAC for banking compliance.",
      "Decoupled API Gateway from Lambda via SQS for bulk ops; cursor-based pagination across APIs for O(1) at scale.",
      "Engineered configurable workflow engine: multi-level approvals, leave proration/carry-forwards, dynamic payroll with LOP/overtime/statutory hooks.",
      "PostGIS-backed geofenced attendance with anomaly reporting and regularization workflows.",
      "Led market research and pricing negotiations with a multi-branch cooperative bank. Serverless design eliminates ~90% of idle infra cost vs EC2-equivalent.",
    ],
    tags: ["AWS CDK", "Lambda", "Aurora PG v2", "PostGIS", "Cognito", "SQS"],
  },
  {
    when: "Aug 2024 – Aug 2025",
    role: "Cloud Support Engineer I",
    company: "Amazon Web Services",
    sub: "Sev-1 escalation team · ~12 mo",
    bullets: [
      "Onboarded to special escalation teams handling business-critical cases across EU/US — near-100% CSAT.",
      "Resolved 50+ Sev-1 production outages, coordinating directly with service teams to restore operations for global clients.",
      "Led architecture reviews delivering up to 80% latency reduction and 90% infra cost savings on serverless and scaling.",
      "Built an internal upskilling tool that cut new-hire mentorship time by ~60%.",
    ],
    tags: ["Sev-1", "Architecture reviews", "Escalations"],
  },
  {
    when: "Sep 2023 – Aug 2024",
    role: "Cloud Support Associate",
    company: "Amazon Web Services",
    sub: "Customer-facing reviews · ~12 mo",
    bullets: [
      "Consulted enterprise customers on cloud architecture, scaling, and security across 600+ technical issues.",
      "Specialized in serverless (Lambda, API Gateway, SQS) and data services — turned around long-running cost and latency reviews.",
      "Mentored Cloud Support Engineer Interns through their ramp.",
    ],
    tags: ["Serverless", "Architecture reviews", "Customer-facing"],
  },
  {
    when: "Mar 2023 – Sep 2023",
    role: "Cloud Support Engineer Intern",
    company: "Amazon Web Services",
    sub: "Onboarding cohort · ~6 mo",
    bullets: [
      "Ramped into AWS Support across compute, networking, and storage domains.",
      "Closed an above-average ticket load during ramp; converted to full-time at the end of the internship window.",
    ],
    tags: ["EC2", "VPC", "S3", "Onboarding"],
  },
];

window.ARCHIVE = [
  { name: "ITR & tax calculators", desc: "Small calculators built before ITR Gateway was specced. Static React.", meta: "2023" },
  { name: "Tile / puzzle game", desc: "Browser tile-matching game. Hand-rolled animation loop, no library.", meta: "2022" },
  { name: "IoT learning projects", desc: "ESP32 + sensor experiments. Talked to Firebase before I knew better.", meta: "2021–22" },
  { name: "Frontend challenges", desc: "Frontend Mentor / coding challenge submissions from learning phase.", meta: "2021" },
  { name: "Early REST experiments", desc: "Node/Express APIs against MongoDB. Useful then; not in current stack.", meta: "2021" },
  { name: "First portfolio (dog photo era)", desc: "The 'creative curious learner' site. Retired with this rebuild.", meta: "2022" },
];

// Lookup helper used by the Project.html template
window.findProject = function(id) {
  return [...window.FEATURED, ...window.ACTIVE].find((p) => p.id === id);
};

window.ALL_PROJECTS = function() {
  return [...window.FEATURED, ...window.ACTIVE];
};
