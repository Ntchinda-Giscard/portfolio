"use client";

import { useState, type CSSProperties } from "react";
import type { Content, FamilyId } from "@/content/portfolio";
import { cx, pad } from "@/lib/utils";
import { Cursor, Eyebrow } from "./ui";
import styles from "./Skills.module.css";

type Props = { num: string; content: Content["skills"] };

export default function Skills({ num, content }: Props) {
  const { families, elements } = content;
  const familyLabel = Object.fromEntries(families.map((f) => [f.id, f.label])) as Record<FamilyId, string>;
  const [family, setFamily] = useState<FamilyId | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="skills" className={cx("section", styles.skills)}>
      <div className="container">
        <Eyebrow num={num} label={content.eyebrow} />
        <h2 className="display" data-reveal>
          {content.title} <em>{content.em}</em>
        </h2>
        <p className={styles.intro} data-reveal>
          {content.intro}
        </p>

        <div className={styles.chips} role="group" aria-label={content.chipsLabel} data-reveal>
          {families.map((f) => (
            <button
              key={f.id}
              type="button"
              className={styles.chip}
              data-family={f.id}
              aria-pressed={family === f.id}
              onClick={() => setFamily((current) => (current === f.id ? null : f.id))}
            >
              <i className={styles.swatch} aria-hidden="true" />
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.layout}>
          <ol className={styles.table} data-reveal onMouseLeave={() => setHovered(null)}>
            {elements.map((el, i) => (
              <li key={el.symbol}>
                <button
                  type="button"
                  className={styles.tile}
                  data-family={el.family}
                  data-dim={family && family !== el.family ? "" : undefined}
                  style={{ "--i": i } as CSSProperties}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onClick={() => setHovered(i)}
                  aria-label={`${el.name}, ${familyLabel[el.family]}`}
                >
                  <span className={styles.num}>{pad(i + 1)}</span>
                  <span className={styles.sym}>{el.symbol}</span>
                  <span className={styles.name}>{el.name}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className={styles.preview} data-reveal>
            <div className={styles.item} data-active={hovered === null || undefined} aria-hidden={hovered !== null}>
              <Cursor className={styles.cursor} />
              <p className={styles.hint}>{content.hint}</p>
            </div>
            {elements.map((el, i) => (
              <div key={el.symbol} className={styles.item} data-active={hovered === i || undefined} aria-hidden={hovered !== i}>
                {el.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- small local SVG logos
                  <img className={styles.logo} src={`/logos/${el.logo}.svg`} alt="" width={116} height={116} loading="lazy" />
                ) : (
                  <span className={styles.bigSym} data-family={el.family}>
                    {el.symbol}
                  </span>
                )}
                <p className={styles.pName}>{el.name}</p>
                <p className={styles.pMeta}>
                  {familyLabel[el.family]} · {content.number} {pad(i + 1)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
