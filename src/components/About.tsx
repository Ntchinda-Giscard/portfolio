import type { Content } from "@/content/portfolio";
import IdCard from "./IdCard";
import { ArrowDown, ArrowUpRight, Eyebrow } from "./ui";
import styles from "./About.module.css";

type Props = { num: string; profile: Content["profile"]; content: Content["about"] };

export default function About({ num, profile, content }: Props) {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <Eyebrow num={num} label={content.eyebrow} />
          <h2 className="display" data-reveal>
            {content.hello} <em>{profile.firstName}.</em>
          </h2>
          <p className={styles.lead} data-reveal>
            {content.lead}
          </p>
          <p className={styles.sub} data-reveal>
            {content.sub}
          </p>
          <div className={styles.actions} data-reveal>
            <a className="btn btn-dark" href={profile.resumeUrl} download>
              {content.resume} <ArrowDown className="arrow-d" />
            </a>
            <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight className="arrow-ne" />
            </a>
            <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight className="arrow-ne" />
            </a>
          </div>
        </div>

        <div className={styles.badge}>
          <IdCard profile={profile} card={content.card} traits={content.whatIAm} />
        </div>

        <aside className={styles.facts} aria-label={content.factsLabel} data-reveal>
          <p className={styles.factsLabel}>{content.factsLabel}</p>
          <dl>
            {content.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <blockquote className={styles.quote}>{content.quote}</blockquote>
        </aside>
      </div>
    </section>
  );
}
