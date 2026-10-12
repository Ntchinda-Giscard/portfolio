"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/utils";
import s from "./case.module.css";

/** Marks its subtree data-inview="false" while off screen so CSS pauses the animations. */
export default function InView({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "120px 0px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cx(s.inview, className)} data-inview={inView}>
      {children}
    </div>
  );
}
