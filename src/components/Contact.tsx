"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import type { Content } from "@/content/portfolio";
import type { Locale } from "@/lib/i18n";
import { useScrollFrame } from "@/lib/hooks";
import { clamp, cx } from "@/lib/utils";
import { ArrowDown, ArrowUp, ArrowUpRight, Calendar, Check, Copy, Eyebrow } from "./ui";
import styles from "./Contact.module.css";

type Props = { num: string; lang: Locale; profile: Content["profile"]; content: Content["contact"] };

export default function Contact({ num, lang, profile, content }: Props) {
  const headRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);
  const time = useLocalTime(profile.timeZone, lang === "fr" ? "fr-FR" : "en-GB");
  const words = content.words.split(" ");

  // Each grey word darkens in turn as the headline scrolls into view.
  useScrollFrame(() => {
    const el = headRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = clamp((vh * 0.92 - rect.top) / (vh * 0.55));
    const spans = el.querySelectorAll<HTMLElement>("[data-word]");
    spans.forEach((word, i) => {
      word.style.setProperty("--w", clamp(progress * spans.length - i).toFixed(3));
    });
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (permissions, insecure origin); the mailto link still works.
    }
  };

  return (
    <section id="contact" className={cx("section", styles.contact)}>
      <div className="container">
        <Eyebrow num={num} label={content.eyebrow} />
        <h2 ref={headRef} className={styles.headline}>
          <span className={styles.line}>{content.lead}</span>
          <span className={styles.line}>
            {words.map((word, i) => (
              <span key={word}>
                {i > 0 && " "}
                <span data-word className={styles.word}>
                  {word}
                </span>
              </span>
            ))}
            <span className={styles.dot} aria-hidden="true" />
          </span>
        </h2>

        <div className={styles.grid}>
          <div data-reveal>
            <p className={styles.blurb}>{content.blurb}</p>
            <div className={styles.emailRow}>
              <a className={styles.email} href={`mailto:${profile.email}`}>
                {profile.email}
                <ArrowUpRight />
              </a>
              <button type="button" className={styles.copy} onClick={copyEmail}>
                {copied ? <Check /> : <Copy />}
                <span aria-live="polite">{copied ? content.copied : content.copy}</span>
              </button>
            </div>
            <a
              className={cx("btn btn-dark", styles.call)}
              href={`mailto:${profile.email}?subject=${encodeURIComponent(content.callSubject)}`}
            >
              <Calendar /> {content.call}
            </a>
          </div>

          <div data-reveal>
            <dl className={styles.panel} aria-label={content.panelLabel}>
              {content.panel.map((row) => (
                <div key={row.id} className={styles.row}>
                  <dt>{row.label}</dt>
                  <dd>
                    {row.id === "status" && <i className={styles.live} aria-hidden="true" />}
                    {row.id === "time" ? (
                      <>
                        <span className={styles.clock}>{time ?? "--:--"}</span> · {row.value}
                      </>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className={styles.links}>
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <span>GitHub</span>
                  <ArrowUpRight />
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <span>LinkedIn</span>
                  <ArrowUpRight />
                </a>
              </li>
              <li>
                <a href={profile.resumeUrl} download>
                  <span>{content.resume}</span>
                  <ArrowDown />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="container">
        <div className={styles.footer}>
          <p>
            © {content.copyrightYear} {profile.fullName}
          </p>
          <p className={styles.status}>
            <i aria-hidden="true" />
            {content.availability}
          </p>
          <a href="#top" className={styles.top}>
            {content.backToTop} <ArrowUp />
          </a>
        </div>
      </footer>
    </section>
  );
}

const formatters = new Map<string, Intl.DateTimeFormat>();

/** "14:32" in `timeZone`, refreshed every 15 s; null while server-rendering. */
function useLocalTime(timeZone: string, locale: string) {
  return useSyncExternalStore(
    (onChange) => {
      const id = window.setInterval(onChange, 15_000);
      return () => window.clearInterval(id);
    },
    () => {
      const key = `${locale}|${timeZone}`;
      let format = formatters.get(key);
      if (!format) {
        format = new Intl.DateTimeFormat(locale, { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
        formatters.set(key, format);
      }
      return format.format(new Date());
    },
    () => null,
  );
}
