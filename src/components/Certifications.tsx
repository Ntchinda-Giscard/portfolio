import type { CSSProperties } from "react";
import type { Content } from "@/content/portfolio";
import { pad } from "@/lib/utils";
import { ArrowUpRight, Eyebrow } from "./ui";
import styles from "./Certifications.module.css";

type Props = { num: string; content: Content["certifications"] };

export default function Certifications({ num, content }: Props) {
  return (
    <section id="certifications" className={`section ${styles.certs}`}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.side}>
          <Eyebrow num={num} label={content.eyebrow} />
          <h2 className="display" data-reveal>
            {content.title}
            <br />
            <em>{content.em}</em>
          </h2>
          <p className={styles.intro} data-reveal>
            {content.intro}
          </p>
          {content.allUrl && (
            <a className={styles.all} href={content.allUrl} target="_blank" rel="noreferrer" data-reveal>
              {content.all} <ArrowUpRight />
            </a>
          )}
        </div>

        <ol className={styles.list}>
          {content.items.map((cert, i) => {
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
