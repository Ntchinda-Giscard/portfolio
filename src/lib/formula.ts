/**
 * A small, safe formula language for the LedgerSync playground (no eval).
 * French conventions: decimal comma ("0,1925"), semicolons between arguments,
 * and si(condition ; then ; else) as the conditional — only the branch taken runs.
 */

import type { Locale } from "./i18n";

/** A mistake in the formula, explained in both languages the playground speaks. */
class FormulaError extends Error {
  constructor(
    message: string,
    readonly fr: string,
  ) {
    super(message);
  }
}

/** « x » — French quotes keep their non-breaking spaces. */
const q = (s: string) => `« ${s} »`;

export type Op = "+" | "−" | "×" | "÷" | "=" | "≠" | ">" | "<" | "≥" | "≤";
type Fn = "si" | "abs" | "sqrt";

export type Token =
  | { type: "number"; value: number; text: string }
  | { type: "variable"; value: string; text: string }
  | { type: "function"; value: Fn; text: string }
  | { type: "operator"; value: Op; text: string }
  | { type: "paren"; value: "(" | ")"; text: string }
  | { type: "separator"; value: ";"; text: string };

type Node =
  | { k: "num"; v: number }
  | { k: "var"; name: string }
  | { k: "neg"; e: Node }
  | { k: "bin"; op: Op; a: Node; b: Node }
  | { k: "call"; fn: Fn; args: Node[] };

const FUNCTIONS: Record<Fn, number> = { si: 3, abs: 1, sqrt: 1 };
const COMPARE: Op[] = ["=", "≠", ">", "<", "≥", "≤"];
// Two-character spellings first, so ">=" is not read as ">" then "=".
const OPERATORS: [string, Op][] = [
  [">=", "≥"],
  ["<=", "≤"],
  ["<>", "≠"],
  ["!=", "≠"],
  ["≥", "≥"],
  ["≤", "≤"],
  ["≠", "≠"],
  ["+", "+"],
  ["-", "−"],
  ["−", "−"],
  ["*", "×"],
  ["×", "×"],
  ["/", "÷"],
  ["÷", "÷"],
  ["=", "="],
  [">", ">"],
  ["<", "<"],
];

// Latin letters incl. accents — but not × (U+00D7) or ÷ (U+00F7), which sit inside À-ÿ.
const LETTER = /[A-Za-z_À-ÖØ-öø-ÿ]/;

export function tokenize(src: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < src.length && /[0-9]/.test(src[j])) j++;
      if ((src[j] === "," || src[j] === ".") && /[0-9]/.test(src[j + 1] ?? "")) {
        j++;
        while (j < src.length && /[0-9]/.test(src[j])) j++;
      }
      const text = src.slice(i, j);
      tokens.push({ type: "number", value: Number(text.replace(",", ".")), text });
      i = j;
      continue;
    }
    if (LETTER.test(ch)) {
      let j = i;
      while (j < src.length && (LETTER.test(src[j]) || /[0-9]/.test(src[j]))) j++;
      const text = src.slice(i, j);
      const fn = text.toLowerCase() as Fn;
      tokens.push(fn in FUNCTIONS ? { type: "function", value: fn, text } : { type: "variable", value: text, text });
      i = j;
      continue;
    }
    if (ch === "(" || ch === ")") {
      tokens.push({ type: "paren", value: ch, text: ch });
      i++;
      continue;
    }
    if (ch === ";") {
      tokens.push({ type: "separator", value: ";", text: ch });
      i++;
      continue;
    }
    const op = OPERATORS.find(([spelling]) => src.startsWith(spelling, i));
    if (!op) throw new FormulaError(`Unexpected character “${ch}”`, `Caractère inattendu ${q(ch)}`);
    tokens.push({ type: "operator", value: op[1], text: op[0] });
    i += op[0].length;
  }
  return tokens;
}

function parse(tokens: Token[]): Node {
  let pos = 0;
  const peek = () => tokens[pos];
  const isOp = (...ops: Op[]) => {
    const t = peek();
    return t?.type === "operator" && ops.includes(t.value);
  };
  const expect = (value: "(" | ")") => {
    const t = tokens[pos++];
    if (t?.type !== "paren" || t.value !== value) throw new FormulaError(`Expected “${value}”`, `${q(value)} attendu`);
  };

  const primary = (): Node => {
    const t = tokens[pos++];
    if (!t) throw new FormulaError("The formula ends too early", "La formule s’arrête trop tôt");
    if (t.type === "number") return { k: "num", v: t.value };
    if (t.type === "variable") return { k: "var", name: t.value };
    if (t.type === "paren" && t.value === "(") {
      const e = comparison();
      expect(")");
      return e;
    }
    if (t.type === "function") {
      expect("(");
      const args = [comparison()];
      while (peek()?.type === "separator") {
        pos++;
        args.push(comparison());
      }
      expect(")");
      if (args.length !== FUNCTIONS[t.value]) {
        const n = FUNCTIONS[t.value];
        const plural = n > 1 ? "s" : "";
        throw new FormulaError(`${t.value}() takes ${n} argument${plural}`, `${t.value}() attend ${n} argument${plural}`);
      }
      return { k: "call", fn: t.value, args };
    }
    throw new FormulaError(`Unexpected “${t.text}”`, `${q(t.text)} inattendu`);
  };

  const unary = (): Node => {
    if (isOp("−")) {
      pos++;
      return { k: "neg", e: unary() };
    }
    if (isOp("+")) {
      pos++;
      return unary();
    }
    return primary();
  };

  const term = (): Node => {
    let left = unary();
    while (isOp("×", "÷")) {
      const op = (tokens[pos++] as { value: Op }).value;
      left = { k: "bin", op, a: left, b: unary() };
    }
    return left;
  };

  const additive = (): Node => {
    let left = term();
    while (isOp("+", "−")) {
      const op = (tokens[pos++] as { value: Op }).value;
      left = { k: "bin", op, a: left, b: term() };
    }
    return left;
  };

  function comparison(): Node {
    const left = additive();
    if (isOp(...COMPARE)) {
      const op = (tokens[pos++] as { value: Op }).value;
      return { k: "bin", op, a: left, b: additive() };
    }
    return left;
  }

  const ast = comparison();
  if (pos < tokens.length) throw new FormulaError(`Unexpected “${tokens[pos].text}”`, `${q(tokens[pos].text)} inattendu`);
  return ast;
}

/** `branches` records each si() decision in evaluation order: true = then, false = else. */
function evaluate(node: Node, vars: Record<string, number>, branches: boolean[]): number {
  switch (node.k) {
    case "num":
      return node.v;
    case "var": {
      const key = Object.keys(vars).find((k) => k.toLowerCase() === node.name.toLowerCase());
      if (key === undefined) throw new FormulaError(`Unknown variable “${node.name}”`, `Variable inconnue ${q(node.name)}`);
      return vars[key];
    }
    case "neg":
      return -evaluate(node.e, vars, branches);
    case "call": {
      if (node.fn === "si") {
        const taken = evaluate(node.args[0], vars, branches) !== 0;
        branches.push(taken);
        return evaluate(node.args[taken ? 1 : 2], vars, branches);
      }
      const x = evaluate(node.args[0], vars, branches);
      if (node.fn === "abs") return Math.abs(x);
      if (x < 0) throw new FormulaError("sqrt() of a negative number", "sqrt() d’un nombre négatif");
      return Math.sqrt(x);
    }
    case "bin": {
      const a = evaluate(node.a, vars, branches);
      const b = evaluate(node.b, vars, branches);
      switch (node.op) {
        case "+":
          return a + b;
        case "−":
          return a - b;
        case "×":
          return a * b;
        case "÷":
          if (b === 0) throw new FormulaError("Division by zero", "Division par zéro");
          return a / b;
        case "=":
          return Number(a === b);
        case "≠":
          return Number(a !== b);
        case ">":
          return Number(a > b);
        case "<":
          return Number(a < b);
        case "≥":
          return Number(a >= b);
        case "≤":
          return Number(a <= b);
      }
    }
  }
}

export type FormulaResult = { tokens: Token[]; branches: boolean[]; value?: number; error?: string };

export function runFormula(src: string, vars: Record<string, number>, lang: Locale = "en"): FormulaResult {
  let tokens: Token[] = [];
  const branches: boolean[] = [];
  try {
    tokens = tokenize(src);
    if (tokens.length === 0) return { tokens, branches, error: lang === "fr" ? "Saisissez une formule" : "Type a formula" };
    return { tokens, branches, value: evaluate(parse(tokens), vars, branches) };
  } catch (error) {
    const message =
      error instanceof FormulaError && lang === "fr" ? error.fr : error instanceof Error ? error.message : String(error);
    return { tokens, branches, error: message };
  }
}
