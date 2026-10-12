"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import { about, profile } from "@/content/portfolio";
import { Check, Rotate } from "./ui";
import styles from "./IdCard.module.css";

/** A lanyard ID badge: swings gently, tilts toward the pointer, flips on click. */
export default function IdCard() {
  const [flipped, setFlipped] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${x * 18}deg`);
    el.style.setProperty("--rx", `${-y * 14}deg`);
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };

  const onLeave = () => {
    tiltRef.current?.style.setProperty("--ry", "0deg");
    tiltRef.current?.style.setProperty("--rx", "0deg");
  };

  const strap = `${profile.fullName} ✦ Developer ✦ `.repeat(5);

  return (
    <>
      <div className={styles.rig}>
        <div className={styles.strap} aria-hidden="true">
          <span>{strap}</span>
        </div>
        <div className={styles.clip} aria-hidden="true">
          <i />
        </div>

        <div
          ref={tiltRef}
          className={styles.tilt}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          onClick={() => setFlipped((v) => !v)}
        >
          <div className={styles.tilter}>
            <div className={styles.card} data-flipped={flipped || undefined}>
              <div className={`${styles.face} ${styles.front}`} aria-hidden={flipped}>
                <div className={styles.head}>
                  <span className={styles.slot} />
                  <span className={styles.mark}>{profile.initials}</span>
                  <span>
                    <b>Developer ID</b>
                    <small>{about.card.issued}</small>
                  </span>
                </div>
                <div className={styles.photo}>
                  <Image src={profile.portrait} alt={`Portrait of ${profile.firstName}`} fill sizes="140px" />
                </div>
                <p className={styles.name}>{profile.fullName}</p>
                <p className={styles.role}>{profile.role.join(" ")}</p>
                <dl className={styles.fields}>
                  <div>
                    <dt>ID No</dt>
                    <dd>{about.card.id}</dd>
                  </div>
                  <div>
                    <dt>Dept</dt>
                    <dd>{about.card.dept}</dd>
                  </div>
                  <div>
                    <dt>Valid till</dt>
                    <dd>{about.card.validTill}</dd>
                  </div>
                </dl>
                <Barcode value={about.card.id} />
                <span className={styles.holo} />
                <span className={styles.glare} />
              </div>

              <div className={`${styles.face} ${styles.back}`} aria-hidden={!flipped}>
                <p className={styles.backTitle}>What I am</p>
                <ul className={styles.traits}>
                  {about.whatIAm.map((trait) => (
                    <li key={trait.title}>
                      <span className={styles.tick}>
                        <Check />
                      </span>
                      <span>
                        <b>{trait.title}</b>
                        <small>{trait.detail}</small>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className={styles.signature}>{profile.firstName}</p>
                <p className={styles.found}>If found, say hello · {profile.email}</p>
                <span className={styles.glare} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button type="button" className={styles.flip} onClick={() => setFlipped((v) => !v)} aria-pressed={flipped}>
        <Rotate /> {flipped ? "Flip back" : "Flip the card"}
      </button>
    </>
  );
}

/** Deterministic bars derived from the ID so the barcode never changes between renders. */
function Barcode({ value }: { value: string }) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (const ch of `${value}*portfolio`) {
    const code = ch.charCodeAt(0);
    for (let bit = 0; bit < 3; bit++) {
      const w = ((code >> bit) & 1) + 1;
      bars.push({ x, w });
      x += w + ((code >> (bit + 3)) & 1) + 1;
    }
  }
  return (
    <svg className={styles.barcode} viewBox={`0 0 ${x} 20`} preserveAspectRatio="none" aria-hidden="true">
      {bars.map((bar) => (
        <rect key={bar.x} x={bar.x} y={0} width={bar.w} height={20} />
      ))}
    </svg>
  );
}
