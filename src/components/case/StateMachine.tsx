"use client";

import { useEffect, useRef, useState } from "react";
import { localize, t, type Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";
import s from "./wazalink.module.css";

type StateId =
  | "PENDING_SEND"
  | "SENDING"
  | "SENT_UNCONFIRMED"
  | "CONFIRMED"
  | "ERROR"
  | "RETRY_SCHEDULED"
  | "BLOCKED"
  | "DELETED_PENDING"
  | "DELETED_CONFIRMED";

/** Node centres in a 1000 × 460 board. */
const NODES: { id: StateId; x: number; y: number }[] = [
  { id: "PENDING_SEND", x: 120, y: 83 },
  { id: "SENDING", x: 380, y: 83 },
  { id: "SENT_UNCONFIRMED", x: 640, y: 83 },
  { id: "CONFIRMED", x: 880, y: 83 },
  { id: "ERROR", x: 380, y: 239 },
  { id: "RETRY_SCHEDULED", x: 640, y: 239 },
  { id: "BLOCKED", x: 380, y: 386 },
  { id: "DELETED_PENDING", x: 640, y: 386 },
  { id: "DELETED_CONFIRMED", x: 880, y: 386 },
];

const EDGES: Record<string, string> = {
  "PENDING_SEND>SENDING": "M215 83 L285 83",
  "SENDING>SENT_UNCONFIRMED": "M475 83 L545 83",
  "SENT_UNCONFIRMED>CONFIRMED": "M735 83 L785 83",
  "SENDING>ERROR": "M380 105 L380 217",
  "ERROR>RETRY_SCHEDULED": "M475 239 L545 239",
  "RETRY_SCHEDULED>SENDING": "M640 217 C 640 160 470 150 420 105",
  "ERROR>BLOCKED": "M380 261 L380 364",
  "DELETED_PENDING>DELETED_CONFIRMED": "M735 386 L785 386",
};

const QUEUED = t("queued in the ledger", "en file dans le registre");
const TO_HRM = t("writing to Sage HRM", "écriture dans Sage HRM");
const TO_X3 = t("SOAP import to Sage X3", "import SOAP vers Sage X3");

const SCENARIOS = [
  {
    label: t("Happy path", "Cas nominal"),
    record: "pesee #4821",
    steps: [
      { state: "PENDING_SEND" as StateId, text: QUEUED },
      { state: "SENDING" as StateId, text: TO_HRM },
      { state: "SENT_UNCONFIRMED" as StateId, text: t("written — waiting for confirmation", "écrit — en attente de confirmation") },
      { state: "CONFIRMED" as StateId, text: t("confirmed · transfer flag set", "confirmé · indicateur de transfert posé") },
    ],
  },
  {
    label: t("VPN cut", "Coupure VPN"),
    record: "bon_livraison #118",
    steps: [
      { state: "PENDING_SEND" as StateId, text: QUEUED },
      { state: "SENDING" as StateId, text: TO_X3 },
      {
        state: "ERROR" as StateId,
        text: t("connection dropped — nothing marked as sent", "connexion perdue — rien n’est marqué comme envoyé"),
      },
      { state: "RETRY_SCHEDULED" as StateId, text: t("retry #1 on the next run", "reprise n°1 au cycle suivant") },
      { state: "SENDING" as StateId, text: TO_X3 },
      { state: "SENT_UNCONFIRMED" as StateId, text: t("accepted by X3", "accepté par X3") },
      { state: "CONFIRMED" as StateId, text: t("confirmed — sent exactly once", "confirmé — envoyé une seule fois") },
    ],
  },
  {
    label: t("Bad data", "Donnée invalide"),
    record: "pesee #4907",
    steps: [
      { state: "PENDING_SEND" as StateId, text: QUEUED },
      { state: "SENDING" as StateId, text: TO_HRM },
      { state: "ERROR" as StateId, text: t("rejected: invalid weighing date", "rejeté : date de pesée invalide") },
      { state: "BLOCKED" as StateId, text: t("held for review · alert logged", "en attente de revue · alerte consignée") },
    ],
  },
  {
    label: t("Deletion", "Suppression"),
    record: "planteur #77",
    steps: [
      { state: "DELETED_PENDING" as StateId, text: t("deleted at the source", "supprimé à la source") },
      { state: "DELETED_CONFIRMED" as StateId, text: t("removal confirmed downstream", "suppression confirmée en aval") },
    ],
  },
];

const SCENARIO_LABEL = t("Scenario", "Scénario");

const STEP_MS = 1100;
const PAUSE_MS = 2000;

function clock(i: number) {
  return `12:04:${String(9 + i * 2).padStart(2, "0")}`;
}

export default function StateMachine({ lang }: { lang: Locale }) {
  const scenarios = localize(SCENARIOS, lang);
  const boardRef = useRef<HTMLDivElement>(null);
  const [scenario, setScenario] = useState(0);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  // Only play while on screen, and never for visitors who prefer reduced motion.
  useEffect(() => {
    const el = boardRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const last = SCENARIOS[scenario].steps.length - 1;
    const timer = window.setTimeout(
      () => {
        if (step < last) {
          setStep(step + 1);
        } else {
          setScenario((scenario + 1) % SCENARIOS.length);
          setStep(0);
        }
      },
      step < last ? STEP_MS : PAUSE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [running, scenario, step]);

  const pick = (i: number) => {
    setScenario(i);
    setStep(running ? 0 : SCENARIOS[i].steps.length - 1);
  };

  const current = scenarios[scenario];
  const path = current.steps.slice(0, step + 1);
  const active = path[path.length - 1].state;
  const visited = new Set(path.map(({ state }) => state));
  const edge = step > 0 ? `${path[step - 1].state}>${active}` : "";

  return (
    <div className={s.sm}>
      <div className={s.smTabs} role="tablist" aria-label={localize(SCENARIO_LABEL, lang)}>
        {scenarios.map((sc, i) => (
          <button
            key={sc.record}
            type="button"
            role="tab"
            aria-selected={i === scenario}
            className={s.smTab}
            onClick={() => pick(i)}
          >
            {sc.label}
          </button>
        ))}
      </div>

      <div className={s.smGrid}>
        <div ref={boardRef} className={s.board}>
          <svg className={s.boardEdges} viewBox="0 0 1000 460" aria-hidden="true">
            <defs>
              <marker id="sm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
              </marker>
            </defs>
            {Object.entries(EDGES).map(([key, d]) => (
              <path key={key} d={d} className={cx(s.edge, key === edge && s.edgeOn)} markerEnd="url(#sm-arrow)" />
            ))}
          </svg>
          {NODES.map((node) => (
            <span
              key={node.id}
              className={cx(s.state, visited.has(node.id) && s.stateVisited, node.id === active && s.stateActive)}
              data-tone={node.id === "CONFIRMED" || node.id === "DELETED_CONFIRMED" ? "ok" : node.id === "ERROR" || node.id === "BLOCKED" ? "bad" : undefined}
              style={{ left: `${node.x / 10}%`, top: `${(node.y / 460) * 100}%` }}
            >
              {node.id}
            </span>
          ))}
        </div>

        <div className={s.smLog} aria-live="polite">
          <p className={s.smLogHead}>
            <span>{current.record}</span>
            <span>{current.label}</span>
          </p>
          <ol>
            {path.map(({ state, text }, i) => (
              <li key={`${scenario}-${i}`}>
                <span className={s.smTime}>{clock(i)}</span>
                <span className={s.smState} data-state={state}>
                  {state}
                </span>
                <span className={s.smText}>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
