import { about, profile } from "@/content/portfolio";
import IdCard from "./IdCard";
import { ArrowDown, ArrowUpRight, Eyebrow } from "./ui";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <Eyebrow num="01" label="About" />
          <h2 className="display" data-reveal>
            Hi, I&apos;m <em>{profile.firstName}.</em>
          </h2>
          <p className={styles.lead} data-reveal>
            {about.lead}
          </p>
          <p className={styles.sub} data-reveal>
            {about.sub}
          </p>
          <div className={styles.actions} data-reveal>
            <a className="btn btn-dark" href={profile.resumeUrl} download>
              Résumé <ArrowDown className="arrow-d" />
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
          <IdCard />
        </div>

        <aside className={styles.facts} aria-label="Quick facts" data-reveal>
          <p className={styles.factsLabel}>Quick facts</p>
          <dl>
            {about.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <blockquote className={styles.quote}>“{about.quote}”</blockquote>
        </aside>
      </div>
    </section>
  );
}
