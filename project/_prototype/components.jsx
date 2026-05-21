// components.jsx — Shared components for Portfolio + Products.
// Window-scoped exports at bottom.

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ─────────────────────────────────────────────────────────────────
// Icons — inline SVG, sized by parent.
// ─────────────────────────────────────────────────────────────────
const Icon = {
  arrow: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M4 10h12M11 5l5 5-5 5" /></svg>,
  chev: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M6 8l4 4 4-4" /></svg>,
  ext: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M7 5h8v8M15 5l-9 9" /></svg>,
  mail: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><rect x="3" y="5" width="14" height="11" rx="1.5" /><path d="M3 7l7 5 7-5" /></svg>,
  gh: (p) => <svg viewBox="0 0 20 20" fill="currentColor" {...p}><path d="M10 1.5A8.5 8.5 0 0 0 1.5 10c0 3.76 2.44 6.95 5.83 8.07.43.08.58-.18.58-.41 0-.2-.01-.74-.01-1.45-2.37.51-2.87-1.14-2.87-1.14-.39-.99-.95-1.25-.95-1.25-.78-.53.06-.52.06-.52.86.06 1.31.88 1.31.88.76 1.31 2 .93 2.5.71.08-.55.3-.93.55-1.15-1.89-.21-3.88-.95-3.88-4.21 0-.93.33-1.69.88-2.29-.09-.22-.38-1.09.08-2.28 0 0 .71-.23 2.33.87.68-.19 1.4-.28 2.12-.28.72 0 1.44.1 2.12.28 1.62-1.1 2.33-.87 2.33-.87.46 1.19.17 2.06.08 2.28.55.6.88 1.36.88 2.29 0 3.27-1.99 4-3.89 4.21.31.27.58.79.58 1.6 0 1.16-.01 2.09-.01 2.38 0 .23.15.5.59.41A8.5 8.5 0 0 0 18.5 10 8.5 8.5 0 0 0 10 1.5z" /></svg>,
  li: (p) => <svg viewBox="0 0 20 20" fill="currentColor" {...p}><path d="M16 16h-2.7v-4.2c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2V16H7.6V7.5h2.6v1.16h.04c.36-.68 1.24-1.4 2.55-1.4 2.73 0 3.23 1.8 3.23 4.13V16zM4.55 6.34a1.56 1.56 0 1 1 0-3.13 1.56 1.56 0 0 1 0 3.13zM5.9 16H3.2V7.5h2.7V16zM17.34 0H2.66C1.93 0 1.34.57 1.34 1.28v17.44c0 .7.59 1.28 1.32 1.28h14.67c.73 0 1.33-.58 1.33-1.28V1.28C18.66.57 18.07 0 17.34 0z" /></svg>,
  shield: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M10 2L4 4v6c0 3.5 2.5 6.5 6 8 3.5-1.5 6-4.5 6-8V4l-6-2z" /></svg>,
  globe: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><circle cx="10" cy="10" r="7" /><path d="M3 10h14M10 3c2.5 2 3.5 4.5 3.5 7s-1 5-3.5 7c-2.5-2-3.5-4.5-3.5-7s1-5 3.5-7z" /></svg>,
  flow: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><rect x="2" y="4" width="6" height="4" rx="1" /><rect x="12" y="4" width="6" height="4" rx="1" /><rect x="2" y="12" width="6" height="4" rx="1" /><rect x="12" y="12" width="6" height="4" rx="1" /><path d="M8 6h4M8 14h4M5 8v4M15 8v4" /></svg>,
  scale: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M3 4h14M3 10h10M3 16h6" /></svg>,
  split: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M10 2v6M10 14v4M5 11h10M5 11l-2 2M5 11l-2-2M15 11l2 2M15 11l2-2" /></svg>,
  queue: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><rect x="2" y="6" width="3" height="8" /><rect x="7" y="6" width="3" height="8" /><rect x="12" y="6" width="3" height="8" /><path d="M16 10h2" /></svg>,
  mesh: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><circle cx="5" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" /><circle cx="10" cy="10" r="1.5" /><circle cx="5" cy="15" r="1.5" /><circle cx="15" cy="15" r="1.5" /><path d="M5 5l5 5M15 5l-5 5M10 10l-5 5M10 10l5 5M5 5l10 10M15 5L5 15" /></svg>,
  chart: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M3 16h14M5 13l3-4 3 2 4-6" /></svg>,
  ingest: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M10 3v10M6 9l4 4 4-4M3 17h14" /></svg>,
  lock: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><rect x="4" y="9" width="12" height="8" rx="1" /><path d="M7 9V6a3 3 0 0 1 6 0v3" /></svg>,
  brain: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M7 3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H7zM10 5v10M7 9h6M7 13h6" /></svg>,
  audit: (p) => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><circle cx="9" cy="9" r="5" /><path d="M13 13l4 4" /></svg>
};

// ─────────────────────────────────────────────────────────────────
// Status pill
// ─────────────────────────────────────────────────────────────────
function StatusPill({ status, label }) {
  return <span className="pill" data-status={status}>{label}</span>;
}

// ─────────────────────────────────────────────────────────────────
// Section header
// ─────────────────────────────────────────────────────────────────
function SectionHead({ num, eyebrow, title, sub, children }) {
  return (
    <header>
      <div className="eyebrow">
        {num && <span className="num">{num}</span>}
        <span>{eyebrow}</span>
      </div>
      <h2 className="h-section">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
      {children}
    </header>);

}

// ─────────────────────────────────────────────────────────────────
// Brittany-style compact project row (Portfolio intro page)
// ─────────────────────────────────────────────────────────────────
function ProjectRow({ proj }) {
  return (
    <a className="pr-row" href={`Project.html?id=${proj.id}`} data-screen-label={`Project · ${proj.name}`}>
      <div className="pr-meta">{proj.years || ""}</div>
      <div className="pr-thumb">
        <div className="pr-thumb-inner">
          <span className="pr-thumb-label">{proj.name} · screenshot</span>
        </div>
      </div>
      <div className="pr-body">
        <div className="pr-head">
          <span className="pr-name">
            {proj.name}{proj.sub && <span className="pr-sub">/ {proj.sub}</span>}
            <span className="pr-arrow">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
                <path d="M7 5h8v8M15 5L5 15" />
              </svg>
            </span>
          </span>
          <StatusPill status={proj.status} label={proj.statusLabel} />
        </div>
        <p className="pr-desc">{proj.prop}</p>
        <div className="pr-tags">
          {proj.stack.slice(0, 6).map((t) => <span className="tag" key={t}>{t}</span>)}
          {proj.stack.length > 6 && <span className="tag" style={{ color: "var(--tx-4)" }}>+{proj.stack.length - 6}</span>}
        </div>
      </div>
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────
// Featured project card with hover-swap architecture diagram
// ─────────────────────────────────────────────────────────────────
function FeaturedCard({ proj, isOpen, onToggle }) {
  const Arch = window.ArchDiagrams[proj.id];
  return (
    <article className="proj" data-open={isOpen ? "true" : "false"} data-screen-label={`Featured · ${proj.name}`}>
      <div className="proj-thumb">
        <div className="proj-thumb-placeholder">
          <span className="proj-thumb-label">screenshot · {proj.name}</span>
        </div>
        <div className="proj-arch">
          {Arch ? <Arch /> : null}
        </div>
      </div>

      <div className="proj-body">
        <div className="proj-head">
          <h3 className="proj-name">
            <span>{proj.name}</span>
            {proj.sub && <span className="sub">{proj.sub}</span>}
          </h3>
          <StatusPill status={proj.status} label={proj.statusLabel} />
        </div>

        <p className="proj-prop">{proj.prop}</p>

        {proj.features &&
        <div className="features">
            {proj.features.map((f, i) => {
            const I = Icon[f.icon] || (() => null);
            return (
              <div className="feat" key={i}>
                  <I className="feat-icon" />
                  <div className="feat-name">{f.name}</div>
                  <div className="feat-desc">{f.desc}</div>
                </div>);

          })}
          </div>
        }

        <div className="proof">
          {proj.proof.metric &&
          <span className="proof-item">
              <strong>{proj.proof.metric}</strong>
              <span>{proj.proof.metricLabel}</span>
            </span>
          }
          {proj.proof.extra &&
          <span className="proof-item">·&nbsp;<span>{proj.proof.extra}</span></span>
          }
        </div>

        <div className="tags">
          {proj.stack.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>

        <button className="proj-more" onClick={onToggle}>
          <span className="chev">▸</span>
          {isOpen ? "Hide detail" : "Read the build log"}
        </button>

        {isOpen &&
        <div className="proj-detail">
            <dl className="detail-row">
              <dt>Problem</dt>
              <dd>{proj.problem}</dd>
            </dl>
            <dl className="detail-row">
              <dt>What I built</dt>
              <dd>
                <ul>
                  {proj.built.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </dd>
            </dl>
            {proj.proofLinks &&
          <dl className="detail-row">
                <dt>Proof</dt>
                <dd>
                  {proj.proofLinks.map((p, i) =>
              <span key={i} className="tag" style={{ marginRight: 8 }}>
                      {p.label} · <span style={{ color: "var(--tx-4)" }}>{p.kind}</span>
                    </span>
              )}
                </dd>
              </dl>
          }
          </div>
        }
      </div>
    </article>);

}

// ─────────────────────────────────────────────────────────────────
// Active project card (compact)
// ─────────────────────────────────────────────────────────────────
function ActiveCard({ proj, isOpen, onToggle }) {
  return (
    <article className="proj" data-open={isOpen ? "true" : "false"} data-screen-label={`Active · ${proj.name}`}>
      <div className="proj-thumb">
        <div className="proj-thumb-placeholder">
          <span className="proj-thumb-label">screenshot · {proj.name}</span>
        </div>
      </div>
      <div className="proj-body">
        <div className="proj-head">
          <h3 className="proj-name"><span>{proj.name}</span></h3>
          <StatusPill status={proj.status} label={proj.statusLabel} />
        </div>
        <p className="proj-prop">{proj.prop}</p>
        <div className="proof">
          <span className="proof-item">
            <strong>{proj.proof.metric}</strong>
            <span>{proj.proof.metricLabel}</span>
          </span>
        </div>
        <div className="tags">
          {proj.stack.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
        <button className="proj-more" onClick={onToggle}>
          <span className="chev">▸</span>
          {isOpen ? "Hide" : "What I built"}
        </button>
        {isOpen &&
        <div className="proj-detail">
            <dl className="detail-row">
              <dt>What I built</dt>
              <dd>
                <ul>{proj.built.map((b, i) => <li key={i}>{b}</li>)}</ul>
              </dd>
            </dl>
          </div>
        }
      </div>
    </article>);

}

// ─────────────────────────────────────────────────────────────────
// Sidebar — fixed left, with scroll-spy nav
// ─────────────────────────────────────────────────────────────────
function Sidebar({ accent, sections, currentSection, onSocialHover, layout = "fixed", showProductsLink = true }) {
  const P = window.PROFILE;
  return (
    <aside className="sidebar" data-comment-anchor="620c1a7769-aside-201-5">
      <div>
        <h1 className="sb-name" data-comment-anchor="d6d985274d-h1-203-9">
          Sai Kalyan Tarun<br />
          Vadlamudi
        </h1>
        <div className="sb-role">{P.role}</div>
        {P.roleCert && <div className="sb-role-cert">{P.roleCert}</div>}
        <p className="sb-tag">{P.tagline}</p>
        <div className="sb-status" data-comment-anchor="2925d28d01-div-209-9">{P.status}</div>
      </div>

      {layout === "fixed" &&
      <nav className="sb-nav">
          {sections.map((s) =>
        <button
          key={s.id}
          className="sb-nav-item"
          aria-current={currentSection === s.id ? "true" : "false"}
          onClick={() => {
            const el = document.getElementById(s.id);
            if (el) window.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
          }}>
              {s.label}
            </button>
        )}
        </nav>
      }

      <div className="sb-foot">
        <div className="sb-socials">
          <a href={`mailto:${window.PROFILE.email}`} aria-label="Email"><Icon.mail /></a>
          <a href={window.PROFILE.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><Icon.li /></a>
          <a href={window.PROFILE.github} target="_blank" rel="noopener" aria-label="GitHub"><Icon.gh /></a>
        </div>
      </div>
    </aside>);

}

// Scroll-spy hook
function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    function onScroll() {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop - offset <= window.scrollY) current = id;
      }
      setActive(current);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids.join("|"), offset]);
  return active;
}

window.PortfolioComponents = {
  Icon, StatusPill, SectionHead, FeaturedCard, ActiveCard, ProjectRow, Sidebar, useScrollSpy
};