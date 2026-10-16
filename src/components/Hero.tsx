import type { CSSProperties } from "react";
import type { Content } from "@/content/portfolio";
import HeroStage from "./HeroStage";
import { ArrowDown, ArrowRight } from "./ui";
import styles from "./Hero.module.css";

type Props = { profile: Content["profile"]; content: Content["hero"] };

export default function Hero({ profile, content }: Props) {
  // Size the ghost name to span the stage edge to edge (a capital is ~0.59em wide in this font).
  const ghostSize = Math.min(34, 160 / profile.firstName.length);

  return (
    <section id="top" className={styles.hero} aria-label={content.label}>
      <p className={styles.ghost} aria-hidden="true" style={{ "--ghost": `${ghostSize}vw` } as CSSProperties}>
        {profile.firstName}
      </p>

      <HeroStage
        video={profile.heroVideo}
        poster={profile.heroPoster}
        name={profile.firstName}
        labels={content.stage}
      />

      <div className={styles.copy}>
        <h1 className={styles.title}>
          <span className={styles.kicker}>{profile.fullName}</span>
          <span className={styles.line}>
            <span>{profile.role[0]}</span>
          </span>
          <span className={styles.line}>
            <span>
              {profile.role[1]}
              <span className={styles.dot} aria-hidden="true" />
            </span>
          </span>
        </h1>
        <p className={styles.tagline}>{profile.tagline}</p>
      </div>

      <div className={styles.actions}>
        <a href="#work" className="btn btn-dark">
          {content.explore} <ArrowRight className="arrow-r" />
        </a>
        <div className={styles.secondary}>
          <a href="#contact" className="btn btn-ghost btn-sm">
            {content.talk}
          </a>
          <a href={profile.resumeUrl} className="btn btn-ghost btn-sm" download>
            {content.resume} <ArrowDown className="arrow-d" />
          </a>
        </div>
      </div>
    </section>
  );
}
