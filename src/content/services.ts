/**
 * How I can help and how I work: the services offer, the method with its
 * principles, and the KamJob security deep-dive.
 *
 * Every security and scaling claim below was checked against the KamJob
 * repositories (backend auth, payments, uploads, agents, CI workflows,
 * Dockerfile) before it was written. Keep it that way: describe what the code
 * does, never what it might do.
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
        "Security review with fixes: login, permissions, payments, uploads",
        "Audit de sécurité avec correctifs : connexion, droits, paiements, fichiers",
      ),
      t("CI gates that block leaked secrets and vulnerable code", "Une CI qui bloque les secrets exposés et le code vulnérable"),
      t("Docker, Kubernetes and GitOps — every release reversible", "Docker, Kubernetes et GitOps — chaque mise en production réversible"),
      t("Monitoring that warns you before your users do", "Une supervision qui vous alerte avant vos utilisateurs"),
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
        "Tests that attack the code, security gates in CI, monitoring in production. Every release reproducible — and reversible.",
        "Des tests qui attaquent le code, des contrôles de sécurité en CI, une supervision en production. Chaque mise en production reproductible — et réversible.",
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

type Layer = {
  id: string;
  title: Tr;
  tags: (string | Tr)[];
  threat: Tr;
  defense: Tr;
  proof: Tr;
};

const layers: Layer[] = [
  {
    id: "identity",
    title: t("Identity", "Identité"),
    tags: ["JWT", "RS256", "JWKS"],
    threat: t(
      "A hand-made token that claims to be someone else — the admin included.",
      "Un jeton fabriqué à la main qui se fait passer pour quelqu’un d’autre — l’administrateur compris.",
    ),
    defense: t(
      "Every session token is verified before it is believed: RS256 signature against the identity provider’s published keys, expiry, not-before and the app that issued it. If the keys can’t be reached, the API refuses — it never waves a request through.",
      "Chaque jeton de session est vérifié avant d’être cru : signature RS256 contre les clés publiées du fournisseur d’identité, expiration, date de validité et application émettrice. Si les clés sont injoignables, l’API refuse — elle ne laisse jamais passer une requête non vérifiée.",
    ),
    proof: t(
      "Tests replay what an attacker tries first: an unsigned token, “alg: none”, the wrong key, the public key used as an HS256 secret.",
      "Des tests rejouent ce qu’un attaquant tente en premier : jeton non signé, « alg: none », mauvaise clé, clé publique utilisée comme secret HS256.",
    ),
  },
  {
    id: "access",
    title: t("Permissions", "Droits d’accès"),
    tags: ["RBAC", t("Ownership checks", "Contrôle du propriétaire"), t("Signed webhooks", "Webhooks signés")],
    threat: t(
      "A user who promotes themselves to employer, or opens someone else’s CV by changing an ID in the URL.",
      "Un utilisateur qui s’attribue le rôle d’employeur, ou ouvre le CV d’un autre en changeant un identifiant dans l’URL.",
    ),
    defense: t(
      "Roles come only from server-side metadata no user can edit, and employer access goes through admin approval. Every document, payment, notification and job offer is checked against its owner before it is returned or changed.",
      "Les rôles ne viennent que de métadonnées côté serveur qu’aucun utilisateur ne peut modifier, et l’accès employeur passe par une validation de l’administrateur. Chaque document, paiement, notification et offre est vérifié contre son propriétaire avant d’être renvoyé ou modifié.",
    ),
    proof: t(
      "Identity webhooks must be signed: an unsigned event is refused, so nobody can re-point an account by posting a fake update.",
      "Les webhooks d’identité doivent être signés : un événement non signé est refusé, personne ne peut détourner un compte avec une fausse mise à jour.",
    ),
  },
  {
    id: "payments",
    title: t("Payments", "Paiements"),
    tags: ["Mobile Money", "HMAC-SHA256", t("Idempotency", "Idempotence")],
    threat: t(
      "A forged “payment successful” callback that unlocks Premium for free — or one payment granting access twice.",
      "Un faux rappel « paiement réussi » qui débloque le Premium gratuitement — ou un même paiement qui ouvre l’accès deux fois.",
    ),
    defense: t(
      "A callback is a hint, never proof: the status and the amount are re-read from the payment provider. Signed callbacks are checked with HMAC-SHA256 in constant time, and the move from pending to paid is claimed once, atomically.",
      "Un rappel est un indice, jamais une preuve : le statut et le montant sont relus chez le prestataire de paiement. Les rappels signés sont vérifiés en HMAC-SHA256 à temps constant, et le passage de « en attente » à « payé » n’est accordé qu’une fois, de façon atomique.",
    ),
    proof: t(
      "A transaction worth less than the price activates nothing, and each purchase is its own receipt, kept for refunds and audits.",
      "Une transaction inférieure au prix n’active rien, et chaque achat est un reçu distinct, conservé pour les remboursements et les audits.",
    ),
  },
  {
    id: "uploads",
    title: t("File uploads", "Fichiers envoyés"),
    tags: ["XXE", t("Zip bombs", "Bombes zip"), t("Signed URLs", "URL signées")],
    threat: t(
      "A “CV” that is really an attack: XML entities that read server files, nested entities that expand into gigabytes, a zip bomb.",
      "Un « CV » qui est en réalité une attaque : entités XML qui lisent les fichiers du serveur, entités imbriquées qui enflent jusqu’à des gigaoctets, bombe zip.",
    ),
    defense: t(
      "Uploaded documents are parsed as hostile input: any DTD is refused, entities never expand and the decompressed size is capped. Files go straight to storage through signed links that expire in 15 minutes, checked against their owner.",
      "Les documents reçus sont lus comme des entrées hostiles : toute DTD est refusée, aucune entité n’est développée et la taille décompressée est plafonnée. Les fichiers vont directement au stockage par des liens signés qui expirent en 15 minutes, vérifiés contre leur propriétaire.",
    ),
    proof: t(
      "Each attack is a test — XXE, “billion laughs”, zip bomb — and must be refused like any unreadable file.",
      "Chaque attaque est un test — XXE, « billion laughs », bombe zip — et doit être refusée comme n’importe quel fichier illisible.",
    ),
  },
  {
    id: "ai",
    title: t("AI", "IA"),
    tags: [t("Prompt injection", "Injection de prompt"), t("JSON schemas", "Schémas JSON")],
    threat: t(
      "Instructions hidden in a job offer or a CV, or a model that invents experience the candidate doesn’t have.",
      "Des instructions cachées dans une offre ou un CV, ou un modèle qui invente une expérience que le candidat n’a pas.",
    ),
    defense: t(
      "Offers and profiles reach the model as tagged data that can’t close its own block — never as orders — and it is told to invent nothing. The model writes, the code decides: structured answers follow a JSON schema, and layout and rules stay in code.",
      "Offres et profils arrivent au modèle comme des données balisées qui ne peuvent pas fermer leur bloc — jamais comme des ordres — avec l’interdiction d’inventer quoi que ce soit. Le modèle rédige, le code décide : les réponses structurées suivent un schéma JSON, la mise en page et les règles restent dans le code.",
    ),
    proof: t(
      "If the model refuses or drifts, a check catches it and the candidate’s own documents are sent unchanged.",
      "Si le modèle refuse ou dérive, un contrôle l’intercepte et les documents d’origine du candidat sont envoyés tels quels.",
    ),
  },
  {
    id: "pipeline",
    title: t("Supply chain", "Chaîne de livraison"),
    tags: ["gitleaks", "Trivy", "Snyk"],
    threat: t(
      "A leaked secret, a vulnerable dependency, or a CI action whose tag an attacker has moved to their own code.",
      "Un secret divulgué, une dépendance vulnérable, ou une action de CI dont un attaquant a déplacé le tag vers son propre code.",
    ),
    defense: t(
      "Five scanners gate every deploy: secrets, Dockerfile, dependencies, code and the container image. Any HIGH finding blocks the release, and a scan that didn’t run counts as a failure. CI actions are pinned to commit SHAs, and tokens reach only the steps that need them.",
      "Cinq analyses conditionnent chaque déploiement : secrets, Dockerfile, dépendances, code et image du conteneur. Toute faille HIGH bloque la mise en production, et une analyse qui n’a pas tourné compte comme un échec. Les actions de CI sont figées sur un SHA de commit, et les jetons ne vont qu’aux étapes qui en ont besoin.",
    ),
    proof: t(
      "Tests fail the build if an action is left unpinned or a token reaches a whole job.",
      "Des tests font échouer le build si une action n’est pas figée ou si un jeton atteint tout un job.",
    ),
  },
  {
    id: "runtime",
    title: t("Runtime", "Exécution"),
    tags: ["Docker", t("Health probes", "Sondes de santé"), "Prometheus"],
    threat: t(
      "A container running as root, a health check that restarts healthy servers, a metrics page that leaks your business numbers.",
      "Un conteneur qui tourne en root, une sonde qui redémarre des serveurs sains, une page de métriques qui laisse fuiter vos chiffres.",
    ),
    defense: t(
      "A pinned Alpine image that takes security patches at build time and runs as a non-root user. Liveness never touches the database; readiness does. Metrics need a token compared in constant time — and stay closed in production if none is set.",
      "Une image Alpine figée, qui intègre les correctifs de sécurité au build et tourne sans privilèges root. La sonde de vie ne touche jamais la base ; celle de disponibilité, si. Les métriques exigent un jeton comparé à temps constant — et restent fermées en production s’il n’est pas défini.",
    ),
    proof: t(
      "The image is built, started and smoke-tested in CI before anything ships.",
      "L’image est construite, démarrée et testée en CI avant toute livraison.",
    ),
  },
];

export const security = {
  eyebrow: t("Security", "Sécurité"),
  title: t("Secure", "Sécurisé"),
  em: t("by design.", "dès la conception."),
  intro: t(
    "Security isn’t a checklist at the end. In KamJob — a product I designed and run, with real candidates, CVs and Mobile Money payments — it is built into every layer. Pick one to see the threat and what stops it.",
    "La sécurité n’est pas une checklist de fin de projet. Dans KamJob — un produit que j’ai conçu et que j’exploite, avec de vrais candidats, des CV et des paiements Mobile Money — elle est intégrée à chaque couche. Choisissez-en une pour voir la menace et ce qui l’arrête.",
  ),
  context: t("Case study · KamJob, in production", "Étude de cas · KamJob, en production"),
  layersLabel: t("Security layers", "Couches de sécurité"),
  threat: t("The threat", "La menace"),
  defense: t("What stops it", "Ce qui l’arrête"),
  proof: t("Proven by", "La preuve"),
  layers,
  gate: {
    title: t("Every push, before production", "Chaque push, avant la production"),
    note: t(
      "Any HIGH finding blocks the release. A scan that didn’t run is not a pass.",
      "Toute faille HIGH bloque la mise en production. Une analyse qui n’a pas tourné n’est pas une réussite.",
    ),
    stations: [
      { name: t("Push", "Push"), note: "main" },
      { name: t("Secrets", "Secrets"), note: "gitleaks" },
      { name: "Dockerfile", note: "Trivy" },
      { name: t("Dependencies", "Dépendances"), note: "Snyk · SCA" },
      { name: t("Code", "Code"), note: "Snyk Code · SAST" },
      { name: t("Image", "Image"), note: t("built, run, scanned", "construite, lancée, analysée") },
      { name: t("Tests", "Tests"), note: t("300+ tests", "300+ tests") },
      { name: t("Deploy", "Déploiement"), note: t("only if all pass", "si tout est vert") },
    ] as { name: string | Tr; note: string | Tr }[],
  },
  stats: [
    { value: "5", label: t("scanners gate every deploy", "analyses conditionnent chaque déploiement") },
    { value: "300", suffix: "+", label: t("automated tests before production", "tests automatisés avant la production") },
    { value: "15", suffix: " min", label: t("lifetime of an upload link", "durée de vie d’un lien d’envoi") },
    { value: "0", label: t("unpinned CI actions", "action de CI non figée") },
  ] as { value: string; suffix?: string; label: Tr }[],
};
