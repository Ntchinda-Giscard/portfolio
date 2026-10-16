"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";
import type { Content } from "@/content/portfolio";
import { fill } from "@/lib/i18n";
import { Check, Rotate } from "./ui";
import styles from "./IdCard.module.css";

type Props = {
  profile: Content["profile"];
  card: Content["about"]["card"];
  traits: Content["about"]["whatIAm"];
};

/** A lanyard ID badge: swings gently, tilts toward the pointer, flips on click. */
export default function IdCard({ profile, card, traits }: Props) {
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

  const strap = `${profile.fullName} ✦ ${card.strap} ✦ `.repeat(5);

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
                    <b>{card.heading}</b>
                    <small>{card.issued}</small>
                  </span>
                </div>
                <div className={styles.photo}>
                  <Image src={profile.portrait} alt={fill(card.portraitAlt, { name: profile.firstName })} fill sizes="140px" />
                </div>
                <p className={styles.name}>{profile.fullName}</p>
                <p className={styles.role}>{profile.role.join(" ")}</p>
                <dl className={styles.fields}>
                  <div>
                    <dt>{card.idLabel}</dt>
                    <dd>{card.id}</dd>
                  </div>
                  <div>
                    <dt>{card.deptLabel}</dt>
                    <dd>{card.dept}</dd>
                  </div>
                  <div>
                    <dt>{card.validLabel}</dt>
                    <dd>{card.validTill}</dd>
                  </div>
                </dl>
                <Barcode value={card.id} />
                <span className={styles.holo} />
                <span className={styles.glare} />
              </div>

              <div className={`${styles.face} ${styles.back}`} aria-hidden={!flipped}>
                <p className={styles.backTitle}>{card.backTitle}</p>
                <ul className={styles.traits}>
                  {traits.map((trait) => (
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
                <p className={styles.found}>
                  {card.found} · {profile.email}
                </p>
                <span className={styles.glare} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button type="button" className={styles.flip} onClick={() => setFlipped((v) => !v)} aria-pressed={flipped}>
        <Rotate /> {flipped ? card.flipBack : card.flip}
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
