import type { CSSProperties } from "react";
import type { Content } from "@/content/portfolio";
import { localize, t, type Locale, type Localized } from "@/lib/i18n";
import { Check } from "./ui";
import s from "./ProjectVisual.module.css";

type Kind = Content["work"]["projects"][number]["visual"];

/** The words inside the mock screens. Record ids and figures stay as they are. */
const COPY = {
  applied: t("Applied in one swipe", "Candidature en un swipe"),
  tailored: t("CV + cover letter tailored by AI", "CV + lettre adaptés par l’IA"),
  match: t("AI match", "Match IA"),
  skip: t("unchanged · skip", "inchangé · ignoré"),
  retry: t("retry #2 · next run", "reprise n°2 · prochain cycle"),
  synced: t("synced", "synchronisé"),
  hr: t("SQL · HR", "SQL · RH"),
  field: t("REST · field app", "REST · appli terrain"),
  state: t("state 7/9 · sent", "état 7/9 · envoyé"),
  log: t("Transfer log", "Journal des transferts"),
  live: t("Live", "En direct"),
  window: t("LedgerSync — Reconciliation · Sep 2025", "LedgerSync — Rapprochement · sept. 2025"),
  status: t("Status", "Statut"),
  matched: t("Matched", "Rapproché"),
  review: t("Review", "À vérifier"),
  balance: t("Debit 55 000 000 = Credit 55 000 000", "Débit 55 000 000 = Crédit 55 000 000"),
  balanced: t("Balanced", "Équilibré"),
  edited: t("Formula updated by Accounting", "Formule modifiée par la comptabilité"),
  editedNote: t("Live in seconds · no code change", "Active en quelques secondes · sans code"),
  rule: t("Rule · Ria", "Règle · Ria"),
};

type Copy = Localized<typeof COPY>;

/** Product visuals for the Work panels, drawn in HTML/CSS (plus one real screenshot). */
export default function ProjectVisual({ kind, lang }: { kind: Kind; lang: Locale }) {
  const copy = localize(COPY, lang);
  if (kind === "kamjob") return <KamJob copy={copy} />;
  if (kind === "integration") return <Integration copy={copy} />;
  return <Ledger copy={copy} />;
}

/* ---------------------------------------------------------------- KamJob */

function KamJob({ copy }: { copy: Copy }) {
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
          <b>{copy.applied}</b>
          <small>{copy.tailored}</small>
        </span>
      </div>
      <div className={s.match}>
        <svg viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" className={s.matchTrack} />
          <circle cx="20" cy="20" r="16" className={s.matchValue} pathLength={100} />
        </svg>
        <span>
          <b>94%</b>
          <small>{copy.match}</small>
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- WAZALINK */

function Integration({ copy }: { copy: Copy }) {
  const log = [
    { time: "12:04:09", record: "pesee #4821", status: "skip", text: copy.skip },
    { time: "12:04:11", record: "bon_livraison #118", status: "retry", text: copy.retry },
    { time: "12:04:15", record: "planteur #77", status: "ok", text: copy.synced },
    { time: "12:04:18", record: "bon_livraison #118", status: "ok", text: copy.synced },
  ];

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
        <small>{copy.hr}</small>
      </div>
      <div className={`${s.node} ${s.capi}`}>
        <b>CAPI</b>
        <small>{copy.field}</small>
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
        <p className={s.stateLabel}>{copy.state}</p>
      </div>

      <div className={s.log}>
        <p className={s.logHead}>
          <span>{copy.log}</span>
          <span className={s.live}>
            <i />
            {copy.live}
          </span>
        </p>
        <ul>
          {log.map((line, i) => (
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

function Ledger({ copy }: { copy: Copy }) {
  return (
    <div className={s.stage} aria-hidden="true">
      <div className={s.window}>
        <p className={s.titleBar}>
          <span className={s.dots}>
            <i />
            <i />
            <i />
          </span>
          <span>{copy.window}</span>
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
              <th>{copy.status}</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.service} data-review={row.ok ? undefined : ""}>
                <td>{row.service}</td>
                <td>{row.integra}</td>
                <td>{row.sage}</td>
                <td>
                  <span className={s.status}>{row.ok ? copy.matched : copy.review}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={s.balance}>
          <span>{copy.balance}</span>
          <b>
            <Check /> {copy.balanced}
          </b>
        </p>
      </div>

      <div className={s.edited}>
        <span className={s.avatar}>AC</span>
        <span>
          <b>{copy.edited}</b>
          <small>{copy.editedNote}</small>
        </span>
      </div>

      <div className={s.rule}>
        <p>{copy.rule}</p>
        <pre>{`{
  "debit": "4711",
  "credit": "5121",
  "tolerance": 0.01
}`}</pre>
      </div>
    </div>
  );
}
