import type { CSSProperties } from "react";
import type { Project } from "@/content/portfolio";
import { Check } from "./ui";
import s from "./ProjectVisual.module.css";

/** Product visuals for the Work panels, drawn in HTML/CSS (plus one real screenshot). */
export default function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  if (kind === "kamjob") return <KamJob />;
  if (kind === "integration") return <Integration />;
  return <Ledger />;
}

/* ---------------------------------------------------------------- KamJob */

function KamJob() {
  return (
    <div className={s.stage} aria-hidden="true">
      <div className={s.phone}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static screenshot inside a decorative frame */}
        <img src="/projects/kamjob.webp" alt="" width={540} height={1169} loading="lazy" />
      </div>
      <div className={s.applied}>
        <span className={s.appliedIcon}>
          <Check />
        </span>
        <span>
          <b>Applied in one swipe</b>
          <small>CV + cover letter tailored by AI</small>
        </span>
      </div>
      <div className={s.match}>
        <svg viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" className={s.matchTrack} />
          <circle cx="20" cy="20" r="16" className={s.matchValue} pathLength={100} />
        </svg>
        <span>
          <b>94%</b>
          <small>AI match</small>
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- WAZALINK */

const LOG = [
  { time: "12:04:09", record: "pesee #4821", status: "skip", text: "unchanged · skip" },
  { time: "12:04:11", record: "bon_livraison #118", status: "retry", text: "retry #2 · next run" },
  { time: "12:04:15", record: "planteur #77", status: "ok", text: "synced" },
  { time: "12:04:18", record: "bon_livraison #118", status: "ok", text: "synced" },
];

function Integration() {
  return (
    <div className={s.stage} aria-hidden="true">
      <svg className={s.wires} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M33 18 C 37 18, 36 28, 40 28" />
        <path d="M33 44 C 37 44, 36 34, 40 34" />
        <path d="M65 30 L 70 30" />
      </svg>

      <div className={`${s.node} ${s.x3}`}>
        <b>Sage X3</b>
        <small>SOAP · ERP</small>
      </div>
      <div className={`${s.node} ${s.hrm}`}>
        <b>Sage HRM</b>
        <small>SQL · HR</small>
      </div>
      <div className={`${s.node} ${s.capi}`}>
        <b>CAPI</b>
        <small>REST · field app</small>
      </div>

      <div className={s.hub}>
        <p className={s.hubHead}>
          <b>WAZALINK</b>
          <span>k3s · ArgoCD</span>
        </p>
        <div className={s.states}>
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} data-state={i < 6 ? "done" : i === 6 ? "active" : undefined} />
          ))}
        </div>
        <p className={s.stateLabel}>state 7/9 · sent</p>
      </div>

      <div className={s.log}>
        <p className={s.logHead}>
          <span>Transfer log</span>
          <span className={s.live}>
            <i />
            Live
          </span>
        </p>
        <ul>
          {LOG.map((line, i) => (
            <li key={i} style={{ "--i": i } as CSSProperties}>
              <span>{line.time}</span>
              <span>{line.record}</span>
              <span data-status={line.status}>{line.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- LedgerSync */

const ROWS = [
  { service: "Western Union", integra: "12 450 000", sage: "12 450 000", ok: true },
  { service: "MoneyGram", integra: "8 120 500", sage: "8 120 500", ok: true },
  { service: "Ria", integra: "3 006 000", sage: "2 996 000", ok: false },
  { service: "Orange Money", integra: "21 870 250", sage: "21 870 250", ok: true },
  { service: "MTN MoMo", integra: "9 540 000", sage: "9 540 000", ok: true },
];

function Ledger() {
  return (
    <div className={s.stage} aria-hidden="true">
      <div className={s.window}>
        <p className={s.titleBar}>
          <span className={s.dots}>
            <i />
            <i />
            <i />
          </span>
          <span>LedgerSync — Reconciliation · Sep 2025</span>
        </p>
        <p className={s.formula}>
          <b>ƒx</b>
          <code>
            matched = integra.amount − sage1000.amount <em>= 0</em>
          </code>
        </p>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Service</th>
              <th>Integra</th>
              <th>Sage 1000</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.service} data-review={row.ok ? undefined : ""}>
                <td>{row.service}</td>
                <td>{row.integra}</td>
                <td>{row.sage}</td>
                <td>
                  <span className={s.status}>{row.ok ? "Matched" : "Review"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={s.balance}>
          <span>Debit 55 000 000 = Credit 55 000 000</span>
          <b>
            <Check /> Balanced
          </b>
        </p>
      </div>

      <div className={s.edited}>
        <span className={s.avatar}>AC</span>
        <span>
          <b>Formula updated by Accounting</b>
          <small>Live in seconds · no code change</small>
        </span>
      </div>

      <div className={s.rule}>
        <p>Rule · Ria</p>
        <pre>{`{
  "debit": "4711",
  "credit": "5121",
  "tolerance": 0.01
}`}</pre>
      </div>
    </div>
  );
}
