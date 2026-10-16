"use client";

import { useId, useState, type CSSProperties } from "react";
import { runFormula } from "@/lib/formula";
import { localize, t, type Locale, type Tr } from "@/lib/i18n";
import s from "./ledgersync.module.css";

type Vars = { Montant: number; Frais: number; Taxe: number };

/** The formulas themselves are French syntax in both languages — that is the point of the engine. */
const PRESETS: { name: Tr; formula: string; note: Tr; vars?: Partial<Vars> }[] = [
  {
    name: t("VAT on fees", "TVA sur frais"),
    formula: "Frais × 0,1925",
    note: t(
      "19.25 % VAT on the transfer fee — the decimal comma is read as a decimal point.",
      "TVA de 19,25 % sur les frais de transfert — la virgule décimale est bien lue comme telle.",
    ),
  },
  {
    name: t("Tiered rate", "Taux par palier"),
    formula: "si(Montant > 100000 ; Frais × 0,5 ; Frais × 0,1925)",
    note: t(
      "Large transfers take a different rate. Drag Montant across 100 000 and watch the branch switch.",
      "Les gros transferts ont un autre taux. Faites passer Montant au-dessus de 100 000 et regardez la branche basculer.",
    ),
  },
  {
    name: t("Safe ratio", "Ratio sûr"),
    formula: "si(Frais = 0 ; 0 ; Taxe ÷ Frais × 100)",
    note: t(
      "Frais is 0, yet nothing divides by zero: the else branch is never evaluated.",
      "Frais vaut 0, et pourtant rien ne divise par zéro : la branche « sinon » n’est jamais évaluée.",
    ),
    vars: { Frais: 0 },
  },
  {
    name: t("Negated total", "Total négatif"),
    formula: "(Montant + Frais + Taxe) × (−1)",
    note: t(
      "A service total posted as a negative — one line of a posting schema.",
      "Un total de service imputé en négatif — une ligne d’un schéma de comptabilisation.",
    ),
  },
];

const VARIABLES: { name: keyof Vars; max: number; step: number }[] = [
  { name: "Montant", max: 300000, step: 5000 },
  { name: "Frais", max: 12000, step: 400 },
  { name: "Taxe", max: 2400, step: 1 },
];

const LEGEND = [
  { type: "function", label: t("function", "fonction"), color: "var(--accent)" },
  { type: "variable", label: t("variable", "variable"), color: "#ecebfb" },
  { type: "number", label: t("number", "nombre"), color: "#fdf3df" },
  { type: "operator", label: t("operator", "opérateur"), color: "#fff" },
];

const COPY = {
  formula: t("Formula", "Formule"),
  syntax: t("French syntax", "Syntaxe française"),
  tokens: t("Tokens", "Jetons"),
  examples: t("Example formulas", "Formules d’exemple"),
  ownFormula: t(
    "Your own formula — the result updates as you type.",
    "Votre propre formule — le résultat se met à jour pendant la saisie.",
  ),
  functions: t("Functions", "Fonctions"),
  operators: t("Operators", "Opérateurs"),
  variables: t("Variables", "Variables"),
  row: t("One aggregated row", "Une ligne agrégée"),
  result: t("Result", "Résultat"),
  otherBranch: t("The other branch was never evaluated.", "L’autre branche n’a jamais été évaluée."),
};

const xaf = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 });
/** fr-FR groups digits with a narrow no-break space, which the display font barely shows. */
const fmt = (n: number) => xaf.format(n).replace(/ /g, " ");

export default function FormulaPlayground({ lang }: { lang: Locale }) {
  const id = useId();
  const copy = localize(COPY, lang);
  const presets = localize(PRESETS, lang);
  const legend = localize(LEGEND, lang);
  const [formula, setFormula] = useState(PRESETS[1].formula);
  const [vars, setVars] = useState<Vars>({ Montant: 150000, Frais: 3600, Taxe: 693 });

  const result = runFormula(formula, vars, lang);
  const preset = presets.find((p) => p.formula === formula);

  const pick = (p: (typeof presets)[number]) => {
    setFormula(p.formula);
    if (p.vars) setVars((v) => ({ ...v, ...p.vars }));
  };

  return (
    <div className={s.play}>
      <div className={s.editor}>
        <label className={s.label} htmlFor={`${id}-formula`}>
          <span>{copy.formula}</span>
          <span>{copy.syntax}</span>
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

        <div className={s.tokens} aria-label={copy.tokens}>
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
          {legend.map((l) => (
            <span key={l.type}>
              <i style={{ background: l.color, boxShadow: "inset 0 0 0 1px var(--line-strong)" }} />
              {l.label}
            </span>
          ))}
        </p>

        <div className={s.presets} role="group" aria-label={copy.examples}>
          {presets.map((p) => (
            <button
              key={p.formula}
              type="button"
              className={s.preset}
              aria-pressed={p.formula === formula}
              onClick={() => pick(p)}
            >
              {p.name}
            </button>
          ))}
        </div>
        <p className={s.presetNote}>{preset?.note ?? copy.ownFormula}</p>
        <dl className={s.cheats}>
          <div>
            <dt>{copy.functions}</dt>
            <dd>si(condition ; alors ; sinon) · abs(x) · sqrt(x)</dd>
          </div>
          <div>
            <dt>{copy.operators}</dt>
            <dd>+ − × ÷ · = ≠ &gt; &lt; ≥ ≤</dd>
          </div>
          <div>
            <dt>{copy.variables}</dt>
            <dd>Montant · Frais · Taxe</dd>
          </div>
        </dl>
      </div>

      <div className={s.vars}>
        <p className={s.label}>
          <span>{copy.row}</span>
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
            <span>{copy.result}</span>
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
              <p className={s.branchNote}>{copy.otherBranch}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
