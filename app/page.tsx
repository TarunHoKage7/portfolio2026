import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { ProjectRow } from "@/components/ProjectRow";
import { Sidebar } from "@/components/Sidebar";
import { MobileNavMenu } from "@/components/MobileNavMenu";
import { LinkedInIcon, GitHubIcon, MailIcon } from "@/components/icons";
import { experience, featured, homeHighlights, archive, profile } from "@/lib/data";
import { featuredSkills } from "@/lib/skills";

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
      <div className="space-y-20">
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
          <div className="eyebrow mb-8">Experience</div>
          <div className="space-y-12">
            {experience.map((e) => (
              <article key={e.company} className="spotlight grid grid-cols-[110px_1fr] gap-6 -mx-4 px-4 py-4 rounded-xl hover:bg-bg-elev/50 transition-colors">
                <div className="font-mono text-[10.5px] tracking-widest uppercase text-tx-4 pt-1">
                  {e.when}
                </div>
                <div>
                  <div className="text-[16px] text-tx font-semibold leading-snug">{e.role}</div>
                  <div className="text-[14px] text-tx-3 mt-1.5">
                    {e.company}
                    {e.sub && <span className="text-tx-4"> · {e.sub}</span>}
                  </div>
                  <ul className="mt-5 space-y-3 text-[14.5px] text-tx-2 leading-relaxed list-disc pl-5 marker:text-tx-5">
                    {e.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {e.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" aria-label="Projects">
          <div className="eyebrow mb-8">Projects</div>
          <div className="space-y-4">
            {homeHighlights.map((p) => <ProjectRow key={p.id} project={p} maxStack={6} />)}
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 mt-10 text-[13.5px] font-medium text-tx-2 hover:text-accent transition-colors"
          >
            View all {featured.length} projects
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </Link>
        </section>

        <section id="skills" aria-label="Skills">
          <div className="eyebrow mb-8">Skills</div>
          <p className="lead mb-6">
            I work across <strong>serverless backends</strong>, data &amp; storage, observability,
            and increasingly AI pipelines. Languages: Python, TypeScript, SQL.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {featuredSkills.map((s) => <span key={s} className="tag">{s}</span>)}
          </div>
          <Link
            href="/skills"
            className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-tx-2 hover:text-accent transition-colors"
          >
            Browse all clusters
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </Link>
        </section>

        <section id="archive" aria-label="Early Work">
          <div className="eyebrow mb-8">Early work</div>
          <p className="lead mb-6">
            Calculators, tile games, IoT experiments, early Node APIs. Useful when I built them.
            Not what I do now.
          </p>
          <div className="divide-y divide-line border-y border-line">
            {archive.map((a) => (
              <div key={a.name} className="spotlight flex items-baseline justify-between gap-6 py-4 -mx-3 px-3 rounded-md hover:bg-bg-elev/40 transition-colors">
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
          <div className="eyebrow mb-8">Contact</div>
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
