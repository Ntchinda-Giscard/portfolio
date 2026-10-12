import type { CSSProperties } from "react";
import s from "./wazalink.module.css";

type Pt = { x: number; y: number; w: number };
type Layout = {
  w: number;
  h: number;
  nodes: Record<"hrm" | "x3" | "hub" | "capi", Pt>;
  wires: string[];
  packets: { wire: number; dur: number; begin: number; back?: boolean; tone?: "ok" }[];
};

const WIDE: Layout = {
  w: 1600,
  h: 900,
  nodes: {
    hrm: { x: 290, y: 250, w: 300 },
    x3: { x: 290, y: 650, w: 300 },
    hub: { x: 800, y: 450, w: 380 },
    capi: { x: 1310, y: 450, w: 300 },
  },
  wires: [
    "M440 250 C 540 250 520 410 610 410",
    "M440 650 C 540 650 520 490 610 490",
    "M990 450 L 1160 450",
    "M800 175 L 800 352",
    "M800 548 L 800 735",
  ],
  packets: [
    { wire: 0, dur: 3.2, begin: 0 },
    { wire: 0, dur: 3.6, begin: 1.4, back: true, tone: "ok" },
    { wire: 1, dur: 3.4, begin: 0.6, back: true },
    { wire: 1, dur: 3.8, begin: 2, tone: "ok" },
    { wire: 2, dur: 2.4, begin: 0.3 },
    { wire: 2, dur: 2.8, begin: 1.6, back: true, tone: "ok" },
    { wire: 4, dur: 1.6, begin: 0.8 },
  ],
};

const TALL: Layout = {
  w: 800,
  h: 1000,
  nodes: {
    hrm: { x: 205, y: 120, w: 330 },
    x3: { x: 595, y: 120, w: 330 },
    hub: { x: 400, y: 470, w: 460 },
    capi: { x: 400, y: 870, w: 360 },
  },
  wires: ["M205 172 C 205 300 330 300 345 372", "M595 172 C 595 300 470 300 455 372", "M400 572 L 400 812"],
  packets: [
    { wire: 0, dur: 3, begin: 0 },
    { wire: 0, dur: 3.4, begin: 1.4, back: true, tone: "ok" },
    { wire: 1, dur: 3.2, begin: 0.6, back: true },
    { wire: 1, dur: 3.6, begin: 2, tone: "ok" },
    { wire: 2, dur: 2.6, begin: 0.3 },
    { wire: 2, dur: 3, begin: 1.6, back: true, tone: "ok" },
  ],
};

function pos(layout: Layout, p: Pt): CSSProperties {
  return {
    left: `${(p.x / layout.w) * 100}%`,
    top: `${(p.y / layout.h) * 100}%`,
    width: `${(p.w / layout.w) * 100}%`,
  };
}

function Diagram({ layout, className }: { layout: Layout; className: string }) {
  const { nodes } = layout;
  return (
    <div className={className} style={{ aspectRatio: `${layout.w} / ${layout.h}` }}>
      <svg className={s.wires} viewBox={`0 0 ${layout.w} ${layout.h}`} aria-hidden="true">
        {layout.wires.map((d, i) => (
          <path key={i} d={d} className={s.wire} />
        ))}
        {layout.packets.map((p, i) => (
          <circle key={i} r={layout.w > 1000 ? 8 : 9} className={p.tone === "ok" ? s.packetOk : s.packet}>
            <animateMotion
              dur={`${p.dur}s`}
              begin={`${p.begin}s`}
              repeatCount="indefinite"
              path={layout.wires[p.wire]}
              keyPoints={p.back ? "1;0" : "0;1"}
              keyTimes="0;1"
              calcMode="linear"
            />
          </circle>
        ))}
      </svg>

      <div className={s.node} style={pos(layout, nodes.hrm)}>
        <b>Sage HRM</b>
        <small>SQL Server · contracts</small>
      </div>
      <div className={s.node} style={pos(layout, nodes.x3)}>
        <b>Sage X3</b>
        <small>ERP · SOAP import</small>
      </div>
      <div className={`${s.node} ${s.nodeField}`} style={pos(layout, nodes.capi)}>
        <b>CAPI</b>
        <small>Field app · REST</small>
      </div>
      <div className={s.hub} style={pos(layout, nodes.hub)}>
        <p className={s.hubTitle}>WAZALINK</p>
        <p className={s.hubSub}>FastAPI · 5 pipelines</p>
        <div className={s.hubStates} aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
        <p className={s.hubSub}>SQLite ledger · every 60 s</p>
      </div>

      {layout === WIDE && (
        <>
          <div className={s.pill} style={{ left: "50%", top: "13%" }}>
            <span className={s.clock} aria-hidden="true" /> Scheduler · every 60 s
          </div>
          <div className={s.pill} style={{ left: "50%", top: "86%" }}>
            <span className={s.db} aria-hidden="true" /> SQLite ledger · 9 states
          </div>
          <span className={s.wireLabel} style={{ left: "18.1%", top: "36%" }}>
            growers · contracts · zones
          </span>
          <span className={s.wireLabel} style={{ left: "18.1%", top: "64%" }}>
            suppliers · stock · delivery notes
          </span>
          <span className={s.wireLabel} style={{ left: "81.9%", top: "40%" }}>
            weighings · deliveries
          </span>
        </>
      )}
    </div>
  );
}

export function SyncMap() {
  return (
    <>
      <Diagram layout={WIDE} className={s.mapWide} />
      <Diagram layout={TALL} className={s.mapTall} />
    </>
  );
}

/* ----------------------------------------------------------- VPN strip */

function Lane({ kind }: { kind: "before" | "after" }) {
  const before = kind === "before";
  return (
    <div className={s.lane} data-kind={kind}>
      <p className={s.laneHead}>
        <b>{before ? "Before" : "After"}</b> {before ? "legacy middleware" : "WAZALINK"}
      </p>
      <div className={s.laneRow}>
        <span className={s.end}>CAPI</span>
        <div className={s.track}>
          <span className={s.cut} />
          <span className={s.vpnUp}>VPN up</span>
          <span className={s.vpnDown}>VPN down</span>
          {["p1", "p2", "p3", "p4"].map((p) => (
            <span key={p} className={`${s.runner} ${s[`${kind}_${p}`]}`}>
              <i className={`${s.dot} ${s[`${kind}_${p}_dot`] ?? ""}`} />
            </span>
          ))}
          {before && (
            <span className={`${s.runner} ${s.before_dup}`}>
              <i className={s.dupTag}>×2</i>
            </span>
          )}
        </div>
        <span className={s.end}>Sage</span>
      </div>
      <p className={s.tally}>
        {before ? (
          <>
            Delivered <b>2/4</b> · lost <b data-bad="">2</b> · duplicated <b data-bad="">1</b>
          </>
        ) : (
          <>
            Delivered <b>4/4</b> · lost <b>0</b> · duplicated <b>0</b> · retried <b>2</b>
          </>
        )}
      </p>
    </div>
  );
}

export function VpnStrip() {
  return (
    <div className={s.strip}>
      <Lane kind="before" />
      <Lane kind="after" />
      <div className={s.timeline} aria-hidden="true">
        <span className={s.down} />
        <i className={s.playhead} />
      </div>
      <p className={s.caption}>One loop: the VPN drops for three seconds while four records are in flight.</p>
    </div>
  );
}

/* --------------------------------------------------------------- layers */

const LAYERS = [
  {
    name: "Inbound API",
    tech: "FastAPI · API key · rate limit",
    text: "CAPI posts weighings and delivery notes here. Requests are authenticated, limited to 30 a minute, and stored before anything else happens.",
  },
  {
    name: "Scheduler",
    tech: "APScheduler · thread pool",
    text: "Every 60 seconds, five pipelines run side by side — each a chain of small ordered steps that pass data along.",
  },
  {
    name: "Ledger",
    tech: "SQLite · SQLAlchemy · Alembic",
    text: "One row per business record: its state, the payload last sent, a retry count and the last error. Upserts by business ID.",
  },
  {
    name: "Connectors",
    tech: "ODBC · SOAP · REST",
    text: "Reads Sage HRM and X3 straight from SQL Server, writes to X3 through its SOAP import web service, pushes to CAPI over REST.",
  },
];

const JOURNEY = [
  ["POST /pesee", "201 created", "api"],
  ["ledger.upsert", "PENDING_SEND", "ledger"],
  ["scheduler.tick", "5 pipelines", "scheduler"],
  ["sage_hrm.insert", "ok · 38 ms", "connector"],
  ["x3.stock_receipt", "ok · SOAP", "connector"],
  ["ledger.update", "CONFIRMED", "ledger"],
];

export function Layers() {
  return (
    <div className={s.layers}>
      <ol className={s.stackList}>
        {LAYERS.map((layer, i) => (
          <li key={layer.name} className={s.layer} style={{ "--i": i } as CSSProperties}>
            <span className={s.layerNum}>0{i + 1}</span>
            <div>
              <p className={s.layerName}>{layer.name}</p>
              <p className={s.layerTech}>{layer.tech}</p>
              <p className={s.layerText}>{layer.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className={s.journey} aria-label="One weighing, end to end">
        <p className={s.journeyHead}>
          <span>One weighing, end to end</span>
          <span className={s.liveDot}>live</span>
        </p>
        <ul>
          {JOURNEY.map(([call, result, layer], i) => (
            <li key={call} style={{ "--i": i } as CSSProperties}>
              <span>{call}</span>
              <span data-layer={layer}>{result}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- flows */

const FLOWS = [
  { title: "Growers → suppliers", route: ["HRM", "X3"], text: "New growers registered in Sage HRM become suppliers in Sage X3 through its SOAP import." },
  { title: "Growers & contracts", route: ["HRM", "CAPI"], text: "Field teams always see current growers and their contracts, pushed to CAPI as upserts." },
  { title: "Zones & blocks", route: ["Sage", "CAPI"], text: "The plantation map — zones and blocks — stays in step on every field tablet." },
  { title: "Customers & deliveries", route: ["X3", "CAPI"], text: "New customers and delivery preparations from Sage X3 are created in CAPI." },
  { title: "Weighings", route: ["CAPI", "HRM", "X3"], text: "Weighings posted by CAPI land in Sage HRM, then become stock receipts in Sage X3." },
  { title: "Delivery notes", route: ["CAPI", "X3"], text: "Delivery notes posted by CAPI are loaded into Sage X3 as soon as the next run starts." },
];

export function FlowCards() {
  return (
    <ol className={s.flows}>
      {FLOWS.map((flow, i) => (
        <li key={flow.title} className={s.flow} style={{ "--i": i } as CSSProperties}>
          <span className={s.flowNum}>0{i + 1}</span>
          <p className={s.flowTitle}>{flow.title}</p>
          <p className={s.route}>
            {flow.route.map((sys, j) => (
              <span key={sys} className={s.routeStep}>
                {j > 0 && <i className={s.routeArrow} aria-hidden="true" />}
                <span className={s.sys}>{sys}</span>
              </span>
            ))}
          </p>
          <p className={s.flowText}>{flow.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* ----------------------------------------------------------- resilience */

export function Resilience() {
  return (
    <div className={s.res}>
      <article className={s.resCard}>
        <div className={s.resVisual}>
          <ul className={s.scan}>
            {[
              ["planteur #77", "changed", "send"],
              ["planteur #78", "unchanged", "skip"],
              ["contrat #312", "changed", "send"],
              ["zone B-14", "unchanged", "skip"],
            ].map(([id, state, action]) => (
              <li key={id} data-action={action}>
                <span>{id}</span>
                <span>{state}</span>
                <b>{action}</b>
              </li>
            ))}
          </ul>
        </div>
        <p className={s.resTitle}>Change detection</p>
        <p className={s.resText}>
          Only new or changed rows are picked — a transfer flag plus an updated-after-last-transfer check — and every
          record is upserted by business ID, so re-reading never creates duplicates.
        </p>
      </article>

      <article className={s.resCard}>
        <div className={s.resVisual}>
          <div className={s.breaker}>
            <div className={s.fails} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className={s.switch} aria-hidden="true">
              <span className={s.stateClosed}>closed</span>
              <span className={s.stateOpen}>open · cooling down</span>
            </div>
            <div className={s.cooldown} aria-hidden="true">
              <i />
            </div>
          </div>
        </div>
        <p className={s.resTitle}>Circuit breaker</p>
        <p className={s.resText}>
          After a run of consecutive failures, every call to Sage X3 pauses for a cooldown instead of hammering a dead
          endpoint. The first success closes it again.
        </p>
      </article>

      <article className={s.resCard}>
        <div className={s.resVisual}>
          <div className={s.gate}>
            <div className={s.queue}>
              {Array.from({ length: 6 }, (_, i) => (
                <i key={i} style={{ "--i": i } as CSSProperties} />
              ))}
            </div>
            <div className={s.slots} aria-hidden="true">
              <span />
              <span />
            </div>
            <span className={s.gateTarget}>X3</span>
          </div>
        </div>
        <p className={s.resTitle}>Concurrency gate</p>
        <p className={s.resText}>
          Five pipelines share one X3 web-service pool, so a semaphore caps how many SOAP calls are in flight at once —
          the ERP never gets more than it can take.
        </p>
      </article>

      <article className={s.resCard}>
        <div className={s.resVisual}>
          <div className={s.triage}>
            <span className={s.chip} style={{ "--i": 0 } as CSSProperties} data-to="retry">
              connection dropped
            </span>
            <span className={s.chip} style={{ "--i": 1 } as CSSProperties} data-to="hold">
              invalid date
            </span>
            <span className={s.chip} style={{ "--i": 2 } as CSSProperties} data-to="retry">
              deadlock
            </span>
            <div className={s.bins}>
              <span>retry next run</span>
              <span>hold &amp; alert</span>
            </div>
          </div>
        </div>
        <p className={s.resTitle}>Error triage</p>
        <p className={s.resText}>
          SQL Server&apos;s SQLSTATE separates a dropped connection or a deadlock (retried next run) from a row that can
          never succeed (held and logged for a human).
        </p>
      </article>
    </div>
  );
}

/* ------------------------------------------------------------- shipping */

const STATIONS = [
  { name: "git push", note: "main · version tags", logo: "github" },
  { name: "GitHub Actions", note: "build · tag by semver + sha", logo: "githubactions" },
  { name: "Docker Hub", note: "image + layer cache", logo: "docker" },
  { name: "Argo CD", note: "auto-sync · self-heal", logo: "argocd" },
  { name: "k3s", note: "1 replica · volume · probes", logo: "k3s" },
];

export function ShipFlow() {
  return (
    <div className={s.ship}>
      <ol className={s.stations}>
        <span className={s.rail} aria-hidden="true">
          <i />
        </span>
        {STATIONS.map((st, i) => (
          <li key={st.name} className={s.station} style={{ "--i": i } as CSSProperties}>
            <span className={s.stationIcon}>
              {/* eslint-disable-next-line @next/next/no-img-element -- small local SVG logos */}
              <img src={`/logos/${st.logo}.svg`} alt="" width={26} height={26} loading="lazy" />
            </span>
            <b>{st.name}</b>
            <small>{st.note}</small>
          </li>
        ))}
      </ol>
      <div className={s.obs}>
        <p className={s.obsHead}>Observability</p>
        <div className={s.obsRow}>
          <span className={s.obsNode}>Grafana Alloy</span>
          <i className={s.obsArrow} aria-hidden="true" />
          <span className={s.obsGroup}>
            <span>Loki · logs</span>
            <span>Mimir · metrics</span>
            <span>Tempo · traces</span>
          </span>
          <i className={s.obsArrow} aria-hidden="true" />
          <span className={s.obsNode}>Grafana</span>
          <span className={s.obsSide}>+ Sentry for exceptions</span>
        </div>
      </div>
    </div>
  );
}
