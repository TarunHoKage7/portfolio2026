// project-detail-app.jsx — Single project template. Loads project by ?id= URL param.
// Layout: hero → links → info bento → architecture viewer → Supabase-style features bento → screenshots → prev/next.

const { useState, useEffect } = React;
const { Icon, StatusPill } = window.PortfolioComponents;

// ─────────────────────────────────────────────────────────────────
// Sidebar with siblings TOC
// ─────────────────────────────────────────────────────────────────
function DetailSidebar({ proj, all }) {
  const P = window.PROFILE;
  const features = proj.features || [];
  return (
    <aside className="sidebar">
      <div>
        <h1 className="sb-name">{proj.name}</h1>
        <div className="sb-role">{proj.sub || proj.years}</div>
        <p className="sb-tag">{proj.prop}</p>
        <div className="sb-status">{proj.statusLabel} · {proj.years}</div>
      </div>

      <nav className="sb-nav">
        <a className="sb-nav-item" href="Projects.html">
          <span style={{ marginLeft: 4 }}>← All projects</span>
        </a>
        <a className="sb-nav-item" href="#pd-arch">
          <span style={{ marginLeft: 4 }}>Architecture</span>
        </a>
        {features.length > 0 && (
          <div className="sb-nav-group-label">Features</div>
        )}
        {features.map((f, i) => (
          <a
            key={i}
            className="sb-nav-item sb-nav-item--feat"
            href={`#feat-${i}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(`feat-${i}`);
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 32;
                window.scrollTo({ top, behavior: "smooth" });
                history.replaceState(null, "", `#feat-${i}`);
              }
            }}
          >
            <span style={{ marginLeft: 4 }}>{f.name}</span>
          </a>
        ))}
        <a className="sb-nav-item" href="#pd-shots" style={{ marginTop: 6 }}>
          <span style={{ marginLeft: 4 }}>Screens</span>
        </a>
      </nav>

      <div className="sb-foot">
        <div className="sb-socials">
          <a href={`mailto:${P.email}`} aria-label="Email"><Icon.mail /></a>
          <a href={P.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><Icon.li /></a>
          <a href={P.github} target="_blank" rel="noopener" aria-label="GitHub"><Icon.gh /></a>
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────
// Project hero
// ─────────────────────────────────────────────────────────────────
function DetailHero({ proj, num, total }) {
  const links = proj.links || {};
  return (
    <section className="pd-section" data-screen-label={`Detail · ${proj.name} · hero`}>
      <div className="pd-eyebrow">
        <span className="num">{String(num).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <span>{proj.years}</span>
        <StatusPill status={proj.status} label={proj.statusLabel} />
      </div>
      <h1 className="pd-title">
        {proj.name}
        {proj.sub && <span className="sub"> / {proj.sub}</span>}
      </h1>
      <p className="pd-prop">{proj.prop}</p>
      <p className="pd-intro">{proj.intro || proj.problem}</p>

      {(links.demo || links.github) && (
        <div className="pd-links">
          {links.demo && (
            <a className="btn btn-primary" href={links.demo} target="_blank" rel="noopener">
              <Icon.ext style={{ width: 13, height: 13 }} />
              Live demo
            </a>
          )}
          {links.github && (
            <a className="btn" href={links.github} target="_blank" rel="noopener">
              <Icon.gh style={{ width: 14, height: 14 }} />
              GitHub
              <Icon.ext style={{ width: 11, height: 11 }} />
            </a>
          )}
        </div>
      )}
      {!links.demo && !links.github && (
        <div className="pd-links">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--tx-4)", padding: "10px 0", letterSpacing: "0.04em" }}>
            Repo is private · walkthrough on request
          </span>
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Info bento (Problem + What I built + Stack + Metric)
// ─────────────────────────────────────────────────────────────────
function DetailInfo({ proj }) {
  return (
    <section className="pd-section" data-screen-label={`Detail · ${proj.name} · info`}>
      <header className="pd-section-head">
        <div className="pd-section-eyebrow">01 · The system</div>
        <h2 className="pd-section-title">What it does, how it's built.</h2>
      </header>

      <div className="pd-info">
        <div className="pd-card">
          <div>
            <div className="pd-card-label">Problem</div>
            <p style={{ marginTop: 8 }}>{proj.problem}</p>
          </div>
          <div>
            <div className="pd-card-label">What I built</div>
            <ul style={{ marginTop: 8 }}>
              {proj.built.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {proj.proof && (
            <div className="pd-metric-grid">
              <div className="pd-metric">
                <strong>{proj.proof.metric}</strong>
                <span>{proj.proof.metricLabel}</span>
              </div>
              {proj.proof.extra && (
                <div className="pd-metric">
                  <strong style={{ fontSize: 16, fontWeight: 500, color: "var(--tx-2)", letterSpacing: 0 }}>{proj.proof.extra}</strong>
                  <span>note</span>
                </div>
              )}
            </div>
          )}
          <div className="pd-stack-card">
            <div className="pd-card-label">Stack</div>
            <div className="pd-stack-tags">
              {proj.stack.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Architecture viewer
// ─────────────────────────────────────────────────────────────────
function DetailArch({ proj }) {
  const Arch = window.ArchDiagrams[proj.id];
  return (
    <section className="pd-section" id="pd-arch" data-screen-label={`Detail · ${proj.name} · architecture`}>
      <header className="pd-section-head">
        <div className="pd-section-eyebrow">02 · Architecture</div>
        <h2 className="pd-section-title">How the pieces fit.</h2>
        <p className="pd-section-sub">
          {Arch
            ? "Live system topology. Lines pulse when a request is in flight."
            : "Diagram coming. The system is documented and walkable on a call."}
        </p>
      </header>

      <div className="pd-arch">
        <div className="pd-arch-chrome">
          <span className="pd-arch-chrome-label">
            {proj.id}-architecture.svg
          </span>
        </div>
        <div className="pd-arch-body">
          {Arch ? <Arch /> : (
            <div className="pd-arch-placeholder">
              <span>architecture diagram · in progress</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Supabase-style features bento
// ─────────────────────────────────────────────────────────────────
function DetailFeatures({ proj }) {
  if (!proj.features || !proj.features.length) return null;
  return (
    <section className="pd-section" data-screen-label={`Detail · ${proj.name} · features`}>
      <header className="pd-section-head">
        <div className="pd-section-eyebrow">03 · Features</div>
        <h2 className="pd-section-title">Built in. Not bolted on.</h2>
        <p className="pd-section-sub">
          The pieces that make this system work for real customers — not a demo on a happy path.
        </p>
      </header>

      <div className="pd-features">
        {proj.features.map((f, i) => {
          const I = window.PortfolioComponents.Icon[f.icon] || (() => null);
          return (
            <article className="pd-feat" id={`feat-${i}`} key={i}>
              <I className="pd-feat-icon" />
              <h3 className="pd-feat-name">{f.name}</h3>
              <div className="pd-feat-lead">{f.lead}</div>
              <p className="pd-feat-desc">{f.desc}</p>
              <div className="pd-feat-visual" aria-hidden="true"></div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Screenshots gallery
// ─────────────────────────────────────────────────────────────────
function DetailShots({ proj }) {
  if (!proj.screenshots || !proj.screenshots.length) return null;
  return (
    <section className="pd-section" id="pd-shots" data-screen-label={`Detail · ${proj.name} · screenshots`}>
      <header className="pd-section-head">
        <div className="pd-section-eyebrow">04 · Screens</div>
        <h2 className="pd-section-title">What it actually looks like.</h2>
        <p className="pd-section-sub">
          Sanitized screenshots — real data redacted. Full walkthrough available on a call.
        </p>
      </header>

      <div className="pd-shots">
        {proj.screenshots.map((s, i) => (
          <div className="pd-shot" key={i}>
            <div className="pd-shot-chrome">
              <span className="pd-shot-chrome-label">{proj.id}-{String(i + 1).padStart(2, "0")}.png</span>
            </div>
            <div className="pd-shot-body">
              <span>{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// Prev / Next
// ─────────────────────────────────────────────────────────────────
function DetailNav({ proj, all }) {
  const idx = all.findIndex((p) => p.id === proj.id);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;
  return (
    <section className="pd-section" data-screen-label="Detail · prev/next">
      <div className="pd-next">
        {prev ? (
          <a className="pd-next-card" data-dir="prev" href={`Project.html?id=${prev.id}`}>
            <span className="pd-next-label">← Previous</span>
            <span className="pd-next-name">{prev.name}</span>
          </a>
        ) : (
          <a className="pd-next-card" data-dir="prev" href="Projects.html">
            <span className="pd-next-label">←</span>
            <span className="pd-next-name">All projects</span>
          </a>
        )}
        {next ? (
          <a className="pd-next-card" data-dir="next" href={`Project.html?id=${next.id}`}>
            <span className="pd-next-label">Next →</span>
            <span className="pd-next-name">{next.name}</span>
          </a>
        ) : (
          <a className="pd-next-card" data-dir="next" href="Portfolio.html#contact">
            <span className="pd-next-label">→</span>
            <span className="pd-next-name">Get in touch</span>
          </a>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// 404 — unknown id
// ─────────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true"></div>
      <div className="shell">
        <aside className="sidebar">
          <div>
            <h1 className="sb-name">404</h1>
            <div className="sb-role">Unknown project</div>
            <p className="sb-tag">That id isn't on the list. Head back and pick one.</p>
          </div>
          <div className="sb-foot">
            <a className="sb-cta" href="Projects.html">
              <Icon.arrow style={{ width: 14, height: 14, transform: "rotate(180deg)" }} />
              All projects
            </a>
          </div>
        </aside>
        <main className="main">
          <section>
            <p className="lead">
              Try one of: {window.ALL_PROJECTS().map((p, i) => (
                <span key={p.id}>
                  {i > 0 && ", "}
                  <a className="ln" href={`Project.html?id=${p.id}`}>{p.name}</a>
                </span>
              ))}.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// Tweaks
// ─────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#8b8df0",
  "theme": "dark",
  "density": "regular"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const proj = id ? window.findProject(id) : null;
  const all = window.ALL_PROJECTS();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme);
    document.documentElement.setAttribute("data-density", t.density);
    document.documentElement.style.setProperty("--accent", t.accent);
    const rgb = hexToRgb(t.accent);
    if (rgb) {
      document.documentElement.style.setProperty("--accent-tint", `rgba(${rgb.r},${rgb.g},${rgb.b},0.12)`);
      document.documentElement.style.setProperty("--accent-line", `rgba(${rgb.r},${rgb.g},${rgb.b},0.35)`);
    }
  }, [t]);

  // Update document title to project
  useEffect(() => {
    if (proj) document.title = `${proj.name} — ${window.PROFILE.nameShort}`;
  }, [proj]);

  if (!proj) {
    return (
      <>
        <NotFound />
        <TweaksPanel>
          <TweakSection label="Theme" />
          <TweakColor label="Accent" value={t.accent}
            options={["#8b8df0", "#3ecf8e", "#f5a524", "#ff6b6b", "#06b6d4"]}
            onChange={(v) => setTweak("accent", v)} />
          <TweakRadio label="Mode" value={t.theme}
            options={["dark", "light"]} onChange={(v) => setTweak("theme", v)} />
        </TweaksPanel>
      </>
    );
  }

  const num = all.findIndex((p) => p.id === proj.id) + 1;

  return (
    <>
      <div className="grid-bg" aria-hidden="true"></div>
      <div className="shell">
        <DetailSidebar proj={proj} all={all} />
        <main className="main">
          <DetailHero proj={proj} num={num} total={all.length} />
          <DetailInfo proj={proj} />
          <DetailArch proj={proj} />
          <DetailFeatures proj={proj} />
          <DetailShots proj={proj} />
          <DetailNav proj={proj} all={all} />
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
