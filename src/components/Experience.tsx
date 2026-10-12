"use client";

import { useRef } from "react";
import { timeline, whatsNext } from "@/content/portfolio";
import { useScrollFrame } from "@/lib/hooks";
import { clamp, cx } from "@/lib/utils";
import { ArrowRight, Eyebrow, Star } from "./ui";
import styles from "./Experience.module.css";

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);

  // The rail fills in as the timeline scrolls past the middle of the screen.
  useScrollFrame(() => {
    const el = lineRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const progress = clamp((window.innerHeight * 0.55 - rect.top) / rect.height);
    el.style.setProperty("--progress", progress.toFixed(4));
  });

  return (
    <section id="experience" className={cx("section", styles.experience)}>
      <div className="container">
        <Eyebrow num="05" label="Experience" />
        <h2 className="display" data-reveal>
          Education &amp; <em>experience.</em>
        </h2>

        <div ref={lineRef} className={styles.timeline}>
          <span className={styles.rail} aria-hidden="true">
            <span className={styles.fill} />
          </span>
          <ol>
            {timeline.map((entry, i) => (
              <li key={entry.title} className={styles.item} data-side={i % 2 === 0 ? "left" : "right"}>
                <p className={styles.year} data-reveal>
                  {entry.year}
                </p>
                <span className={styles.dot} aria-hidden="true" />
                <article className={styles.card} data-reveal>
                  <div className={styles.cardTop}>
                    <span className={entry.kind === "Experience" ? styles.kindPill : styles.kind}>{entry.kind}</span>
                    <span className={styles.range}>{entry.range}</span>
                  </div>
                  <h3 className={styles.title}>{entry.title}</h3>
                  <p className={styles.place}>{entry.place}</p>
                  {entry.points && (
                    <ul className={styles.points}>
                      {entry.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                  {(entry.metric || entry.badge) && (
                    <div className={styles.metaRow}>
                      {entry.metric && (
                        <p className={styles.metric}>
                          <span>{entry.metric.label}</span> {entry.metric.value}
                        </p>
                      )}
                      {entry.badge && (
                        <span className={styles.badge}>
                          <Star /> {entry.badge}
                        </span>
                      )}
                    </div>
                  )}
                  {entry.tags && (
                    <ul className={styles.tags}>
                      {entry.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            ))}

            <li className={styles.item} data-side={timeline.length % 2 === 0 ? "left" : "right"}>
              <p className={cx(styles.year, styles.nextYear)} data-reveal>
                Next
              </p>
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.nextCard} data-reveal>
                <p className={styles.kind}>What&apos;s next</p>
                <h3 className={styles.title}>{whatsNext.title}</h3>
                <p className={styles.place}>{whatsNext.text}</p>
                <a href="#contact" className="btn btn-dark btn-sm">
                  Let&apos;s talk <ArrowRight className="arrow-r" />
                </a>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
