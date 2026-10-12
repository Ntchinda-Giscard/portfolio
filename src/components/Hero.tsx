import type { CSSProperties } from "react";
import { profile } from "@/content/portfolio";
import HeroStage from "./HeroStage";
import { ArrowDown, ArrowRight } from "./ui";
import styles from "./Hero.module.css";

export default function Hero() {
  // Size the ghost name to span the stage edge to edge (a capital is ~0.59em wide in this font).
  const ghostSize = Math.min(34, 160 / profile.firstName.length);

  return (
    <section id="top" className={styles.hero} aria-label="Introduction">
      <p className={styles.ghost} aria-hidden="true" style={{ "--ghost": `${ghostSize}vw` } as CSSProperties}>
        {profile.firstName}
      </p>

      <HeroStage video={profile.heroVideo} poster={profile.heroPoster} name={profile.firstName} />

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
          Explore work <ArrowRight className="arrow-r" />
        </a>
        <div className={styles.secondary}>
          <a href="#contact" className="btn btn-ghost btn-sm">
            Let&apos;s talk
          </a>
          <a href={profile.resumeUrl} className="btn btn-ghost btn-sm" download>
            Resume <ArrowDown className="arrow-d" />
          </a>
        </div>
      </div>
    </section>
  );
}
