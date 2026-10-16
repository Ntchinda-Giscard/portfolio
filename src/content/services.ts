/**
 * How I can help and how I work: the services offer, the method with its
 * principles, and the KamJob security deep-dive (OWASP Top 10 and the CI
 * pipeline that enforces it).
 *
 * Every security and scaling claim below was checked against the KamJob
 * repositories (backend auth, payments, uploads, agents, monitoring, CI
 * workflows, Dockerfile) before it was written. Keep it that way: describe
 * what the code does, never what it might do.
 */

import { page, t, type Tr } from "@/lib/i18n";

/* ---------------------------------------------------------------- services */

export type ServiceIcon = "layers" | "flow" | "shield";

type Service = {
  icon: ServiceIcon;
  title: Tr;
  format: Tr;
  promise: Tr;
  deliverables: Tr[];
  /** Where to see it done: an external URL, an in-site page (page()) or an anchor on the home page. */
  proof: { label: string | Tr; href: string | Tr }[];
};

const serviceItems: Service[] = [
  {
    icon: "layers",
    title: t("Product engineering", "Développement produit"),
    format: t("Per project · fixed price", "Par projet · au forfait"),
    promise: t("From idea to a product people use — and pay for.", "De l’idée à un produit qu’on utilise — et qu’on paie."),
    deliverables: [
      t(
        "Scope, specs and architecture you approve before any code",
        "Cadrage, spécifications et architecture validés avant la première ligne de code",
      ),
      t("Web, mobile and API — Next.js, Expo, FastAPI", "Web, mobile et API — Next.js, Expo, FastAPI"),
      t("Mobile Money payments and subscriptions", "Paiements Mobile Money et abonnements"),
      t("AI features with guardrails, and their cost measured", "Des fonctionnalités d’IA encadrées, au coût mesuré"),
    ],
    proof: [{ label: "KamJob", href: "https://kamjob.com" }],
  },
  {
    icon: "flow",
    title: t("Systems & integration", "Systèmes & intégration"),
    format: t("Fixed scope or monthly", "Au forfait ou au mois"),
    promise: t(
      "Your ERP, finance tools and field apps in sync — without losing a record.",
      "Votre ERP, vos outils financiers et vos applis terrain synchronisés — sans perdre un enregistrement.",
    ),
    deliverables: [
      t("Sage X3 and Sage HRM integrations over SOAP and REST", "Intégrations Sage X3 et Sage HRM en SOAP et REST"),
      t(
        "Sync that survives outages: retries, audit trail, no duplicates",
        "Une synchronisation qui résiste aux coupures : reprises, traçabilité, zéro doublon",
      ),
      t("Reconciliation and accounting entries that balance", "Rapprochements et écritures comptables équilibrés"),
      t("Business rules your team edits, with no redeploy", "Des règles métier que vos équipes modifient, sans redéploiement"),
    ],
    proof: [
      { label: "WAZALINK", href: page("/projects/wazalink") },
      { label: "LedgerSync", href: page("/projects/ledgersync") },
    ],
  },
  {
    icon: "shield",
    title: t("Security & scale", "Sécurité & montée en charge"),
    format: t("Audit, then monthly", "Audit, puis au mois"),
    promise: t("Ship faster without leaving the door open.", "Livrer plus vite, sans laisser la porte ouverte."),
    deliverables: [
      t(
        "Security review against the OWASP Top 10, with the fixes",
        "Audit de sécurité selon l’OWASP Top 10, correctifs compris",
      ),
      t(
        "CI gates: SAST, SCA, secret and container scanning",
        "Une CI qui bloque : SAST, SCA, détection de secrets, analyse des conteneurs",
      ),
      t("Unit tests that replay real attacks, on every push", "Des tests unitaires qui rejouent de vraies attaques, à chaque push"),
      t(
        "AWS, Docker and Kubernetes — monitored, every release reversible",
        "AWS, Docker et Kubernetes — supervisés, chaque mise en production réversible",
      ),
    ],
    proof: [{ label: t("KamJob’s security", "La sécurité de KamJob"), href: "#security" }],
  },
];

export const services = {
  eyebrow: t("Services", "Services"),
  title: t("Three ways", "Trois façons"),
  em: t("I can help.", "de vous aider."),
  intro: t(
    "Start with one focused engagement, then keep me on as the product grows. Fixed price or monthly — in English or French.",
    "On commence par une mission ciblée, puis je vous accompagne à mesure que le produit grandit. Au forfait ou au mois — en français ou en anglais.",
  ),
  proofLabel: t("Proof", "Preuve"),
  items: serviceItems,
  cta: {
    text: t(
      "Not sure which fits? Tell me about your project — twenty minutes, no commitment.",
      "Vous hésitez ? Parlez-moi de votre projet — vingt minutes, sans engagement.",
    ),
    button: t("Book a 20-min call", "Réserver un appel de 20 min"),
    subject: t("Intro call", "Premier échange"),
    or: t("or write to", "ou écrivez à"),
  },
};

/* ---------------------------------------------------------------- approach */

type Principle = {
  title: Tr;
  text: Tr;
  project: string;
  /** Case study to open, when there is one. */
  href?: Tr;
};

const principles: Principle[] = [
  {
    title: t("Simple before clever", "La simplicité d’abord"),
    text: t(
      "KamJob’s scheduled reports queue in a Postgres table under an advisory lock. Redis was considered — and rejected at that volume.",
      "Les rapports planifiés de KamJob attendent dans une table Postgres, sous verrou consultatif. Redis a été envisagé — puis écarté à ce volume.",
    ),
    project: "KamJob",
  },
  {
    title: t("Make retries harmless", "Des reprises sans danger"),
    text: t(
      "The KamJob app sends swipes in batches that the API upserts, so a batch re-sent after a network drop never applies twice.",
      "L’appli KamJob envoie les swipes par lots que l’API insère en upsert : un lot renvoyé après une coupure réseau ne s’applique jamais deux fois.",
    ),
    project: "KamJob",
  },
  {
    title: t("Design for failure", "Prévoir l’échec"),
    text: t(
      "WAZALINK tracks every record through nine states, so a VPN cut mid-transfer loses nothing and duplicates nothing.",
      "WAZALINK suit chaque enregistrement à travers neuf états : une coupure VPN en plein transfert ne perd rien et ne duplique rien.",
    ),
    project: "WAZALINK",
    href: page("/projects/wazalink"),
  },
  {
    title: t("Rules belong to the business", "Les règles appartiennent au métier"),
    text: t(
      "In LedgerSync, accountants edit the formulas themselves. A new rate applies on the next run — no ticket, no release.",
      "Dans LedgerSync, les comptables modifient eux-mêmes les formules. Un nouveau taux s’applique au traitement suivant — sans ticket ni mise en production.",
    ),
    project: "LedgerSync",
    href: page("/projects/ledgersync"),
  },
  {
    title: t("Measure what costs money", "Mesurer ce qui coûte"),
    text: t(
      "Every AI call in KamJob is metered by operation, in dollars, the same day — a runaway prompt shows up before the invoice does.",
      "Chaque appel d’IA de KamJob est mesuré par opération, en dollars, le jour même — une dérive se voit avant la facture.",
    ),
    project: "KamJob",
  },
  {
    title: t("Write it down", "Tout documenter"),
    text: t(
      "KamJob ships with a handoff guide, a monitoring runbook and a written design system. You own the system — not a dependency on me.",
      "KamJob est livré avec un guide de passation, un runbook de supervision et un design system écrit. Le système vous appartient — sans dépendance envers moi.",
    ),
    project: "KamJob",
  },
];

export const approach = {
  eyebrow: t("Approach", "Méthode"),
  title: t("How I", "Comment je"),
  em: t("work.", "travaille."),
  intro: t(
    "The same four steps on every project — a new product, an ERP integration or a security fix.",
    "Les mêmes quatre étapes pour chaque projet — un nouveau produit, une intégration d’ERP ou un correctif de sécurité.",
  ),
  steps: [
    {
      title: t("Understand", "Comprendre"),
      text: t(
        "I read the system before I touch it: the data, the flows, what breaks today. I work from real data, not assumptions.",
        "J’étudie le système avant d’y toucher : les données, les flux, ce qui casse aujourd’hui. Je travaille sur des données réelles, pas sur des suppositions.",
      ),
    },
    {
      title: t("Specify", "Spécifier"),
      text: t(
        "States, business rules, failure cases and contracts go in writing before the code. You approve a plan, not a surprise.",
        "États, règles métier, cas d’échec et contrats sont écrits avant le code. Vous validez un plan, pas une surprise.",
      ),
    },
    {
      title: t("Build", "Construire"),
      text: t(
        "Rules, money and permissions stay deterministic and tested. AI goes only where it earns its place, behind guardrails.",
        "Règles, argent et permissions restent déterministes et testés. L’IA n’intervient que là où elle apporte, avec des garde-fous.",
      ),
    },
    {
      title: t("Prove & ship", "Prouver & livrer"),
      text: t(
        "Unit tests that attack the code, SAST and SCA gates in CI, monitoring in production. Every release reproducible — and reversible.",
        "Des tests unitaires qui attaquent le code, des contrôles SAST et SCA en CI, une supervision en production. Chaque mise en production reproductible — et réversible.",
      ),
    },
  ],
  loop: t("What production teaches feeds the next spec.", "Ce que la production nous apprend nourrit la prochaine spécification."),
  principles: {
    label: t("Principles", "Principes"),
    title: t("Principles,", "Des principes,"),
    em: t("with receipts.", "preuves à l’appui."),
    intro: t(
      "Each one is a decision taken in a real system — and the reason behind it.",
      "Chacun est une décision prise dans un vrai système — avec la raison derrière.",
    ),
    items: principles,
  },
};

/* ---------------------------------------------------------------- security */

export type RiskIcon =
  | "lock"
  | "server"
  | "pipeline"
  | "key"
  | "code"
  | "wallet"
  | "user"
  | "shield"
  | "activity"
  | "alert"
  | "spark";

type Risk = {
  /** Short code for the list: "A01", or "LLM" for the LLM Top 10 entry. */
  code: string;
  /** Full OWASP reference shown on the card. */
  ref: string;
  /** Short name for the list. */
  short: Tr;
  /** The OWASP category's name. */
  title: Tr;
  icon: RiskIcon;
  tags: (string | Tr)[];
  threat: Tr;
  defense: Tr;
  proof: Tr;
};

/** OWASP Top 10:2025, then the OWASP Top 10 for LLM Applications (2025) — each answered by what KamJob does. */
const risks: Risk[] = [
  {
    code: "A01",
    ref: "A01:2025",
    short: t("Access control", "Contrôle d’accès"),
    title: t("Broken Access Control", "Contrôle d’accès défaillant"),
    icon: "lock",
    tags: ["RBAC", t("Ownership checks", "Contrôle du propriétaire"), t("Admin approval", "Validation admin")],
    threat: t(
      "A user who promotes themselves to employer, or opens someone else’s CV by changing an ID in the URL.",
      "Un utilisateur qui s’attribue le rôle d’employeur, ou ouvre le CV d’un autre en changeant un identifiant dans l’URL.",
    ),
    defense: t(
      "Roles come only from server-side metadata no user can edit, and employer access goes through admin approval. Every document, payment, notification and job offer is checked against its owner on the server before it is returned or changed.",
      "Les rôles ne viennent que de métadonnées côté serveur qu’aucun utilisateur ne peut modifier, et l’accès employeur passe par une validation de l’administrateur. Chaque document, paiement, notification et offre est vérifié côté serveur contre son propriétaire avant d’être renvoyé ou modifié.",
    ),
    proof: t(
      "Cross-account reads and edits answer 403, and files are served through short-lived signed links issued only to someone allowed to see them.",
      "Lire ou modifier ce qui appartient à un autre compte renvoie 403, et les fichiers passent par des liens signés à courte durée de vie, délivrés seulement à qui a le droit de les voir.",
    ),
  },
  {
    code: "A02",
    ref: "A02:2025",
    short: t("Misconfiguration", "Configuration"),
    title: t("Security Misconfiguration", "Mauvaise configuration de sécurité"),
    icon: "server",
    tags: ["Docker", "CSP · HSTS", t("XML parsing", "Parsing XML")],
    threat: t(
      "Unsafe defaults: a container running as root, metrics left open, an XML parser that follows external entities.",
      "Des réglages par défaut dangereux : un conteneur qui tourne en root, des métriques laissées ouvertes, un parseur XML qui suit les entités externes.",
    ),
    defense: t(
      "A pinned Alpine image, patched at build time, running as a non-root user. Metrics need a token and stay closed in production if none is set. Uploaded documents are parsed with any DTD refused and their decompressed size capped, and the public site ships a strict CSP and HSTS.",
      "Une image Alpine figée, corrigée au build, qui tourne sans privilèges root. Les métriques exigent un jeton et restent fermées en production s’il n’est pas défini. Les documents reçus sont lus avec toute DTD refusée et une taille décompressée plafonnée, et le site public impose une CSP stricte et HSTS.",
    ),
    proof: t(
      "Trivy checks the Dockerfile on every push, and XXE, “billion laughs” and zip-bomb files are replayed as tests that must be refused.",
      "Trivy contrôle le Dockerfile à chaque push, et des fichiers XXE, « billion laughs » et bombe zip sont rejoués en tests qui doivent être refusés.",
    ),
  },
  {
    code: "A03",
    ref: "A03:2025",
    short: t("Supply chain", "Chaîne d’approvisionnement"),
    title: t("Software Supply Chain Failures", "Défaillances de la chaîne d’approvisionnement logicielle"),
    icon: "pipeline",
    tags: ["SCA", t("Secret scanning", "Détection de secrets"), t("SHA-pinned CI", "CI figée par SHA")],
    threat: t(
      "A vulnerable package, a key left in Git history, or a CI action whose tag an attacker has moved to their own code.",
      "Un paquet vulnérable, une clé oubliée dans l’historique Git, ou une action de CI dont un attaquant a déplacé le tag vers son propre code.",
    ),
    defense: t(
      "SCA scans every dependency that ships, secret scanning covers the whole Git history, and the built image is scanned for vulnerable OS packages. Every CI action is pinned to a commit SHA, Dependabot keeps those pins current, and tokens reach only the steps that need them.",
      "La SCA analyse chaque dépendance livrée, la détection de secrets couvre tout l’historique Git, et l’image construite est analysée pour ses paquets système vulnérables. Chaque action de CI est figée sur un SHA de commit, Dependabot tient ces versions à jour, et les jetons ne vont qu’aux étapes qui en ont besoin.",
    ),
    proof: t(
      "Tests fail the build if an action is left unpinned or a token reaches a whole job.",
      "Des tests font échouer le build si une action n’est pas figée ou si un jeton atteint tout un job.",
    ),
  },
  {
    code: "A04",
    ref: "A04:2025",
    short: t("Cryptography", "Cryptographie"),
    title: t("Cryptographic Failures", "Défaillances cryptographiques"),
    icon: "key",
    tags: ["RS256", "HMAC-SHA256", t("Constant-time", "Temps constant")],
    threat: t(
      "Crypto that looks right but isn’t: tokens accepted with a weak or missing signature, secrets compared in a way that leaks them byte by byte.",
      "Une crypto qui semble juste mais ne l’est pas : jetons acceptés avec une signature faible ou absente, secrets comparés d’une façon qui les laisse fuiter octet par octet.",
    ),
    defense: t(
      "Session tokens are accepted with RS256 only, so “alg: none” and key-confusion tricks fail. Webhook signatures are HMAC-SHA256 over the raw body, and every token and signature comparison runs in constant time. Passwords never reach the API: sign-in is delegated to a dedicated identity provider.",
      "Les jetons de session ne sont acceptés qu’en RS256 : « alg: none » et les confusions de clés échouent. Les signatures de webhook sont des HMAC-SHA256 calculés sur le corps brut, et toute comparaison de jeton ou de signature se fait à temps constant. Les mots de passe n’atteignent jamais l’API : la connexion est déléguée à un fournisseur d’identité dédié.",
    ),
    proof: t(
      "The token tests include the classic key-confusion attack: an HS256 token signed with the public key.",
      "Les tests de jetons incluent l’attaque classique par confusion de clés : un jeton HS256 signé avec la clé publique.",
    ),
  },
  {
    code: "A05",
    ref: "A05:2025",
    short: t("Injection", "Injection"),
    title: t("Injection", "Injection"),
    icon: "code",
    tags: ["SQLAlchemy", "Pydantic", "SAST"],
    threat: t(
      "Hostile input reaching an interpreter: SQL built from what a user typed, or markup that smuggles code into a page or a document.",
      "Une entrée hostile qui atteint un interpréteur : du SQL construit à partir de ce qu’un utilisateur a saisi, ou du balisage qui glisse du code dans une page ou un document.",
    ),
    defense: t(
      "No SQL is built from strings: queries go through SQLAlchemy with bound parameters, raw SQL included. Request bodies are validated by Pydantic schemas, and free-text fields are cleaned of control characters before their length is checked.",
      "Aucun SQL n’est construit à partir de chaînes : les requêtes passent par SQLAlchemy avec des paramètres liés, SQL brut compris. Les corps de requête sont validés par des schémas Pydantic, et les champs libres sont nettoyés des caractères de contrôle avant le contrôle de longueur.",
    ),
    proof: t(
      "SAST (Snyk Code) reads the source on every push, and any HIGH finding blocks the release.",
      "Le SAST (Snyk Code) relit le code à chaque push, et toute faille HIGH bloque la mise en production.",
    ),
  },
  {
    code: "A06",
    ref: "A06:2025",
    short: t("Insecure design", "Conception"),
    title: t("Insecure Design", "Conception non sécurisée"),
    icon: "wallet",
    tags: ["Mobile Money", t("Idempotency", "Idempotence"), t("Advisory locks", "Verrous consultatifs")],
    threat: t(
      "Logic that works as coded but can be gamed: paying less than the price, one payment unlocking access twice, a cheap pass buying days of a higher plan.",
      "Une logique qui fonctionne comme codée mais qu’on peut détourner : payer moins que le prix, un même paiement qui ouvre l’accès deux fois, un pass bon marché qui achète des jours d’une offre supérieure.",
    ),
    defense: t(
      "The payment flow is designed around abuse: the amount is re-checked against the price, the move to “paid” is claimed once by a guarded update, and each purchase opens its own access window, placed under a lock so two purchases can’t collide.",
      "Le parcours de paiement est conçu contre les abus : le montant est recontrôlé par rapport au prix, le passage à « payé » n’est accordé qu’une fois par une mise à jour gardée, et chaque achat ouvre sa propre fenêtre d’accès, placée sous verrou pour que deux achats ne se télescopent pas.",
    ),
    proof: t(
      "Each purchase is its own receipt, kept for refunds and audits.",
      "Chaque achat est un reçu distinct, conservé pour les remboursements et les audits.",
    ),
  },
  {
    code: "A07",
    ref: "A07:2025",
    short: t("Authentication", "Authentification"),
    title: t("Authentication Failures", "Défaillances d’authentification"),
    icon: "user",
    tags: ["JWT", "JWKS", t("Fail closed", "Échec fermé")],
    threat: t(
      "A hand-made token that claims to be someone else — the admin included.",
      "Un jeton fabriqué à la main qui se fait passer pour quelqu’un d’autre — l’administrateur compris.",
    ),
    defense: t(
      "Every session token is verified before it is believed: signature against the identity provider’s published keys, expiry, not-before and the app that issued it. If the keys can’t be reached, the API refuses — it never waves a request through.",
      "Chaque jeton de session est vérifié avant d’être cru : signature contre les clés publiées du fournisseur d’identité, expiration, date de validité et application émettrice. Si les clés sont injoignables, l’API refuse — elle ne laisse jamais passer une requête non vérifiée.",
    ),
    proof: t(
      "Tests replay what an attacker tries first: an unsigned token, “alg: none”, a token signed with the wrong key.",
      "Des tests rejouent ce qu’un attaquant tente en premier : jeton non signé, « alg: none », jeton signé avec la mauvaise clé.",
    ),
  },
  {
    code: "A08",
    ref: "A08:2025",
    short: t("Data integrity", "Intégrité des données"),
    title: t("Software or Data Integrity Failures", "Défaillances d’intégrité des logiciels ou des données"),
    icon: "shield",
    tags: ["Svix", "HMAC", t("Server-side re-check", "Revérification serveur")],
    threat: t(
      "Trusting data nobody verified: a forged “payment successful” callback, or a fake account update posted to a webhook.",
      "Faire confiance à des données non vérifiées : un faux rappel « paiement réussi », ou une fausse mise à jour de compte postée sur un webhook.",
    ),
    defense: t(
      "Identity webhooks must carry a valid signature, and are refused outright when no secret is configured. A payment callback is a hint, never proof: status and amount are re-read from the payment provider, and signed callbacks are checked with HMAC-SHA256.",
      "Les webhooks d’identité doivent porter une signature valide, et sont refusés d’office si aucun secret n’est configuré. Un rappel de paiement est un indice, jamais une preuve : statut et montant sont relus chez le prestataire, et les rappels signés sont vérifiés en HMAC-SHA256.",
    ),
    proof: t(
      "A forged callback can’t grant a subscription — at most, it triggers a re-check with the provider.",
      "Un faux rappel ne peut pas accorder d’abonnement — au pire, il déclenche une revérification auprès du prestataire.",
    ),
  },
  {
    code: "A09",
    ref: "A09:2025",
    short: t("Logging & alerting", "Journalisation & alertes"),
    title: t("Security Logging & Alerting Failures", "Défaillances de journalisation et d’alerte"),
    icon: "activity",
    tags: ["Sentry", "Prometheus", t("Request IDs", "ID de requête")],
    threat: t(
      "An attack or an outage that nobody notices until users complain.",
      "Une attaque ou une panne que personne ne remarque avant les plaintes des utilisateurs.",
    ),
    defense: t(
      "Structured logs carry a request ID, Sentry captures errors and traces, and Prometheus metrics are labelled by route — never by raw URL, so a scanner can’t flood them. AI spend and payment states are measured the same day.",
      "Des journaux structurés portent un identifiant de requête, Sentry capte erreurs et traces, et les métriques Prometheus sont étiquetées par route — jamais par URL brute, pour qu’un scanner ne puisse pas les saturer. Dépenses d’IA et états des paiements sont mesurés le jour même.",
    ),
    proof: t(
      "A failed startup step is counted on the dashboard instead of disappearing into a log nobody reads.",
      "Une étape de démarrage en échec est comptée sur le tableau de bord au lieu de disparaître dans un journal que personne ne lit.",
    ),
  },
  {
    code: "A10",
    ref: "A10:2025",
    short: t("Exceptional conditions", "Conditions exceptionnelles"),
    title: t("Mishandling of Exceptional Conditions", "Mauvaise gestion des conditions exceptionnelles"),
    icon: "alert",
    tags: [t("Fail closed", "Échec fermé"), t("Health probes", "Sondes de santé"), t("Safe fallbacks", "Replis sûrs")],
    threat: t(
      "Failing open: when a dependency is down or a check can’t run, the system lets things through.",
      "Échouer en mode ouvert : quand une dépendance tombe ou qu’un contrôle ne peut pas tourner, le système laisse passer.",
    ),
    defense: t(
      "Everything fails closed. No signing keys: 503, not “come in”. A security scan that didn’t complete blocks the deploy. If the AI refuses or drifts, the candidate’s own documents are sent rather than a broken version.",
      "Tout échoue en mode fermé. Pas de clés de signature : 503, pas « entrez ». Une analyse de sécurité qui n’a pas abouti bloque le déploiement. Si l’IA refuse ou dérive, ce sont les documents d’origine du candidat qui partent, pas une version cassée.",
    ),
    proof: t(
      "Liveness never touches the database, so a database blip can’t make the orchestrator restart healthy containers.",
      "La sonde de vie ne touche jamais la base : une coupure de la base ne peut pas pousser l’orchestrateur à redémarrer des conteneurs sains.",
    ),
  },
  {
    code: "LLM",
    ref: "LLM01 · LLM05 · LLM09 · LLM10",
    short: t("AI & LLMs", "IA & LLM"),
    title: t("AI features (OWASP Top 10 for LLMs)", "Fonctionnalités d’IA (OWASP Top 10 LLM)"),
    icon: "spark",
    tags: [t("Prompt injection", "Injection de prompt"), t("JSON schemas", "Schémas JSON"), t("Usage quotas", "Quotas d’usage")],
    threat: t(
      "Instructions hidden in a job offer or a CV, a model that invents experience, an answer used without checking it, or AI costs that run away.",
      "Des instructions cachées dans une offre ou un CV, un modèle qui invente une expérience, une réponse utilisée sans vérification, ou des coûts d’IA qui s’emballent.",
    ),
    defense: t(
      "Offers and profiles reach the model as tagged data that can’t close its own block — never as orders — and it is told to invent nothing. Structured answers must match a JSON schema, layout and rules stay in code, and every plan has a metered AI allowance.",
      "Offres et profils arrivent au modèle comme des données balisées qui ne peuvent pas fermer leur bloc — jamais comme des ordres — avec l’interdiction d’inventer quoi que ce soit. Les réponses structurées doivent respecter un schéma JSON, la mise en page et les règles restent dans le code, et chaque offre dispose d’un quota d’IA mesuré.",
    ),
    proof: t(
      "If the model refuses or drifts, a check catches it and the candidate’s own documents are sent unchanged.",
      "Si le modèle refuse ou dérive, un contrôle l’intercepte et les documents d’origine du candidat sont envoyés tels quels.",
    ),
  },
];

/** The CI checks that enforce all of the above, in the order a push meets them. */
const practices: { practice: Tr; tool: string; catches: Tr; gate: Tr }[] = [
  {
    practice: t("Secret scanning", "Détection de secrets"),
    tool: "gitleaks",
    catches: t("Keys and tokens anywhere in the Git history", "Clés et jetons n’importe où dans l’historique Git"),
    gate: t("Any finding", "Toute détection"),
  },
  {
    practice: t("IaC scanning", "Analyse IaC"),
    tool: "Trivy",
    catches: t("Misconfigurations in the Dockerfile", "Mauvaises configurations du Dockerfile"),
    gate: t("HIGH or CRITICAL", "HIGH ou CRITICAL"),
  },
  {
    practice: t("SCA · dependency scan", "SCA · analyse des dépendances"),
    tool: "Snyk Open Source",
    catches: t(
      "Known CVEs in every Python package that ships, at the versions the lockfile pins",
      "CVE connues dans chaque paquet Python livré, aux versions figées par le lockfile",
    ),
    gate: t("HIGH or CRITICAL", "HIGH ou CRITICAL"),
  },
  {
    practice: t("SAST · static analysis", "SAST · analyse statique"),
    tool: "Snyk Code",
    catches: t("Injection, weak crypto and hard-coded secrets in our own code", "Injections, crypto faible et secrets en dur dans notre propre code"),
    gate: t("Any HIGH", "Tout HIGH"),
  },
  {
    practice: t("Image build & smoke test", "Build et test de fumée de l’image"),
    tool: "Docker",
    catches: t("An image that builds but can’t start, load its libraries or render a CV", "Une image qui se construit mais ne démarre pas, ne charge pas ses bibliothèques ou ne génère pas de CV"),
    gate: t("Any failure", "Tout échec"),
  },
  {
    practice: t("Container scanning", "Analyse du conteneur"),
    tool: "Snyk Container",
    catches: t("Vulnerable OS packages in the image that actually ships", "Paquets système vulnérables dans l’image réellement livrée"),
    gate: t("Every HIGH, fixable or not", "Tout HIGH, corrigeable ou non"),
  },
  {
    practice: t("Unit & regression tests", "Tests unitaires et de non-régression"),
    tool: "pytest · 300+",
    catches: t(
      "Broken business rules — and each attack above, replayed as a test case",
      "Règles métier cassées — et chaque attaque ci-dessus, rejouée en cas de test",
    ),
    gate: t("Any failure", "Tout échec"),
  },
  {
    practice: t("Static checks", "Contrôles statiques"),
    tool: "Ruff",
    catches: t("Undefined names that would crash a screen in production", "Noms non définis qui feraient planter un écran en production"),
    gate: t("Any finding", "Toute détection"),
  },
  {
    practice: t("Dependency updates", "Mises à jour des dépendances"),
    tool: "Dependabot",
    catches: t("Stale pins on the SHA-pinned CI actions", "Versions obsolètes des actions de CI figées par SHA"),
    gate: t("Weekly pull request", "Pull request hebdomadaire"),
  },
];

export const security = {
  eyebrow: t("Security", "Sécurité"),
  title: t("Secure", "Sécurisé"),
  em: t("by design.", "dès la conception."),
  intro: t(
    "Security isn’t a checklist at the end. In KamJob — a product I co-founded and engineered, with real candidates, CVs and Mobile Money payments — every defense below answers a risk from the OWASP Top 10:2025. Pick one to see the threat, what stops it and the proof.",
    "La sécurité n’est pas une checklist de fin de projet. Dans KamJob — un produit que j’ai cofondé et conçu, avec de vrais candidats, des CV et des paiements Mobile Money — chaque défense ci-dessous répond à un risque de l’OWASP Top 10:2025. Choisissez-en un pour voir la menace, ce qui l’arrête et la preuve.",
  ),
  context: t("Case study · KamJob, in production", "Étude de cas · KamJob, en production"),
  risksLabel: t("OWASP Top 10:2025 · plus the LLM Top 10", "OWASP Top 10:2025 · et le Top 10 LLM"),
  threat: t("The threat", "La menace"),
  defense: t("What stops it", "Ce qui l’arrête"),
  proof: t("Proven by", "La preuve"),
  risks,
  pipeline: {
    label: t("DevSecOps", "DevSecOps"),
    title: t("Enforced on every push", "Appliqué à chaque push"),
    note: t(
      "Nothing reaches production until every check passes — and a scan that didn’t run counts as a failure, not a pass.",
      "Rien n’atteint la production tant que tous les contrôles ne sont pas au vert — et une analyse qui n’a pas tourné compte comme un échec, pas comme une réussite.",
    ),
    stations: [
      { name: "Push", note: "main" },
      { name: t("Secrets", "Secrets"), note: "gitleaks" },
      { name: "IaC", note: "Trivy" },
      { name: "SCA", note: "Snyk" },
      { name: "SAST", note: "Snyk Code" },
      { name: "Image", note: t("smoke test", "test de fumée") },
      { name: t("Container", "Conteneur"), note: "Snyk" },
      { name: t("Tests", "Tests"), note: "pytest" },
      { name: t("Deploy", "Déploiement"), note: t("all green", "tout au vert") },
    ] as { name: string | Tr; note: string | Tr }[],
    columns: {
      practice: t("Practice", "Pratique"),
      tool: t("Tool", "Outil"),
      catches: t("What it catches", "Ce qu’elle détecte"),
      gate: t("Blocks on", "Bloque sur"),
    },
    practices,
  },
  stats: [
    { value: "5", label: t("security scanners gate every deploy", "analyses de sécurité conditionnent chaque déploiement") },
    { value: "300", suffix: "+", label: t("automated tests before production", "tests automatisés avant la production") },
    { value: "10", suffix: "/10", label: t("OWASP Top 10 risks mapped to a defense", "risques OWASP Top 10 associés à une défense") },
    { value: "0", label: t("unpinned CI actions", "action de CI non figée") },
  ] as { value: string; suffix?: string; label: Tr }[],
};
