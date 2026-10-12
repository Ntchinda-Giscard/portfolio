import Link from "next/link";
import type { ReactNode } from "react";
import type { CaseSection, CaseStudy } from "@/content/case-studies";
import { profile } from "@/content/portfolio";
import { ArrowRight, Shield } from "../ui";
import s from "./case.module.css";

export function CaseHero({ study, visual }: { study: CaseStudy; visual: ReactNode }) {
  return (
    <section className={`container ${s.hero}`}>
      <p className={s.private} data-reveal>
        <Shield /> Case study · Private client project
      </p>
      <h1 className={s.title} data-reveal>
        {study.title}
        <span className={s.tagline}>{study.tagline}</span>
      </h1>
      <div className={s.heroRow}>
        <p className={s.summary} data-reveal>
          {study.summary}
        </p>
        <dl className={s.meta} data-reveal>
          {study.meta.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className={s.visual} data-reveal>
        {visual}
      </div>
    </section>
  );
}

export function CaseBlock({ section, children }: { section: CaseSection; children: ReactNode }) {
  return (
    <section className={`container ${s.section}`}>
      <p className="eyebrow" data-reveal>
        <span className="eyebrow-num">{section.num}</span>
        <span className="eyebrow-rule" aria-hidden="true" />
        <span>{section.label}</span>
      </p>
      <div className={s.sectionHead}>
        <h2 className={`display ${s.sectionTitle}`} data-reveal>
          {section.title} <em>{section.em}</em>
        </h2>
        <p className={s.intro} data-reveal>
          {section.intro}
        </p>
      </div>
      <div className={s.body} data-reveal>
        {children}
      </div>
    </section>
  );
}

export function CaseOutcome({ study }: { study: CaseStudy }) {
  return (
    <section className={`container ${s.section}`}>
      <p className="eyebrow" data-reveal>
        <span className="eyebrow-num">07</span>
        <span className="eyebrow-rule" aria-hidden="true" />
        <span>Outcome</span>
      </p>
      <h2 className={`display ${s.sectionTitle}`} data-reveal>
        In <em>numbers.</em>
      </h2>
      <div className={s.stats} data-reveal>
        {study.stats.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <p className={s.statValue}>
              {stat.prefix && <small>{stat.prefix}</small>}
              {stat.value}
              {stat.suffix && <small>{stat.suffix}</small>}
            </p>
            <p className={s.statLabel}>{stat.label}</p>
          </div>
        ))}
      </div>
      <ul className={s.stack} aria-label="Stack" data-reveal>
        {study.stack.map((tech) => (
          <li key={tech.name}>
            {tech.logo ? (
              // eslint-disable-next-line @next/next/no-img-element -- small local SVG logos
              <img src={`/logos/${tech.logo}.svg`} alt="" width={16} height={16} loading="lazy" />
            ) : (
              <i aria-hidden="true" />
            )}
            {tech.name}
          </li>
        ))}
      </ul>
      <Link href={study.next.href} className={s.next} data-reveal>
        <span>
          <span className={s.nextLabel}>Next case study</span>
          <span className={s.nextTitle} style={{ display: "block" }}>
            {study.next.title}
            <em>{study.next.tagline}</em>
          </span>
        </span>
        <span className={s.nextArrow} aria-hidden="true">
          <ArrowRight />
        </span>
      </Link>
      <footer className={s.footer}>
        <span>© 2026 {profile.fullName}</span>
        <Link href="/#work">Back to all work</Link>
      </footer>
    </section>
  );
}
