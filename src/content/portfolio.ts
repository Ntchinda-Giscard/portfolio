/**
 * Everything the site says lives in this file.
 *
 * Replace the sample values below with your own details — names, facts,
 * projects, certificates, dates and numbers — before you publish.
 * Logos live in /public/logos (any .svg dropped there can be referenced by name).
 */

export const profile = {
  /** Shown huge behind the character in the hero, and in "Hi, I'm …". */
  firstName: "Giscard",
  fullName: "Ntchinda Giscard",
  initials: "NG",
  role: ["Full Stack", "Developer"],
  tagline: "Creative developer · AI & web technology",
  email: "hello@yourdomain.com",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-username",
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
    "Motivated Full Stack Developer skilled in building scalable applications with React, Node.js, and modern backend technologies. Strong in API development, system design, and problem solving.",
  sub: "I work across frontend, backend, AI, APIs, databases, and creative web development.",
  facts: [
    { label: "Based in", value: "City, Country" },
    { label: "Studying", value: "B.Sc. Computer Science" },
    { label: "Batch", value: "2022 – 2026" },
    { label: "Interned at", value: "Company · 2025" },
    { label: "Focus", value: "Full stack · AI · Web" },
  ],
  quote: "From the database to the last pixel.",
  card: {
    id: "NG-0001",
    dept: "Computer Sci.",
    validTill: "2027",
    issued: "Portfolio · 2026",
  },
  whatIAm: [
    { title: "Full Stack Developer", detail: "React · Node.js · Modern backends" },
    { title: "Computer Science undergrad", detail: "B.Sc. · Final year" },
    { title: "Problem solver", detail: "1,000+ problems solved" },
    { title: "AI & web builder", detail: "Three shipped products" },
    { title: "Team player", detail: "Hackathons · Open source" },
  ],
};

/* ------------------------------------------------------------------ skills */

export type FamilyId = "languages" | "frontend" | "backend" | "databases" | "tools" | "core";

export const families: { id: FamilyId; label: string }[] = [
  { id: "languages", label: "Languages" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "databases", label: "Databases" },
  { id: "tools", label: "Tools" },
  { id: "core", label: "Core" },
];

export type Element = { symbol: string; name: string; family: FamilyId; logo?: string };

/** Order matters: tiles flow left-to-right, eight per row, like a periodic table. */
export const elements: Element[] = [
  { symbol: "C++", name: "C++", family: "languages", logo: "cplusplus" },
  { symbol: "Jv", name: "Java", family: "languages", logo: "java" },
  { symbol: "Py", name: "Python", family: "languages", logo: "python" },
  { symbol: "Js", name: "JavaScript", family: "languages", logo: "javascript" },
  { symbol: "Ts", name: "TypeScript", family: "languages", logo: "typescript" },
  { symbol: "Re", name: "React.js", family: "frontend", logo: "react" },
  { symbol: "Nx", name: "Next.js", family: "frontend", logo: "nextjs" },
  { symbol: "Ht", name: "HTML", family: "frontend", logo: "html5" },
  { symbol: "Cs", name: "CSS", family: "frontend", logo: "css3" },
  { symbol: "Tw", name: "Tailwind CSS", family: "frontend", logo: "tailwindcss" },
  { symbol: "No", name: "Node.js", family: "backend", logo: "nodejs" },
  { symbol: "Ex", name: "Express.js", family: "backend", logo: "express" },
  { symbol: "Ra", name: "REST APIs", family: "backend" },
  { symbol: "Fa", name: "FastAPI", family: "backend", logo: "fastapi" },
  { symbol: "Mg", name: "MongoDB", family: "databases", logo: "mongodb" },
  { symbol: "Pg", name: "PostgreSQL", family: "databases", logo: "postgresql" },
  { symbol: "My", name: "MySQL", family: "databases", logo: "mysql" },
  { symbol: "Fb", name: "Firebase", family: "databases", logo: "firebase" },
  { symbol: "Dk", name: "Docker", family: "tools", logo: "docker" },
  { symbol: "Gt", name: "Git", family: "tools", logo: "git" },
  { symbol: "Rd", name: "Redis", family: "tools", logo: "redis" },
  { symbol: "Pm", name: "Postman", family: "tools", logo: "postman" },
  { symbol: "Fg", name: "Figma", family: "tools", logo: "figma" },
  { symbol: "Vc", name: "Vercel", family: "tools", logo: "vercel" },
  { symbol: "Ds", name: "Data Structures", family: "core" },
  { symbol: "Al", name: "Algorithms", family: "core" },
  { symbol: "Op", name: "OOP", family: "core" },
  { symbol: "Sd", name: "System Design", family: "core" },
  { symbol: "Ad", name: "API Design", family: "core" },
  { symbol: "Ai", name: "Artificial Intelligence", family: "core" },
  { symbol: "Ml", name: "Machine Learning", family: "core" },
  { symbol: "Dt", name: "Data Science", family: "core" },
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
  link: string;
  visual: "document" | "heatmap" | "closet";
};

export const workIntro = "Three products across AI, ML operations and fashion tech. Hover a panel to open it.";

export const projects: Project[] = [
  {
    title: "ClauseWise AI",
    shortTitle: "ClauseWise AI",
    category: "Legal intelligence · Web · Desktop · Mobile",
    description:
      "AI-powered platform that reads privacy policies and legal contracts, scores their risk and explains every flag in plain language across web, desktop and mobile.",
    features: ["Risk detection", "AI risk scoring", "Privacy alerts", "Cross-platform experience"],
    tech: [
      { name: "React.js", logo: "react" },
      { name: "React Native", logo: "react" },
      { name: "Electron.js", logo: "electron" },
      { name: "Node.js", logo: "nodejs" },
      { name: "Express.js", logo: "express" },
      { name: "MongoDB Atlas", logo: "mongodb" },
      { name: "OpenAI API" },
      { name: "Prompt Engineering" },
    ],
    moreTech: 5,
    link: "https://github.com/your-username/clausewise-ai",
    visual: "document",
  },
  {
    title: "Software Release Risk Heatmap",
    shortTitle: "Release Risk Heatmap",
    category: "ML operations · Random forest",
    description:
      "Full-stack ML platform using a Random Forest model to classify software releases by risk level and visualise that risk across teams and modules.",
    features: [
      "Release risk classification",
      "Real-time risk monitoring",
      "Interactive heatmap dashboard",
      "Team × module view",
    ],
    tech: [
      { name: "React.js", logo: "react" },
      { name: "TypeScript", logo: "typescript" },
      { name: "Tailwind CSS", logo: "tailwindcss" },
      { name: "Node.js", logo: "nodejs" },
      { name: "Express.js", logo: "express" },
      { name: "Python", logo: "python" },
      { name: "FastAPI", logo: "fastapi" },
      { name: "scikit-learn", logo: "scikitlearn" },
    ],
    moreTech: 3,
    link: "https://github.com/your-username/release-risk-heatmap",
    visual: "heatmap",
  },
  {
    title: "Closet Studio",
    shortTitle: "Closet Studio",
    category: "Fashion tech · Mobile · AI styling",
    description:
      "A social wardrobe app: digitise your closet, get AI outfit suggestions for the day and shop looks from the creators you follow.",
    features: ["Virtual closet", "AI outfit builder", "Creator lookbooks", "Shoppable posts"],
    tech: [
      { name: "React Native", logo: "react" },
      { name: "Expo", logo: "expo" },
      { name: "Node.js", logo: "nodejs" },
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "Supabase", logo: "supabase" },
      { name: "Redis", logo: "redis" },
      { name: "Vision API" },
    ],
    moreTech: 2,
    link: "https://github.com/your-username/closet-studio",
    visual: "closet",
  },
];

/* ---------------------------------------------------------- certifications */

export const certificationsIntro = "8 certifications across databases, cloud, languages and data science.";

/** Add `url` (e.g. a Credly or Coursera credential link) to make a row clickable. */
export const certifications: { title: string; issuer: string; url?: string }[] = [
  { title: "MongoDB Certified Associate Developer", issuer: "MongoDB" },
  { title: "GitHub Foundations", issuer: "GitHub · Microsoft" },
  { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services" },
  { title: "Responsive Web Design", issuer: "freeCodeCamp" },
  { title: "Python & Introduction to Data Science", issuer: "Cisco Networking Academy" },
  { title: "Java Foundations", issuer: "Oracle Certified Foundations Associate" },
  { title: "JavaScript Essentials 1 & 2", issuer: "Cisco Networking Academy" },
  { title: "Google Cloud Career Launchpad — Data Analytics Track", issuer: "Google Cloud" },
];

/* -------------------------------------------------------------- experience */

export type TimelineEntry = {
  year: string;
  kind: "Education" | "Experience";
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
    year: "2020",
    kind: "Education",
    range: "2020 — 2022",
    title: "High School Diploma (Science)",
    place: "Your High School · City",
    metric: { label: "Score", value: "16.4 / 20" },
  },
  {
    year: "2022",
    kind: "Education",
    range: "2022 — 2026",
    title: "B.Sc. in Computer Science",
    place: "Your University",
    metric: { label: "GPA", value: "3.8 / 4" },
    badge: "Department Topper",
  },
  {
    year: "2025",
    kind: "Experience",
    range: "Jun — Sep 2025",
    title: "Full Stack Development Intern",
    place: "Company Name",
    points: ["Built web and mobile features with React Native", "Shipped REST APIs with Node.js and Express"],
    tags: ["React Native", "Full Stack", "Web", "Mobile"],
  },
];

export const whatsNext = {
  title: "Your team?",
  text: "Open to full-stack roles and ambitious products.",
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
  icon?: "trophy" | "flag";
};

export const achievements: Achievement[] = [
  { name: "LeetCode", label: "Problems solved", description: "Algorithms and daily practice.", value: "450", suffix: "+", logo: "leetcode" },
  { name: "CodeChef", label: "Problems solved", description: "Competitive programming across contests and practice.", value: "500", suffix: "+", logo: "codechef" },
  { name: "GeeksforGeeks", label: "Problems solved", description: "Core CS concepts and interview-style problems.", value: "280", suffix: "+", logo: "geeksforgeeks" },
  { name: "HackerRank", label: "Stars earned", description: "Stars earned across problem-solving domains.", value: "20", suffix: "+", logo: "hackerrank" },
  { name: "Department Topper", label: "Computer Science department", description: "Ranked first in the cohort.", value: "1", prefix: "No.", icon: "trophy" },
  { name: "National Hackathon 2026", label: "Team finish", description: "Built Closet Studio in 36 hours.", value: "100", prefix: "Top", icon: "flag" },
];

/* ----------------------------------------------------------------- contact */

export const contact = {
  blurb: "Have a role, a project or an idea worth building? My inbox is open — I usually reply within a day.",
  availability: "Available for new opportunities",
  copyrightYear: 2026,
};
