/**
 * Copy for the private-project case studies (/projects/wazalink, /projects/ledgersync).
 * Both codebases are closed, so these pages explain architecture and behaviour only —
 * no client data, credentials, hostnames or account numbers.
 */

export type CaseStat = { value: string; prefix?: string; suffix?: string; label: string };
export type CaseSection = { num: string; label: string; title: string; em: string; intro: string };

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  meta: { label: string; value: string }[];
  sections: Record<string, CaseSection>;
  stats: CaseStat[];
  stack: { name: string; logo?: string }[];
  next: { href: string; title: string; tagline: string };
};

export const wazalinkCase: CaseStudy = {
  slug: "wazalink",
  title: "WAZALINK",
  tagline: "keeps three systems in sync.",
  summary:
    "Integration middleware that moves growers, contracts, weighings and deliveries between Sage HRM, Sage X3 and the CAPI field app — every 60 seconds, through VPN cuts, without losing or duplicating a record.",
  meta: [
    { label: "Role", value: "Architect & lead developer" },
    { label: "Company", value: "WAZA Solutions" },
    { label: "Timeline", value: "2025 — present" },
    { label: "Runs on", value: "k3s · Argo CD" },
  ],
  sections: {
    problem: {
      num: "01",
      label: "The problem",
      title: "Three systems,",
      em: "one fragile bridge.",
      intro:
        "Field agents record weighings and deliveries in CAPI. Contracts live in Sage HRM; suppliers, customers and stock live in Sage X3. A legacy middleware stitched them together over a VPN that drops several times a day — and every drop meant records lost mid-transfer, or sent twice when the link came back.",
    },
    architecture: {
      num: "02",
      label: "Architecture",
      title: "One small service,",
      em: "four clear layers.",
      intro:
        "WAZALINK is a single FastAPI service that never trusts the network. Every record it touches is written to a local ledger first, and only marked as transferred once the target system has accepted it.",
    },
    flows: {
      num: "03",
      label: "Business flows",
      title: "Six flows,",
      em: "every minute.",
      intro:
        "A scheduler wakes the pipelines every 60 seconds and runs them side by side in a thread pool. Each pipeline is a short chain of ordered steps: read what changed, write it to the target, record the result.",
    },
    states: {
      num: "04",
      label: "State machine",
      title: "Nine states,",
      em: "zero guesswork.",
      intro:
        "Every record in the ledger carries one of nine states, the payload last sent, a retry counter and the last error. A dropped connection never erases progress — the next run picks up exactly where the last one stopped. Pick a scenario:",
    },
    resilience: {
      num: "05",
      label: "Resilience",
      title: "Built for",
      em: "a bad network day.",
      intro:
        "Most of the code is about what happens when things go wrong: a slow ERP, a dead VPN, a row that will never be valid. Each failure mode has its own answer.",
    },
    shipping: {
      num: "06",
      label: "Shipping",
      title: "From push",
      em: "to production.",
      intro:
        "Every push builds a Docker image with the Microsoft ODBC drivers baked in, tags it by version and commit, and publishes it. Argo CD keeps the k3s cluster in step with Git, and Grafana's LGTM stack plus Sentry show what the service is doing.",
    },
  },
  stats: [
    { value: "0", label: "Records lost or duplicated" },
    { value: "6", label: "Critical business flows" },
    { value: "9", label: "States per record" },
    { value: "60", suffix: "s", label: "Sync cycle" },
  ],
  stack: [
    { name: "Python", logo: "python" },
    { name: "FastAPI", logo: "fastapi" },
    { name: "SQLAlchemy", logo: "sqlalchemy" },
    { name: "APScheduler" },
    { name: "SQLite", logo: "sqlite" },
    { name: "SQL Server · pyodbc", logo: "microsoftsqlserver" },
    { name: "SOAP · Sage X3" },
    { name: "REST" },
    { name: "Docker", logo: "docker" },
    { name: "GitHub Actions", logo: "githubactions" },
    { name: "Argo CD", logo: "argocd" },
    { name: "k3s", logo: "k3s" },
    { name: "Grafana LGTM", logo: "grafana" },
    { name: "Sentry", logo: "sentry" },
  ],
  next: { href: "/projects/ledgersync", title: "LedgerSync", tagline: "reconciliation, without the code change." },
};

export const ledgersyncCase: CaseStudy = {
  slug: "ledgersync",
  title: "LedgerSync",
  tagline: "reconciliation, without the code change.",
  summary:
    "A desktop app for a money-transfer operator's finance team. It turns Integra's transfer exports into balanced accounting entries, reconciles them against Sage 1000 — and lets accountants edit every formula themselves.",
  meta: [
    { label: "Role", value: "Full-stack developer" },
    { label: "Company", value: "WAZA Solutions" },
    { label: "Timeline", value: "2025" },
    { label: "Platform", value: "Windows desktop · Tauri" },
  ],
  sections: {
    problem: {
      num: "01",
      label: "The problem",
      title: "Month-end close,",
      em: "by hand.",
      intro:
        "Every transfer across 40+ services — Western Union, MoneyGram, Ria, Orange Money and more — had to be summed per agency, posted to the right accounts and checked against Sage, one spreadsheet at a time. And whenever a commission rate or posting rule changed, a developer had to change the code.",
    },
    pipeline: {
      num: "02",
      label: "The flow",
      title: "Seven steps,",
      em: "one guided flow.",
      intro:
        "The accountant drops in an Integra export and LedgerSync walks it through seven steps. The heavy lifting comes early: thousands of individual transfers collapse into one row per service, agency and date.",
    },
    formulas: {
      num: "03",
      label: "Formula engine",
      title: "Accountants write",
      em: "the rules.",
      intro:
        "Rates, commissions and tax shares are formulas, not code. The engine reads French-style input — decimal commas, semicolons between arguments — supports conditions with si(…), and only evaluates the branch it takes. Try it:",
    },
    balance: {
      num: "04",
      label: "Accounting",
      title: "Every piece",
      em: "must balance.",
      intro:
        "Entries are grouped into pieces (service + date) and then by account. A piece only passes when total debits equal total credits, to within 0.01 XAF. When an account is missing, the error names it and links straight to the setting that fixes it.",
    },
    reconcile: {
      num: "05",
      label: "Reconciliation",
      title: "Matched by meaning,",
      em: "not by number.",
      intro:
        "Integra and Sage never share piece numbers, so LedgerSync doesn't use them. It reconciles each service, account and date, linking Integra's service codes to Sage's labels through the Services settings. Tax and commission lines that name no service are reconciled on their own rather than guessed.",
    },
    desktop: {
      num: "06",
      label: "Desktop",
      title: "A desktop app",
      em: "that keeps its secrets.",
      intro:
        "LedgerSync ships as a native Tauri 2 app: a Rust core with a bundled SQLite database on the accountant's machine, and a Next.js + React interface. Passwords are hashed with Argon2, every screen sits behind role-based permissions, and the last administrator can never lock themselves out.",
    },
  },
  stats: [
    { value: "40", suffix: "+", label: "Transfer services covered" },
    { value: "7", label: "Guided steps" },
    { value: "0", label: "Code changes per rule tweak" },
    { value: "0,01", suffix: " XAF", label: "Balance tolerance" },
  ],
  stack: [
    { name: "Tauri 2", logo: "tauri" },
    { name: "Rust" },
    { name: "SQLite · rusqlite", logo: "sqlite" },
    { name: "Argon2" },
    { name: "Next.js", logo: "nextjs" },
    { name: "React 19", logo: "react" },
    { name: "TypeScript", logo: "typescript" },
    { name: "Tailwind CSS", logo: "tailwindcss" },
    { name: "shadcn/ui" },
    { name: "Zustand" },
    { name: "SheetJS · Excel" },
  ],
  next: { href: "/projects/wazalink", title: "WAZALINK", tagline: "keeps three systems in sync." },
};
