"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { Content } from "@/content/portfolio";
import type { RiskIcon } from "@/content/services";
import { useMediaQuery } from "@/lib/hooks";
import { cx, pad } from "@/lib/utils";
import {
  Activity,
  Alert,
  ArrowUpRight,
  Check,
  Code,
  Eyebrow,
  Key,
  Lock,
  Pipeline,
  Server,
  Shield,
  Spark,
  UserCheck,
  Wallet,
} from "./ui";
import styles from "./Security.module.css";

const ICONS: Record<RiskIcon, typeof Key> = {
  lock: Lock,
  server: Server,
  pipeline: Pipeline,
  key: Key,
  code: Code,
  wallet: Wallet,
  user: UserCheck,
  shield: Shield,
  activity: Activity,
  alert: Alert,
  spark: Spark,
};

type Props = { num: string; content: Content["security"] };

/**
 * KamJob's security, mapped to the OWASP Top 10:2025 (and the LLM Top 10):
 * pick a risk (hover, click or arrow keys) to see the threat, what stops it
 * and how that is proven. Below it, the DevSecOps checks every push goes
 * through before production.
 */
export default function Security({ num, content }: Props) {
  const { risks, pipeline } = content;
  const [active, setActive] = useState(0);
  const stacked = useMediaQuery("(max-width: 900px)");
  const tabsRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: risks.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const to = (keys[e.key] + risks.length) % risks.length;
    setActive(to);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[to]?.focus();
  };

  return (
    <section id="security" className={cx("section", styles.security)}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <Eyebrow num={num} label={content.eyebrow} />
            <h2 className="display" data-reveal>
              {content.title} <em>{content.em}</em>
            </h2>
          </div>
          <div className={styles.headSide} data-reveal>
            <p className={styles.context}>
              <Shield /> {content.context}
            </p>
            <p className={styles.intro}>{content.intro}</p>
          </div>
        </div>

        <div className={styles.explorer} data-reveal>
          <div className={styles.side}>
            <p className={styles.listLabel}>{content.risksLabel}</p>
            <div
              ref={tabsRef}
              className={styles.tabs}
              role="tablist"
              aria-orientation="vertical"
              aria-label={content.risksLabel}
              onKeyDown={onKeyDown}
            >
              {risks.map((risk, i) => {
                const Icon = ICONS[risk.icon];
                const selected = i === active;
                return (
                  <button
                    key={risk.code}
                    type="button"
                    role="tab"
                    id={`risk-tab-${risk.code}`}
                    aria-selected={selected}
                    aria-controls={`risk-${risk.code}`}
                    tabIndex={selected ? 0 : -1}
                    className={styles.tab}
                    data-llm={risk.code === "LLM" || undefined}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                  >
                    <span className={styles.tabCode}>{risk.code}</span>
                    <span className={styles.tabIcon}>
                      <Icon />
                    </span>
                    <span className={styles.tabTitle}>{risk.short}</span>
                    <span className={styles.tabTag}>{risk.tags[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.panes}>
            {risks.map((risk, i) => {
              const Icon = ICONS[risk.icon];
              return (
                <article
                  key={risk.code}
                  id={`risk-${risk.code}`}
                  className={styles.pane}
                  data-active={stacked || i === active || undefined}
                  role={stacked ? undefined : "tabpanel"}
                  aria-labelledby={stacked ? undefined : `risk-tab-${risk.code}`}
                >
                  <p className={styles.paneTop}>
                    <span className={styles.paneIcon}>
                      <Icon />
                    </span>
                    <span className={styles.paneRef}>OWASP · {risk.ref}</span>
                  </p>
                  <h3 className={styles.paneTitle}>{risk.title}</h3>
                  <ul className={styles.tags}>
                    {risk.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <dl className={styles.facts}>
                    <div className={styles.fact} data-kind="threat">
                      <dt>
                        <Alert /> {content.threat}
                      </dt>
                      <dd>{risk.threat}</dd>
                    </div>
                    <div className={styles.fact} data-kind="defense">
                      <dt>
                        <Shield /> {content.defense}
                      </dt>
                      <dd>{risk.defense}</dd>
                    </div>
                    <div className={styles.fact} data-kind="proof">
                      <dt>
                        <Check /> {content.proof}
                      </dt>
                      <dd>{risk.proof}</dd>
                    </div>
                  </dl>
                  <p className={styles.paneCount}>
                    {pad(i + 1)} / {pad(risks.length)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className={styles.gate} data-reveal>
          <div className={styles.gateHead}>
            <div>
              <p className={styles.gateLabel}>{pipeline.label}</p>
              <h3 className={styles.gateTitle}>{pipeline.title}</h3>
            </div>
            <p className={styles.gateNote}>
              <Alert /> {pipeline.note}
            </p>
          </div>

          <div className={styles.line} style={{ "--n": pipeline.stations.length } as CSSProperties}>
            <span className={styles.track} aria-hidden="true">
              <i className={styles.runner} />
            </span>
            <ol className={styles.stations}>
              {pipeline.stations.map((station, i) => {
                const last = i === pipeline.stations.length - 1;
                return (
                  <li
                    key={station.name}
                    className={styles.station}
                    data-edge={i === 0 ? "start" : last ? "end" : undefined}
                    style={{ "--i": i } as CSSProperties}
                  >
                    <span className={styles.stationDot}>{last ? <ArrowUpRight /> : i === 0 ? <i /> : <Check />}</span>
                    <b>{station.name}</b>
                    <small>{station.note}</small>
                  </li>
                );
              })}
            </ol>
          </div>

          <table className={styles.practices}>
            <thead>
              <tr>
                <th scope="col">{pipeline.columns.practice}</th>
                <th scope="col">{pipeline.columns.tool}</th>
                <th scope="col">{pipeline.columns.catches}</th>
                <th scope="col">{pipeline.columns.gate}</th>
              </tr>
            </thead>
            <tbody>
              {pipeline.practices.map((row) => (
                <tr key={row.practice}>
                  <th scope="row">{row.practice}</th>
                  <td>
                    <span className={styles.tool}>{row.tool}</span>
                  </td>
                  <td className={styles.catches}>{row.catches}</td>
                  <td className={styles.blocks}>
                    <i aria-hidden="true" />
                    {row.gate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.stats} data-reveal>
          {content.stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <p className={styles.statValue}>
                {stat.value}
                {stat.suffix && <small>{stat.suffix}</small>}
              </p>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
