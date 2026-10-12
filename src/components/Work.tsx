"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { projects, workIntro } from "@/content/portfolio";
import { useMediaQuery } from "@/lib/hooks";
import { cx, pad } from "@/lib/utils";
import ProjectVisual from "./ProjectVisual";
import { ArrowUpRight, Eyebrow, Plus } from "./ui";
import styles from "./Work.module.css";

/** Width of a closed panel and the gap between panels, in px. */
const COLLAPSED = 92;
const GAP = 14;

export default function Work() {
  const [active, setActive] = useState(0);
  const stacked = useMediaQuery("(max-width: 900px)");
  const trackRef = useRef<HTMLDivElement>(null);

  // The open panel's content keeps its final width while panels animate,
  // so text never re-wraps mid-transition.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const open = track.clientWidth - (projects.length - 1) * (COLLAPSED + GAP);
      track.style.setProperty("--open-w", `${Math.max(open, 320)}px`);
    };
    const observer = new ResizeObserver(update);
    observer.observe(track);
    update();
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className={cx("section", styles.work)}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <Eyebrow num="03" label="Selected work" />
            <h2 className="display" data-reveal>
              Things I&apos;ve <em>built.</em>
            </h2>
          </div>
          <p className={styles.intro} data-reveal>
            {workIntro}
          </p>
        </div>

        <div
          ref={trackRef}
          className={styles.track}
          data-reveal
          style={{ "--collapsed": `${COLLAPSED}px`, "--gap": `${GAP}px` } as CSSProperties}
        >
          {projects.map((project, i) => {
            const open = stacked || i === active;
            return (
              <article
                key={project.title}
                className={styles.panel}
                data-open={open || undefined}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <button
                  type="button"
                  className={styles.tab}
                  onClick={() => setActive(i)}
                  aria-expanded={open}
                  aria-controls={`project-${i}`}
                  aria-label={`Open ${project.title}`}
                  tabIndex={open ? -1 : 0}
                >
                  <span className={styles.tabNum}>{pad(i + 1)}</span>
                  <span className={styles.tabTitle}>{project.shortTitle}</span>
                  <span className={styles.tabPlus}>
                    <Plus />
                  </span>
                </button>

                <div id={`project-${i}`} className={styles.body} inert={!open}>
                  <div className={styles.text}>
                    <p className={styles.meta}>
                      <span>{pad(i + 1)}</span>
                      <i aria-hidden="true" />
                      {project.category}
                    </p>
                    <h3 className={styles.title}>{project.title}</h3>
                    <p className={styles.desc}>{project.description}</p>
                    <ul className={styles.features}>
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <ul className={styles.tech} aria-label="Built with">
                      {project.tech.map((tech) => (
                        <li key={tech.name}>
                          {tech.logo ? (
                            // eslint-disable-next-line @next/next/no-img-element -- small local SVG logos
                            <img src={`/logos/${tech.logo}.svg`} alt="" width={13} height={13} loading="lazy" />
                          ) : (
                            <i aria-hidden="true" />
                          )}
                          {tech.name}
                        </li>
                      ))}
                      {project.moreTech > 0 && <li className={styles.more}>+{project.moreTech}</li>}
                    </ul>
                    {project.link ? (
                      <a className={cx("btn btn-dark", styles.cta)} href={project.link.href} target="_blank" rel="noreferrer">
                        {project.link.label} <ArrowUpRight className="arrow-ne" />
                      </a>
                    ) : (
                      project.note && <p className={styles.note}>{project.note}</p>
                    )}
                  </div>
                  <div className={styles.visual}>
                    <ProjectVisual kind={project.visual} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
