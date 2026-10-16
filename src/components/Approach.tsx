"use client";

import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import type { Content } from "@/content/portfolio";
import { useScrollFrame } from "@/lib/hooks";
import { clamp, cx, pad } from "@/lib/utils";
import { ArrowRight, Eyebrow, Rotate } from "./ui";
import styles from "./Approach.module.css";

type Props = { num: string; content: Content["approach"] };

/** The four-step method, then the principles behind it — each backed by a real decision. */
export default function Approach({ num, content }: Props) {
  const stepsRef = useRef<HTMLDivElement>(null);

  // The rail fills as the steps cross the screen; each step lights up once the fill reaches it.
  useScrollFrame(() => {
    const el = stepsRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const progress = clamp((window.innerHeight * 0.62 - rect.top) / rect.height);
    el.style.setProperty("--progress", progress.toFixed(4));
    const steps = el.querySelectorAll<HTMLElement>("[data-step]");
    steps.forEach((step, i) => {
      step.toggleAttribute("data-on", progress > 0 && progress >= i / Math.max(1, steps.length - 1) - 0.02);
    });
  });

  const { principles } = content;

  return (
    <section id="approach" className={cx("section", styles.approach)}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <Eyebrow num={num} label={content.eyebrow} />
            <h2 className="display" data-reveal>
              {content.title} <em>{content.em}</em>
            </h2>
          </div>
          <p className={styles.intro} data-reveal>
            {content.intro}
          </p>
        </div>

        <div ref={stepsRef} className={styles.steps}>
          <span className={styles.rail} aria-hidden="true">
            <span className={styles.fill} />
          </span>
          <ol className={styles.stepList}>
            {content.steps.map((step, i) => (
              <li
                key={step.title}
                className={styles.step}
                data-step
                data-reveal
                style={{ "--d": i * 90 } as CSSProperties}
              >
                <span className={styles.node}>{pad(i + 1)}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className={styles.loop} data-reveal>
          <Rotate /> {content.loop}
        </p>

        <div className={styles.principles}>
          <div className={styles.side}>
            <p className={styles.label} data-reveal>
              {principles.label}
            </p>
            <h3 className={styles.sideTitle} data-reveal>
              {principles.title} <em>{principles.em}</em>
            </h3>
            <p className={styles.sideIntro} data-reveal>
              {principles.intro}
            </p>
          </div>

          <ol className={styles.list}>
            {principles.items.map((item, i) => {
              const body = (
                <>
                  <span className={styles.num}>{pad(i + 1)}</span>
                  <span>
                    <span className={styles.name}>{item.title}</span>
                    <span className={styles.text}>{item.text}</span>
                  </span>
                  <span className={styles.tag}>
                    {item.project}
                    {item.href && <ArrowRight />}
                  </span>
                </>
              );
              return (
                <li key={item.title} data-reveal style={{ "--d": i * 60 } as CSSProperties}>
                  {item.href ? (
                    <Link className={styles.row} href={item.href}>
                      {body}
                    </Link>
                  ) : (
                    <div className={styles.row}>{body}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
