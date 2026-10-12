"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/utils";

/** Smooth scrolling + fade-up reveals for every element marked `data-reveal`. */
export default function PageEffects() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: true,
      stopInertiaOnNavigate: true,
    });
    setLenis(lenis);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
