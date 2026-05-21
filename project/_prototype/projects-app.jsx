// projects-app.jsx — Pure project LIST page. Each row → Project.html?id=...
// Same Brittany-style row treatment as Portfolio's projects section, but lists ALL.

const { useState, useEffect } = React;
const { Icon, ProjectRow, useScrollSpy } = window.PortfolioComponents;

function ProjectsSidebar() {
  const P = window.PROFILE;
  return (
    <aside className="sidebar">
      <div>
        <h1 className="sb-name">All Projects</h1>
        <div className="sb-role">Production builds, side bets, design specs</div>
        <p className="sb-tag">
          Every project below has its own deep dive — architecture, what's ready, what's not. Click any row.
        </p>
        <div className="sb-status">{P.status}</div>
      </div>

      <nav className="sb-nav">
        <a className="sb-nav-item" href="Portfolio.html">
          <span style={{ marginLeft: 4 }}>← Back to portfolio</span>
        </a>
        <a className="sb-nav-item" href="Portfolio.html#experience">
          <span style={{ marginLeft: 4 }}>Experience</span>
        </a>
        <a className="sb-nav-item" href="Portfolio.html#contact">
          <span style={{ marginLeft: 4 }}>Contact</span>
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

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#8b8df0",
  "theme": "dark",
  "density": "regular"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
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

  // Group: featured first, then active. But render in one continuous list to match Brittany.
  return (
    <>
      <div className="grid-bg" aria-hidden="true"></div>
      <div className="shell">
        <ProjectsSidebar />
        <main className="main">
          <section data-screen-label="All Projects intro">
            <p className="lead">
              Each project has a deep page — architecture, features in detail, screenshots, status. Hit any row to read the full breakdown.
            </p>
          </section>

          <section data-screen-label="Production">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--tx-4)" }}>
                Production
              </span>
              <span style={{ flex: 1, height: 1, background: "var(--line)" }}></span>
            </div>
            <div className="pr-list">
              {window.FEATURED.map((p) => <ProjectRow key={p.id} proj={p} />)}
            </div>
          </section>

          <section data-screen-label="Active">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--tx-4)" }}>
                Active · side bets · specs
              </span>
              <span style={{ flex: 1, height: 1, background: "var(--line)" }}></span>
            </div>
            <div className="pr-list">
              {window.ACTIVE.map((p) => <ProjectRow key={p.id} proj={p} />)}
            </div>
          </section>
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
