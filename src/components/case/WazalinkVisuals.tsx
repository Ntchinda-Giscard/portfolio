import type { CSSProperties } from "react";
import { localize, t, type Locale, type Localized } from "@/lib/i18n";
import s from "./wazalink.module.css";

/** Every word the WAZALINK diagrams show. Record ids, calls and tech names stay as they are. */
const COPY = {
  hrm: t("SQL Server · contracts", "SQL Server · contrats"),
  x3: t("ERP · SOAP import", "ERP · import SOAP"),
  capi: t("Field app · REST", "Appli terrain · REST"),
  hubPipelines: t("FastAPI · 5 pipelines", "FastAPI · 5 pipelines"),
  hubLedger: t("SQLite ledger · every 60 s", "Registre SQLite · toutes les 60 s"),
  scheduler: t("Scheduler · every 60 s", "Ordonnanceur · toutes les 60 s"),
  ledger: t("SQLite ledger · 9 states", "Registre SQLite · 9 états"),
  wireHrm: t("growers · contracts · zones", "planteurs · contrats · zones"),
  wireX3: t("suppliers · stock · delivery notes", "fournisseurs · stock · livraisons"),
  wireCapi: t("weighings · deliveries", "pesées · livraisons"),

  before: t("Before", "Avant"),
  after: t("After", "Après"),
  legacy: t("legacy middleware", "ancien middleware"),
  vpnUp: t("VPN up", "VPN actif"),
  vpnDown: t("VPN down", "VPN coupé"),
  delivered: t("Delivered", "Livrés"),
  lost: t("lost", "perdus"),
  duplicated: t("duplicated", "dupliqués"),
  retried: t("retried", "repris"),
  stripCaption: t(
    "One loop: the VPN drops for three seconds while four records are in flight.",
    "Une boucle : le VPN tombe trois secondes pendant que quatre enregistrements sont en transit.",
  ),

  layers: [
    {
      name: t("Inbound API", "API entrante"),
      tech: t("FastAPI · API key · rate limit", "FastAPI · clé d’API · limite de débit"),
      text: t(
        "CAPI posts weighings and delivery notes here. Requests are authenticated, limited to 30 a minute, and stored before anything else happens.",
        "CAPI y poste pesées et bons de livraison. Les requêtes sont authentifiées, limitées à 30 par minute, et enregistrées avant toute autre chose.",
      ),
    },
    {
      name: t("Scheduler", "Ordonnanceur"),
      tech: t("APScheduler · thread pool", "APScheduler · pool de threads"),
      text: t(
        "Every 60 seconds, five pipelines run side by side — each a chain of small ordered steps that pass data along.",
        "Toutes les 60 secondes, cinq pipelines tournent côte à côte — chacun une chaîne de petites étapes ordonnées qui se passent les données.",
      ),
    },
    {
      name: t("Ledger", "Registre"),
      tech: "SQLite · SQLAlchemy · Alembic",
      text: t(
        "One row per business record: its state, the payload last sent, a retry count and the last error. Upserts by business ID.",
        "Une ligne par enregistrement métier : son état, le dernier contenu envoyé, un compteur de reprises et la dernière erreur. Upsert par identifiant métier.",
      ),
    },
    {
      name: t("Connectors", "Connecteurs"),
      tech: "ODBC · SOAP · REST",
      text: t(
        "Reads Sage HRM and X3 straight from SQL Server, writes to X3 through its SOAP import web service, pushes to CAPI over REST.",
        "Lit Sage HRM et X3 directement dans SQL Server, écrit dans X3 via son service web d’import SOAP, pousse vers CAPI en REST.",
      ),
    },
  ],
  journey: t("One weighing, end to end", "Une pesée, de bout en bout"),
  live: t("live", "en direct"),

  flows: [
    {
      title: t("Growers → suppliers", "Planteurs → fournisseurs"),
      route: ["HRM", "X3"],
      text: t(
        "New growers registered in Sage HRM become suppliers in Sage X3 through its SOAP import.",
        "Les nouveaux planteurs enregistrés dans Sage HRM deviennent fournisseurs dans Sage X3 via son import SOAP.",
      ),
    },
    {
      title: t("Growers & contracts", "Planteurs & contrats"),
      route: ["HRM", "CAPI"],
      text: t(
        "Field teams always see current growers and their contracts, pushed to CAPI as upserts.",
        "Les équipes terrain voient toujours les planteurs à jour et leurs contrats, poussés vers CAPI en upsert.",
      ),
    },
    {
      title: t("Zones & blocks", "Zones & blocs"),
      route: ["Sage", "CAPI"],
      text: t(
        "The plantation map — zones and blocks — stays in step on every field tablet.",
        "La carte de la plantation — zones et blocs — reste à jour sur chaque tablette terrain.",
      ),
    },
    {
      title: t("Customers & deliveries", "Clients & livraisons"),
      route: ["X3", "CAPI"],
      text: t(
        "New customers and delivery preparations from Sage X3 are created in CAPI.",
        "Les nouveaux clients et les préparations de livraison de Sage X3 sont créés dans CAPI.",
      ),
    },
    {
      title: t("Weighings", "Pesées"),
      route: ["CAPI", "HRM", "X3"],
      text: t(
        "Weighings posted by CAPI land in Sage HRM, then become stock receipts in Sage X3.",
        "Les pesées postées par CAPI arrivent dans Sage HRM, puis deviennent des entrées de stock dans Sage X3.",
      ),
    },
    {
      title: t("Delivery notes", "Bons de livraison"),
      route: ["CAPI", "X3"],
      text: t(
        "Delivery notes posted by CAPI are loaded into Sage X3 as soon as the next run starts.",
        "Les bons de livraison postés par CAPI sont chargés dans Sage X3 dès le début du cycle suivant.",
      ),
    },
  ],

  changed: t("changed", "modifié"),
  unchanged: t("unchanged", "inchangé"),
  send: t("send", "envoi"),
  skip: t("skip", "ignoré"),
  changeTitle: t("Change detection", "Détection des changements"),
  changeText: t(
    "Only new or changed rows are picked — a transfer flag plus an updated-after-last-transfer check — and every record is upserted by business ID, so re-reading never creates duplicates.",
    "Seules les lignes nouvelles ou modifiées sont prises — un indicateur de transfert et un contrôle « modifié depuis le dernier transfert » — et chaque enregistrement est inséré en upsert par identifiant métier : relire ne crée jamais de doublon.",
  ),
  closed: t("closed", "fermé"),
  open: t("open · cooling down", "ouvert · en pause"),
  breakerTitle: t("Circuit breaker", "Disjoncteur"),
  breakerText: t(
    "After a run of consecutive failures, every call to Sage X3 pauses for a cooldown instead of hammering a dead endpoint. The first success closes it again.",
    "Après une série d’échecs consécutifs, chaque appel à Sage X3 marque une pause au lieu de marteler un service mort. Le premier succès le referme.",
  ),
  gateTitle: t("Concurrency gate", "Limiteur de concurrence"),
  gateText: t(
    "Five pipelines share one X3 web-service pool, so a semaphore caps how many SOAP calls are in flight at once — the ERP never gets more than it can take.",
    "Cinq pipelines partagent un même pool de services web X3 : un sémaphore plafonne le nombre d’appels SOAP simultanés — l’ERP ne reçoit jamais plus qu’il ne peut absorber.",
  ),
  dropped: t("connection dropped", "connexion perdue"),
  invalidDate: t("invalid date", "date invalide"),
  deadlock: t("deadlock", "interblocage"),
  retryBin: t("retry next run", "reprise au cycle suivant"),
  holdBin: t("hold & alert", "attente & alerte"),
  triageTitle: t("Error triage", "Tri des erreurs"),
  triageText: t(
    "SQL Server’s SQLSTATE separates a dropped connection or a deadlock (retried next run) from a row that can never succeed (held and logged for a human).",
    "Le SQLSTATE de SQL Server distingue une connexion perdue ou un interblocage (repris au cycle suivant) d’une ligne qui ne passera jamais (mise en attente et signalée à un humain).",
  ),

  stations: [
    { name: "git push", note: t("main · version tags", "main · tags de version"), logo: "github" },
    { name: "GitHub Actions", note: t("build · tag by semver + sha", "build · tag semver + sha"), logo: "githubactions" },
    { name: "Docker Hub", note: t("image + layer cache", "image + cache des couches"), logo: "docker" },
    { name: "Argo CD", note: t("auto-sync · self-heal", "synchro auto · auto-réparation"), logo: "argocd" },
    { name: "k3s", note: t("1 replica · volume · probes", "1 réplique · volume · sondes"), logo: "k3s" },
  ],
  observability: t("Observability", "Observabilité"),
  metrics: t("Mimir · metrics", "Mimir · métriques"),
  sentry: t("+ Sentry for exceptions", "+ Sentry pour les exceptions"),
};

type Copy = Localized<typeof COPY>;
type Props = { lang: Locale };

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

function Diagram({ layout, className, copy }: { layout: Layout; className: string; copy: Copy }) {
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
        <small>{copy.hrm}</small>
      </div>
      <div className={s.node} style={pos(layout, nodes.x3)}>
        <b>Sage X3</b>
        <small>{copy.x3}</small>
      </div>
      <div className={`${s.node} ${s.nodeField}`} style={pos(layout, nodes.capi)}>
        <b>CAPI</b>
        <small>{copy.capi}</small>
      </div>
      <div className={s.hub} style={pos(layout, nodes.hub)}>
        <p className={s.hubTitle}>WAZALINK</p>
        <p className={s.hubSub}>{copy.hubPipelines}</p>
        <div className={s.hubStates} aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
        <p className={s.hubSub}>{copy.hubLedger}</p>
      </div>

      {layout === WIDE && (
        <>
          <div className={s.pill} style={{ left: "50%", top: "13%" }}>
            <span className={s.clock} aria-hidden="true" /> {copy.scheduler}
          </div>
          <div className={s.pill} style={{ left: "50%", top: "86%" }}>
            <span className={s.db} aria-hidden="true" /> {copy.ledger}
          </div>
          <span className={s.wireLabel} style={{ left: "18.1%", top: "36%" }}>
            {copy.wireHrm}
          </span>
          <span className={s.wireLabel} style={{ left: "18.1%", top: "64%" }}>
            {copy.wireX3}
          </span>
          <span className={s.wireLabel} style={{ left: "81.9%", top: "40%" }}>
            {copy.wireCapi}
          </span>
        </>
      )}
    </div>
  );
}

export function SyncMap({ lang }: Props) {
  const copy = localize(COPY, lang);
  return (
    <>
      <Diagram layout={WIDE} className={s.mapWide} copy={copy} />
      <Diagram layout={TALL} className={s.mapTall} copy={copy} />
    </>
  );
}

/* ----------------------------------------------------------- VPN strip */

function Lane({ kind, copy }: { kind: "before" | "after"; copy: Copy }) {
  const before = kind === "before";
  return (
    <div className={s.lane} data-kind={kind}>
      <p className={s.laneHead}>
        <b>{before ? copy.before : copy.after}</b> {before ? copy.legacy : "WAZALINK"}
      </p>
      <div className={s.laneRow}>
        <span className={s.end}>CAPI</span>
        <div className={s.track}>
          <span className={s.cut} />
          <span className={s.vpnUp}>{copy.vpnUp}</span>
          <span className={s.vpnDown}>{copy.vpnDown}</span>
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
            {copy.delivered} <b>2/4</b> · {copy.lost} <b data-bad="">2</b> · {copy.duplicated} <b data-bad="">1</b>
          </>
        ) : (
          <>
            {copy.delivered} <b>4/4</b> · {copy.lost} <b>0</b> · {copy.duplicated} <b>0</b> · {copy.retried} <b>2</b>
          </>
        )}
      </p>
    </div>
  );
}

export function VpnStrip({ lang }: Props) {
  const copy = localize(COPY, lang);
  return (
    <div className={s.strip}>
      <Lane kind="before" copy={copy} />
      <Lane kind="after" copy={copy} />
      <div className={s.timeline} aria-hidden="true">
        <span className={s.down} />
        <i className={s.playhead} />
      </div>
      <p className={s.caption}>{copy.stripCaption}</p>
    </div>
  );
}

/* --------------------------------------------------------------- layers */

const JOURNEY = [
  ["POST /pesee", "201 created", "api"],
  ["ledger.upsert", "PENDING_SEND", "ledger"],
  ["scheduler.tick", "5 pipelines", "scheduler"],
  ["sage_hrm.insert", "ok · 38 ms", "connector"],
  ["x3.stock_receipt", "ok · SOAP", "connector"],
  ["ledger.update", "CONFIRMED", "ledger"],
];

export function Layers({ lang }: Props) {
  const copy = localize(COPY, lang);
  return (
    <div className={s.layers}>
      <ol className={s.stackList}>
        {copy.layers.map((layer, i) => (
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
      <div className={s.journey} aria-label={copy.journey}>
        <p className={s.journeyHead}>
          <span>{copy.journey}</span>
          <span className={s.liveDot}>{copy.live}</span>
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

export function FlowCards({ lang }: Props) {
  const copy = localize(COPY, lang);
  return (
    <ol className={s.flows}>
      {copy.flows.map((flow, i) => (
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

const SCAN = [
  { id: "planteur #77", changed: true },
  { id: "planteur #78", changed: false },
  { id: "contrat #312", changed: true },
  { id: "zone B-14", changed: false },
];

export function Resilience({ lang }: Props) {
  const copy = localize(COPY, lang);
  return (
    <div className={s.res}>
      <article className={s.resCard}>
        <div className={s.resVisual}>
          <ul className={s.scan}>
            {SCAN.map((row) => (
              <li key={row.id} data-action={row.changed ? "send" : "skip"}>
                <span>{row.id}</span>
                <span>{row.changed ? copy.changed : copy.unchanged}</span>
                <b>{row.changed ? copy.send : copy.skip}</b>
              </li>
            ))}
          </ul>
        </div>
        <p className={s.resTitle}>{copy.changeTitle}</p>
        <p className={s.resText}>{copy.changeText}</p>
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
              <span className={s.stateClosed}>{copy.closed}</span>
              <span className={s.stateOpen}>{copy.open}</span>
            </div>
            <div className={s.cooldown} aria-hidden="true">
              <i />
            </div>
          </div>
        </div>
        <p className={s.resTitle}>{copy.breakerTitle}</p>
        <p className={s.resText}>{copy.breakerText}</p>
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
        <p className={s.resTitle}>{copy.gateTitle}</p>
        <p className={s.resText}>{copy.gateText}</p>
      </article>

      <article className={s.resCard}>
        <div className={s.resVisual}>
          <div className={s.triage}>
            <span className={s.chip} style={{ "--i": 0 } as CSSProperties} data-to="retry">
              {copy.dropped}
            </span>
            <span className={s.chip} style={{ "--i": 1 } as CSSProperties} data-to="hold">
              {copy.invalidDate}
            </span>
            <span className={s.chip} style={{ "--i": 2 } as CSSProperties} data-to="retry">
              {copy.deadlock}
            </span>
            <div className={s.bins}>
              <span>{copy.retryBin}</span>
              <span>{copy.holdBin}</span>
            </div>
          </div>
        </div>
        <p className={s.resTitle}>{copy.triageTitle}</p>
        <p className={s.resText}>{copy.triageText}</p>
      </article>
    </div>
  );
}

/* ------------------------------------------------------------- shipping */

export function ShipFlow({ lang }: Props) {
  const copy = localize(COPY, lang);
  return (
    <div className={s.ship}>
      <ol className={s.stations}>
        <span className={s.rail} aria-hidden="true">
          <i />
        </span>
        {copy.stations.map((st, i) => (
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
        <p className={s.obsHead}>{copy.observability}</p>
        <div className={s.obsRow}>
          <span className={s.obsNode}>Grafana Alloy</span>
          <i className={s.obsArrow} aria-hidden="true" />
          <span className={s.obsGroup}>
            <span>Loki · logs</span>
            <span>{copy.metrics}</span>
            <span>Tempo · traces</span>
          </span>
          <i className={s.obsArrow} aria-hidden="true" />
          <span className={s.obsNode}>Grafana</span>
          <span className={s.obsSide}>{copy.sentry}</span>
        </div>
      </div>
    </div>
  );
}
