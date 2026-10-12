"use client";

import { useEffect, useRef, useState } from "react";
import { achievements } from "@/content/portfolio";
import { useMediaQuery, useScrollFrame } from "@/lib/hooks";
import { clamp, cx, pad } from "@/lib/utils";
import { ArrowRight, Eyebrow, Flag, Flow, Scale, Shield, Spark, Trophy } from "./ui";
import styles from "./Achievements.module.css";

const ICONS = { trophy: Trophy, flag: Flag, shield: Shield, spark: Spark, scale: Scale, flow: Flow };

/** Vertical scroll drives a horizontal card track while the section is pinned. */
export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [travel, setTravel] = useState(0);
  const pinned = useMediaQuery("(min-width: 901px) and (prefers-reduced-motion: no-preference)");

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setTravel(Math.max(0, track.offsetWidth - document.documentElement.clientWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useScrollFrame(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!section || !track || !bar) return;
    if (!pinned) {
      track.style.transform = "";
      return;
    }
    const rect = section.getBoundingClientRect();
    const distance = rect.height - window.innerHeight;
    const progress = distance > 0 ? clamp(-rect.top / distance) : 0;
    track.style.transform = `translate3d(${(-progress * travel).toFixed(1)}px, 0, 0)`;
    bar.style.transform = `scaleX(${progress.toFixed(4)})`;
  });

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className={cx(styles.achievements, pinned && styles.pinned)}
      style={pinned ? { height: `calc(100svh + ${travel}px)` } : undefined}
    >
      <div className={styles.sticky}>
        <div className={cx("container", styles.head)}>
          <div>
            <Eyebrow num="06" label="Achievements" />
            <h2 className="display" data-reveal>
              Proud <em>moments.</em>
            </h2>
          </div>
          <span className={styles.progress} aria-hidden="true">
            <span ref={barRef} />
          </span>
        </div>

        <div className={styles.viewport}>
          <ol ref={trackRef} className={styles.track}>
            {achievements.map((item, i) => {
              const Icon = ICONS[item.icon ?? "trophy"];
              return (
              <li key={item.name} className={styles.card}>
                <span className={styles.count}>
                  {pad(i + 1)} / {pad(achievements.length)}
                </span>
                <span className={styles.icon}>
                  {item.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element -- small local SVG logos
                    <img src={`/logos/${item.logo}.svg`} alt="" width={30} height={30} loading="lazy" />
                  ) : item.icon === "flag" ? (
                    <Flag />
                  ) : (
                    <Trophy />
                  )}
                </span>
                <div className={styles.bottom}>
                  <div>
                    <h3 className={styles.name}>{item.name}</h3>
                    <p className={styles.label}>{item.label}</p>
                    <p className={styles.desc}>{item.description}</p>
                  </div>
                  <p className={styles.value}>
                    {item.prefix && <span className={styles.prefix}>{item.prefix}</span>}
                    {item.value}
                    {item.suffix && <span className={styles.suffix}>{item.suffix}</span>}
                  </p>
                </div>
              </li>
            ))}
            <li className={styles.end}>
              <span>and counting</span>
              <a href="#contact" aria-label="Get in touch">
                <ArrowRight />
              </a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
