/**
 * Copy for the private-project case studies (/[lang]/projects/wazalink, /[lang]/projects/ledgersync).
 * Both codebases are closed, so these pages explain architecture and behaviour only —
 * no client data, credentials, hostnames or account numbers.
 *
 * Bilingual like the rest of the site: t("English", "Français").
 */

import { localize, page, t, type Locale, type Localized, type Tr } from "@/lib/i18n";

type CaseSectionSource = { num: string; label: Tr; title: Tr; em: Tr; intro: Tr };

type CaseStudySource = {
  slug: string;
  title: string;
  tagline: Tr;
  summary: Tr;
  meta: { label: Tr; value: string | Tr }[];
  sections: Record<string, CaseSectionSource>;
  stats: { value: string; prefix?: string; suffix?: string; label: Tr }[];
  stack: { name: string; logo?: string }[];
  next: { href: Tr; title: string; tagline: Tr };
};

export type CaseSection = Localized<CaseSectionSource>;
export type CaseStudy = Localized<CaseStudySource>;

const WAZALINK_TAGLINE = t("keeps three systems in sync.", "synchronise trois systèmes.");
const LEDGERSYNC_TAGLINE = t("reconciliation, without the code change.", "le rapprochement, sans toucher au code.");

const wazalink: CaseStudySource = {
  slug: "wazalink",
  title: "WAZALINK",
  tagline: WAZALINK_TAGLINE,
  summary: t(
    "Integration middleware that moves growers, contracts, weighings and deliveries between Sage HRM, Sage X3 and the CAPI field app — every 60 seconds, through VPN cuts, without losing or duplicating a record.",
    "Un middleware d’intégration qui fait circuler planteurs, contrats, pesées et livraisons entre Sage HRM, Sage X3 et l’application terrain CAPI — toutes les 60 secondes, malgré les coupures VPN, sans perdre ni dupliquer un enregistrement.",
  ),
  meta: [
    { label: t("Role", "Rôle"), value: t("Architect & lead developer", "Architecte & développeur principal") },
    { label: t("Company", "Entreprise"), value: "WAZA Solutions" },
    { label: t("Timeline", "Période"), value: t("2025 — present", "2025 — aujourd’hui") },
    { label: t("Runs on", "Tourne sur"), value: "k3s · Argo CD" },
  ],
  sections: {
    problem: {
      num: "01",
      label: t("The problem", "Le problème"),
      title: t("Three systems,", "Trois systèmes,"),
      em: t("one fragile bridge.", "un pont fragile."),
      intro: t(
        "Field agents record weighings and deliveries in CAPI. Contracts live in Sage HRM; suppliers, customers and stock live in Sage X3. A legacy middleware stitched them together over a VPN that drops several times a day — and every drop meant records lost mid-transfer, or sent twice when the link came back.",
        "Les agents terrain saisissent pesées et livraisons dans CAPI. Les contrats vivent dans Sage HRM ; fournisseurs, clients et stocks dans Sage X3. Un ancien middleware reliait le tout par un VPN qui tombe plusieurs fois par jour — et chaque coupure, c’était des enregistrements perdus en plein transfert, ou envoyés deux fois au retour de la liaison.",
      ),
    },
    architecture: {
      num: "02",
      label: t("Architecture", "Architecture"),
      title: t("One small service,", "Un petit service,"),
      em: t("four clear layers.", "quatre couches claires."),
      intro: t(
        "WAZALINK is a single FastAPI service that never trusts the network. Every record it touches is written to a local ledger first, and only marked as transferred once the target system has accepted it.",
        "WAZALINK est un unique service FastAPI qui ne fait jamais confiance au réseau. Chaque enregistrement est d’abord écrit dans un registre local, et n’est marqué comme transféré qu’une fois accepté par le système cible.",
      ),
    },
    flows: {
      num: "03",
      label: t("Business flows", "Flux métier"),
      title: t("Six flows,", "Six flux,"),
      em: t("every minute.", "chaque minute."),
      intro: t(
        "A scheduler wakes the pipelines every 60 seconds and runs them side by side in a thread pool. Each pipeline is a short chain of ordered steps: read what changed, write it to the target, record the result.",
        "Un ordonnanceur réveille les pipelines toutes les 60 secondes et les exécute côte à côte dans un pool de threads. Chaque pipeline est une courte chaîne d’étapes ordonnées : lire ce qui a changé, l’écrire dans la cible, consigner le résultat.",
      ),
    },
    states: {
      num: "04",
      label: t("State machine", "Machine à états"),
      title: t("Nine states,", "Neuf états,"),
      em: t("zero guesswork.", "zéro approximation."),
      intro: t(
        "Every record in the ledger carries one of nine states, the payload last sent, a retry counter and the last error. A dropped connection never erases progress — the next run picks up exactly where the last one stopped. Pick a scenario:",
        "Chaque enregistrement du registre porte l’un des neuf états, le dernier contenu envoyé, un compteur de reprises et la dernière erreur. Une connexion coupée n’efface jamais la progression — le cycle suivant reprend exactement là où le précédent s’est arrêté. Choisissez un scénario :",
      ),
    },
    resilience: {
      num: "05",
      label: t("Resilience", "Résilience"),
      title: t("Built for", "Conçu pour"),
      em: t("a bad network day.", "les mauvais jours du réseau."),
      intro: t(
        "Most of the code is about what happens when things go wrong: a slow ERP, a dead VPN, a row that will never be valid. Each failure mode has its own answer.",
        "L’essentiel du code traite de ce qui arrive quand les choses tournent mal : un ERP lent, un VPN mort, une ligne qui ne sera jamais valide. Chaque mode de défaillance a sa réponse.",
      ),
    },
    shipping: {
      num: "06",
      label: t("Shipping", "Livraison"),
      title: t("From push", "Du push"),
      em: t("to production.", "à la production."),
      intro: t(
        "Every push builds a Docker image with the Microsoft ODBC drivers baked in, tags it by version and commit, and publishes it. Argo CD keeps the k3s cluster in step with Git, and Grafana’s LGTM stack plus Sentry show what the service is doing.",
        "Chaque push construit une image Docker avec les pilotes ODBC de Microsoft intégrés, l’étiquette par version et par commit, puis la publie. Argo CD garde le cluster k3s aligné sur Git, et la pile LGTM de Grafana, avec Sentry, montre ce que fait le service.",
      ),
    },
  },
  stats: [
    { value: "0", label: t("Records lost or duplicated", "Enregistrements perdus ou dupliqués") },
    { value: "6", label: t("Critical business flows", "Flux métier critiques") },
    { value: "9", label: t("States per record", "États par enregistrement") },
    { value: "60", suffix: "s", label: t("Sync cycle", "Cycle de synchro") },
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
  next: { href: page("/projects/ledgersync"), title: "LedgerSync", tagline: LEDGERSYNC_TAGLINE },
};

const ledgersync: CaseStudySource = {
  slug: "ledgersync",
  title: "LedgerSync",
  tagline: LEDGERSYNC_TAGLINE,
  summary: t(
    "A desktop app for a money-transfer operator’s finance team. It turns Integra’s transfer exports into balanced accounting entries, reconciles them against Sage 1000 — and lets accountants edit every formula themselves.",
    "Une application de bureau pour l’équipe financière d’un opérateur de transfert d’argent. Elle transforme les exports de transferts d’Integra en écritures comptables équilibrées, les rapproche de Sage 1000 — et laisse les comptables modifier eux-mêmes chaque formule.",
  ),
  meta: [
    { label: t("Role", "Rôle"), value: t("Full-stack developer", "Développeur full-stack") },
    { label: t("Company", "Entreprise"), value: "WAZA Solutions" },
    { label: t("Timeline", "Période"), value: "2025" },
    { label: t("Platform", "Plateforme"), value: t("Windows desktop · Tauri", "Bureau Windows · Tauri") },
  ],
  sections: {
    problem: {
      num: "01",
      label: t("The problem", "Le problème"),
      title: t("Month-end close,", "La clôture mensuelle,"),
      em: t("by hand.", "à la main."),
      intro: t(
        "Every transfer across 40+ services — Western Union, MoneyGram, Ria, Orange Money and more — had to be summed per agency, posted to the right accounts and checked against Sage, one spreadsheet at a time. And whenever a commission rate or posting rule changed, a developer had to change the code.",
        "Chaque transfert, sur plus de 40 services — Western Union, MoneyGram, Ria, Orange Money et d’autres — devait être totalisé par agence, imputé sur les bons comptes et pointé dans Sage, un tableur à la fois. Et à chaque changement de taux de commission ou de règle d’imputation, un développeur devait modifier le code.",
      ),
    },
    pipeline: {
      num: "02",
      label: t("The flow", "Le parcours"),
      title: t("Seven steps,", "Sept étapes,"),
      em: t("one guided flow.", "un parcours guidé."),
      intro: t(
        "The accountant drops in an Integra export and LedgerSync walks it through seven steps. The heavy lifting comes early: thousands of individual transfers collapse into one row per service, agency and date.",
        "Le comptable dépose un export Integra et LedgerSync le guide à travers sept étapes. Le gros du travail se fait tôt : des milliers de transferts se réduisent à une ligne par service, agence et date.",
      ),
    },
    formulas: {
      num: "03",
      label: t("Formula engine", "Moteur de formules"),
      title: t("Accountants write", "Les comptables écrivent"),
      em: t("the rules.", "les règles."),
      intro: t(
        "Rates, commissions and tax shares are formulas, not code. The engine reads French-style input — decimal commas, semicolons between arguments — supports conditions with si(…), and only evaluates the branch it takes. Try it:",
        "Taux, commissions et parts de taxe sont des formules, pas du code. Le moteur lit une saisie à la française — virgule décimale, points-virgules entre les arguments —, gère les conditions avec si(…) et n’évalue que la branche retenue. Essayez :",
      ),
    },
    balance: {
      num: "04",
      label: t("Accounting", "Comptabilité"),
      title: t("Every piece", "Chaque pièce"),
      em: t("must balance.", "doit s’équilibrer."),
      intro: t(
        "Entries are grouped into pieces (service + date) and then by account. A piece only passes when total debits equal total credits, to within 0.01 XAF. When an account is missing, the error names it and links straight to the setting that fixes it.",
        "Les écritures sont regroupées en pièces (service + date), puis par compte. Une pièce n’est validée que si le total des débits égale celui des crédits, à 0,01 XAF près. Quand un compte manque, l’erreur le nomme et renvoie directement au paramètre qui la corrige.",
      ),
    },
    reconcile: {
      num: "05",
      label: t("Reconciliation", "Rapprochement"),
      title: t("Matched by meaning,", "Rapproché par le sens,"),
      em: t("not by number.", "pas par le numéro."),
      intro: t(
        "Integra and Sage never share piece numbers, so LedgerSync doesn’t use them. It reconciles each service, account and date, linking Integra’s service codes to Sage’s labels through the Services settings. Tax and commission lines that name no service are reconciled on their own rather than guessed.",
        "Integra et Sage ne partagent jamais leurs numéros de pièce : LedgerSync ne s’en sert donc pas. Il rapproche chaque service, compte et date, en reliant les codes de service d’Integra aux libellés de Sage via le paramétrage des services. Les lignes de taxe et de commission qui ne nomment aucun service sont rapprochées à part plutôt que devinées.",
      ),
    },
    desktop: {
      num: "06",
      label: t("Desktop", "Bureau"),
      title: t("A desktop app", "Une appli de bureau"),
      em: t("that keeps its secrets.", "qui garde ses secrets."),
      intro: t(
        "LedgerSync ships as a native Tauri 2 app: a Rust core with a bundled SQLite database on the accountant’s machine, and a Next.js + React interface. Passwords are hashed with Argon2, every screen sits behind role-based permissions, and the last administrator can never lock themselves out.",
        "LedgerSync est livré comme une application Tauri 2 native : un cœur en Rust avec une base SQLite embarquée sur le poste du comptable, et une interface Next.js + React. Les mots de passe sont hachés avec Argon2, chaque écran est protégé par des permissions par rôle, et le dernier administrateur ne peut jamais se bloquer lui-même.",
      ),
    },
  },
  stats: [
    { value: "40", suffix: "+", label: t("Transfer services covered", "Services de transfert couverts") },
    { value: "7", label: t("Guided steps", "Étapes guidées") },
    { value: "0", label: t("Code changes per rule tweak", "Modification de code par règle changée") },
    { value: "0,01", suffix: " XAF", label: t("Balance tolerance", "Tolérance d’équilibre") },
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
  next: { href: page("/projects/wazalink"), title: "WAZALINK", tagline: WAZALINK_TAGLINE },
};

const studies = { wazalink, ledgersync };

export type CaseSlug = keyof typeof studies;

export const getCaseStudy = (slug: CaseSlug, lang: Locale): CaseStudy => localize(studies[slug], lang);

/** The words around every case study: badge, outcome block, header and footer links. */
const caseUi = {
  badge: t("Case study · Private client project", "Étude de cas · Projet client privé"),
  outcome: t("Outcome", "Résultats"),
  numbersTitle: t("In", "En"),
  numbersEm: t("numbers.", "chiffres."),
  stack: t("Stack", "Technologies"),
  next: t("Next case study", "Étude de cas suivante"),
  backToWork: t("Back to all work", "Retour aux projets"),
  allWork: t("All work", "Tous les projets"),
  home: t("{name}, home", "{name}, accueil"),
  nav: t("Case study", "Étude de cas"),
  language: t("Language", "Langue"),
  metaTitle: t("{title} — case study · {name}", "{title} — étude de cas · {name}"),
  homeHref: page("/"),
  workHref: page("/#work"),
};

export type CaseUi = Localized<typeof caseUi>;

export const getCaseUi = (lang: Locale): CaseUi => localize(caseUi, lang);
