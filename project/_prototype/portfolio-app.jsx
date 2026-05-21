// portfolio-app.jsx — Brittany Chiang–style intro page.
//   About (prose only) · Experience · Projects (4 + see-all) · Early Work · Contact.

const { useState, useEffect } = React;
const { Icon, StatusPill, ProjectRow, Sidebar, useScrollSpy } = window.PortfolioComponents;

const SECTIONS = [
  { id: "about",      label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects",   label: "Projects" },
  { id: "archive",    label: "Early Work" },
  { id: "contact",    label: "Contact" },
];

// ─────────────────────────────────────────────────────────────────
// About — Brittany-style prose paragraphs (no section header)
// ─────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" data-screen-label="About">
      <p className="lead">
        I'm an engineer who builds <strong>product-grade systems</strong> end-to-end on AWS —
        multi-tenant SaaS, distributed infrastructure, AI pipelines. I care about the
        unglamorous parts (RBAC, audit trails, queue lanes, cursor pagination) because they're
        what keeps real customers on the system after launch day.
      </p>
      <p className="lead" style={{ marginTop: 22 }}>
        Today I'm the founding engineer on <a className="ln" href="Project.html?id=peopleops">PeopleOps</a>,
        a multi-tenant HRMS for SMBs and Indian cooperative banks. Before that I spent ~29 months
        at <a className="ln" href="#experience">AWS</a> — Intern → Cloud Support Associate → Cloud Support
        Engineer I, with 600+ tickets, 50+ Sev-1s, and deep architecture reviews on serverless
        and scaling for global customers.
      </p>
      <p className="lead" style={{ marginTop: 22 }}>
        In between, I ship side bets: <a className="ln" href="Project.html?id=phonecloud">PhoneCloud</a>,
        a self-hosted cloud orchestrator that turns phones and PCs into a shared compute fabric;
        <a className="ln" href="Project.html?id=jobprep"> JobPrep</a>, a local-first interview-capability
        OS; and a few more I'd rather walk through in person.
      </p>
      <p className="lead" style={{ marginTop: 22 }}>
        Currently in Hyderabad. Comfortable working with EU/US teams. Open to founding-engineer
        roles, contract work, or design-partner pilots.
      </p>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Experience (3 AWS roles + MYHRMS, cert as line item)
// ─────────────────────────────────────────────────────────────────
function Experience() {
  const P = window.PROFILE;
  return (
    <section id="experience" data-screen-label="Experience">
      {window.EXPERIENCE.map((e, i) => (
        <article key={i} className="exp">
          <div className="exp-when">{e.when}</div>
          <div>
            <div className="exp-role">{e.role}</div>
            <div className="exp-co">
              {e.company}<span className="at">·</span>{e.sub}
            </div>
            <ul className="exp-bullets">
              {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
            <div className="exp-tags">
              {e.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
          </div>
        </article>
      ))}

      {/* Cert as a quiet line item — not a card */}
      <div className="exp exp-cert">
        <div className="exp-when">{P.cert.year}</div>
        <div>
          <div className="exp-role">{P.cert.title}</div>
          <div className="exp-co">{P.cert.issuer} <span className="at">·</span> Certification</div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Projects — 4 highlights only, then see-all link
// ─────────────────────────────────────────────────────────────────
function Projects() {
  // Show 4 highlights: 3 featured + Bug Bounty (best of the active set).
  const featured = window.FEATURED.slice(0, 3);
  const oneActive = window.ACTIVE.find((p) => p.id === "bugbounty");
  const highlights = oneActive ? [...featured, oneActive] : featured;
  const total = window.FEATURED.length + window.ACTIVE.length;
  return (
    <section id="projects" data-screen-label="Projects">
      <div className="pr-list">
        {highlights.map((p) => <ProjectRow key={p.id} proj={p} />)}
      </div>
      <a className="pr-archive-link" href="Projects.html">
        See all {total} projects
        <Icon.arrow style={{ width: 14, height: 14 }} />
      </a>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Archive accordion
// ─────────────────────────────────────────────────────────────────
function Archive() {
  const [open, setOpen] = useState(false);
  return (
    <section id="archive" data-screen-label="Early Work">
      <p className="lead" style={{ marginBottom: 28, color: "var(--tx-3)" }}>
        Calculators, tile games, IoT experiments, frontend challenges, early Node APIs.
        Useful when I built them. Not what I do now.
      </p>
      <div className="archive" data-open={open ? "true" : "false"}>
        <button className="arch-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
          <div className="arch-toggle-left">
            <span>{open ? "Hide early work" : "Show early work"}</span>
            <span className="arch-toggle-count">{window.ARCHIVE.length}</span>
          </div>
          <Icon.chev className="arch-chev" />
        </button>
        {open && (
          <div className="arch-body">
            {window.ARCHIVE.map((a, i) => (
              <div className="arch-item" key={i}>
                <div>
                  <div className="arch-name">{a.name}</div>
                  <div className="arch-desc">{a.desc}</div>
                </div>
                <div className="arch-meta">{a.meta}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────────────────────────
function Contact() {
  const P = window.PROFILE;
  return (
    <section id="contact" data-screen-label="Contact">
      <p className="lead">
        Founding engineer roles, contract work, or a design-partner pilot — pick a channel and
        I'll reply within 24 hours. Based in <strong>Hyderabad</strong>, comfortable working with
        EU/US teams.
      </p>
      <div className="contact-actions" style={{ marginTop: 28 }}>
        <a className="btn btn-primary" href={`mailto:${P.email}`}>
          <Icon.mail style={{ width: 14, height: 14 }} />
          {P.email}
        </a>
        <a className="btn" href={P.linkedin} target="_blank" rel="noopener">
          <Icon.li style={{ width: 14, height: 14 }} /> LinkedIn
          <Icon.ext style={{ width: 11, height: 11 }} />
        </a>
        <a className="btn" href={P.github} target="_blank" rel="noopener">
          <Icon.gh style={{ width: 14, height: 14 }} /> GitHub
          <Icon.ext style={{ width: 11, height: 11 }} />
        </a>
      </div>

      <footer style={{ marginTop: 72, fontSize: 12, color: "var(--tx-4)", display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: 12, fontFamily: "var(--font-mono)" }}>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Tweaks
// ─────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#8b8df0",
  "fontHeading": "Geist",
  "density": "regular",
  "theme": "dark"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const current = useScrollSpy(SECTIONS.map((s) => s.id));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme);
    document.documentElement.setAttribute("data-density", t.density);
    document.documentElement.style.setProperty("--accent", t.accent);
    const rgb = hexToRgb(t.accent);
    if (rgb) {
      document.documentElement.style.setProperty("--accent-tint", `rgba(${rgb.r},${rgb.g},${rgb.b},0.12)`);
      document.documentElement.style.setProperty("--accent-line", `rgba(${rgb.r},${rgb.g},${rgb.b},0.35)`);
    }
    const headingFont = t.fontHeading === "Geist Mono"
      ? `"Geist Mono", ui-monospace, monospace`
      : t.fontHeading === "Space Grotesk"
        ? `"Space Grotesk", ui-sans-serif, sans-serif`
        : t.fontHeading === "JetBrains Mono"
          ? `"JetBrains Mono", ui-monospace, monospace`
          : `"Geist", ui-sans-serif, sans-serif`;
    document.documentElement.style.setProperty("--font-sans", headingFont + ", ui-sans-serif, system-ui, sans-serif");
  }, [t]);

  return (
    <>
      <div className="grid-bg" aria-hidden="true"></div>
      <div className="shell">
        <Sidebar sections={SECTIONS} currentSection={current} />
        <main className="main">
          <About />
          <Experience />
          <Projects />
          <Archive />
          <Contact />
        </main>
      </div>

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={["#8b8df0", "#3ecf8e", "#f5a524", "#ff6b6b", "#06b6d4"]}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakRadio
          label="Mode"
          value={t.theme}
          options={["dark", "light"]}
          onChange={(v) => setTweak("theme", v)}
        />

        <TweakSection label="Typography & spacing" />
        <TweakSelect
          label="Heading font"
          value={t.fontHeading}
          options={["Geist", "Space Grotesk", "JetBrains Mono", "Geist Mono"]}
          onChange={(v) => setTweak("fontHeading", v)}
        />
        <TweakRadio
          label="Density"
          value={t.density}
          options={["compact", "regular", "spacious"]}
          onChange={(v) => setTweak("density", v)}
        />
      </TweaksPanel>
    </>
  );
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
