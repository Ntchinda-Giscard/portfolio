"use client";

import { useRef, useState } from "react";
import { contact, profile } from "@/content/portfolio";
import { useScrollFrame } from "@/lib/hooks";
import { clamp, cx } from "@/lib/utils";
import { ArrowDown, ArrowUp, ArrowUpRight, Check, Copy, Eyebrow } from "./ui";
import styles from "./Contact.module.css";

export default function Contact() {
  const headRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  // Each grey word darkens in turn as the headline scrolls into view.
  useScrollFrame(() => {
    const el = headRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = clamp((vh * 0.92 - rect.top) / (vh * 0.55));
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    words.forEach((word, i) => {
      word.style.setProperty("--w", clamp(progress * words.length - i).toFixed(3));
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
        <Eyebrow num="07" label="Contact" />
        <h2 ref={headRef} className={styles.headline}>
          <span className={styles.line}>Let&apos;s build</span>
          <span className={styles.line}>
            <span data-word className={styles.word}>
              something
            </span>{" "}
            <span data-word className={styles.word}>
              together
            </span>
            <span className={styles.dot} aria-hidden="true" />
          </span>
        </h2>

        <div className={styles.grid}>
          <div data-reveal>
            <p className={styles.blurb}>{contact.blurb}</p>
            <div className={styles.emailRow}>
              <a className={styles.email} href={`mailto:${profile.email}`}>
                {profile.email}
                <ArrowUpRight />
              </a>
              <button type="button" className={styles.copy} onClick={copyEmail}>
                {copied ? <Check /> : <Copy />}
                <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <ul className={styles.links} data-reveal>
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
                <span>Résumé</span>
                <ArrowDown />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <footer className="container">
        <div className={styles.footer}>
          <p>
            © {contact.copyrightYear} {profile.fullName}
          </p>
          <p className={styles.status}>
            <i aria-hidden="true" />
            {contact.availability}
          </p>
          <a href="#top" className={styles.top}>
            Back to top <ArrowUp />
          </a>
        </div>
      </footer>
    </section>
  );
}
