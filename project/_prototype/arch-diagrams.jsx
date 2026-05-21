// arch-diagrams.jsx — Architecture diagrams for Featured System hover state.
// Pure SVG with CSS animations driven by .proj:hover. No JS required.
//
// Visual language:
//  - thin 1px lines (--line / --line-bright)
//  - small rounded rect nodes with mono labels (10px)
//  - dashed flowlines that animate stroke-dashoffset on hover

const __ARCH_STYLE = `
  .arch-svg {
    width: 100%; height: 100%;
    display: block;
    background: var(--bg-panel);
    font-family: var(--font-mono);
  }
  .arch-svg .grid path { stroke: var(--line); stroke-width: 0.5; opacity: 0.6; }
  .arch-svg .node {
    fill: var(--bg-elev);
    stroke: var(--line-bright);
    stroke-width: 1;
  }
  .arch-svg .node-accent {
    fill: var(--bg-elev);
    stroke: var(--accent);
    stroke-width: 1;
  }
  .arch-svg .label {
    fill: var(--tx-2);
    font-size: 4.2px;
    font-family: var(--font-mono);
    letter-spacing: 0;
    text-anchor: middle;
    dominant-baseline: middle;
  }
  .arch-svg .label-strong { fill: var(--tx); font-weight: 500; }
  .arch-svg .sublabel {
    fill: var(--tx-4);
    font-size: 2.8px;
    text-anchor: middle;
    dominant-baseline: middle;
    letter-spacing: 0;
    text-transform: uppercase;
  }
  .arch-svg .flow {
    fill: none;
    stroke: var(--line-bright);
    stroke-width: 1;
    stroke-dasharray: 3 3;
  }
  .arch-svg .flow-anim {
    fill: none;
    stroke: var(--accent);
    stroke-width: 1.2;
    stroke-dasharray: 4 4;
    stroke-dashoffset: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  .proj:hover .arch-svg .flow-anim {
    opacity: 1;
    animation: flowdash 1.4s linear infinite;
  }
  @keyframes flowdash {
    to { stroke-dashoffset: -16; }
  }
  .arch-svg .pulse {
    fill: var(--accent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .proj:hover .arch-svg .pulse {
    opacity: 1;
    animation: pulse-dot 1.6s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  .arch-svg .pulse-1 { animation-delay: 0s !important; }
  .arch-svg .pulse-2 { animation-delay: 0.4s !important; }
  .arch-svg .pulse-3 { animation-delay: 0.8s !important; }
  .arch-svg .pulse-4 { animation-delay: 1.2s !important; }
  .arch-svg .frame {
    fill: none;
    stroke: var(--line);
    stroke-width: 0.5;
    stroke-dasharray: 2 3;
  }
  .arch-svg .frame-label {
    fill: var(--tx-4);
    font-size: 2.8px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-family: var(--font-mono);
  }
`;

if (typeof document !== "undefined" && !document.getElementById("__arch_style")) {
  const s = document.createElement("style");
  s.id = "__arch_style";
  s.textContent = __ARCH_STYLE;
  document.head.appendChild(s);
}

// Grid background for diagrams
function ArchGrid() {
  const lines = [];
  for (let x = 0; x <= 200; x += 10) {
    lines.push(<path key={"v" + x} d={`M${x} 0L${x} 140`} />);
  }
  for (let y = 0; y <= 140; y += 10) {
    lines.push(<path key={"h" + y} d={`M0 ${y}L200 ${y}`} />);
  }
  return <g className="grid">{lines}</g>;
}

function Node({ x, y, w = 36, h = 14, label, sub, accent, id }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2}
            className={accent ? "node-accent" : "node"} />
      <text x={x + w / 2} y={y + h / 2 + (sub ? -2 : 0.5)} className="label label-strong">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 4} className="sublabel">{sub}</text>}
    </g>
  );
}

// ─────────────────────────────────────────────────────────────────
// PeopleOps — API Gateway → SQS → Lambda → Aurora, with Cognito + S3
// ─────────────────────────────────────────────────────────────────
function ArchPeopleOps() {
  return (
    <svg className="arch-svg" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid meet">
      <ArchGrid />
      {/* Frame label */}
      <text x="6" y="9" className="frame-label">AWS · serverless · multi-tenant</text>

      {/* Top row: Client → API GW */}
      <Node x={8} y={20} w={32} h={12} label="Client" />
      <path className="flow" d="M40 26 L60 26" />
      <Node x={60} y={20} w={36} h={12} label="API GW" />

      {/* Middle: → SQS → Lambda */}
      <path className="flow" d="M78 32 L78 50" />
      <Node x={60} y={50} w={36} h={14} label="SQS" sub="bulk lane" />
      <path className="flow-anim" d="M78 64 L78 82" />
      <Node x={60} y={82} w={36} h={14} label="Lambda" sub="python" accent />

      {/* Side: Cognito (auth) */}
      <Node x={108} y={20} w={36} h={12} label="Cognito" />
      <path className="flow" d="M96 26 L108 26" />

      {/* Right side: Aurora */}
      <path className="flow-anim" d="M96 89 L156 89" />
      <Node x={156} y={82} w={36} h={14} label="Aurora v2" sub="postgis" accent />

      {/* RDS Proxy intercept */}
      <Node x={108} y={82} w={42} h={14} label="RDS Proxy" sub="pool" />

      {/* Bottom: S3 + EventBridge */}
      <Node x={8} y={110} w={36} h={14} label="S3" sub="docs" />
      <Node x={60} y={110} w={42} h={14} label="EventBridge" sub="cron" />
      <Node x={120} y={110} w={42} h={14} label="Secrets Mgr" sub="kms" />
      <path className="flow" d="M44 117 L60 117" />
      <path className="flow" d="M141 96 L141 110" />
      <path className="flow" d="M78 96 L78 110" />

      {/* Pulses */}
      <circle className="pulse pulse-1" cx="78" cy="50" r="1.4" />
      <circle className="pulse pulse-2" cx="78" cy="82" r="1.4" />
      <circle className="pulse pulse-3" cx="156" cy="89" r="1.4" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// PhoneCloud — control plane / data plane split
// ─────────────────────────────────────────────────────────────────
function ArchPhoneCloud() {
  return (
    <svg className="arch-svg" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid meet">
      <ArchGrid />
      <text x="6" y="9" className="frame-label">control plane / data plane · tailscale mesh</text>

      {/* Control plane frame */}
      <rect className="frame" x="6" y="18" width="90" height="58" rx="2" />
      <text x="10" y="26" className="frame-label">control plane</text>

      <Node x={10} y={32} w={36} h={14} label="Postgres" sub="state" accent />
      <Node x={52} y={32} w={40} h={14} label="Redis Streams" sub="queue" />
      <Node x={10} y={52} w={36} h={14} label="MinIO" sub="blobs" />
      <Node x={52} y={52} w={40} h={14} label="Prom/Graf" sub="metrics" />

      {/* Data plane frame */}
      <rect className="frame" x="104" y="18" width="90" height="58" rx="2" />
      <text x="108" y="26" className="frame-label">data plane · heterogeneous nodes</text>

      <Node x={108} y={32} w={28} h={14} label="phone" sub="kotlin" />
      <Node x={140} y={32} w={28} h={14} label="phone" sub="kotlin" />
      <Node x={172} y={32} w={20} h={14} label="…" />
      <Node x={108} y={52} w={28} h={14} label="PC" sub="docker" />
      <Node x={140} y={52} w={28} h={14} label="PC" sub="docker" />
      <Node x={172} y={52} w={20} h={14} label="lease" />

      {/* Flow lines between planes */}
      <path className="flow-anim" d="M96 39 L108 39" />
      <path className="flow-anim" d="M96 59 L108 59" />
      <path className="flow" d="M96 49 L108 49" />

      {/* Console + CLI */}
      <Node x={10} y={92} w={40} h={14} label="Next.js" sub="console" />
      <Node x={56} y={92} w={28} h={14} label="CLI" />
      <Node x={90} y={92} w={50} h={14} label="Android agent" sub="QR onboard" accent />
      <Node x={146} y={92} w={48} h={14} label="Tailscale" sub="mesh" />

      {/* Frame for surfaces */}
      <rect className="frame" x="6" y="84" width="188" height="28" rx="2" />
      <text x="10" y="91" className="frame-label">surfaces</text>

      {/* Bottom flow */}
      <path className="flow" d="M30 92 L30 76" />
      <path className="flow" d="M168 92 L168 76" />

      {/* Pulses */}
      <circle className="pulse pulse-1" cx="122" cy="39" r="1.4" />
      <circle className="pulse pulse-2" cx="154" cy="39" r="1.4" />
      <circle className="pulse pulse-3" cx="122" cy="59" r="1.4" />
      <circle className="pulse pulse-4" cx="154" cy="59" r="1.4" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────
// JobPrep — local-first stack with optional remote audit
// ─────────────────────────────────────────────────────────────────
function ArchJobPrep() {
  return (
    <svg className="arch-svg" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid meet">
      <ArchGrid />
      <text x="6" y="9" className="frame-label">local-first · optional remote audit</text>

      {/* Frame: local */}
      <rect className="frame" x="6" y="18" width="124" height="100" rx="2" />
      <text x="10" y="26" className="frame-label">local — runs on your box</text>

      {/* Sources */}
      <Node x={10} y={32} w={36} h={12} label="RSS" />
      <Node x={50} y={32} w={36} h={12} label="HTML" />
      <Node x={90} y={32} w={36} h={12} label="Company" />

      {/* Ingest */}
      <path className="flow" d="M28 44 L28 56" />
      <path className="flow" d="M68 44 L68 56" />
      <path className="flow" d="M108 44 L108 56" />
      <Node x={14} y={56} w={108} h={14} label="FastAPI · ingest + ranker" accent />

      {/* DB */}
      <path className="flow-anim" d="M68 70 L68 80" />
      <Node x={14} y={80} w={50} h={14} label="SQLite" sub="alembic" />
      <Node x={68} y={80} w={54} h={14} label="Ollama" sub="local LLM" />

      {/* Console */}
      <Node x={14} y={100} w={108} h={14} label="Next.js console" sub="daily locked plan" accent />
      <path className="flow" d="M40 94 L40 100" />
      <path className="flow" d="M96 94 L96 100" />

      {/* Frame: remote */}
      <rect className="frame" x="138" y="18" width="56" height="100" rx="2" />
      <text x="142" y="26" className="frame-label">optional remote</text>

      <Node x={142} y={56} w={48} h={14} label="OpenAI" sub="audit" />
      <Node x={142} y={80} w={48} h={14} label="Gemini" sub="audit" />
      <Node x={142} y={104} w={48} h={10} label="PhoneCloud" />

      {/* Audit flow */}
      <path className="flow-anim" d="M122 63 L142 63" />
      <path className="flow-anim" d="M122 87 L142 87" />

      {/* Pulses */}
      <circle className="pulse pulse-1" cx="68" cy="63" r="1.4" />
      <circle className="pulse pulse-2" cx="68" cy="107" r="1.4" />
      <circle className="pulse pulse-3" cx="166" cy="63" r="1.4" />
    </svg>
  );
}

window.ArchDiagrams = {
  peopleops: ArchPeopleOps,
  phonecloud: ArchPhoneCloud,
  jobprep: ArchJobPrep,
};
