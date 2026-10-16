"use client";

import { useRef } from "react";
import type { Content } from "@/content/portfolio";
import { useScrollFrame } from "@/lib/hooks";
import { clamp, cx } from "@/lib/utils";
import { ArrowRight, Eyebrow, Star } from "./ui";
import styles from "./Experience.module.css";

type Props = { num: string; content: Content["experience"] };

export default function Experience({ num, content }: Props) {
  const { timeline, next } = content;
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
        <Eyebrow num={num} label={content.eyebrow} />
        <h2 className="display" data-reveal>
          {content.title} <em>{content.em}</em>
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
                    <span className={entry.kind === "experience" ? styles.kindPill : styles.kind}>
                      {content.kinds[entry.kind]}
                    </span>
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
                {next.year}
              </p>
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.nextCard} data-reveal>
                <p className={styles.kind}>{next.kind}</p>
                <h3 className={styles.title}>{next.title}</h3>
                <p className={styles.place}>{next.text}</p>
                <a href="#contact" className="btn btn-dark btn-sm">
                  {next.cta} <ArrowRight className="arrow-r" />
                </a>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
