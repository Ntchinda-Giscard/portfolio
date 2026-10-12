import { Fragment, type CSSProperties } from "react";
import { cx } from "@/lib/utils";
import { ArrowRight, Check } from "../ui";
import s from "./ledgersync.module.css";

type Svc = "wu" | "mg" | "ria";

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/* ------------------------------------------------------------- problem */

const SHEET_COLS = ["Service", "Agence", "Date", "Montant", "Frais", "Taxe"];
/** Columns dropped on small screens (Date, Taxe) */
const SHEET_HIDE = [false, false, true, false, false, true];
const SHEET = [
  ["Western Union", "A-014", "01/09", "25 000", "1 200", "231"],
  ["MoneyGram", "A-002", "01/09", "150 000", "3 600", "693"],
  ["Orange Money", "A-031", "01/09", "10 000", "400", "77"],
  ["Ria", "A-014", "01/09", "75 000", "2 400", "462"],
  ["Western Union", "A-007", "01/09", "60 000", "2 000", "385"],
  ["MTN MoMo", "A-002", "01/09", "5 000", "400", "77"],
  ["MoneyGram", "A-031", "01/09", "40 000", "2 000", "385"],
  ["Western Union", "A-014", "01/09", "2 500", "800", "154"],
  ["Ria", "A-007", "01/09", "32 000", "1 600", "308"],
  ["Orange Money", "A-014", "01/09", "18 000", "800", "154"],
  ["MoneyGram", "A-007", "01/09", "90 000", "2 800", "539"],
  ["Western Union", "A-031", "01/09", "12 000", "800", "154"],
];

function Trip({ label, note, stops, fast }: { label: string; note: string; stops: string[]; fast?: boolean }) {
  return (
    <div className={cx(fast && s.fast)}>
      <p className={s.laneTop}>
        <b>{label}</b>
        <span>{note}</span>
      </p>
      <div className={s.trip}>
        {stops.map((stop, n) => (
          <span
            key={stop}
            className={s.stop}
            data-edge={n === 0 ? "start" : n === stops.length - 1 ? "end" : undefined}
            style={vars({ "--p": n / (stops.length - 1) })}
          >
            <i />
            <span>{stop}</span>
          </span>
        ))}
        <i className={s.mover} />
      </div>
    </div>
  );
}

export function ManualWork() {
  return (
    <div className={s.manual}>
      <article className={s.card}>
        <p className={s.cardHead}>
          <b>The export</b> summed by hand
        </p>
        <div className={s.sheet} aria-hidden="true">
          <p className={s.sheetFx}>
            <i>fx</i>
            <code>=SOMME.SI.ENS(D:D; A:A; &quot;Western Union&quot;; B:B; &quot;A-014&quot;)</code>
          </p>
          <div className={s.sheetCols}>
            <span />
            {SHEET_COLS.map((col, c) => (
              <span key={col} className={SHEET_HIDE[c] ? s.sheetHide : undefined}>
                {col}
              </span>
            ))}
          </div>
          <div className={s.sheetView}>
            <div className={s.sheetRows}>
              {[...SHEET, ...SHEET].map((row, n) => (
                <div key={n} className={s.sheetRow}>
                  <span>{n + 2}</span>
                  {row.map((cell, c) => (
                    <span key={c} className={SHEET_HIDE[c] ? s.sheetHide : undefined}>
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <span className={s.sheetSel} />
          </div>
          <p className={s.sheetFoot}>
            <span>integra_septembre.xlsx</span>
            <span>12 480 lignes</span>
          </p>
        </div>
        <p className={s.cardText}>
          Every transfer summed per service, agency and date, posted to the right accounts, then ticked off against
          Sage — for each of 40+ services.
        </p>
      </article>

      <article className={s.card}>
        <p className={s.cardHead}>
          <b>A rule change</b> needed a developer
        </p>
        <div className={s.change} aria-hidden="true">
          <Trip label="Before" note="wait for a release" stops={["Rate changes", "Ticket", "Code change", "Release", "Live"]} />
          <Trip label="LedgerSync" note="next run" stops={["Rate changes", "Formula edited", "Live"]} fast />
        </div>
        <p className={s.cardText}>
          Commission rates and posting rules lived in the code, so every change meant a ticket, a developer and a new
          release. In LedgerSync they are formulas the accountants edit themselves.
        </p>
      </article>
    </div>
  );
}

/* ------------------------------------------------------------ pipeline */

const TXS: { svc: Svc; tag: string; agence: string; amount: string; group: number }[] = [
  { svc: "wu", tag: "WU", agence: "A-014", amount: "25 000", group: 0 },
  { svc: "mg", tag: "MG", agence: "A-002", amount: "150 000", group: 1 },
  { svc: "wu", tag: "WU", agence: "A-014", amount: "60 000", group: 0 },
  { svc: "ria", tag: "RIA", agence: "A-014", amount: "75 000", group: 2 },
  { svc: "mg", tag: "MG", agence: "A-002", amount: "40 000", group: 1 },
  { svc: "wu", tag: "WU", agence: "A-014", amount: "2 500", group: 0 },
];

const GROUPS: { svc: Svc; tag: string; name: string; agence: string; sum: string }[] = [
  { svc: "wu", tag: "WU", name: "Western Union", agence: "A-014", sum: "87 500" },
  { svc: "mg", tag: "MG", name: "MoneyGram", agence: "A-002", sum: "190 000" },
  { svc: "ria", tag: "RIA", name: "Ria", agence: "A-014", sum: "75 000" },
];

/** Row centres, in px, inside the 320 px tall diagram (see .txs / .groups). */
const txY = (n: number) => 22 + n * 54;
const groupY = (g: number) => 44 + g * 116;
const mergePath = (n: number, g: number) => `M0 ${txY(n)} C 36 ${txY(n)} 36 ${groupY(g)} 72 ${groupY(g)}`;

const FLOW = [
  {
    fr: "Chargement",
    en: "Load",
    text: "Drop the Integra export, Excel or CSV. The right sheet, the header row and the month are detected for you.",
  },
  { fr: "Traitement", en: "Review", text: "Browse the raw transfers by service or agency and remove lines that shouldn’t count." },
  { fr: "Résultat", en: "Aggregate", text: "One row per service, agency and date, with amounts, fees and tax summed." },
  {
    fr: "Comptabilisation",
    en: "Post",
    text: "Each service’s posting schema turns those rows into debit and credit lines, piece by piece.",
  },
  { fr: "Fichier Interface", en: "Import", text: "Load Sage 1000’s interface files — one per service and day — and check their period." },
  { fr: "Rapprochement", en: "Reconcile", text: "Compare debits and credits per service, account and date, and flag every gap." },
  { fr: "Simulation", en: "Next", text: "In development.", soon: true },
];

export function Pipeline() {
  return (
    <div className={s.pipe}>
      <div className={s.merge}>
        <p className={s.mergeHead}>
          <span>Integra · 6 transfers</span>
          <span>Intermediate table · 3 rows</span>
        </p>
        <div className={s.mergeBody} aria-hidden="true">
          <ul className={s.txs}>
            {TXS.map((tx, n) => (
              <li key={n} className={cx(s.tx, s[tx.svc])} style={vars({ "--i": n })}>
                <span className={s.tag}>{tx.tag}</span>
                <span className={s.txAgency}>{tx.agence}</span>
                <span className={s.txAmount}>{tx.amount}</span>
              </li>
            ))}
          </ul>
          <div className={s.links}>
            <svg width="72" height="320" viewBox="0 0 72 320">
              {TXS.map((tx, n) => (
                <path key={n} d={mergePath(n, tx.group)} className={cx(s.link, s[tx.svc])} />
              ))}
            </svg>
            {TXS.map((tx, n) => (
              <i
                key={n}
                className={cx(s.pulse, s[tx.svc])}
                style={vars({ "--i": n, offsetPath: `path("${mergePath(n, tx.group)}")` })}
              />
            ))}
          </div>
          <ul className={s.groups}>
            {GROUPS.map((group, g) => {
              const members = TXS.map((tx, n) => ({ ...tx, n })).filter((tx) => tx.group === g);
              return (
                <li key={group.tag} className={cx(s.group, s[group.svc])}>
                  <p className={s.groupTop}>
                    <span className={s.tag}>{group.tag}</span>
                    <span className={s.groupName}>{group.name}</span>
                    <small>×{members.length}</small>
                  </p>
                  <p className={s.groupKey}>{group.agence} · 02/09</p>
                  <p className={s.groupSum}>Σ {group.sum}</p>
                  {members.map((m) => (
                    <Fragment key={m.n}>
                      <i className={s.hit} style={vars({ "--i": m.n })} />
                      <span className={s.pop} style={vars({ "--i": m.n })}>
                        +{m.amount}
                      </span>
                    </Fragment>
                  ))}
                </li>
              );
            })}
          </ul>
        </div>
        <p className={s.mergeNote}>
          Each transfer joins the row for its service, agency and date. Amounts, fees and tax are summed; the
          per-transfer reference is dropped.
        </p>
      </div>

      <div className={s.flow7}>
        <p className={s.flowHead}>Module M1 · seven steps</p>
        <ol className={s.flowList}>
          {FLOW.map((step, n) => (
            <li key={step.fr} className={s.flowItem} data-soon={step.soon || undefined}>
              <span className={s.flowDot} style={vars({ "--i": n })}>
                {n + 1}
              </span>
              <div>
                <p className={s.flowName}>
                  {step.fr}
                  <small>{step.en}</small>
                </p>
                <p className={s.flowText}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- balance */

const PIECE: { compte: string; libelle: string; debit?: string; credit?: string }[] = [
  { compte: "Agence A-014", libelle: "Encaissement agence", debit: "91 316" },
  { compte: "Service WU", libelle: "Transferts à payer", credit: "87 500" },
  { compte: "Commissions", libelle: "Commissions sur transferts", credit: "3 200" },
  { compte: "TVA", libelle: "TVA sur commissions", credit: "616" },
];

export function BalancedPiece() {
  return (
    <div className={s.balance}>
      <div className={s.ledger}>
        <div className={s.scale} aria-hidden="true">
          <span className={s.stand} />
          <div className={s.beam}>
            <div className={s.pan} data-side="debit">
              <div className={s.panBox}>
                <b>Σ Débit</b>
                <span className={s.vals}>
                  <span className={s.vD0}>0</span>
                  <span className={cx(s.vD1, s.vFinal)}>91 316</span>
                </span>
              </div>
            </div>
            <div className={s.pan} data-side="credit">
              <div className={s.panBox}>
                <b>Σ Crédit</b>
                <span className={s.vals}>
                  <span className={s.vC0}>0</span>
                  <span className={s.vC1}>87 500</span>
                  <span className={s.vC2}>90 700</span>
                  <span className={cx(s.vC3, s.vFinal)}>91 316</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <table className={s.journal}>
          <caption className="sr-only">Pièce Western Union du 02/09/2025</caption>
          <thead>
            <tr>
              <th>Compte</th>
              <th className={s.journalWide}>Libellé</th>
              <th className={s.num}>Débit</th>
              <th className={s.num}>Crédit</th>
            </tr>
          </thead>
          <tbody>
            {PIECE.map((line, n) => (
              <tr key={line.compte} className={s[`in${n + 1}`]}>
                <td>{line.compte}</td>
                <td className={s.journalWide}>{line.libelle}</td>
                <td className={s.num}>{line.debit ?? ""}</td>
                <td className={s.num}>{line.credit ?? ""}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className={s.in5}>
              <td>Σ</td>
              <td className={s.journalWide} />
              <td className={s.num}>91 316</td>
              <td className={s.num}>91 316</td>
            </tr>
          </tfoot>
        </table>
        <p className={cx(s.verdict, s.in5)}>
          <Check /> Pièce équilibrée · |Σ D − Σ C| ≤ 0,01 XAF
        </p>
        <p className={s.caption}>One piece = one service on one date. Illustrative figures.</p>
      </div>

      <div className={s.fixes}>
        <article className={s.err}>
          <p className={s.errState} aria-hidden="true">
            <span className={s.errOn}>Ligne en erreur</span>
            <span className={s.errOff}>Corrigé</span>
          </p>
          <p className={s.errMsg}>
            <em>Commissions</em> non paramétré pour «&nbsp;MoneyGram&nbsp;». À définir dans Paramétrage → Services
            (Commissions).
          </p>
          <span className={s.errFix} aria-hidden="true">
            Corriger <ArrowRight />
          </span>
          <div className={s.form} aria-hidden="true">
            <p className={s.formCrumb}>Paramétrage › Services › MoneyGram</p>
            <p className={s.field}>
              <span>Compte Service</span>
              <span className={s.fieldBox}>401 300</span>
            </p>
            <p className={cx(s.field, s.fieldTarget)}>
              <span>Commissions</span>
              <span className={s.fieldBox}>
                <span className={s.typed}>706 100</span>
                <i className={s.caret} />
              </span>
            </p>
          </div>
        </article>
        <article className={s.rule}>
          <b>No rule, no posting.</b>A service without a posting schema is never posted by some hidden default — it is
          set aside and counted on screen, so nothing passes for posted that nobody configured.
        </article>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ reconcile */

type Status = "ok" | "gap";

const INTEGRA = [
  { service: "Western Union", compte: "Agence A-014", piece: "INT-0209-01", amount: "D 91 316" },
  { service: "Western Union", compte: "Commissions", piece: "INT-0209-01", amount: "C 3 200" },
  { service: "MoneyGram", compte: "Agence A-002", piece: "INT-0209-02", amount: "D 196 678" },
  { service: "Ria Distribution", compte: "Service", piece: "INT-0209-03", amount: "C 75 000" },
];

/** Sage lists the same entries in its own order, with its own piece numbers and labels. */
const SAGE: { pair: number; service: string; compte: string; piece: string; amount: string; status: Status; label: string }[] = [
  { pair: 3, service: "Distribution RIA", compte: "Service", piece: "VT020925-14", amount: "C 74 000", status: "gap", label: "Écart 1 000" },
  { pair: 0, service: "Western Union", compte: "Agence A-014", piece: "VT020925-09", amount: "D 91 316", status: "ok", label: "Rapproché" },
  { pair: 2, service: "MoneyGram", compte: "Agence A-002", piece: "VT020925-11", amount: "D 196 678", status: "ok", label: "Rapproché" },
  { pair: 1, service: "Western Union", compte: "Commissions", piece: "VT020925-09", amount: "C 3 200", status: "ok", label: "Rapproché" },
];

const rowY = (n: number) => 29 + n * 70;
const reconPath = (from: number, to: number) => `M0 ${rowY(from)} C 60 ${rowY(from)} 60 ${rowY(to)} 120 ${rowY(to)}`;
const STAGGER = 1.6;
const TRAVEL = 1.2;

export function Reconcile() {
  return (
    <div className={s.recon}>
      <div className={s.reconWide}>
        <p className={s.reconCols}>
          <span>Generated from Integra</span>
          <span>Sage 1000 interface file</span>
        </p>
        <div className={s.reconBody}>
          <ul className={s.rlist}>
            {INTEGRA.map((row, n) => (
              <li
                key={n}
                className={s.rrow}
                data-status={SAGE.find((r) => r.pair === n)?.status}
                style={vars({ "--t": `${n * STAGGER}s` })}
              >
                <b>{row.service}</b>
                <small>
                  {row.compte} · 02/09
                  <s>{row.piece}</s>
                </small>
                <span className={s.ramt}>{row.amount}</span>
              </li>
            ))}
          </ul>
          <div className={s.rlinks} aria-hidden="true">
            <svg width="120" height="268" viewBox="0 0 120 268">
              {SAGE.map((row, j) => (
                <path key={j} d={reconPath(row.pair, j)} className={s.rlink} data-status={row.status} />
              ))}
            </svg>
            {SAGE.map((row, j) => (
              <i
                key={j}
                className={s.rpulse}
                data-status={row.status}
                style={vars({ "--t": `${row.pair * STAGGER}s`, offsetPath: `path("${reconPath(row.pair, j)}")` })}
              />
            ))}
          </div>
          <ul className={s.rlist}>
            {SAGE.map((row) => (
              <li
                key={row.pair}
                className={s.rrow}
                data-status={row.status}
                style={vars({ "--t": `${row.pair * STAGGER + TRAVEL}s` })}
              >
                <b>{row.service}</b>
                <small>
                  {row.compte} · 02/09
                  <s>{row.piece}</s>
                </small>
                <span className={s.ramt}>
                  {row.amount}
                  <span className={s.status} data-status={row.status}>
                    {row.label}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className={s.reconNarrow}>
        {INTEGRA.map((row, n) => {
          const sage = SAGE.find((r) => r.pair === n);
          if (!sage) return null;
          return (
            <li key={n} className={s.pair}>
              <p className={s.pairSide}>
                <small>Integra</small>
                <span className={s.pairKey}>
                  <b>{row.service}</b>
                  <em>{row.compte} · 02/09</em>
                </span>
                <span className={s.pairAmt}>{row.amount}</span>
              </p>
              <p className={s.pairSide}>
                <small>Sage</small>
                <span className={s.pairKey}>
                  <b>{sage.service}</b>
                  <em>{sage.compte} · 02/09</em>
                </span>
                <span className={s.pairAmt}>{sage.amount}</span>
              </p>
              <span className={s.status} data-status={sage.status}>
                {sage.label}
              </span>
            </li>
          );
        })}
      </ul>

      <div className={s.apart}>
        <span className={s.apartIcon} aria-hidden="true">
          ?
        </span>
        <span>
          <b>TVA collectée sur commissions MG · C 1 078</b>
          No service in the label, so nothing says where it belongs — it is reconciled on its own instead of guessed.
        </span>
        <span className={s.status} data-status="apart">
          À part
        </span>
      </div>

      <p className={s.reconFoot}>
        <span className={s.status} data-status="ok">
          3 rapprochés
        </span>
        <span className={s.status} data-status="gap">
          1 écart
        </span>
        <span className={s.status} data-status="apart">
          1 à part
        </span>
        <span className={s.mapping}>
          «&nbsp;Ria Distribution&nbsp;» ⇄ «&nbsp;Distribution RIA&nbsp;» · Paramétrage → Services
        </span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------- desktop */

const CMDS: { call: string; res: string; bad?: boolean; note?: string }[] = [
  { call: 'invoke("login")', res: "Argon2id · password verified" },
  { call: 'invoke("update_service")', res: "services.update · allowed" },
  {
    call: 'invoke("delete_agency")',
    res: "refused · agencies.delete",
    bad: true,
    note: "Permission « agencies.delete » requise. Demandez-la à un administrateur.",
  },
  {
    call: 'invoke("set_user_active", false)',
    res: "refused · last active admin",
    bad: true,
    note: "Impossible : il doit rester au moins un administrateur actif.",
  },
];

const GUARDS = [
  "Argon2id password hashing",
  "10 permissions, none granted by default",
  "Default password must be changed",
  "The last active admin can’t be removed",
  "Data stays on the accountant’s machine",
];

export function DesktopStack() {
  return (
    <>
      <div className={s.desk}>
        <div className={s.tiers}>
          <div className={s.tier}>
            <p className={s.tierName}>
              {/* eslint-disable-next-line @next/next/no-img-element -- small local SVG logos */}
              <img src="/logos/nextjs.svg" alt="" width={20} height={20} loading="lazy" />
              Interface
            </p>
            <p className={s.tierTech}>Next.js static export · React 19 · Tailwind 4 · shadcn/ui · Zustand</p>
            <p className={s.tierChips}>
              <span>Paramétrage</span>
              <span>Module 1</span>
              <span>Rapport</span>
              <span>Administration</span>
            </p>
          </div>
          <div className={s.bridge} aria-hidden="true">
            <i />
            <i />
            <span>invoke()</span>
            <span>32 commands</span>
          </div>
          <div className={s.tier} data-tier="core">
            <p className={s.tierName}>
              {/* eslint-disable-next-line @next/next/no-img-element -- small local SVG logos */}
              <img src="/logos/tauri.svg" alt="" width={20} height={20} loading="lazy" />
              Rust core · Tauri 2
            </p>
            <p className={s.tierTech}>Commands · permission checks · Argon2</p>
            <p className={s.tierChips}>
              <span>auth.rs</span>
              <span>db.rs</span>
              <span>require_permission()</span>
              <span>guard_last_admin()</span>
            </p>
          </div>
          <div className={s.bridge} aria-hidden="true">
            <i />
            <i />
            <span>rusqlite</span>
            <span>queries</span>
          </div>
          <div className={s.tier}>
            <p className={s.tierName}>
              {/* eslint-disable-next-line @next/next/no-img-element -- small local SVG logos */}
              <img src="/logos/sqlite.svg" alt="" width={20} height={20} loading="lazy" />
              SQLite · bundled
            </p>
            <p className={s.tierTech}>On the accountant’s machine</p>
            <p className={s.tierChips}>
              <span>users</span>
              <span>services</span>
              <span>agencies</span>
              <span>integra_columns</span>
              <span>formulas</span>
              <span>accounting_rules</span>
            </p>
          </div>
        </div>

        <div className={s.cmds}>
          <p className={s.cmdsHead}>
            <span>Command log</span>
            <span>comptable</span>
          </p>
          <ul>
            {CMDS.map((cmd, n) => (
              <li key={cmd.call} style={vars({ "--i": n })}>
                <code>{cmd.call}</code>
                <span className={s.cmdRes} data-bad={cmd.bad || undefined}>
                  → {cmd.res}
                </span>
                {cmd.note && <span className={s.cmdNote}>{cmd.note}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className={s.guards} aria-label="Safeguards">
        {GUARDS.map((guard) => (
          <li key={guard}>
            <Check /> {guard}
          </li>
        ))}
      </ul>
    </>
  );
}
