/**
 * Everything the home page says lives in this file and in ./services.ts
 * (services, method and the security deep-dive).
 *
 * Copy is bilingual: `t("English", "Français")`. Anything written as a plain
 * string — names, URLs, tech, numbers — reads the same in both languages.
 * In-site links go through `page()` so they keep the visitor's language.
 *
 * Content comes from Ntchinda Giscard's CV, project notes, certificates and
 * the KamJob, WAZALINK and LedgerSync codebases.
 * Logos live in /public/logos (any .svg dropped there can be referenced by name).
 */

import { localize, page, t, type Locale, type Localized, type Tr } from "@/lib/i18n";
import { approach, security, services } from "./services";

export const profile = {
  /** Shown huge behind the character in the hero, and in "Hi, I'm …". */
  firstName: "Giscard",
  fullName: "Ntchinda Giscard",
  initials: "NG",
  /** The two lines of the hero title. */
  role: [t("Full Stack", "Développeur"), t("Developer", "Full Stack")],
  tagline: t(
    "Full-stack & AI · secure products and systems, built to scale",
    "Full-stack & IA · produits et systèmes sécurisés, prêts à grandir",
  ),
  description: t(
    "Ntchinda Giscard is a software engineer in Douala, Cameroon. He designs and builds secure, scalable products, ERP integrations and AI features — in English or French.",
    "Ntchinda Giscard est ingénieur logiciel à Douala, au Cameroun. Il conçoit et développe des produits, des intégrations d’ERP et des fonctionnalités d’IA sécurisés et évolutifs — en français ou en anglais.",
  ),
  email: "giscardntchinda@gmail.com",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/Ntchinda-Giscard",
  linkedin: "https://www.linkedin.com/in/ntchinda-giscard-62abb71bb/",
  /** Stacked-alpha intro video (colour on top, matte below) and its first frame. */
  heroVideo: "/hero/intro.mp4",
  heroPoster: "/hero/poster.webp",
  portrait: "/hero/portrait.webp",
  city: "Douala",
  timeZone: "Africa/Douala",
  utcOffset: "UTC+1",
};

/* ------------------------------------------------------------------ header */

export const header = {
  nav: [
    { id: "services", label: t("Services", "Services") },
    { id: "work", label: t("Work", "Projets") },
    { id: "approach", label: t("Approach", "Méthode") },
    { id: "security", label: t("Security", "Sécurité") },
    { id: "experience", label: t("Experience", "Parcours") },
    { id: "contact", label: t("Contact", "Contact") },
  ],
  home: t("{name}, back to top", "{name}, retour en haut"),
  navLabel: t("Primary", "Navigation principale"),
  openMenu: t("Open menu", "Ouvrir le menu"),
  closeMenu: t("Close menu", "Fermer le menu"),
  sayHello: t("Say hello", "Écrivez-moi"),
  language: t("Language", "Langue"),
};

/* -------------------------------------------------------------------- hero */

export const hero = {
  label: t("Introduction", "Présentation"),
  explore: t("Explore work", "Voir mes projets"),
  talk: t("Let’s talk", "Discutons"),
  resume: t("Resume", "CV"),
  stage: {
    posterAlt: t("3D character of {name}", "Personnage 3D de {name}"),
    play: t("Play intro video", "Lire la vidéo d’intro"),
    pause: t("Pause intro video", "Mettre la vidéo d’intro en pause"),
    playShort: t("Play", "Lecture"),
    pauseShort: t("Pause", "Pause"),
    soundOn: t("Play the intro with sound", "Lire l’intro avec le son"),
    soundOff: t("Mute the intro", "Couper le son de l’intro"),
    soundOnShort: t("Hear my intro", "Écouter mon intro"),
    soundOffShort: t("Mute", "Couper le son"),
  },
};

/* ------------------------------------------------------------------- about */

export const about = {
  eyebrow: t("About", "À propos"),
  hello: t("Hi, I’m", "Bonjour, je suis"),
  lead: t(
    "I design and build software a business can rely on: the product people use, the integrations behind it, and the infrastructure that keeps it secure and running.",
    "Je conçois et développe des logiciels sur lesquels une entreprise peut compter : le produit qu’on utilise, les intégrations qui le relient au reste du système, et l’infrastructure qui le garde sûr et disponible.",
  ),
  sub: t(
    "3+ years across payments, public-sector platforms and ERP integration — Python and FastAPI, React and Next.js, AWS and Kubernetes, and applied AI from NLP to LLM-written documents.",
    "Plus de 3 ans entre paiements, plateformes du secteur public et intégration d’ERP — Python et FastAPI, React et Next.js, AWS et Kubernetes, et IA appliquée, du NLP aux documents rédigés par LLM.",
  ),
  resume: t("Résumé", "CV"),
  factsLabel: t("Quick facts", "En bref"),
  facts: [
    { label: t("Based in", "Basé à"), value: t("Douala, Cameroon", "Douala, Cameroun") },
    { label: t("Degree", "Diplôme"), value: t("Master’s · Mechatronics", "Master · Mécatronique") },
    { label: t("Experience", "Expérience"), value: t("3+ years", "Plus de 3 ans") },
    { label: t("Working at", "En poste chez"), value: "WAZA Solutions" },
    { label: t("Languages", "Langues"), value: t("French · English", "Français · anglais") },
    { label: t("Open to", "Disponible pour"), value: t("Freelance · remote roles", "Freelance · postes à distance") },
  ],
  quote: t("“From the database to the last pixel.”", "« De la base de données au dernier pixel. »"),
  card: {
    id: "NG-0001",
    dept: t("Mechatronics", "Mécatronique"),
    validTill: "2027",
    issued: "Portfolio · 2026",
    heading: t("Developer ID", "Carte développeur"),
    idLabel: t("ID No", "N° ID"),
    deptLabel: t("Dept", "Dépt"),
    validLabel: t("Valid till", "Validité"),
    strap: t("Developer", "Développeur"),
    portraitAlt: t("Portrait of {name}", "Portrait de {name}"),
    backTitle: t("What I am", "Qui je suis"),
    found: t("If found, say hello", "Trouvée ? Écrivez-moi"),
    flip: t("Flip the card", "Retourner la carte"),
    flipBack: t("Flip back", "Revenir au recto"),
  },
  whatIAm: [
    { title: t("Full Stack Developer", "Développeur full stack"), detail: "Python · React · TypeScript" },
    { title: t("AI & NLP engineer", "Ingénieur IA & NLP"), detail: "LLMs · RAG · LangChain" },
    { title: t("Integration builder", "Intégrateur de systèmes"), detail: "Sage X3 · SOAP · REST" },
    { title: t("Cloud & DevOps", "Cloud & DevOps"), detail: "Kubernetes · ArgoCD · AWS" },
    {
      title: t("Master’s graduate", "Diplômé d’un master"),
      detail: t("Mechatronics & Intelligent Systems", "Mécatronique & systèmes intelligents"),
    },
  ],
};

/* ------------------------------------------------------------------ skills */

export type FamilyId = "languages" | "frontend" | "backend" | "databases" | "devops" | "ai";

const families: { id: FamilyId; label: Tr }[] = [
  { id: "languages", label: t("Languages", "Langages") },
  { id: "frontend", label: t("Frontend", "Frontend") },
  { id: "backend", label: t("Backend", "Backend") },
  { id: "databases", label: t("Databases", "Bases de données") },
  { id: "devops", label: t("Cloud & DevOps", "Cloud & DevOps") },
  { id: "ai", label: t("AI & NLP", "IA & NLP") },
];

type Element = { symbol: string; name: string | Tr; family: FamilyId; logo?: string };

/** Order matters: tiles flow left-to-right, eight per row, like a periodic table. */
const elements: Element[] = [
  { symbol: "Py", name: "Python", family: "languages", logo: "python" },
  { symbol: "Ts", name: "TypeScript", family: "languages", logo: "typescript" },
  { symbol: "Js", name: "JavaScript", family: "languages", logo: "javascript" },
  { symbol: "Go", name: "Go", family: "languages", logo: "go" },
  { symbol: "Sq", name: "SQL", family: "languages" },
  { symbol: "Re", name: "React.js", family: "frontend", logo: "react" },
  { symbol: "Nx", name: "Next.js", family: "frontend", logo: "nextjs" },
  { symbol: "Rn", name: "React Native", family: "frontend", logo: "react" },
  { symbol: "Ex", name: "Expo", family: "frontend", logo: "expo" },
  { symbol: "Tw", name: "Tailwind CSS", family: "frontend", logo: "tailwindcss" },
  { symbol: "Ta", name: "Tauri", family: "frontend", logo: "tauri" },
  { symbol: "Fa", name: "FastAPI", family: "backend", logo: "fastapi" },
  { symbol: "Dj", name: "Django", family: "backend", logo: "django" },
  { symbol: "No", name: "Node.js", family: "backend", logo: "nodejs" },
  { symbol: "Ra", name: t("REST APIs", "API REST"), family: "backend" },
  { symbol: "So", name: "SOAP", family: "backend" },
  { symbol: "Gq", name: "GraphQL", family: "backend", logo: "graphql" },
  { symbol: "Rq", name: "RabbitMQ", family: "backend", logo: "rabbitmq" },
  { symbol: "Kf", name: "Kafka", family: "backend", logo: "apachekafka" },
  { symbol: "Pg", name: "PostgreSQL", family: "databases", logo: "postgresql" },
  { symbol: "Ms", name: "SQL Server", family: "databases", logo: "microsoftsqlserver" },
  { symbol: "Vk", name: "Valkey", family: "databases" },
  { symbol: "Sl", name: "SQLite", family: "databases", logo: "sqlite" },
  { symbol: "Dk", name: "Docker", family: "devops", logo: "docker" },
  { symbol: "K8s", name: "Kubernetes", family: "devops", logo: "kubernetes" },
  { symbol: "Aw", name: "AWS", family: "devops", logo: "amazonwebservices" },
  { symbol: "Ar", name: "ArgoCD", family: "devops", logo: "argocd" },
  { symbol: "Ga", name: "GitHub Actions", family: "devops", logo: "githubactions" },
  { symbol: "Gl", name: "GitLab CI", family: "devops", logo: "gitlab" },
  { symbol: "Jk", name: "Jenkins", family: "devops", logo: "jenkins" },
  { symbol: "Pr", name: "Prometheus", family: "devops", logo: "prometheus" },
  { symbol: "Gf", name: "Grafana", family: "devops", logo: "grafana" },
  { symbol: "Ll", name: t("LLMs", "LLM"), family: "ai" },
  { symbol: "Ft", name: "Fine-tuning", family: "ai" },
  { symbol: "Rg", name: "RAG", family: "ai" },
  { symbol: "Lc", name: "LangChain", family: "ai", logo: "langchain" },
  { symbol: "Nl", name: "NLP", family: "ai" },
  { symbol: "Tf", name: "TensorFlow", family: "ai", logo: "tensorflow" },
  { symbol: "Hf", name: "Hugging Face", family: "ai", logo: "huggingface" },
  { symbol: "Mo", name: "MLOps", family: "ai" },
];

const NUMBER_WORDS = {
  en: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
  fr: ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"],
};
const familyCount = (lang: Locale) => NUMBER_WORDS[lang][families.length] ?? String(families.length);

export const skills = {
  eyebrow: t("Skills", "Compétences"),
  title: t("The periodic table", "Le tableau périodique"),
  em: t("of my stack.", "de ma stack."),
  intro: t(
    `${elements.length} elements in ${familyCount("en")} families. Hover a tile to see its logo, or pick a family to light it up.`,
    `${elements.length} éléments en ${familyCount("fr")} familles. Survolez une tuile pour voir son logo, ou choisissez une famille pour l’éclairer.`,
  ),
  chipsLabel: t("Highlight a family", "Mettre une famille en avant"),
  hint: t("Hover any element to see its logo", "Survolez un élément pour voir son logo"),
  number: t("No.", "N°"),
  families,
  elements,
};

/* ---------------------------------------------------------------- projects */

export type Tech = { name: string; logo?: string };

type Project = {
  title: string;
  shortTitle: string;
  category: Tr;
  description: Tr;
  features: Tr[];
  tech: Tech[];
  moreTech: number;
  /** Button link: an external URL (opens in a new tab) or an in-site case study, written with page(). */
  link?: { label: Tr; href: string | Tr };
  /** Small print beside the button, e.g. for private repositories. */
  note?: Tr;
  visual: "kamjob" | "integration" | "ledger";
};

const projects: Project[] = [
  {
    title: "KamJob",
    shortTitle: "KamJob",
    category: t("AI hiring · Mobile · Web", "Recrutement IA · Mobile · Web"),
    description: t(
      "Swipe through job offers in your field like a dating app: one swipe right and your application — CV and cover letter — goes straight to the recruiter.",
      "Faites défiler les offres de votre métier comme sur une appli de rencontre : un swipe à droite et votre candidature — CV et lettre de motivation — part directement chez le recruteur.",
    ),
    features: [
      t("AI job matching", "Matching d’offres par IA"),
      t("CVs tailored by AI", "CV adaptés par l’IA"),
      t("Automatic applications", "Candidatures automatiques"),
      t("Instant application", "Candidature instantanée"),
    ],
    tech: [
      { name: "Expo · React Native", logo: "expo" },
      { name: "Node.js", logo: "nodejs" },
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "Valkey" },
      { name: "Kafka", logo: "apachekafka" },
      { name: "LLM APIs" },
    ],
    moreTech: 0,
    link: { label: t("Visit kamjob.com", "Visiter kamjob.com"), href: "https://kamjob.com" },
    visual: "kamjob",
  },
  {
    title: "WAZALINK",
    shortTitle: "WAZALINK",
    category: t("ERP integration · Middleware · Kubernetes", "Intégration ERP · Middleware · Kubernetes"),
    description: t(
      "Middleware that keeps Sage X3, Sage HRM and a field app in sync over SOAP and REST, running on Kubernetes. It replaced a legacy middleware and tracks every transfer so retries never lose or duplicate a record.",
      "Un middleware qui synchronise Sage X3, Sage HRM et une application terrain en SOAP et REST, sur Kubernetes. Il a remplacé l’ancien middleware et suit chaque transfert pour qu’une reprise ne perde ni ne duplique aucun enregistrement.",
    ),
    features: [
      t("9-state idempotent pipeline", "Pipeline idempotent à 9 états"),
      t("Circuit breaker & safe retries", "Disjoncteur et reprises sûres"),
      t("Change-only sync, no duplicates", "Synchro des seuls changements, sans doublon"),
      t("6 critical business flows", "6 flux métier critiques"),
    ],
    tech: [
      { name: "Python", logo: "python" },
      { name: "FastAPI", logo: "fastapi" },
      { name: "SQLAlchemy", logo: "sqlalchemy" },
      { name: "SQL Server", logo: "microsoftsqlserver" },
      { name: "k3s", logo: "k3s" },
      { name: "ArgoCD", logo: "argocd" },
      { name: "Sage X3" },
      { name: "Sentry", logo: "sentry" },
    ],
    moreTech: 3,
    link: { label: t("Read the case study", "Lire l’étude de cas"), href: page("/projects/wazalink") },
    note: t("Private client repository", "Dépôt client privé"),
    visual: "integration",
  },
  {
    title: "LedgerSync",
    shortTitle: "LedgerSync",
    category: t("Finance · Desktop · Rules engine", "Finance · Desktop · Moteur de règles"),
    description: t(
      "A desktop reconciliation tool where accountants edit the formulas themselves, with no code change needed. It matches Integra against Sage 1000 across 40+ money-transfer services.",
      "Un outil de rapprochement pour poste de travail où les comptables modifient eux-mêmes les formules, sans toucher au code. Il rapproche Integra et Sage 1000 sur plus de 40 services de transfert d’argent.",
    ),
    features: [
      t("Formulas edited by accountants", "Formules modifiées par les comptables"),
      t("40+ transfer services matched", "Plus de 40 services rapprochés"),
      t("Debit/credit balance checks", "Contrôle de l’équilibre débit/crédit"),
      t("Two-pass aggregation", "Agrégation en deux passes"),
    ],
    tech: [
      { name: "Tauri", logo: "tauri" },
      { name: "React", logo: "react" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Tailwind CSS", logo: "tailwindcss" },
      { name: "Rust" },
    ],
    moreTech: 0,
    link: { label: t("Read the case study", "Lire l’étude de cas"), href: page("/projects/ledgersync") },
    note: t("Private client repository", "Dépôt client privé"),
    visual: "ledger",
  },
];

export const work = {
  eyebrow: t("Selected work", "Projets choisis"),
  title: t("Things I’ve", "Ce que j’ai"),
  em: t("built.", "construit."),
  intro: t(
    "Three products across AI hiring, ERP integration and finance. Hover a panel to open it.",
    "Trois produits : recrutement par IA, intégration d’ERP et finance. Survolez un panneau pour l’ouvrir.",
  ),
  open: t("Open {title}", "Ouvrir {title}"),
  builtWith: t("Built with", "Technologies"),
  projects,
};

/* ---------------------------------------------------------- certifications */

export const certifications = {
  eyebrow: t("Certifications", "Certifications"),
  title: t("Always", "Toujours"),
  em: t("learning.", "apprendre."),
  intro: t(
    "Certificates across MLOps, machine learning and the web, and still counting.",
    "Des certificats en MLOps, en machine learning et en développement web — et la liste s’allonge.",
  ),
  all: t("See all on LinkedIn", "Tout voir sur LinkedIn"),
  allUrl: "https://www.linkedin.com/in/ntchinda-giscard-62abb71bb/details/certifications/",
  /** Add `url` (e.g. a Coursera or LinkedIn Learning credential link) to make a row clickable. */
  items: [
    {
      title: "MLOps (Machine Learning Operations) Fundamentals",
      issuer: t("Google Cloud · Coursera · Sep 2022", "Google Cloud · Coursera · sept. 2022"),
      url: "https://www.coursera.org/account/accomplishments/verify/UQAZ8KUXYKB3",
    },
    {
      title: "Supervised Machine Learning: Regression and Classification",
      issuer: t("DeepLearning.AI & Stanford · Coursera", "DeepLearning.AI & Stanford · Coursera"),
      url: "https://www.coursera.org/account/accomplishments/verify/0255XJAWWIP1",
    },
    {
      title: "L’essentiel de JavaScript",
      issuer: t("LinkedIn Learning · Aug 2021", "LinkedIn Learning · août 2021"),
      url: "https://www.linkedin.com/learning/certificates/cc5f5cb828a993ab42cd34649f5e5f5964805b611d49a22f2beadf74d33490d6",
    },
    {
      title: "L’essentiel des CSS",
      issuer: t("LinkedIn Learning · Aug 2021", "LinkedIn Learning · août 2021"),
      url: "https://www.linkedin.com/learning/certificates/00272891dfb3f5c13ca4a585a06d7d23bf02bccbaf84a3e34851fa22d1cda50a",
    },
    {
      title: "L’essentiel du HTML5",
      issuer: t("LinkedIn Learning · Aug 2021", "LinkedIn Learning · août 2021"),
      url: "https://www.linkedin.com/learning/certificates/92ee99caef0d03b9256800af27350dfcd5e2f1d74e1583096190f595b6594ff5",
    },
  ] as { title: string; issuer: Tr; url?: string }[],
};

/* -------------------------------------------------------------- experience */

export type TimelineKind = "education" | "experience" | "projects";

type TimelineEntry = {
  year: string;
  kind: TimelineKind;
  range: string | Tr;
  title: string | Tr;
  place: string | Tr;
  metric?: { label: Tr; value: string };
  badge?: Tr;
  points?: Tr[];
  tags?: (string | Tr)[];
};

const timeline: TimelineEntry[] = [
  {
    year: "2022",
    kind: "projects",
    range: "2022 — 2023",
    title: t("Omdena AI challenges", "Challenges IA Omdena"),
    place: t("With NYU, Dream Space Academy and ThrAIve", "Avec NYU, Dream Space Academy et ThrAIve"),
    points: [
      t(
        "Built a Tamil hate-speech detection model and API, wired into Dream Space’s reporting workflow",
        "Modèle et API de détection des discours haineux en tamoul, branchés sur le circuit de signalement de Dream Space",
      ),
      t(
        "Designed the NLP data flow that tracks positive emotions in journal entries",
        "Conception du flux de données NLP qui suit les émotions positives dans des journaux intimes",
      ),
    ],
    tags: ["NLP", "TensorFlow", "FastAPI", "Hugging Face"],
  },
  {
    year: "2023",
    kind: "education",
    range: "2023",
    title: t("Master’s degree", "Master"),
    place: t("Mechatronics & Intelligent Systems", "Mécatronique & systèmes intelligents"),
  },
  {
    year: "2023",
    kind: "experience",
    range: "2023 — 2024",
    title: t("Full Stack Developer", "Développeur Full Stack"),
    place: "Urgent 2K · Douala",
    points: [
      t(
        "Built and maintained critical payment systems for financial clients, covered by unit tests",
        "Développement et maintenance de systèmes de paiement critiques pour des clients financiers, couverts par des tests unitaires",
      ),
      t(
        "Ran the production stack on AWS (EC2, RDS, S3) and administered PostgreSQL: query tuning, backups and restores",
        "Exploitation de l’infrastructure de production sur AWS (EC2, RDS, S3) et administration de PostgreSQL : optimisation des requêtes, sauvegardes et restaurations",
      ),
      t(
        "Automated batch jobs with Cron and Python, and set up GitLab CI/CD pipelines",
        "Automatisation des traitements par lots (Cron, Python) et mise en place des pipelines CI/CD GitLab",
      ),
    ],
    tags: ["AWS", "PostgreSQL", "Python", "GitLab CI", t("Unit tests", "Tests unitaires")],
  },
  {
    year: "2024",
    kind: "experience",
    range: "2024 — 2025",
    title: t("Software Developer / DevOps Engineer", "Développeur logiciel / Ingénieur DevOps"),
    place: "Groupe CSP · Yaoundé",
    points: [
      t(
        "Deployed and ran 10+ critical apps on production Kubernetes for CNPS and FODECC",
        "Déploiement et exploitation de plus de 10 applications critiques sur Kubernetes en production pour la CNPS et le FODECC",
      ),
      t(
        "Set up Prometheus monitoring and CI/CD with Jenkins and GitHub Actions",
        "Mise en place de la supervision Prometheus et de la CI/CD avec Jenkins et GitHub Actions",
      ),
      t(
        "Added load balancing to keep public services fast under heavy traffic",
        "Répartition de charge pour garder les services publics rapides sous fort trafic",
      ),
    ],
    tags: ["Kubernetes", "Prometheus", "Jenkins", "GitHub Actions"],
  },
  {
    year: "2025",
    kind: "experience",
    range: t("May 2025 — Present", "Mai 2025 — aujourd’hui"),
    title: t("Software Developer", "Développeur logiciel"),
    place: "WAZA Solutions · Douala",
    points: [
      t(
        "Architected WAZALINK, syncing Sage HRM, Sage X3 and the CAPI field app",
        "Architecture de WAZALINK, qui synchronise Sage HRM, Sage X3 et l’application terrain CAPI",
      ),
      t(
        "Built the Integra ↔ Sage 1000 reconciliation engine for 40+ transfer services",
        "Moteur de rapprochement Integra ↔ Sage 1000 pour plus de 40 services de transfert",
      ),
      t(
        "Integrated Sage X3 and Sage Paye for SOREPCO and BLESSING Petroleum",
        "Intégration de Sage X3 et Sage Paie pour SOREPCO et BLESSING Petroleum",
      ),
    ],
    tags: ["Python", "FastAPI", "Sage X3", "SOAP", "Kubernetes"],
  },
  {
    year: "2026",
    kind: "projects",
    range: t("May 2026 — Present", "Mai 2026 — aujourd’hui"),
    title: t("KamJob — co-founder & engineer", "KamJob — cofondateur & ingénieur"),
    place: t("Co-founded product · kamjob.com", "Produit cofondé · kamjob.com"),
    points: [
      t(
        "Designed and built a swipe-to-apply job platform: mobile app, employer dashboard and API",
        "Conception et développement d’une plateforme d’emploi par swipe : appli mobile, espace employeur et API",
      ),
      t(
        "Mobile Money subscriptions and AI-tailored CVs, sent straight to recruiters",
        "Abonnements Mobile Money et CV adaptés par l’IA, envoyés directement aux recruteurs",
      ),
      t(
        "OWASP Top 10 by design; SAST, SCA, secret and container scans plus 300+ tests gate every deploy",
        "OWASP Top 10 dès la conception ; SAST, SCA, détection de secrets, analyse des conteneurs et plus de 300 tests conditionnent chaque déploiement",
      ),
    ],
    tags: ["FastAPI", "Expo", "Next.js", "PostgreSQL", "Claude API"],
  },
];

export const experience = {
  eyebrow: t("Experience", "Parcours"),
  title: t("Education &", "Formation &"),
  em: t("experience.", "expérience."),
  kinds: {
    education: t("Education", "Formation"),
    experience: t("Experience", "Expérience"),
    projects: t("Projects", "Projets"),
  },
  timeline,
  next: {
    year: t("Next", "Ensuite"),
    kind: t("What’s next", "Et maintenant"),
    title: t("Your team?", "Votre équipe ?"),
    text: t(
      "Open to freelance projects and remote roles — products, integrations and applied AI.",
      "Ouvert aux missions freelance et aux postes à distance — produits, intégrations et IA appliquée.",
    ),
    cta: t("Let’s talk", "Discutons"),
  },
};

/* ------------------------------------------------------------ achievements */

export type AchievementIcon = "trophy" | "flag" | "shield" | "spark" | "scale" | "flow";

type Achievement = {
  name: Tr;
  label: Tr;
  description: Tr;
  value: string;
  prefix?: Tr;
  suffix?: string;
  logo?: string;
  icon?: AchievementIcon;
};

const achievementItems: Achievement[] = [
  {
    name: t("Camair-AI Challenge", "Challenge Camair-AI"),
    label: t("Final ranking", "Classement final"),
    description: t(
      "Cameroon Advanced Analytics ultrasound image challenge.",
      "Challenge d’imagerie échographique de Cameroon Advanced Analytics.",
    ),
    value: "5",
    prefix: t("No.", "N°"),
    suffix: "/20",
    icon: "trophy",
  },
  {
    name: t("Kubernetes in production", "Kubernetes en production"),
    label: t("Critical apps deployed", "Applications critiques déployées"),
    description: t(
      "Public services for CNPS and FODECC at Groupe CSP.",
      "Services publics de la CNPS et du FODECC chez Groupe CSP.",
    ),
    value: "10",
    suffix: "+",
    logo: "kubernetes",
  },
  {
    name: t("Reconciliation engine", "Moteur de rapprochement"),
    label: t("Transfer services matched", "Services de transfert rapprochés"),
    description: t(
      "Western Union, MoneyGram, Ria, Orange Money and more.",
      "Western Union, MoneyGram, Ria, Orange Money et d’autres.",
    ),
    value: "40",
    suffix: "+",
    icon: "scale",
  },
  {
    name: t("WAZALINK reliability", "Fiabilité de WAZALINK"),
    label: t("Lost or duplicated records", "Enregistrements perdus ou dupliqués"),
    description: t(
      "A 9-state machine keeps every transfer idempotent through VPN cuts.",
      "Une machine à 9 états garde chaque transfert idempotent malgré les coupures VPN.",
    ),
    value: "0",
    icon: "shield",
  },
  {
    name: t("ERP integration", "Intégration ERP"),
    label: t("Critical flows automated", "Flux critiques automatisés"),
    description: t(
      "Planters, weighings and deactivations over SOAP and REST.",
      "Planteurs, pesées et désactivations en SOAP et REST.",
    ),
    value: "6",
    icon: "flow",
  },
  {
    name: t("Omdena AI projects", "Projets IA Omdena"),
    label: t("Global AI challenges", "Challenges IA internationaux"),
    description: t(
      "Hate-speech detection with NYU, emotion tracking with ThrAIve.",
      "Détection des discours haineux avec NYU, suivi des émotions avec ThrAIve.",
    ),
    value: "2",
    icon: "spark",
  },
];

export const achievements = {
  eyebrow: t("Achievements", "Réalisations"),
  title: t("Proud", "Mes"),
  em: t("moments.", "fiertés."),
  more: t("and counting", "et la suite arrive"),
  getInTouch: t("Get in touch", "Me contacter"),
  items: achievementItems,
};

/* ----------------------------------------------------------------- contact */

export const contact = {
  eyebrow: t("Contact", "Contact"),
  /** The headline: a plain first line, then words that darken as you scroll. */
  lead: t("Let’s build", "Construisons"),
  words: t("something together", "ensemble"),
  blurb: t(
    "Have a product to build, systems to connect or code to secure? Tell me about it — I reply within 24 hours.",
    "Un produit à construire, des systèmes à connecter ou du code à sécuriser ? Parlez-m’en — je réponds sous 24 heures.",
  ),
  copy: t("Copy", "Copier"),
  copied: t("Copied", "Copié"),
  call: t("Book a 20-min call", "Réserver un appel de 20 min"),
  callSubject: t("Intro call", "Premier échange"),
  resume: t("Résumé", "CV"),
  panelLabel: t("Working with me", "Travailler avec moi"),
  panel: [
    { id: "status", label: t("Status", "Statut"), value: t("Taking new projects", "Disponible pour de nouveaux projets") },
    { id: "time", label: t("Local time", "Heure locale"), value: `${profile.city} (${profile.utcOffset})` },
    { id: "reply", label: t("Reply", "Réponse"), value: t("Within 24 hours", "Sous 24 heures") },
    { id: "languages", label: t("Languages", "Langues"), value: t("French · English", "Français · anglais") },
    {
      id: "overlap",
      label: t("Overlap", "En phase avec"),
      value: t("Europe · US East mornings", "L’Europe · les matinées de l’Est américain"),
    },
  ],
  availability: t("Open to freelance & remote roles", "Ouvert aux missions freelance et postes à distance"),
  backToTop: t("Back to top", "Retour en haut"),
  copyrightYear: 2026,
};

/* ---------------------------------------------------------------- lookup */

const site = {
  profile,
  header,
  hero,
  about,
  services,
  work,
  approach,
  security,
  skills,
  experience,
  certifications,
  achievements,
  contact,
};

export type Content = Localized<typeof site>;

const resolved: Record<Locale, Content> = {
  en: localize(site, "en"),
  fr: localize(site, "fr"),
};

/** The whole home page in one language, as plain strings. */
export const getContent = (lang: Locale): Content => resolved[lang];
