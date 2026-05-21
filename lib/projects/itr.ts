import type { ProjectDetail } from "../data";

export const itr: ProjectDetail = {
  id: "itr",
  name: "ITR Gateway",
  years: "2026 — Present",
  status: "design",
  statusLabel: "Architecture specified · implementation pending",
  blurb:
    "Spec-first platform for CA-managed ITR filing in India, covering encrypted document intake, CA workflows, payment status, and auditability.",
  intro:
    "ITR Gateway is a multi-tenant workflow system for Indian CA firms to collect taxpayer documents, track filing state, reconcile manual UPI payments, and preserve an audit trail while the actual return is still filed manually on the Income Tax Department portal. This repo currently contains the architecture, contracts, security model, and delivery plan rather than shipped application code.",
  problem:
    "Indian taxpayers often send tax documents over ad-hoc channels while CAs track status, missing docs, and payment manually. DIY tax apps optimize self-filing, but this project is aimed at CA-managed filing with stronger document handling, tenancy boundaries, and audit requirements.",
  built: [
    "OpenAPI 3.1 draft with 47 paths across taxpayer auth, filings, documents, DSR, CA portal, and MSG91 webhooks",
    "JSON Schema event catalog with 11 async event types for filing changes, notifications, DSR jobs, and audit archival",
    "AWS Mumbai topology with API Gateway, bounded-context Lambdas, Supabase Postgres, S3, SQS, EventBridge, and CloudFront",
    "Postgres-first domain and data model with firm tenancy, RLS, idempotency storage, retention jobs, and audit partitions",
    "Security spec for HS256 JWTs, Argon2id passwords, client-side AES-256-GCM, RSA-OAEP key wrapping, and Ed25519 attestation",
    "Observability + resilience docs covering structured logs, PII redaction, X-Ray traces, 18 alarms, DLQs, retries, and circuit breakers",
    "Postman collection and traceability docs linking screens, APIs, events, and planned backend function contracts",
  ],
  features: [
    {
      icon: "lock",
      name: "Client-side document encryption",
      lead: "AES-256-GCM uploads with RSA-wrapped per-file keys.",
      desc: "V1 is specified to encrypt files on-device before presigned S3 upload, store wrapped DEKs plus SHA-256 hashes, and decrypt only on explicit CA access. Designed in docs and contracts; not implemented yet.",
    },
    {
      icon: "flow",
      name: "Filing workflow FSM",
      lead: "7-state filing lifecycle with explicit transitions.",
      desc: "The spec models filing creation, subject capture, income-source setup, document collection, invoicing, filed status, and completion, with row-level locking on state advance. Specified, not implemented yet.",
    },
    {
      icon: "shield",
      name: "Multi-tenant CA portal auth",
      lead: "Argon2id passwords, phone OTP, RBAC, and RLS.",
      desc: "CA access is designed around firm-scoped roles, Postgres row-level security, JWT revocation, and 404-on-cross-firm access to avoid existence leaks. Built as architecture and contract work; implementation pending.",
    },
    {
      icon: "queue",
      name: "Async jobs + retention",
      lead: "SQS workers and EventBridge cron for slow paths.",
      desc: "Notifications, DSR jobs, document retention, idempotency cleanup, and audit archival are modeled as queue or scheduled flows with retries, DLQs, and bounded auto-redrive. Specified in event schemas; not built yet.",
    },
    {
      icon: "audit",
      name: "DPDP + forensic trail",
      lead: "DSR export/delete plus append-only audit retention.",
      desc: "The repo defines a 7-day DSR delete grace window, 90-day document purge, monthly audit archival, and about 50 audit kinds with synchronous same-transaction writes. Documented in depth; implementation pending.",
    },
    {
      icon: "scale",
      name: "Zero-idle-cost AWS design",
      lead: "Mumbai-only serverless plan for low-volume V1 traffic.",
      desc: "The planned deploy avoids VPCs and WAF v2, uses API Gateway, Lambda, Supabase, and S3, and targets ₹0 idle infra and under ₹500/month at roughly 100 filings per month. Infra code is planned, not shipped here.",
    },
  ],
  proof: {
    metric: "47 paths",
    metricLabel: "OpenAPI 3.1 routes already specified",
    extra: "+ 11 JSON Schema async event types",
  },
  stack: [
    "OpenAPI 3.1", "FastAPI", "Python 3.12", "Pydantic v2", "SQLAlchemy 2.0",
    "AWS Lambda", "API Gateway HTTP API", "Supabase Postgres", "S3", "SQS",
    "EventBridge Scheduler", "SSM Parameter Store",
    "React 18 + Vite + TypeScript", "Kotlin + Jetpack Compose",
    "MSG91", "FCM", "CloudWatch", "X-Ray", "Terraform", "GitHub Actions",
  ],
  archCaption:
    "Android and React clients call a single API Gateway HTTP API that routes into bounded-context Lambdas backed by Supabase Postgres, S3, and Parameter Store; SQS and EventBridge handle async work and retention, all pinned to AWS Mumbai.",
  linksNote: "Private repo · this page summarizes a spec-first build still in pre-code phase",
};
