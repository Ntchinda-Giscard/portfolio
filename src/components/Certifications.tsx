import type { CSSProperties } from "react";
import { certifications, certificationsAll, certificationsIntro } from "@/content/portfolio";
import { pad } from "@/lib/utils";
import { ArrowUpRight, Eyebrow } from "./ui";
import styles from "./Certifications.module.css";

export default function Certifications() {
  return (
    <section id="certifications" className={`section ${styles.certs}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.side}>
          <Eyebrow num="04" label="Certifications" />
          <h2 className="display" data-reveal>
            Always
            <br />
            <em>learning.</em>
          </h2>
          <p className={styles.intro} data-reveal>
            {certificationsIntro}
          </p>
          {certificationsAll && (
            <a className={styles.all} href={certificationsAll} target="_blank" rel="noreferrer" data-reveal>
              See all on LinkedIn <ArrowUpRight />
            </a>
          )}
        </div>

        <ol className={styles.list}>
          {certifications.map((cert, i) => {
            const body = (
              <>
                <span className={styles.num}>{pad(i + 1)}</span>
                <span>
                  <span className={styles.title}>{cert.title}</span>
                  <span className={styles.issuer}>{cert.issuer}</span>
                </span>
                <ArrowUpRight className={styles.arrow} />
              </>
            );
            return (
              <li key={cert.title} data-reveal style={{ "--d": i * 60 } as CSSProperties}>
                {cert.url ? (
                  <a className={styles.row} href={cert.url} target="_blank" rel="noreferrer">
                    {body}
                  </a>
                ) : (
                  <div className={styles.row}>{body}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
