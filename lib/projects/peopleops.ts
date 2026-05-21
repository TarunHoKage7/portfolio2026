import type { ProjectDetail } from "../data";

export const peopleops: ProjectDetail = {
  id: "peopleops",
  name: "PeopleOps HRMS",
  years: "2025 — Present",
  status: "build",
  statusLabel: "In active build",
  blurb:
    "Multi-tenant HRMS with Cognito-secured employee/admin flows, Postgres-backed attendance, leave, payroll, and a separate Supabase control plane.",
  intro:
    "PeopleOps HRMS is a multi-tenant HR platform built around AWS Lambda + Postgres, with employee/admin self-service on one side and a separate Supabase-backed control plane on the other. The core product covers attendance, leave, payroll, documents, dashboards, and tenant provisioning; the control plane adds deploy/bootstrap/provision/delete jobs that can survive AWS teardown.",
  problem:
    "SMB HR operations often split attendance, leave, payroll close, documents, and tenant onboarding across separate tools. This project consolidates those flows and adds an ops surface that can redeploy or destroy infra without losing tenant and job state.",
  built: [
    "AWS CDK v2 stack for VPC, API Gateway, Cognito, S3, Lambda layers, and Aurora PostgreSQL Serverless v2",
    "db_mode=supabase reuses the same Lambda handlers against Supabase Postgres instead of Aurora",
    "React 18 + Vite 5 SPA with protected routes for dashboard, employees, attendance, leave, documents, payroll close, and admin",
    "Attendance punches store PostGIS geography points and classify Late, GeoMismatch, EarlyLeave, and regularization actions",
    "Leave requests apply holiday/weekend exclusion, half days, probation and notice rules, monthly accruals, and carry forward",
    "Payroll generates prorated payslips, S3 PDFs, bank transfer CSVs, and close blockers from anomaly summaries",
    "Tenant APIs can create, provision, deactivate, and hard-delete orgs, including seeded roles, teams, levels, and users",
    "Platform jobs track aws, supabase, and local environments with GitHub dispatch plus HMAC-verified callbacks",
    "Scheduled payroll auto-run is only stubbed today; the full multi-tenant fan-out path is not built yet",
  ],
  features: [
    {
      icon: "shield",
      name: "Dual auth + tenant RBAC",
      lead: "Cognito for HRMS, Supabase Auth for /platform.",
      desc: "Portal routes use Cognito ID tokens plus DB-backed permission joins; platform routes require a Supabase PlatformOwner session. Helpers enforce same-org access, and platform tables run under forced RLS.",
    },
    {
      icon: "ingest",
      name: "Geofenced attendance engine",
      lead: "PostGIS punches, shift statusing, manager approvals.",
      desc: "Check-in/out writes geography points and uses ST_DWithin against work locations. The service derives Late, GeoMismatch, and EarlyLeave, supports offline timestamps, and upserts one regularization request per employee/day.",
    },
    {
      icon: "flow",
      name: "Leave policy + accrual engine",
      lead: "Policy rules, working-day math, monthly accruals.",
      desc: "Leave requests skip holidays and custom work patterns, including nth-Saturday rules and half days. Separate scheduled handlers apply monthly accruals and year-end carry forward with per-policy caps.",
    },
    {
      icon: "flow",
      name: "Payroll run + close gates",
      lead: "AST-safe formulas, YTD tax, anomaly-gated close.",
      desc: "Payroll runs evaluate salary formulas with a restricted AST, prorate by join/exit dates and absences, add overtime, and project tax from YTD data. Period close is blocked by unresolved anomaly summaries; the EventBridge auto-run path is still a stub.",
    },
    {
      icon: "audit",
      name: "Hash-chained audit ledger",
      lead: "SHA-256 linked records with before/after payloads.",
      desc: "Mutating services call a shared audit helper that stores previous_hash, signature, and JSON snapshots of changed state. Audit failure is logged but does not block the primary transaction.",
    },
    {
      icon: "split",
      name: "Independent platform control plane",
      lead: "Tenant/job surface that survives cdk destroy.",
      desc: "A Supabase-backed /platform API stores tenants, jobs, logs, environment state, and delete requests. Vercel functions dispatch GitHub Actions workflows, verify HMAC-signed webhooks, and can emit manual local command bundles.",
    },
  ],
  proof: {
    metric: "16 constructs",
    metricLabel: "service modules wired into the CDK app",
    extra: "3 target modes: aws, supabase, local",
  },
  stack: [
    "AWS CDK v2", "AWS Lambda (Python 3.12)", "API Gateway",
    "Aurora PostgreSQL Serverless v2", "Supabase Postgres", "PostGIS",
    "React 18", "Vite 5", "Amazon Cognito", "Supabase Auth",
    "S3", "Vercel", "GitHub Actions", "TanStack React Query",
  ],
  archCaption:
    "Vercel serves a React SPA and /api/platform; HRMS traffic goes through Cognito to API Gateway and Python Lambdas over Aurora or Supabase Postgres, with S3 for files and GitHub Actions plus signed webhooks for control-plane jobs.",
  links: [
    { kind: "demo",   label: "Live demo", href: "https://hrms-sigma-dusky.vercel.app/" },
    { kind: "github", label: "Source",    href: "https://github.com/TarunHoKage7/HRMS/tree/develop", private: true },
  ],
  linksNote: "Private repo · this page serves as the writeup",
};
