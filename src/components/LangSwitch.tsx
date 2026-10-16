"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { LOCALE_COOKIE, localeNames, locales, switchLocale, type Locale } from "@/lib/i18n";
import { cx } from "@/lib/utils";
import styles from "./LangSwitch.module.css";

/**
 * EN · FR. The other language is a plain link: switching is a full page load
 * into the other root layout (and its <html lang>). The choice is remembered
 * in the cookie src/proxy.ts reads, and the section being read is kept.
 */
export default function LangSwitch({ lang, label, className }: { lang: Locale; label: string; className?: string }) {
  const pathname = usePathname();

  const remember = (e: MouseEvent<HTMLAnchorElement>, next: Locale) => {
    rememberLocale(next);
    e.currentTarget.hash = currentSection();
  };

  return (
    <div className={cx(styles.switch, className)} role="group" aria-label={label}>
      {locales.map((code) =>
        code === lang ? (
          <span key={code} className={styles.option} aria-current="true" lang={code} title={localeNames[code]}>
            {code.toUpperCase()}
          </span>
        ) : (
          <a
            key={code}
            className={styles.option}
            href={switchLocale(pathname, code)}
            hrefLang={code}
            lang={code}
            aria-label={localeNames[code]}
            onClick={(e) => remember(e, code)}
          >
            {code.toUpperCase()}
          </a>
        ),
      )}
    </div>
  );
}

/** A year-long cookie, so a bare "/" opens in the language picked last. */
function rememberLocale(lang: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
}

/** The section crossing 40% of the viewport — the same line the header's active pill uses. */
function currentSection() {
  const line = window.innerHeight * 0.4;
  for (const section of document.querySelectorAll<HTMLElement>("main section[id]")) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= line && rect.bottom > line) return section.id === "top" ? "" : section.id;
  }
  return "";
}
