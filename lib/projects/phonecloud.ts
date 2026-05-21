import type { ProjectDetail } from "../data";

export const phonecloud: ProjectDetail = {
  id: "phonecloud",
  name: "PhoneCloud",
  years: "2026 — Present",
  status: "build",
  statusLabel: "In active build",
  blurb:
    "Local-first control plane that turns phones and PCs into leased workers for typed jobs, with queue safety, artifacts, metering, and operator tooling.",
  intro:
    "PhoneCloud is an API-first compute fabric for dispatching typed jobs onto disposable edge workers. A FastAPI control plane persists state in Postgres, schedules work onto phone or desktop nodes using capability and health signals, leases execution through Redis Streams, stores artifacts in MinIO, exposes live SSE telemetry, and ships both a Next.js operator console and an Android node agent.",
  problem:
    "Running small private compute clusters across phones and home hardware usually means ad-hoc scripts, no placement logic, and weak operational visibility. This project turns that into a typed control plane with queue safety, node health tracking, artifact storage, and operator tooling.",
  built: [
    "FastAPI control plane with 72 routes for nodes, jobs, job types, artifacts, secrets, metering, streaming, and mobile bootstrap",
    "Postgres schema for tenants, projects, jobs, nodes, artifacts, events, usage records, secret leases, and pairing tokens",
    "Redis Streams queue with XREADGROUP, XAUTOCLAIM reclaim, delayed retry zset, lease hashes, and DLQ fallback",
    "Weighted scheduler scoring model hotset, temperature, throughput, node mode, project stickiness, and priority",
    "Next.js 15 console for live logs, fleet actions, billing views, artifact search, job-type admin, and stack controls",
    "Kotlin/Compose Android worker with QR pairing, foreground service, wake lock, update checks, and local health probes",
    "MinIO presigned uploads, versioned artifact buckets, and per-project/per-node storage summaries",
    "Certificate bootstrap plus zero-downtime CA rollover scripts for server and client mTLS",
  ],
  features: [
    {
      icon: "split",
      name: "Control / data plane split",
      lead: "FastAPI owns desired state; workers stay disposable.",
      desc: "The control plane persists nodes, jobs, artifacts, events, and usage in Postgres, while phone or desktop agents execute work and report back over authenticated APIs.",
    },
    {
      icon: "flow",
      name: "Capability-aware scheduler",
      lead: "O(N) filtering plus weighted scoring over live node state.",
      desc: "Placement rejects nodes missing capabilities, runtime compatibility, or open-circuit conditions, then scores hot models, temperature, tokens/sec, stickiness, state, and priority before emitting decision events.",
    },
    {
      icon: "queue",
      name: "Lease queue + recovery",
      lead: "Redis Streams claims, renewals, reclaim, delayed retry, DLQ.",
      desc: "Jobs are leased with visibility timeouts, renewed by workers, requeued through a delayed zset on NACK, reclaimed via XAUTOCLAIM after crashes, and moved to a DLQ when retries are exhausted.",
    },
    {
      icon: "shield",
      name: "Mobile pairing + trust",
      lead: "2-QR onboarding with one-time pairing tokens and cert pinning.",
      desc: "Install QR serves the APK; Pair QR carries control-plane URL, tenant, node label, fingerprint, and TTL, then the token is consumed on first register. Human auth still uses static admin/user API keys; OIDC is planned, not built.",
    },
    {
      icon: "brain",
      name: "Heterogeneous runtime adapters",
      lead: "Mock, llama.cpp, Ollama, and allowlisted compute-shell backends.",
      desc: "JobTypes map task classes to runtime backends and capability sets. The Android service can bootstrap llama.cpp, while compute-shell jobs are restricted to an executable allowlist and safe working directories.",
    },
    {
      icon: "chart",
      name: "Metering, console, SSE",
      lead: "Live dashboards, p50/p95 runtime summaries, mock cost reports.",
      desc: "The Next.js console consumes manager, device, billing, storage, and log APIs plus SSE streams for job logs and scheduler events. Event replay and invoice-grade billing are explicitly planned, not built.",
    },
  ],
  proof: {
    metric: "72 routes",
    metricLabel: "control-plane endpoints",
    extra: "30 smoke/integration tests",
  },
  stack: [
    "Python 3.12", "FastAPI", "Next.js 15", "React 19",
    "PostgreSQL 16", "Redis 7 Streams", "MinIO", "SQLAlchemy 2",
    "Kotlin/Jetpack Compose", "Vault", "Prometheus", "Grafana", "Docker Compose",
  ],
  archCaption:
    "CLI, SDK, Next.js console, and Android phones talk to a FastAPI control plane backed by Postgres, Redis Streams, MinIO, and Vault; workers execute jobs, renew leases, publish logs, and expose Prometheus metrics while operators watch via SSE.",
  linksNote: "Private repo · this page serves as the writeup",
};
