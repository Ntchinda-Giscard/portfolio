import type { CSSProperties } from "react";
import type { Project } from "@/content/portfolio";
import s from "./ProjectVisual.module.css";

/** Illustrated product mock-ups, drawn in HTML/CSS so they stay crisp at any size. */
export default function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  if (kind === "document") return <DocumentScan />;
  if (kind === "heatmap") return <Heatmap />;
  return <Closet />;
}

/* --------------------------------------------------------- document scan */

const DOC_LINES: { w: number; flag?: "high" | "med" }[] = [
  { w: 92 },
  { w: 78 },
  { w: 86 },
  { w: 62 },
  { w: 88, flag: "high" },
  { w: 70, flag: "high" },
  { w: 90 },
  { w: 74 },
  { w: 83 },
  { w: 56 },
  { w: 84, flag: "med" },
  { w: 66 },
  { w: 88 },
  { w: 71 },
  { w: 48 },
];

function DocumentScan() {
  return (
    <div className={s.stage} aria-hidden="true">
      <div className={s.paper}>
        <p className={s.paperHead}>
          <span>privacy_policy.pdf</span>
          <span>v1 scan</span>
        </p>
        <div className={s.lines}>
          {DOC_LINES.map((line, i) => (
            <i key={i} data-flag={line.flag} style={{ width: `${line.w}%` }} />
          ))}
        </div>
        <span className={s.scan} />
      </div>
      <div className={`${s.callout} ${s.high}`}>
        <b>High</b>
        <span>Data shared with third parties</span>
      </div>
      <div className={`${s.callout} ${s.med}`}>
        <b>Medium</b>
        <span>Retention period unclear</span>
      </div>
      <div className={s.gauge}>
        <svg viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="32" className={s.gaugeTrack} />
          <circle cx="40" cy="40" r="32" className={s.gaugeValue} pathLength={100} />
        </svg>
        <span>
          <small>Risk</small>72
        </span>
      </div>
      <p className={s.caption}>14 clauses · scanned in 1.8s</p>
    </div>
  );
}

/* --------------------------------------------------------------- heatmap */

// Integer LCG so the "random" heat values are identical on server and client.
let seed = 11;
const HEAT = Array.from({ length: 63 }, () => {
  seed = (seed * 16807) % 2147483647;
  return (seed % 100) / 100;
});

const LEGEND = [
  { label: "High", v: 0.92 },
  { label: "Medium", v: 0.55 },
  { label: "Low", v: 0.18 },
];

function Heatmap() {
  return (
    <div className={s.stage} aria-hidden="true">
      <div className={s.board}>
        <p className={s.boardHead}>
          <span>Release risk · team × module</span>
          <span className={s.live}>
            <i />
            Live
          </span>
        </p>
        <div className={s.heatGrid}>
          {HEAT.map((v, i) => (
            <i key={i} data-hot={v > 0.86 || undefined} style={{ "--v": v } as CSSProperties} />
          ))}
        </div>
        <div className={s.scale}>
          <span>Low</span>
          <i />
          <span>High</span>
        </div>
      </div>
      <div className={s.legend}>
        <p>Random forest</p>
        <ul>
          {LEGEND.map((item) => (
            <li key={item.label}>
              <span>{item.label}</span>
              <i style={{ "--v": item.v } as CSSProperties} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- closet */

type GarmentKind = "tee" | "pants" | "jacket" | "shoe" | "cap" | "tote";

const GARMENTS: { kind: GarmentKind; label: string; color: string }[] = [
  { kind: "tee", label: "Linen tee", color: "#ebe6dc" },
  { kind: "pants", label: "Pleated trouser", color: "#2f3b52" },
  { kind: "jacket", label: "Chore jacket", color: "#c9b79c" },
  { kind: "shoe", label: "Court sneaker", color: "#f7f6f2" },
  { kind: "cap", label: "Wool cap", color: "#6b7a5a" },
  { kind: "tote", label: "Canvas tote", color: "#d8c3a5" },
];

const GARMENT_PATHS: Record<GarmentKind, string> = {
  tee: "M16 8 22 6Q24 10 26 6L32 8 40 15 35 20 33 18V40H15V18L13 20 8 15Z",
  pants: "M15 6H33L35 42H27L24 18 21 42H13Z",
  jacket: "M17 6 21 5 24 10 27 5 31 6 39 13 37 42H11L9 13Z",
  shoe: "M6 31Q6 23 13 23L19 22Q23 27 30 28L39 30Q43 32 42 36H7Q6 36 6 31Z",
  cap: "M7 32Q7 17 23 16Q35 16 38 27L44 29Q46 31 43 32Z",
  tote: "M11 19H37L39 42H9Z",
};

function Closet() {
  return (
    <div className={s.stage} aria-hidden="true">
      <div className={s.phone}>
        <div className={s.screen}>
          <p className={s.appBar}>
            <b>My closet</b>
            <span>128 pieces</span>
          </p>
          <div className={s.tabs}>
            <span data-on="">Outfits</span>
            <span>Tops</span>
            <span>Shoes</span>
          </div>
          <div className={s.pieces}>
            {GARMENTS.map((g) => (
              <div key={g.label} className={s.piece}>
                <svg viewBox="0 0 48 48">
                  <path d={GARMENT_PATHS[g.kind]} fill={g.color} />
                  {g.kind === "jacket" && <path d="M24 10V42" className={s.seam} />}
                  {g.kind === "shoe" && <path d="M6 36H42V39H6Z" fill="#d9d5cc" />}
                  {g.kind === "tote" && <path d="M18 19Q18 10 24 10Q30 10 30 19" className={s.handle} />}
                </svg>
                <span>{g.label}</span>
              </div>
            ))}
          </div>
          <span className={s.styleMe}>Style me ✦</span>
        </div>
      </div>
      <div className={s.look}>
        <p>Today&apos;s look</p>
        <div className={s.swatches}>
          {["#2f3b52", "#ebe6dc", "#c9b79c"].map((c) => (
            <i key={c} style={{ background: c }} />
          ))}
        </div>
        <b>
          92<small>/100</small>
        </b>
        <span>Outfit match</span>
      </div>
    </div>
  );
}
