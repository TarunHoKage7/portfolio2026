import { peopleops } from "./projects/peopleops";
import { phonecloud } from "./projects/phonecloud";
import { jobprep } from "./projects/jobprep";
import { designprep } from "./projects/designprep";
import { itr } from "./projects/itr";
import { ytstudio } from "./projects/ytstudio";
import { bountybrain } from "./projects/bountybrain";

export type ProjectStatus = "production" | "live" | "build" | "design";
export type StatusKind = ProjectStatus | "openToWork";

export type FeatureIcon =
  | "shield" | "globe" | "flow"   | "scale"
  | "queue"  | "lock"  | "split"  | "mesh"
  | "chart"  | "brain" | "ingest" | "audit";

export interface Feature {
  icon: FeatureIcon;
  name: string;
  lead: string;
  desc: string;
}

export interface Proof {
  metric: string;
  metricLabel: string;
  extra?: string;
}

export type LinkKind = "demo" | "github" | "website" | "writeup";

export interface ProjectLink {
  kind: LinkKind;
  label: string;
  href: string;
  /** Render with a lock icon. Use for repos / demos that are private or auth-walled. */
  private?: boolean;
}

/** Lightweight summary used in lists, cards, and rows. */
export interface Project {
  id: string;
  name: string;
  sub?: string;
  years: string;
  status: ProjectStatus;
  statusLabel: string;
  blurb: string;
  stack: string[];
}

/** Full per-project content used on /projects/[id]/. */
export interface ProjectDetail extends Project {
  intro: string;
  problem: string;
  built: string[];
  features: Feature[];
  proof: Proof;
  archCaption?: string;
  links?: ProjectLink[];
  /** Shown when `links` is absent or empty (e.g., "Demo available on request"). */
  linksNote?: string;
}

export interface Profile {
  name: string;
  role: string;
  cert?: string;
  tagline: string;
  location: string;
  status: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface Experience {
  when: string;
  role: string;
  company: string;
  sub?: string;
  bullets: string[];
  tags: string[];
}

export interface ArchiveEntry {
  name: string;
  desc: string;
  meta: string;
}

export const profile: Profile = {
  name: "Sai Kalyan Tarun Vadlamudi",
  role: "Cloud & AI Engineer",
  cert: "AWS Certified Solutions Architect · SAA-C03",
  tagline:
    "I architect and ship serverless SaaS, multi-tenant systems, distributed infra, and AI pipelines.",
  location: "Hyderabad, India",
  status: "Open to work",
  email: "saikalyantarun2001@gmail.com",
  linkedin: "https://www.linkedin.com/in/tarunsaikalyanvadlamudi/",
  github: "https://github.com/TarunHoKage7",
};

export const experience: Experience[] = [
  {
    when: "2025 — Present",
    role: "Founding Engineer",
    company: "PeopleOps HRMS",
    bullets: [
      "AWS CDK v2 stack (VPC, API Gateway, Cognito, Aurora PG Serverless v2) — the same Lambda handlers run against Supabase Postgres in db_mode=supabase.",
      "PostGIS-backed attendance engine: ST_DWithin geofence classification (Late, GeoMismatch, EarlyLeave) with offline timestamps + manager regularization.",
      "Payroll engine with AST-safe formula evaluation, prorated payslips, YTD tax projection, and anomaly-gated period close.",
      "Independent Supabase control plane (/platform): tenant + job + env state survives infra teardown; GitHub Actions dispatch + HMAC-signed callbacks.",
    ],
    tags: ["AWS CDK v2", "Lambda", "Aurora PG", "Supabase PG", "PostGIS", "Cognito", "Vercel"],
  },
  {
    when: "2023 — 2025",
    role: "Cloud Support Engineer I",
    company: "Amazon Web Services",
    bullets: [
      "600+ tickets, 50+ Sev-1s across serverless and scaling.",
      "Deep architecture reviews for global customers.",
    ],
    tags: ["Lambda", "API Gateway", "DynamoDB", "CloudWatch"],
  },
];

export const featured: ProjectDetail[] = [
  peopleops,
  designprep,
  itr,
  ytstudio,
  bountybrain,
  phonecloud,
  jobprep,
];

/** Subset shown on the home page Projects section. Full list lives at /projects. */
export const homeHighlights: ProjectDetail[] = [peopleops, designprep, phonecloud];

export function getProjectById(id: string): ProjectDetail | undefined {
  return featured.find((p) => p.id === id);
}

export const archive: ArchiveEntry[] = [
  { name: "Tile Game", desc: "Browser puzzle, vanilla JS canvas.", meta: "2022" },
  { name: "IoT Pet Feeder", desc: "ESP32 + MQTT + Lambda fan-out.", meta: "2021" },
  { name: "EMI Calculator", desc: "First React app, deployed on Netlify.", meta: "2020" },
];
