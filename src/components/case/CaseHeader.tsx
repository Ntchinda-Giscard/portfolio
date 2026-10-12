"use client";

import Link from "next/link";
import { useState } from "react";
import { profile } from "@/content/portfolio";
import { useScrollFrame } from "@/lib/hooks";
import { cx } from "@/lib/utils";
import { ArrowRight } from "../ui";
import s from "./case.module.css";

export default function CaseHeader({ next }: { next: { href: string; title: string } }) {
  const [scrolled, setScrolled] = useState(false);
  useScrollFrame(() => setScrolled(window.scrollY > 80));

  return (
    <header className={cx(s.header, scrolled && s.scrolled)}>
      <Link href="/" className={s.brand} aria-label={`${profile.fullName}, home`}>
        <span className={s.logo}>{profile.initials}</span>
        <span className={s.brandName}>{profile.fullName}</span>
      </Link>
      <nav className={s.headerNav} aria-label="Case study">
        <Link href="/#work" className={s.headerLink}>
          <ArrowRight style={{ transform: "rotate(180deg)" }} /> All work
        </Link>
        <Link href={next.href} className={cx(s.headerLink, s.hideSmall)}>
          {next.title} <ArrowRight />
        </Link>
      </nav>
    </header>
  );
}
