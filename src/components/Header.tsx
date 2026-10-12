"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { navItems, profile } from "@/content/portfolio";
import { useScrollFrame } from "@/lib/hooks";
import { cx, getLenis, pad } from "@/lib/utils";
import styles from "./Header.module.css";

/** Every section that can own the viewport; "certifications" has no nav item, so nothing lights up there. */
const SECTION_IDS = ["about", "skills", "work", "certifications", "experience", "achievements", "contact"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  useScrollFrame(() => {
    setScrolled(window.scrollY > 80);
    const line = window.innerHeight * 0.4;
    let current: string | null = null;
    for (const id of SECTION_IDS) {
      const rect = document.getElementById(id)?.getBoundingClientRect();
      if (rect && rect.top <= line && rect.bottom > line) {
        current = id;
        break;
      }
    }
    setActive(current);
  });

  const placePill = useCallback(() => {
    const pill = pillRef.current;
    const link = active ? navRef.current?.querySelector<HTMLElement>(`a[href="#${active}"]`) : null;
    if (!pill) return;
    if (!link) {
      pill.style.opacity = "0";
      return;
    }
    pill.style.opacity = "1";
    pill.style.width = `${link.offsetWidth}px`;
    pill.style.transform = `translateX(${link.offsetLeft}px)`;
  }, [active]);

  useLayoutEffect(placePill, [placePill]);

  useEffect(() => {
    window.addEventListener("resize", placePill);
    document.fonts?.ready.then(placePill);
    return () => window.removeEventListener("resize", placePill);
  }, [placePill]);

  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
    };
  }, [open]);

  const goTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    // Scroll once the sheet has closed; `force` because Lenis is stopped while the menu is open.
    requestAnimationFrame(() => {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(`#${id}`, { force: true });
      else document.getElementById(id)?.scrollIntoView();
    });
  };

  return (
    <header className={cx(styles.header, scrolled && styles.scrolled, open && styles.menuOpen)}>
      <a href="#top" className={styles.brand} aria-label={`${profile.fullName}, back to top`}>
        <span className={styles.logo}>{profile.initials}</span>
        <span className={styles.name}>{profile.fullName}</span>
      </a>

      <nav ref={navRef} className={styles.nav} aria-label="Primary">
        <span ref={pillRef} className={styles.pill} aria-hidden="true" />
        <ul className={styles.list}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cx(styles.link, active === item.id && styles.active)}
                aria-current={active === item.id ? "location" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className={styles.burger} aria-hidden="true" />
      </button>

      <div id="site-menu" className={styles.sheet} data-open={open || undefined} inert={!open}>
        <ul>
          {navItems.map((item, i) => (
            <li key={item.id} style={{ "--i": i } as CSSProperties}>
              <a href={`#${item.id}`} onClick={(e) => goTo(e, item.id)}>
                <span>{pad(i + 1)}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="btn btn-dark" href={`mailto:${profile.email}`}>
          Say hello
        </a>
      </div>
    </header>
  );
}
