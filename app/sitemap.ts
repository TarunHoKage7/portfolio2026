import type { MetadataRoute } from "next";
import { featured } from "@/lib/data";

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "https://tarun.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,              lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/skills`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = featured.map((p) => ({
    url: `${BASE}/projects/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
