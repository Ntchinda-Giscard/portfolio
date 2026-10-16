import Link from "next/link";
import type { ReactNode } from "react";
import type { CaseSection, CaseStudy, CaseUi } from "@/content/case-studies";
import { ArrowRight, Shield } from "../ui";
import s from "./case.module.css";

export function CaseHero({ study, ui, visual }: { study: CaseStudy; ui: CaseUi; visual: ReactNode }) {
  return (
    <section className={`container ${s.hero}`}>
      <p className={s.private} data-reveal>
        <Shield /> {ui.badge}
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

export function CaseOutcome({ study, ui, name }: { study: CaseStudy; ui: CaseUi; name: string }) {
  return (
    <section className={`container ${s.section}`}>
      <p className="eyebrow" data-reveal>
        <span className="eyebrow-num">07</span>
        <span className="eyebrow-rule" aria-hidden="true" />
        <span>{ui.outcome}</span>
      </p>
      <h2 className={`display ${s.sectionTitle}`} data-reveal>
        {ui.numbersTitle} <em>{ui.numbersEm}</em>
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
      <ul className={s.stack} aria-label={ui.stack} data-reveal>
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
          <span className={s.nextLabel}>{ui.next}</span>
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
        <span>© 2026 {name}</span>
        <Link href={ui.workHref}>{ui.backToWork}</Link>
      </footer>
    </section>
  );
}
