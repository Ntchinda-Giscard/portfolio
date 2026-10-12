/**
 * Everything the site says lives in this file.
 *
 * Content comes from Ntchinda Giscard's CV, project notes and certificates.
 * Logos live in /public/logos (any .svg dropped there can be referenced by name).
 */

export const profile = {
  /** Shown huge behind the character in the hero, and in "Hi, I'm …". */
  firstName: "Giscard",
  fullName: "Ntchinda Giscard",
  initials: "NG",
  role: ["Full Stack", "Developer"],
  tagline: "Full-stack & AI · Python, LLMs, APIs & cloud",
  description:
    "Ntchinda Giscard is a full-stack & AI developer in Douala, Cameroon, building with Python, FastAPI, React/TypeScript, LLMs and Kubernetes.",
  email: "giscardntchinda@gmail.com",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/Ntchinda-Giscard",
  linkedin: "https://www.linkedin.com/in/ntchinda-giscard-62abb71bb/",
  /** Stacked-alpha intro video (colour on top, matte below) and its first frame. */
  heroVideo: "/hero/intro.mp4",
  heroPoster: "/hero/poster.webp",
  portrait: "/hero/portrait.webp",
};

export const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

export const about = {
  lead:
    "Software engineer with 3 years of experience in full-stack development and applied AI: NLP, LLM fine-tuning, RAG systems, AI information extraction and LLM-generated documents.",
  sub: "I build with Python (FastAPI, Django), React/TypeScript and REST/SOAP APIs, and I ship to the cloud on AWS and Kubernetes.",
  facts: [
    { label: "Based in", value: "Douala, Cameroon" },
    { label: "Degree", value: "Master's · Mechatronics" },
    { label: "Experience", value: "3 years" },
    { label: "Working at", value: "WAZA Solutions" },
    { label: "Focus", value: "Full stack · AI · Cloud" },
  ],
  quote: "From the database to the last pixel.",
  card: {
    id: "NG-0001",
    dept: "Mechatronics",
    validTill: "2027",
    issued: "Portfolio · 2026",
  },
  whatIAm: [
    { title: "Full Stack Developer", detail: "Python · React · TypeScript" },
    { title: "AI & NLP engineer", detail: "LLMs · RAG · LangChain" },
    { title: "Integration builder", detail: "Sage X3 · SOAP · REST" },
    { title: "Cloud & DevOps", detail: "Kubernetes · ArgoCD · AWS" },
    { title: "Master's graduate", detail: "Mechatronics & Intelligent Systems" },
  ],
};

/* ------------------------------------------------------------------ skills */

export type FamilyId = "languages" | "frontend" | "backend" | "databases" | "devops" | "ai";

export const families: { id: FamilyId; label: string }[] = [
  { id: "languages", label: "Languages" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "databases", label: "Databases" },
  { id: "devops", label: "Cloud & DevOps" },
  { id: "ai", label: "AI & NLP" },
];

export type Element = { symbol: string; name: string; family: FamilyId; logo?: string };

/** Order matters: tiles flow left-to-right, eight per row, like a periodic table. */
export const elements: Element[] = [
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
  { symbol: "Ra", name: "REST APIs", family: "backend" },
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
  { symbol: "Ll", name: "LLMs", family: "ai" },
  { symbol: "Ft", name: "Fine-tuning", family: "ai" },
  { symbol: "Rg", name: "RAG", family: "ai" },
  { symbol: "Lc", name: "LangChain", family: "ai", logo: "langchain" },
  { symbol: "Nl", name: "NLP", family: "ai" },
  { symbol: "Tf", name: "TensorFlow", family: "ai", logo: "tensorflow" },
  { symbol: "Hf", name: "Hugging Face", family: "ai", logo: "huggingface" },
  { symbol: "Mo", name: "MLOps", family: "ai" },
];

/* ---------------------------------------------------------------- projects */

export type Tech = { name: string; logo?: string };

export type Project = {
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  features: string[];
  tech: Tech[];
  moreTech: number;
  /** Public link for the button; leave out for private work and set `note` instead. */
  link?: { label: string; href: string };
  note?: string;
  visual: "kamjob" | "integration" | "ledger";
};

export const workIntro = "Three products across AI hiring, ERP integration and finance. Hover a panel to open it.";

export const projects: Project[] = [
  {
    title: "KamJob",
    shortTitle: "KamJob",
    category: "AI hiring · Mobile · Web",
    description:
      "Swipe through job offers in your field like a dating app: one swipe right and your application — CV and cover letter — goes straight to the recruiter.",
    features: ["AI job matching", "CVs tailored by AI", "Automatic applications", "Instant application"],
    tech: [
      { name: "Expo · React Native", logo: "expo" },
      { name: "Node.js", logo: "nodejs" },
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "Valkey" },
      { name: "Kafka", logo: "apachekafka" },
      { name: "LLM APIs" },
    ],
    moreTech: 0,
    link: { label: "Visit kamjob.com", href: "https://kamjob.com" },
    visual: "kamjob",
  },
  {
    title: "WAZALINK",
    shortTitle: "WAZALINK",
    category: "ERP integration · Middleware · Kubernetes",
    description:
      "Middleware that keeps Sage X3, Sage HRM and a field app in sync over SOAP and REST, running on Kubernetes. It replaced a legacy middleware and tracks every transfer so retries never lose or duplicate a record.",
    features: [
      "9-state idempotent pipeline",
      "Retries with exponential backoff",
      "SHA-256 change detection",
      "6 critical business flows",
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
    note: "Client project · private repository",
    visual: "integration",
  },
  {
    title: "LedgerSync",
    shortTitle: "LedgerSync",
    category: "Finance · Desktop · Rules engine",
    description:
      "A desktop reconciliation tool where accountants edit the formulas themselves, with no code change needed. It matches Integra against Sage 1000 across 40+ money-transfer services.",
    features: [
      "Formulas edited by accountants",
      "40+ transfer services matched",
      "Debit/credit balance checks",
      "Two-pass aggregation",
    ],
    tech: [
      { name: "Tauri", logo: "tauri" },
      { name: "React", logo: "react" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Tailwind CSS", logo: "tailwindcss" },
      { name: "Python", logo: "python" },
    ],
    moreTech: 0,
    note: "Client project · private repository",
    visual: "ledger",
  },
];

/* ---------------------------------------------------------- certifications */

export const certificationsIntro = "Certificates across MLOps, machine learning and the web, and still counting.";
export const certificationsAll = "https://www.linkedin.com/in/ntchinda-giscard-62abb71bb/details/certifications/";

/** Add `url` (e.g. a Coursera or LinkedIn Learning credential link) to make a row clickable. */
export const certifications: { title: string; issuer: string; url?: string }[] = [
  {
    title: "MLOps (Machine Learning Operations) Fundamentals",
    issuer: "Google Cloud · Coursera · Sep 2022",
    url: "https://www.coursera.org/account/accomplishments/verify/UQAZ8KUXYKB3",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI & Stanford · Coursera",
    url: "https://www.coursera.org/account/accomplishments/verify/0255XJAWWIP1",
  },
  {
    title: "L'essentiel de JavaScript",
    issuer: "LinkedIn Learning · Aug 2021",
    url: "https://www.linkedin.com/learning/certificates/cc5f5cb828a993ab42cd34649f5e5f5964805b611d49a22f2beadf74d33490d6",
  },
  {
    title: "L'essentiel des CSS",
    issuer: "LinkedIn Learning · Aug 2021",
    url: "https://www.linkedin.com/learning/certificates/00272891dfb3f5c13ca4a585a06d7d23bf02bccbaf84a3e34851fa22d1cda50a",
  },
  {
    title: "L'essentiel du HTML5",
    issuer: "LinkedIn Learning · Aug 2021",
    url: "https://www.linkedin.com/learning/certificates/92ee99caef0d03b9256800af27350dfcd5e2f1d74e1583096190f595b6594ff5",
  },
];

/* -------------------------------------------------------------- experience */

export type TimelineEntry = {
  year: string;
  kind: "Education" | "Experience" | "Projects";
  range: string;
  title: string;
  place: string;
  metric?: { label: string; value: string };
  badge?: string;
  points?: string[];
  tags?: string[];
};

export const timeline: TimelineEntry[] = [
  {
    year: "2022",
    kind: "Projects",
    range: "2022 — 2023",
    title: "Omdena AI challenges",
    place: "With NYU, Dream Space Academy and ThrAIve",
    points: [
      "Built a Tamil hate-speech detection model and API, wired into Dream Space's reporting workflow",
      "Designed the NLP data flow that tracks positive emotions in journal entries",
    ],
    tags: ["NLP", "TensorFlow", "FastAPI", "Hugging Face"],
  },
  {
    year: "2023",
    kind: "Education",
    range: "2023",
    title: "Master's degree",
    place: "Mechatronics & Intelligent Systems",
  },
  {
    year: "2024",
    kind: "Experience",
    range: "2024 — 2025",
    title: "Software Developer / DevOps Engineer",
    place: "Groupe CSP · Yaoundé",
    points: [
      "Deployed and ran 10+ critical apps on production Kubernetes for CNPS and FODECC",
      "Set up Prometheus monitoring and CI/CD with Jenkins and GitHub Actions",
      "Added load balancing to keep public services fast under heavy traffic",
    ],
    tags: ["Kubernetes", "Prometheus", "Jenkins", "GitHub Actions"],
  },
  {
    year: "2025",
    kind: "Experience",
    range: "May 2025 — Present",
    title: "Software Developer",
    place: "WAZA Solutions · Douala",
    points: [
      "Architected WAZALINK, syncing Sage HRM, Sage X3 and the CAPI field app",
      "Built the Integra ↔ Sage 1000 reconciliation engine for 40+ transfer services",
      "Integrated Sage X3 and Sage Paye for SOREPCO and BLESSING Petroleum",
    ],
    tags: ["Python", "FastAPI", "Sage X3", "SOAP", "Kubernetes"],
  },
];

export const whatsNext = {
  title: "Your team?",
  text: "Open to remote roles that mix web apps and applied AI.",
};

/* ------------------------------------------------------------ achievements */

export type Achievement = {
  name: string;
  label: string;
  description: string;
  value: string;
  prefix?: string;
  suffix?: string;
  logo?: string;
  icon?: "trophy" | "flag" | "shield" | "spark" | "scale" | "flow";
};

export const achievements: Achievement[] = [
  {
    name: "Camair-AI Challenge",
    label: "Final ranking",
    description: "Cameroon Advanced Analytics ultrasound image challenge.",
    value: "5",
    prefix: "No.",
    suffix: "/20",
    icon: "trophy",
  },
  {
    name: "Kubernetes in production",
    label: "Critical apps deployed",
    description: "Public services for CNPS and FODECC at Groupe CSP.",
    value: "10",
    suffix: "+",
    logo: "kubernetes",
  },
  {
    name: "Reconciliation engine",
    label: "Transfer services matched",
    description: "Western Union, MoneyGram, Ria, Orange Money and more.",
    value: "40",
    suffix: "+",
    icon: "scale",
  },
  {
    name: "WAZALINK reliability",
    label: "Lost or duplicated records",
    description: "A 9-state machine keeps every transfer idempotent through VPN cuts.",
    value: "0",
    icon: "shield",
  },
  {
    name: "ERP integration",
    label: "Critical flows automated",
    description: "Planters, weighings and deactivations over SOAP and REST.",
    value: "6",
    icon: "flow",
  },
  {
    name: "Omdena AI projects",
    label: "Global AI challenges",
    description: "Hate-speech detection with NYU, emotion tracking with ThrAIve.",
    value: "2",
    icon: "spark",
  },
];

/* ----------------------------------------------------------------- contact */

export const contact = {
  blurb: "Have a role, a project or an idea worth building? My inbox is open — I usually reply within a day.",
  availability: "Open to remote roles",
  copyrightYear: 2026,
};
