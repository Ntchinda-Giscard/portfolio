"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cx } from "@/lib/utils";
import { Check } from "../ui";
import s from "./ledgersync.module.css";

const STEPS = [
  "Chargement",
  "Traitement",
  "Résultat",
  "Comptabilisation",
  "Fichier Interface",
  "Rapprochement",
  "Simulation",
];

type Svc = "wu" | "mg" | "ria";

const NAV = ["Service", "Agence", "Integra", "Formule de calcul", "Schéma de comptabilisation"];

const ICONS = {
  dashboard: "M4 4h6v8H4zM14 4h6v5h-6zM14 13h6v7h-6zM4 16h6v4H4z",
  settings: "M20 7h-9M14 17H5M17 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM7 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  box: "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8",
  layers: "m12 3 9 5-9 5-9-5zM3 13l9 5 9-5",
  report: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5",
  shield: "M12 21s8-4 8-10V5l-8-3-8 3v6c0 6 8 10 8 10zM9 12l2 2 4-4",
};

function NavIcon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const RAW: { svc: Svc; service: string; agence: string; ref: string; montant: string; frais: string }[] = [
  { svc: "wu", service: "Western Union", agence: "A-014", ref: "WU-88213", montant: "25 000", frais: "1 200" },
  { svc: "mg", service: "MoneyGram", agence: "A-002", ref: "MG-40117", montant: "150 000", frais: "3 600" },
  { svc: "wu", service: "Western Union", agence: "A-014", ref: "WU-88227", montant: "60 000", frais: "1 600" },
  { svc: "ria", service: "Ria", agence: "A-014", ref: "RI-10552", montant: "75 000", frais: "2 400" },
  { svc: "mg", service: "MoneyGram", agence: "A-002", ref: "MG-40131", montant: "40 000", frais: "2 000" },
  { svc: "wu", service: "Western Union", agence: "A-014", ref: "WU-88240", montant: "2 500", frais: "400" },
];

const GROUPED: { svc: Svc; service: string; agence: string; n: number; montant: string; frais: string; taxe: string }[] = [
  { svc: "wu", service: "Western Union", agence: "A-014", n: 3, montant: "87 500", frais: "3 200", taxe: "616" },
  { svc: "mg", service: "MoneyGram", agence: "A-002", n: 2, montant: "190 000", frais: "5 600", taxe: "1 078" },
  { svc: "ria", service: "Ria", agence: "A-014", n: 1, montant: "75 000", frais: "2 400", taxe: "462" },
];

const PIECE: { compte: string; libelle: string; debit?: string; credit?: string }[] = [
  { compte: "Agence A-014", libelle: "Encaissement agence", debit: "91 316" },
  { compte: "Service WU", libelle: "Transferts à payer", credit: "87 500" },
  { compte: "Commissions", libelle: "Commissions sur transferts", credit: "3 200" },
  { compte: "TVA", libelle: "TVA sur commissions", credit: "616" },
];

const FILES = [
  { name: "WU_020925.txt", lines: 48 },
  { name: "MoneyGram_020925.txt", lines: 36 },
  { name: "RIA_020925.txt", lines: 22 },
];

const MATCHES: { key: string; integra: string; sage: string; status: "ok" | "gap" | "apart"; label: string }[] = [
  { key: "WU · Agence A-014", integra: "91 316", sage: "91 316", status: "ok", label: "Rapproché" },
  { key: "WU · Commissions", integra: "3 200", sage: "3 200", status: "ok", label: "Rapproché" },
  { key: "MoneyGram · Agence A-002", integra: "196 678", sage: "196 678", status: "ok", label: "Rapproché" },
  { key: "Ria · Service", integra: "75 000", sage: "74 000", status: "gap", label: "Écart 1 000" },
  { key: "TVA sur commissions MG", integra: "—", sage: "1 078", status: "apart", label: "À part" },
];

const i = (n: number) => ({ "--i": n }) as CSSProperties;

function LoadScene() {
  return (
    <div className={s.load}>
      <div className={s.dropZone}>
        <span className={s.dropIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 16V4m0 0-4.5 4.5M12 4l4.5 4.5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
          </svg>
        </span>
        <b>Déposez le fichier Integra</b>
        <small>Excel ou CSV</small>
        <div className={s.fileCard}>
          <span className={s.fileType}>XLSX</span>
          <span className={s.fileMeta}>
            <b>integra_septembre.xlsx</b>
            <small>2,4 Mo</small>
          </span>
          <span className={s.fileBar}>
            <i />
          </span>
        </div>
      </div>
      <ul className={s.detect}>
        <li style={i(0)}>
          <Check /> 12 480 lignes lues
        </li>
        <li style={i(1)}>
          <Check /> Feuille et ligne d’en-tête détectées
        </li>
        <li style={i(2)}>
          <Check /> Période : septembre 2025
        </li>
      </ul>
    </div>
  );
}

function ReviewScene() {
  return (
    <>
      <div className={s.filters}>
        <span>Tous les services ▾</span>
        <span className={s.wideOnly}>Code agence…</span>
        <span>6 transactions</span>
      </div>
      <table className={s.tbl}>
        <thead>
          <tr>
            <th>Service</th>
            <th>Agence</th>
            <th className={s.wideOnly}>Référence</th>
            <th className={s.num}>Montant</th>
            <th className={cx(s.num, s.wideOnly)}>Frais</th>
          </tr>
        </thead>
        <tbody>
          {RAW.map((row, n) => (
            <tr key={row.ref} style={i(n)}>
              <td>
                <span className={cx(s.svc, s[row.svc])}>{row.service}</span>
              </td>
              <td>{row.agence}</td>
              <td className={s.wideOnly}>{row.ref}</td>
              <td className={s.num}>{row.montant}</td>
              <td className={cx(s.num, s.wideOnly)}>{row.frais}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function ResultScene() {
  return (
    <>
      <p className={s.collapse}>
        <span>6 transactions</span>
        <i aria-hidden="true" />
        <b>3 lignes</b>
        <small className={s.wideOnly}>Service × Agence × Date</small>
      </p>
      <table className={s.tbl}>
        <thead>
          <tr>
            <th>Service</th>
            <th>Agence</th>
            <th className={s.wideOnly}>Date</th>
            <th className={s.num}>Montant_Ag</th>
            <th className={cx(s.num, s.wideOnly)}>Frais_Ag</th>
            <th className={cx(s.num, s.wideOnly)}>Taxe_Ag</th>
          </tr>
        </thead>
        <tbody>
          {GROUPED.map((row, n) => (
            <tr key={row.service} style={i(n + 2)}>
              <td>
                <span className={cx(s.svc, s[row.svc])}>{row.service}</span>
                <span className={cx(s.times, s[row.svc])}>×{row.n}</span>
              </td>
              <td>{row.agence}</td>
              <td className={s.wideOnly}>02/09/2025</td>
              <td className={s.num}>{row.montant}</td>
              <td className={cx(s.num, s.wideOnly)}>{row.frais}</td>
              <td className={cx(s.num, s.wideOnly)}>{row.taxe}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function PostScene() {
  return (
    <>
      <p className={s.sceneHead}>
        <b>Pièce · Western Union · 02/09/2025</b>
        <small className={s.wideOnly}>schéma paramétré</small>
      </p>
      <table className={s.tbl}>
        <thead>
          <tr>
            <th>Compte</th>
            <th className={s.wideOnly}>Libellé</th>
            <th className={s.num}>Débit</th>
            <th className={s.num}>Crédit</th>
          </tr>
        </thead>
        <tbody>
          {PIECE.map((line, n) => (
            <tr key={line.compte} style={i(n)}>
              <td>
                <span className={s.dc}>{line.debit ? "D" : "C"}</span>
                {line.compte}
              </td>
              <td className={s.wideOnly}>{line.libelle}</td>
              <td className={s.num}>{line.debit ?? ""}</td>
              <td className={s.num}>{line.credit ?? ""}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Σ</td>
            <td className={s.wideOnly} />
            <td className={s.num}>91 316</td>
            <td className={s.num}>91 316</td>
          </tr>
        </tfoot>
      </table>
      <p className={s.balanced}>
        <Check /> Pièce équilibrée · écart 0,00 XAF
      </p>
    </>
  );
}

function InterfaceScene() {
  return (
    <>
      <p className={s.sceneHead}>
        <b>Fichiers d’interface Sage 1000</b>
        <small className={s.wideOnly}>un par service et par jour</small>
      </p>
      <ul className={s.files}>
        {FILES.map((file, n) => (
          <li key={file.name} style={i(n)}>
            <span className={s.fileTxt}>TXT</span>
            <b>{file.name}</b>
            <small>{file.lines} lignes</small>
            <span className={s.conform}>
              <Check /> <span className={s.wideOnly}>période conforme</span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function MatchScene() {
  return (
    <>
      <table className={s.tbl}>
        <thead>
          <tr>
            <th>Service · Compte</th>
            <th className={cx(s.num, s.wideOnly)}>Integra</th>
            <th className={s.num}>Sage 1000</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {MATCHES.map((row, n) => (
            <tr key={row.key} style={i(n)}>
              <td>{row.key}</td>
              <td className={cx(s.num, s.wideOnly)}>{row.integra}</td>
              <td className={s.num}>{row.sage}</td>
              <td>
                <span className={s.status} data-status={row.status} style={i(n)}>
                  {row.label}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className={s.sceneFoot}>
        <b>3</b> rapprochés · <b>1</b> écart · <b>1</b> à part
      </p>
    </>
  );
}

/** One scene per step; Simulation (step 7) is still being built, so the demo stops at 6. */
const SCENES = [
  { title: "Chargement du fichier Integra", ms: 3400, Scene: LoadScene },
  { title: "Traitement — fichier importé", ms: 2800, Scene: ReviewScene },
  { title: "Résultat — table intermédiaire", ms: 3000, Scene: ResultScene },
  { title: "Comptabilisation", ms: 3600, Scene: PostScene },
  { title: "Fichier Interface", ms: 2800, Scene: InterfaceScene },
  { title: "Rapprochement", ms: 3800, Scene: MatchScene },
];

export default function AppDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const [running, setRunning] = useState(false);

  // Auto-play only while on screen, and never for visitors who prefer reduced motion.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setPhase((phase + 1) % SCENES.length), SCENES[phase].ms);
    return () => window.clearTimeout(timer);
  }, [running, phase]);

  const { title, Scene } = SCENES[phase];

  return (
    <div ref={rootRef} className={s.demo}>
      <div className={s.window}>
        <p className={s.bar}>
          <span className={s.barIcon} aria-hidden="true">
            LS
          </span>
          LedgerSync
          <span className={s.controls} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </p>

        <div className={s.app}>
          <aside className={s.side} aria-hidden="true">
            <p className={s.sideBrand}>
              <span className={s.sideMark}>LS</span>
              <span>
                <b>LedgerSync</b>
                <small>Direction financière</small>
              </span>
            </p>
            <ul className={s.nav}>
              <li>
                <NavIcon d={ICONS.dashboard} /> Tableau de bord
              </li>
              <li className={s.navGroup}>
                <NavIcon d={ICONS.settings} /> Paramétrage
              </li>
              {NAV.map((item) => (
                <li key={item} className={s.navSub}>
                  {item}
                </li>
              ))}
              <li className={s.navActive}>
                <NavIcon d={ICONS.box} /> Module 1
              </li>
              <li>
                <NavIcon d={ICONS.layers} /> Module 2
              </li>
              <li>
                <NavIcon d={ICONS.report} /> Rapport
              </li>
              <li>
                <NavIcon d={ICONS.shield} /> Administration
              </li>
            </ul>
            <p className={s.sideUser}>
              <span className={s.sideMark}>AC</span>
              <span>
                <b>Comptable</b>
                <small>m1.run · formulas.manage</small>
              </span>
            </p>
          </aside>

          <div className={s.main}>
            <p className={s.crumbs}>
              <span>
                Module M1 › <b>{title}</b>
              </span>
              <span className={s.period}>09/2025</span>
            </p>

            <ol className={s.stepper} aria-label="Étapes du module M1">
              {STEPS.map((label, n) => {
                const playable = n < SCENES.length;
                return (
                  <li key={label} className={cx(s.step, n < phase && s.stepDone, n === phase && s.stepActive)}>
                    <button
                      type="button"
                      className={s.stepBtn}
                      disabled={!playable}
                      aria-current={n === phase ? "step" : undefined}
                      aria-label={playable ? `${n + 1}. ${label}` : `${n + 1}. ${label} (bientôt)`}
                      onClick={() => setPhase(n)}
                    >
                      <span className={s.stepNum}>{n < phase ? <Check /> : n + 1}</span>
                      <span className={s.stepLabel}>{label}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div key={phase} className={s.scene}>
              <Scene />
            </div>
          </div>
        </div>
      </div>

      <div className={s.float} aria-hidden="true">
        <span className={s.fx}>ƒx</span>
        <span>
          <b>TVA = Frais × 0,1925</b>
          <small>Edited by Accounting · applied on the next run</small>
        </span>
      </div>
    </div>
  );
}
