"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { Content } from "@/content/portfolio";
import { useMediaQuery } from "@/lib/hooks";
import { cx, pad } from "@/lib/utils";
import { Alert, ArrowUpRight, Check, Eyebrow, FileCheck, Key, Lock, Pipeline, Server, Shield, Spark, Wallet } from "./ui";
import styles from "./Security.module.css";

const ICONS: Record<string, typeof Key> = {
  identity: Key,
  access: Lock,
  payments: Wallet,
  uploads: FileCheck,
  ai: Spark,
  pipeline: Pipeline,
  runtime: Server,
};

type Props = { num: string; content: Content["security"] };

/**
 * KamJob's security, layer by layer: pick a layer (hover, click or arrow keys)
 * to see the threat, what stops it and how that is proven. Below it, the gate
 * every push goes through before production.
 */
export default function Security({ num, content }: Props) {
  const { layers, gate } = content;
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
      End: layers.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const to = (keys[e.key] + layers.length) % layers.length;
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
          <div
            ref={tabsRef}
            className={styles.tabs}
            role="tablist"
            aria-orientation="vertical"
            aria-label={content.layersLabel}
            onKeyDown={onKeyDown}
          >
            {layers.map((layer, i) => {
              const Icon = ICONS[layer.id] ?? Shield;
              const selected = i === active;
              return (
                <button
                  key={layer.id}
                  type="button"
                  role="tab"
                  id={`layer-tab-${layer.id}`}
                  aria-selected={selected}
                  aria-controls={`layer-${layer.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={styles.tab}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className={styles.tabNum}>{pad(i + 1)}</span>
                  <span className={styles.tabIcon}>
                    <Icon />
                  </span>
                  <span className={styles.tabTitle}>{layer.title}</span>
                  <span className={styles.tabTag}>{layer.tags[0]}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.panes}>
            {layers.map((layer, i) => {
              const Icon = ICONS[layer.id] ?? Shield;
              return (
                <article
                  key={layer.id}
                  id={`layer-${layer.id}`}
                  className={styles.pane}
                  data-active={stacked || i === active || undefined}
                  role={stacked ? undefined : "tabpanel"}
                  aria-labelledby={stacked ? undefined : `layer-tab-${layer.id}`}
                >
                  <p className={styles.paneTop}>
                    <span className={styles.paneIcon}>
                      <Icon />
                    </span>
                    <span className={styles.paneCount}>
                      {pad(i + 1)} / {pad(layers.length)}
                    </span>
                  </p>
                  <h3 className={styles.paneTitle}>{layer.title}</h3>
                  <ul className={styles.tags}>
                    {layer.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <dl className={styles.facts}>
                    <div className={styles.fact} data-kind="threat">
                      <dt>
                        <Alert /> {content.threat}
                      </dt>
                      <dd>{layer.threat}</dd>
                    </div>
                    <div className={styles.fact} data-kind="defense">
                      <dt>
                        <Shield /> {content.defense}
                      </dt>
                      <dd>{layer.defense}</dd>
                    </div>
                    <div className={styles.fact} data-kind="proof">
                      <dt>
                        <Check /> {content.proof}
                      </dt>
                      <dd>{layer.proof}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>
        </div>

        <div className={styles.gate} data-reveal>
          <div className={styles.gateHead}>
            <p className={styles.gateTitle}>{gate.title}</p>
            <p className={styles.gateNote}>
              <Alert /> {gate.note}
            </p>
          </div>
          <div className={styles.line} style={{ "--n": gate.stations.length } as CSSProperties}>
            <span className={styles.track} aria-hidden="true">
              <i className={styles.runner} />
            </span>
            <ol className={styles.stations}>
              {gate.stations.map((station, i) => {
                const last = i === gate.stations.length - 1;
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
