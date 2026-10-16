import Link from "next/link";
import type { CSSProperties } from "react";
import type { Content } from "@/content/portfolio";
import { cx, pad } from "@/lib/utils";
import { ArrowDown, ArrowRight, ArrowUpRight, Calendar, Check, Eyebrow, Flow, Layers, Shield } from "./ui";
import styles from "./Services.module.css";

const ICONS = { layers: Layers, flow: Flow, shield: Shield };

type Props = { num: string; profile: Content["profile"]; content: Content["services"] };

/** What I can do for a client: three engagements, each with what it delivers and where it was done. */
export default function Services({ num, profile, content }: Props) {
  return (
    <section id="services" className={cx("section", styles.services)}>
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

        <ol className={styles.grid}>
          {content.items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.title} data-reveal style={{ "--d": i * 90 } as CSSProperties}>
                <article className={styles.card}>
                  <div className={styles.cardHead}>
                    <p className={styles.top}>
                      <span className={styles.num}>{pad(i + 1)}</span>
                      <span className={styles.format}>{item.format}</span>
                    </p>
                    <span className={styles.icon}>
                      <Icon />
                    </span>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.promise}>{item.promise}</p>
                  </div>
                  <div className={styles.cardBody}>
                    <ul className={styles.list}>
                      {item.deliverables.map((deliverable) => (
                        <li key={deliverable}>
                          <Check />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                    <p className={styles.proof}>
                      <span className={styles.proofLabel}>{content.proofLabel}</span>
                      {item.proof.map((proof) => (
                        <ProofLink key={proof.label} {...proof} />
                      ))}
                    </p>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>

        <div className={styles.cta} data-reveal>
          <p className={styles.ctaText}>{content.cta.text}</p>
          <div className={styles.ctaActions}>
            <a
              className={cx("btn", styles.ctaButton)}
              href={`mailto:${profile.email}?subject=${encodeURIComponent(content.cta.subject)}`}
            >
              <Calendar /> {content.cta.button}
            </a>
            <p className={styles.ctaMail}>
              {content.cta.or} <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A case study (in-site), a section further down (#…) or a live product (new tab). */
function ProofLink({ label, href }: { label: string; href: string }) {
  if (href.startsWith("/")) {
    return (
      <Link className={styles.proofLink} href={href}>
        {label} <ArrowRight />
      </Link>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a className={styles.proofLink} href={href}>
        {label} <ArrowDown />
      </a>
    );
  }
  return (
    <a className={styles.proofLink} href={href} target="_blank" rel="noreferrer">
      {label} <ArrowUpRight />
    </a>
  );
}
