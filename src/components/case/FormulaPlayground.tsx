"use client";

import { useId, useState, type CSSProperties } from "react";
import { runFormula } from "@/lib/formula";
import s from "./ledgersync.module.css";

type Vars = { Montant: number; Frais: number; Taxe: number };

const PRESETS: { name: string; formula: string; note: string; vars?: Partial<Vars> }[] = [
  {
    name: "VAT on fees",
    formula: "Frais × 0,1925",
    note: "19.25 % VAT on the transfer fee — the decimal comma is read as a decimal point.",
  },
  {
    name: "Tiered rate",
    formula: "si(Montant > 100000 ; Frais × 0,5 ; Frais × 0,1925)",
    note: "Large transfers take a different rate. Drag Montant across 100 000 and watch the branch switch.",
  },
  {
    name: "Safe ratio",
    formula: "si(Frais = 0 ; 0 ; Taxe ÷ Frais × 100)",
    note: "Frais is 0, yet nothing divides by zero: the else branch is never evaluated.",
    vars: { Frais: 0 },
  },
  {
    name: "Negated total",
    formula: "(Montant + Frais + Taxe) × (−1)",
    note: "A service total posted as a negative — one line of a posting schema.",
  },
];

const VARIABLES: { name: keyof Vars; max: number; step: number }[] = [
  { name: "Montant", max: 300000, step: 5000 },
  { name: "Frais", max: 12000, step: 400 },
  { name: "Taxe", max: 2400, step: 1 },
];

const LEGEND = [
  { type: "function", label: "function", color: "var(--accent)" },
  { type: "variable", label: "variable", color: "#ecebfb" },
  { type: "number", label: "number", color: "#fdf3df" },
  { type: "operator", label: "operator", color: "#fff" },
];

const xaf = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 });
/** fr-FR groups digits with a narrow no-break space, which the display font barely shows. */
const fmt = (n: number) => xaf.format(n).replace(/\u202f/g, "\u00a0");

export default function FormulaPlayground() {
  const id = useId();
  const [formula, setFormula] = useState(PRESETS[1].formula);
  const [vars, setVars] = useState<Vars>({ Montant: 150000, Frais: 3600, Taxe: 693 });

  const result = runFormula(formula, vars);
  const preset = PRESETS.find((p) => p.formula === formula);

  const pick = (p: (typeof PRESETS)[number]) => {
    setFormula(p.formula);
    if (p.vars) setVars((v) => ({ ...v, ...p.vars }));
  };

  return (
    <div className={s.play}>
      <div className={s.editor}>
        <label className={s.label} htmlFor={`${id}-formula`}>
          <span>Formula</span>
          <span>French syntax</span>
        </label>
        <textarea
          id={`${id}-formula`}
          className={s.input}
          rows={2}
          value={formula}
          spellCheck={false}
          autoComplete="off"
          aria-invalid={result.error !== undefined}
          aria-describedby={`${id}-result`}
          onChange={(e) => setFormula(e.target.value)}
        />

        <div className={s.tokens} aria-label="Tokens">
          {result.tokens.map((token, n) => (
            <span
              key={`${n}-${token.text}`}
              className={s.token}
              data-type={token.type}
              style={{ "--i": n } as CSSProperties}
            >
              {token.type === "operator" ? token.value : token.text}
            </span>
          ))}
        </div>
        <p className={s.legend} aria-hidden="true">
          {LEGEND.map((l) => (
            <span key={l.type}>
              <i style={{ background: l.color, boxShadow: "inset 0 0 0 1px var(--line-strong)" }} />
              {l.label}
            </span>
          ))}
        </p>

        <div className={s.presets} role="group" aria-label="Example formulas">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              className={s.preset}
              aria-pressed={p.formula === formula}
              onClick={() => pick(p)}
            >
              {p.name}
            </button>
          ))}
        </div>
        <p className={s.presetNote}>{preset?.note ?? "Your own formula — the result updates as you type."}</p>
        <dl className={s.cheats}>
          <div>
            <dt>Functions</dt>
            <dd>si(condition ; alors ; sinon) · abs(x) · sqrt(x)</dd>
          </div>
          <div>
            <dt>Operators</dt>
            <dd>+ − × ÷ · = ≠ &gt; &lt; ≥ ≤</dd>
          </div>
          <div>
            <dt>Variables</dt>
            <dd>Montant · Frais · Taxe</dd>
          </div>
        </dl>
      </div>

      <div className={s.vars}>
        <p className={s.label}>
          <span>One aggregated row</span>
          <span>XAF</span>
        </p>
        <div className={s.varList}>
          {VARIABLES.map((v) => (
            <div key={v.name} className={s.var}>
              <p className={s.varTop}>
                <label htmlFor={`${id}-${v.name}`}>{v.name}</label>
                <output htmlFor={`${id}-${v.name}`}>{fmt(vars[v.name])}</output>
              </p>
              <input
                id={`${id}-${v.name}`}
                className={s.range}
                type="range"
                min={0}
                max={v.max}
                step={v.step}
                value={vars[v.name]}
                onChange={(e) => setVars((cur) => ({ ...cur, [v.name]: Number(e.target.value) }))}
              />
            </div>
          ))}
        </div>

        <div id={`${id}-result`} className={s.result} aria-live="polite">
          <p className={s.label}>
            <span>Result</span>
          </p>
          {result.error ? (
            <p className={s.resultError}>{result.error}</p>
          ) : (
            <p className={s.resultValue}>
              {fmt(result.value ?? 0)}
              <small>XAF</small>
            </p>
          )}
          {result.branches.length > 0 && !result.error && (
            <>
              <p className={s.branches}>
                {result.branches.map((taken, n) => (
                  <span key={n} className={s.branch}>
                    si{result.branches.length > 1 ? ` #${n + 1}` : ""} → {taken ? "alors" : "sinon"}
                  </span>
                ))}
              </p>
              <p className={s.branchNote}>The other branch was never evaluated.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
