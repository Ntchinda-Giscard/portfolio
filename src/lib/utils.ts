import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

/** The page-wide smooth-scroll instance (null before mount or when disabled). */
export const getLenis = () => lenisInstance;
export const setLenis = (lenis: Lenis | null) => {
  lenisInstance = lenis;
};

export function cx(...names: (string | false | null | undefined)[]) {
  return names.filter(Boolean).join(" ");
}

/** 1 -> "01" */
export function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}
