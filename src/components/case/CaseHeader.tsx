"use client";

import Link from "next/link";
import { useState } from "react";
import type { CaseUi } from "@/content/case-studies";
import { fill, type Locale } from "@/lib/i18n";
import { useScrollFrame } from "@/lib/hooks";
import { cx } from "@/lib/utils";
import LangSwitch from "../LangSwitch";
import { ArrowRight } from "../ui";
import s from "./case.module.css";

type Props = {
  lang: Locale;
  name: string;
  initials: string;
  ui: CaseUi;
  next: { href: string; title: string };
};

export default function CaseHeader({ lang, name, initials, ui, next }: Props) {
  const [scrolled, setScrolled] = useState(false);
  useScrollFrame(() => setScrolled(window.scrollY > 80));

  return (
    <header className={cx(s.header, scrolled && s.scrolled)}>
      <Link href={ui.homeHref} className={s.brand} aria-label={fill(ui.home, { name })}>
        <span className={s.logo}>{initials}</span>
        <span className={s.brandName}>{name}</span>
      </Link>
      <div className={s.headerEnd}>
        <nav className={s.headerNav} aria-label={ui.nav}>
          <Link href={ui.workHref} className={s.headerLink}>
            <ArrowRight style={{ transform: "rotate(180deg)" }} /> {ui.allWork}
          </Link>
          <Link href={next.href} className={cx(s.headerLink, s.hideSmall)}>
            {next.title} <ArrowRight />
          </Link>
        </nav>
        <LangSwitch lang={lang} label={ui.language} />
      </div>
    </header>
  );
}
