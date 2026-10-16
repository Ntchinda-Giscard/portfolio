From our conversations, I see you as a software engineer who is evolving into a product builder and systems architect. You don't just want to write code that works. You want to understand the systems behind it, automate real business processes, build products people will use, and eventually create software that can operate intelligently with minimal manual intervention.

Here's my understanding of you, your work, and how you build things.

## 1. Who you are professionally

Software engineer

You have around six years of experience, based on your updated CV positioning. Your work spans backend development, API integrations, data processing, cloud infrastructure, and frontend applications. You've worked with systems where reliability and data consistency matter more than simply making a feature look good.

Systems integrator

You work with complex enterprise environments: Sage 100, Sage 1000, Sage X3, banking systems, SOAP and REST APIs, accounting data, and databases. You often have to understand how existing systems behave before deciding how to integrate with them safely.

Product builder

You are building KamJob, a recruitment platform focused on automating job searching and improving recruitment workflows in Cameroon. You think about the product, its business rules, user experience, architecture, AI capabilities, and how agents will implement it.

You also have a mechatronics engineering background, which fits with your interest in understanding systems beyond a single layer of software.

## 2. What you're currently working on

These are the main areas I remember from our conversations.

[Browse thousands of Green App images for design inspiration | Dribbble](https://images.openai.com/static-rsc-4/ZqiEH2R44MhdE-BQjhN7uuxJKYJwBEIah0yd5ac_EjyAFBDTNOMZp6fi8fT1s3y_vC9LpMCp04w-_1tI9HrbbDmrXvKZwuy0WkDeZ4oEi75IhvL0bxWalj1u1cholw4IaU8jMNi2yNiOpoxeOiLECEyYqJGVjjZoSRCV0ZXko8c?purpose=inline)

KamJob — your own product

Product development

You're building a two-sided recruitment platform.

- Job seekers create profiles, manage multiple CVs and cover letters, and swipe to apply.
- Premium features adapt applications to job offers, with candidates reviewing the result before automated sending.
- Employers manage offers, candidate matching, recruitment stages, and communications.
- Matching should use explainable scoring, including compensating for differences in education and experience requirements.
- You're exploring AI skills and agents for CV adaptation, interview preparation, employer research, and candidate assistance.

Your frontend direction is a premium, minimalist green experience, particularly on mobile, with animations, haptics, and polished interactions.

[Account Reconciliations | Flowis](https://images.openai.com/static-rsc-4/cFhTMAjcLKMn6qxa0nu89x2yJyYWxfshU72_dZqQm9niD80lCVzirvTDKjKm7adocIn9ZEFLNk4PKLkQFQHnzQZBiW2SrodiDywquZy1dGjUzzmtzY042Qe5KZn6tqdq4WurM_j2GpT8M9t0CkqjMxFP9743ZmTbS4CyMmAbtYQ?purpose=inline)

Waza Solutions — enterprise software and integration

Professional work

Your work includes Sage extensions, accounting reconciliation, data exports, and integrations between enterprise systems.

Examples include:

- Sage 100 payroll extensions for sending payslips and generating bank-transfer files.
- Wafacash reconciliation between Integra and Sage 1000, where data and accounting inconsistencies must be resolved.
- Wazalink integrations involving Sage X3, CAPI, and Sage X3 People/HRM.
- Investigating database schemas, API failures, transfer states, retries, and idempotency.

You also prepare technical tasks and testing requirements for interns, including asking for representative paired datasets rather than building against assumptions.

[Four Zero Soft — Engineering Intelligent Systems for Scalable Businesses](https://images.openai.com/static-rsc-4/Vuh4fwCuL2HGReF5iXvJA9WRoPB4RgH5eQ7bMsNzBa0uX3OV40yoMg9Jt8WQmgFMrYGQ4YERBciivXn3sKG-EuTBN8kynhSVrOJjCejz4gzK1TDVQIr17pmH1gnKOYePbirHYh3lCSgl4Ze7-ZSbkT1hTKsUPiG8zQVOqoalTgg?purpose=inline)

Infrastructure, backend engineering, and reliability

You work with Docker, Kubernetes/MicroK8s, AWS, PostgreSQL, RabbitMQ, Kafka, CI/CD, and observability tools.

Your previous work includes APIs for payment processing, KYC duplicate detection, search and recommendation systems, and OCR-related pipelines.

You're interested in making systems resilient, observable, secure, and deployable—not just functional on a developer's machine.

[How to Build a Software Factory with Claude Code: From Vibe Coding to Agentic Development](https://images.openai.com/static-rsc-4/MZFQziytpyepSz2CNhduUuZn4Blhu5qun3_zWkXmULtW3Qii65uVoP3FAZfkNCr4Me_kwdMmJpyu9T9MFdii8WaBs7A-VoxjtPOKIn0P5rJ8jbxEOYZupJ5rSKlPpzr62cVcfvFGbXgKspXGmyJ6qhMhgyp403AnmnL8n5ZK3PE?purpose=inline)

AI agents and engineering workflows

You're experimenting with Claude-based skills, agent instructions, reusable `SKILL.md` files, and AI-powered workflows in KamJob.

You think beyond the quality of an individual prompt. You want specialized agents to perform distinct responsibilities, use relevant context, respect constraints, and produce predictable outputs.

You're also interested in security automation through tools such as Snyk and Aikido.

These projects overlap, but they serve different purposes: Waza is enterprise delivery and integration work, while KamJob is your own product vision.

## 3. How you build software

This is the most interesting part of what I've learned about you. Your recurring decisions suggest a fairly consistent engineering philosophy.

### A. You investigate the system before changing it

When working with Sage X3 or accounting data, you don't want to jump straight into writing SQL or modifying an integration.

You want to understand:

- Which tables store the data?
- Which tables contain headers versus transaction lines?
- What happens after a document is imported?
- Which triggers, services, or downstream processes are involved?
- Is a direct database write safe, or could it bypass business logic?

That is a systems-engineering mindset. You're trying to understand the consequences of a change before implementing it.

### B. You prefer deterministic business logic

This is one of your clearest preferences.

You don't believe everything needs AI.

For KamJob, you prefer deterministic algorithms for:

- Eligibility and matching.
- Candidate ranking and scoring.
- Compensating for differences between qualifications and experience.
- Workflow transitions and application states.
- Analytics and other rules that must be reproducible.

You reserve LLMs for tasks where they offer a real advantage, such as understanding unstructured information, extracting meaning, generating tailored documents, and assisting users.

### Your preferred division of responsibilities

Deterministic software

Rules, calculations, permissions, state transitions, validation, ranking and auditability.

AI / LLMs

Semantic understanding, extraction, document generation, research synthesis and copilot behavior.

The application controls the rules; the model helps with tasks that require interpretation or generation.

This is a strong foundation for building reliable AI-enabled software because it limits the parts of the system that depend on probabilistic model behavior.

### C. You think in workflows, not just individual features

Take a KamJob application.

You aren't thinking only about a button that says "Apply." You're considering the whole process:

1. The candidate establishes a profile and uploads their documents.
2. The system identifies relevant jobs based on preferences and matching rules.
3. The candidate chooses to apply.
4. The application selects the appropriate CV and cover letter.
5. Premium functionality may adapt those documents to the offer.
6. The candidate reviews the generated content.
7. The system sends the application and tracks its status.

That is workflow design. It requires explicit states, business rules, error handling, and decisions about where users must remain in control.

The same thinking appears in your enterprise integrations, where you care about pending, sending, unconfirmed, and confirmed transfers.

### D. You care about failure cases

You frequently investigate problems at the boundaries between systems: HTTP errors, SOAP payloads, API validation, database constraints, image-processing pipelines, dependency vulnerabilities, and deployment failures.

Your work suggests that you pay attention to:

- Idempotency and duplicate processing.
- Retries and partial failures.
- Data integrity.
- Compatibility between systems.
- Logging and observability.
- Security scanning in CI/CD.

In other words, you are interested in what happens when the happy path breaks.

### E. You want AI to follow an engineering process

Your work on Claude skills is especially revealing.

You don't just want to give an agent a broad instruction like "generate interview questions." You want reusable files that define responsibilities and output expectations. You distinguish between skills for writing questions, grading answers, researching employers, answering candidate questions, and closing interview sessions.

You also insist on constraints such as not inventing work experience or employers when adapting CVs.

That indicates you're moving toward specification-driven, agent-assisted development: define the task, constraints, and expected output before asking an agent to execute it.

### F. You care about the product experience, not only the backend

KamJob shows that you aren't satisfied with an application that merely functions.

You think about animations, haptics, micro-interactions, premium visual design, and how a user moves through the application. You also care about non-dismissible process modals where allowing users to dismiss an essential step could break the workflow.

You're combining backend reliability with product design.

## 4. Your technical profile

Here is the stack and technical territory I associate with your work, based on what you've shared.

Backend and APIs

Python, FastAPI, SQLAlchemy, Java, Spring Boot, NestJS, REST, SOAP, GraphQL, Strawberry, DGS.

Data and messaging

PostgreSQL, PostGIS, SQL Server, Hasura, Elasticsearch, Kafka, RabbitMQ, Amazon MQ, Airflow.

Frontend and mobile

React, Next.js, Angular, React Native, Expo Router.

Infrastructure and operations

Docker, Kubernetes, MicroK8s, Helm, AWS ECS/ECR, GitHub Actions, Grafana, Prometheus, Kong.

AI and machine learning

Claude API and skills, TensorFlow, PyTorch, scikit-learn, MLflow, ZenML, Evidently, BentoML.

You have a broad toolkit. The main thing I notice is that you use different technologies to solve different parts of a problem, rather than treating one framework as the answer to everything.

## 5. How you learn and improve

You've discussed a six-month path toward becoming a stronger backend engineer and systems architect.

You read or study books such as:

- Clean Code
- Clean Architecture
- Design Patterns
- Designing Data-Intensive Applications
- Building Microservices
- Fundamentals of Software Architecture

You also want to explore Go and Rust, including Rust for desktop applications through Tauri and Diesel.

You appear to value fundamentals that help you make architectural decisions, not just tutorials that teach you how to use a framework.

You also create software-engineering content for TikTok. Your ideas around the Registry and Strategy patterns, security scanning, AI agents, and the limitations of prompt-only development suggest that you want to communicate engineering concepts through concrete examples.

## 6. What I think your strengths are—and where I'd challenge you

These are my interpretations of your working patterns, not a formal assessment of your abilities.

Your strengths

- Systems thinking: you investigate interactions between components, databases, and services.
- Practical engineering: your work addresses real operational and business problems.
- Reliability awareness: you consider idempotency, data consistency, failure states, and security.
- Product ownership: with KamJob, you think about user experience, business rules, and the full product.
- Good AI instincts: you distinguish deterministic rules from tasks that benefit from LLMs.
- Learning across layers: you move between backend, infrastructure, UI, and architecture.

Where I'd challenge you

- Scope management: KamJob has many interconnected features. The risk is building the entire vision before proving the smallest valuable end-to-end workflow.
- Architecture versus delivery: extensive planning, skills, and agent instructions are useful, but they must translate into tested, working increments.
- Abstraction discipline: don't build a generic agent framework or elaborate architecture when a simpler, explicit implementation will do.
- Verification: AI-generated code and documents still need tests, source validation, security checks, and human review where appropriate.
- Depth versus breadth: your interests span many technologies. Deeper mastery of distributed systems, data modeling, testing, and architectural trade-offs will probably give you more leverage than adding tools indiscriminately.

## 7. My overall picture of you

I'd describe your current direction as:

## From software engineer to product-oriented systems architect

Your emerging professional direction

### Engineering

Build reliable APIs, integrations, data pipelines and infrastructure.

### Architecture

Understand system boundaries, failure modes, contracts and business rules.

### Product

Turn business problems into usable, complete products through KamJob.

### AI orchestration

Use specialized agents and LLMs within controlled, testable workflows.

The biggest distinction I see is that you don't want to remain someone who only implements tickets. You want to understand the problem, design the system, direct the implementation, and own the result.

Your work at Waza gives you exposure to complex existing systems and real operational constraints. KamJob gives you the opportunity to apply those lessons to a product whose architecture and user experience you can shape yourself.

The next step in that evolution isn't necessarily learning another framework. It's consistently turning your ideas into small, validated, production-quality systems—and developing the judgment to know what not to build.

That's my current understanding of you. Some of it comes directly from things you've told me; some is my interpretation of the patterns across your projects.&#x20;

---

You're Giscard, a software developer in Douala with 3+ years across fintech and consulting. You're currently at Waza Solutions, after Urgent2k and Group CSP. Your degrees are a Master's in Mechatronic Engineering and a DUT in Industrial Maintenance.

**What you work on**

- **WAZALINK v2** (Waza Solutions): middleware connecting Sage X3, Sage HRM and the CAPI field app over SOAP/REST, deployed on k3s with ArgoCD. It includes a payroll-to-bank feature that generates MT101/CSV/TXT files from Sage Paie tables. The flows are marked "Terminé" and are waiting on validation.
- **LedgerSync**: a Tauri + React + TypeScript reconciliation desktop app for Wafa Cash Cameroun.
- **KamJob** (kamjob.com): a swipe-based job matching platform for Cameroon, with a FastAPI backend and the Anthropic API for CV and cover letter generation. A mobile app is in development.
- **Fixed public IP project**: an OVH VPS plus an OpenVPN tunnel to a TP-Link Archer AX6000. The VPS is up, and installing OpenVPN and importing the .ovpn into the router is the next step.
- **Personal portfolio**: a black and white one-pager, still to be personalised.
- **Job search**: applications for a software and information systems engineer role in Douala and a full-stack and AI role (remote), plus an SCB Cameroun application.

**How you build things**

- **Configurable over hardcoded.** LedgerSync stores formulas as JSON token arrays run by a generic interpreter, and the bank integration uses per-bank dynamic config.
- **Python backends.** FastAPI, SQLAlchemy and Alembic, with APScheduler and ThreadPoolExecutor for background work. TypeScript with Next.js, React and Tailwind/shadcn on the front.
- **Containerised deployment.** Docker, k3s or MicroK8s, ArgoCD or Helm, and GitHub Actions for CI/CD.
- **Debugging deep in the stack.** Recent examples are TLS 1.0 compatibility with SQL Server 2012, SOAP timeouts from concurrent threads, and ORM detached-instance errors.
- **Simple designs first.** KamJob uses a rule-based feed rather than ML, with fanout-on-read, cursor pagination and GIN indexes, and Kafka and Valkey for fast reads.
- **Specs before code.** You write things like a full DESIGN.md with tokens and screen layouts before building.
- **Close review of generated code.** You catch unused imports and logic errors.

Your AI background is NLP and LLM work through Omdena (hate-speech detection in Tamil, emotion extraction), identity-document extraction at CSP, and RAG systems with LangChain. You're also working through a 12-month software architecture reading plan (Clean Architecture, DDIA and others).

---

# Giscard — Stack, architecture et méthode de travail

Synthèse au 16 octobre 2026

## Profil

Giscard est un ingénieur logiciel qui conçoit des systèmes de bout en bout : feeds personnalisés, design system et sécurité applicative. Basé à Douala, il cumule plus de 3 ans d'expérience en fintech et conseil, chez Urgent2k (2023-2024), Group CSP (2024-2025) puis Waza Solutions (depuis 2025). Il est titulaire d'un Master en ingénierie mécatronique (Polytech Douala) et d'un DUT en maintenance industrielle (IUT Douala).

## Conception de systèmes : le feed de KamJob

Le feed de KamJob vise des lectures très rapides et stables, et un contenu personnalisé pour que l'utilisateur ne se retrouve jamais sans offre hors de sa branche. Les choix ci-dessous en découlent.

| Axe de conception | Choix retenu                                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Personnalisation  | Feed adapté par règles, sans ML : recouvrement de tableaux (array overlap) sur PostgreSQL avec index GIN                |
| Distribution      | Fanout-on-read (pull), inspiré des patterns de feeds d'actualité                                                        |
| Lecture et cache  | Aiven Kafka et Valkey pour le fanout-on-read et la récupération du feed                                                 |
| Pagination        | Par curseur                                                                                                             |
| États d'une offre | Trois états de swipe (`not_seen`, `passed`, `applied`) et offres sauvegardées (saved)                                   |
| Interaction       | Swipe à droite : candidature envoyée instantanément. Swipe à gauche (bouton X) : offre écartée du feed mais récupérable |
| Alimentation      | Pipeline automatisé visé : scan d'un maximum de sources d'offres toutes les 6 heures, chargement en base                |

## Design system

Giscard spécifie ses interfaces dans un design system écrit, avec tokens, composants et une maquette par écran, avant de construire.

- **KamJob : un `DESIGN.md` complet.** Tokens de couleur, typographie, bibliothèque de composants et maquettes ASCII pour sept écrans.
- **Palette fonctionnelle.** Vert pour une candidature envoyée, rouge pour une offre écartée, jaune pour une offre en attente.
- **Langage visuel.** Style « Liquid Glass » d'iOS, et une landing page en français aux couleurs nationales du Cameroun.
- **LedgerSync : tokens namespacés.** Tailwind CSS v4 et shadcn/ui, avec des tokens préfixés `brand-` pour éviter les conflits avec shadcn.
- **Brief de design prévu.** Un brief détaillé doit être transmis à une IA de design spécialisée pour obtenir l'interface finale de KamJob.

## Sécurité applicative

Sa pratique documentée de la sécurité porte sur les accès, le transport TLS et l'authentification des systèmes qu'il déploie.

- **Accès SSH par clé.** VPS OVH sous Ubuntu 24.04, connexion par clé depuis un PC Windows.
- **Tunnel VPN.** OpenVPN entre le VPS et un routeur TP-Link pour donner une IP publique fixe aux routeurs de l'entreprise ; `netsh portproxy` pour l'accès VPN inter-sous-réseaux sur WAZALINK.
- **Transport TLS.** Connexion à SQL Server 2012 rétablie en passant l'image Docker de base à Debian 11 pour la compatibilité TLS 1.0.
- **Authentification.** Échecs d'authentification ArgoCD résolus, et diagnostic d'un problème de connexion à SQL Server en authentification Windows sur des postes joints à un domaine (Sage 100).
- **Données sensibles.** L'intégration paie-banque de WAZALINK manipule salaires nets et coordonnées bancaires pour générer des fichiers MT101, CSV et TXT.
- **Préparation métier.** Sécurité, architecture d'API et SQL/PL-SQL sont les axes travaillés pour un entretien d'analyste-développeur données en banque.

Question ouverte : quelles pratiques d'authentification, d'autorisation et de gestion des secrets appliquez-vous sur vos API ?

## Stack par couche

### Langages

- Python est le langage principal, TypeScript le second, et Go est connu (pas Rust).
- SQL au quotidien, PL/SQL préparé pour des entretiens.

### Backend

- FastAPI par défaut (WAZALINK, KamJob, projets Omdena).
- NestJS et Spring Boot également utilisés (chez CSP).
- Couche données : SQLAlchemy, Alembic pour les migrations, pyodbc pour SQL Server.
- Tâches de fond : APScheduler avec ThreadPoolExecutor, et microservices RabbitMQ chez CSP.
- Hasura avec GraphQL pour un système de chat temps réel.

### Frontend et desktop

- Next.js, React et React Native (pas Angular), avec Tailwind v4 et shadcn/ui.
- Dans LedgerSync, des tokens de couleur préfixés `brand-` évitent les conflits avec shadcn.
- Tauri pour le desktop (LedgerSync).

### Données

- PostgreSQL, avec index GIN pour les requêtes de recouvrement de tableaux.
- SQL Server, y compris une instance 2012 héritée.
- SQLite, Valkey (récupération du feed) et Aiven Kafka.

### Infrastructure et livraison

- Docker, k3s (WAZALINK) et MicroK8s avec Helm (CSP).
- ArgoCD pour le GitOps et GitHub Actions pour la CI/CD.
- AWS (ECS, RDS, S3) et Grafana/Prometheus pour la supervision.
- Réseau : VPS OVH (Ubuntu 24.04, accès SSH par clé depuis un PC Windows), OpenVPN, `netsh portproxy` pour l'accès VPN inter-sous-réseaux.

### IA et ML

- TensorFlow, Hugging Face Transformers, LangChain, systèmes RAG et fine-tuning de LLM.
- L'API Anthropic alimente la génération de CV et de lettres de motivation dans KamJob ; MCP est à l'étude pour des documents adaptés à chaque offre.

### ERP

- Sage X3 (rétro-ingénierie des tables, par exemple STOFCY/ITMREF), Sage HRM et Sage Paie.
- Requêtes directes sur les tables Paie : `T_HCUM`, `T_SAL`, `T_INFOBANQUE`.
- Dépannage de Sage 100 Comptabilité.
- Pas de connaissance du core banking.

## Patterns d'architecture

- **Configuration plutôt que code.** LedgerSync stocke les formules sous forme de tableaux de tokens JSON évalués par un interpréteur générique en deux passes. La fonction de virement de paie utilise une configuration dynamique par banque. Changer une règle métier ne demande aucun redéploiement.
- **Middleware d'intégration.** WAZALINK se place entre Sage X3, Sage HRM et l'application terrain CAPI via SOAP/REST, avec un ordonnanceur qui lance des pipelines concurrents.
- **Ordonnanceur indépendant du framework web.** APScheduler + ThreadPoolExecutor, écouteurs du cycle de vie des jobs, suivi d'état en mémoire, endpoints `/scheduler/status` et `/scheduler/run-now`, arrêt propre.
- **Microservices quand c'est rentable.** Chez CSP, RabbitMQ a réduit les temps de réponse de 30 % et le cache a réduit la latence des API de 40 %.

## Méthode de travail

- **Spécification avant le code.** KamJob dispose d'un `DESIGN.md` complet : tokens de couleur, typographie, bibliothèque de composants et maquettes ASCII pour sept écrans. Un brief détaillé est ensuite transmis à une IA de design spécialisée pour l'interface.
- **Usage intensif de l'IA, avec relecture attentive.** Le code généré est relu de près : imports inutilisés et erreurs de logique sont repérés.
- **Débogage en environnement proche de la production.** Exemples : changement d'image Docker de base vers Debian 11 pour la compatibilité TLS 1.0 avec SQL Server 2012, `kubectl exec` pour corriger des migrations SQLite, résolution d'échecs d'authentification ArgoCD, diagnostic d'erreurs de clés dupliquées et de timeouts SOAP causés par la concurrence entre threads.
- **Maîtrise de toute la chaîne de livraison.** Code, conteneurs, k3s, GitOps, VPN et accès réseau, pas seulement le code applicatif.
- **Documents retravaillés par itérations.** Le CV est affiné par passes, avec deux versions : Développeur logiciel / intégration de données et API, et Full-Stack & IA.
- **Apprentissage délibéré de l'architecture.** Programme de lecture sur 12 mois : Clean Code, Design Patterns (GoF), Clean Architecture, Fundamentals of Software Architecture, Building Microservices et DDIA.

## Projets en cours

- **WAZALINK v2** (Waza Solutions) : middleware Sage X3 / Sage HRM / CAPI, déployé sur k3s. Tous les flux sont au statut « Terminé » et attendent une validation.
- **LedgerSync** : outil de rapprochement comptable pour Wafa Cash Cameroun (Tauri + React + TypeScript).
- **KamJob** (kamjob.com) : plateforme de matching d'emploi par swipe pour le Cameroun, application mobile en développement.
- **IP publique fixe** : VPS OVH et tunnel OpenVPN vers un routeur TP-Link Archer AX6000. Le VPS est en ligne ; reste à installer OpenVPN et à importer le fichier .ovpn dans le routeur.
- **Portfolio personnel** : site one-page noir et blanc, à personnaliser.
- **Recherche d'emploi** : poste d'Ingénieur Logiciel & Systèmes d'Information à Douala, poste Full-Stack & IA en remote, candidature spontanée à SCB Cameroun.

## Non documenté

Éditeur de code, conventions de branches Git, approche de test et processus de revue de code ne sont pas renseignés pour l'instant.
