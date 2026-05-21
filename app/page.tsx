import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { ProjectRow } from "@/components/ProjectRow";
import { Sidebar } from "@/components/Sidebar";
import { MobileNavMenu } from "@/components/MobileNavMenu";
import { LinkedInIcon, GitHubIcon, MailIcon } from "@/components/icons";
import { experience, featured, homeHighlights, archive, profile } from "@/lib/data";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "archive", label: "Early Work" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
    <MobileNavMenu sections={SECTIONS} />
    <PageShell sidebar={<Sidebar sections={SECTIONS} />} sidebarSpan={5}>
      <div className="space-y-24">
        <section id="about" aria-label="About">
          <p className="lead">
            I&apos;m an engineer who builds <strong>product-grade systems</strong> end-to-end on AWS —
            multi-tenant SaaS, distributed infra, AI pipelines. I care about the unglamorous parts
            (RBAC, audit trails, queue lanes, cursor pagination) because they&apos;re what keeps real
            customers on the system after launch day.
          </p>
          <p className="lead">
            Today I&apos;m the founding engineer on{" "}
            <Link className="ln" href="/projects/peopleops">PeopleOps</Link>, a multi-tenant HRMS for
            SMBs and Indian cooperative banks. Before that, ~29 months at{" "}
            <a className="ln" href="#experience">AWS</a> — Intern → Cloud Support Associate →
            Cloud Support Engineer I, with 600+ tickets, 50+ Sev-1s, and deep architecture reviews
            across serverless and scaling.
          </p>
          <p className="lead">
            Currently in Hyderabad. Comfortable working with EU/US teams. Open to founding-engineer
            roles, contract work, or design-partner pilots.
          </p>
        </section>

        <section id="experience" aria-label="Experience">
          <div className="space-y-10">
            {experience.map((e, i) => (
              <article key={i} className="grid grid-cols-[110px_1fr] gap-6">
                <div className="font-mono text-[10.5px] tracking-widest uppercase text-tx-4 pt-1">
                  {e.when}
                </div>
                <div>
                  <div className="text-[15px] text-tx font-medium">{e.role}</div>
                  <div className="text-[14px] text-tx-3 mt-0.5">
                    {e.company}
                    {e.sub && <span className="text-tx-4"> · {e.sub}</span>}
                  </div>
                  <ul className="mt-3 space-y-1.5 text-[14px] text-tx-2 list-disc pl-5 marker:text-tx-5">
                    {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" aria-label="Projects">
          <div className="space-y-1">
            {homeHighlights.map((p) => <ProjectRow key={p.id} project={p} maxStack={6} />)}
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 mt-8 text-[14px] font-medium text-tx border-b border-line-strong hover:text-accent hover:border-accent transition-colors pb-1"
          >
            See all {featured.length} projects <span aria-hidden>→</span>
          </Link>
        </section>

        <section id="skills" aria-label="Skills">
          <p className="lead mb-6">
            I work across <strong>serverless backends</strong>, data &amp; storage, observability,
            and increasingly AI pipelines. Languages: Python, TypeScript, SQL.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              "AWS Lambda", "API Gateway", "AWS CDK", "Aurora Postgres",
              "PostGIS", "Redis Streams", "FastAPI", "Python",
              "TypeScript", "Docker", "Gemini", "OpenAI API",
            ].map((s) => <span key={s} className="tag">{s}</span>)}
          </div>
          <Link
            href="/skills"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-tx border-b border-line-strong hover:text-accent hover:border-accent transition-colors pb-1"
          >
            Browse all clusters <span aria-hidden>&#x2192;</span>
          </Link>
        </section>

        <section id="archive" aria-label="Early Work">
          <p className="lead mb-6">
            Calculators, tile games, IoT experiments, early Node APIs. Useful when I built them.
            Not what I do now.
          </p>
          <div className="divide-y divide-line border-y border-line">
            {archive.map((a, i) => (
              <div key={i} className="flex items-baseline justify-between gap-6 py-3.5">
                <div className="min-w-0">
                  <div className="text-[14px] text-tx-2">{a.name}</div>
                  <div className="text-[13px] text-tx-4 mt-0.5">{a.desc}</div>
                </div>
                <div className="font-mono text-[10.5px] tracking-widest uppercase text-tx-4 shrink-0">
                  {a.meta}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" aria-label="Contact">
          <p className="lead">
            Founding engineer roles, contract work, or a design-partner pilot &mdash; pick a channel
            and I&apos;ll reply within 24 hours.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent/15 border border-accent/40 text-tx text-[13.5px] font-medium hover:bg-accent/25 transition-colors"
            >
              <MailIcon className="size-3.5 shrink-0" />
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-bg-panel border border-line-strong text-tx-2 text-[13.5px] font-medium hover:text-tx hover:border-line-bright transition-colors"
            >
              <LinkedInIcon className="size-3.5 shrink-0" />
              LinkedIn
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-bg-panel border border-line-strong text-tx-2 text-[13.5px] font-medium hover:text-tx hover:border-line-bright transition-colors"
            >
              <GitHubIcon className="size-3.5 shrink-0" />
              GitHub
            </a>
          </div>
          <footer className="mt-20 text-[11.5px] font-mono text-tx-5 flex justify-end">
            &copy; {new Date().getFullYear()}
          </footer>
        </section>
      </div>
    </PageShell>
    </>
  );
}
