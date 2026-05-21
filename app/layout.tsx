import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CursorAura } from "@/components/CursorAura";
import { GridBackground } from "@/components/GridBackground";
import { profile } from "@/lib/data";

/**
 * Self-hosted Geist fonts — woff2 files bundled in app/fonts/ so builds work
 * offline or in restricted environments (no Google Fonts fetch at build time).
 */
const geistSans = localFont({
  variable: "--font-geist-sans",
  display: "swap",
  src: [
    { path: "./fonts/geist-latin.woff2",     weight: "100 900", style: "normal" },
    { path: "./fonts/geist-latin-ext.woff2", weight: "100 900", style: "normal" },
  ],
});

const geistMono = localFont({
  variable: "--font-geist-mono",
  display: "swap",
  src: [
    { path: "./fonts/geist-mono-latin.woff2",     weight: "100 900", style: "normal" },
    { path: "./fonts/geist-mono-latin-ext.woff2", weight: "100 900", style: "normal" },
  ],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://tarun.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  authors: [{ name: profile.name }],
  keywords: [
    "Cloud Engineer", "AI Engineer", "AWS", "Serverless", "SaaS",
    "Next.js", "FastAPI", "Full Stack", "Founding Engineer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: profile.name,
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <GridBackground />
        <CursorAura />
        {children}
      </body>
    </html>
  );
}
