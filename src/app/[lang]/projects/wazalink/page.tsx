import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseHeader from "@/components/case/CaseHeader";
import { CaseBlock, CaseHero, CaseOutcome } from "@/components/case/CaseParts";
import InView from "@/components/case/InView";
import StateMachine from "@/components/case/StateMachine";
import { FlowCards, Layers, Resilience, ShipFlow, SyncMap, VpnStrip } from "@/components/case/WazalinkVisuals";
import PageEffects from "@/components/PageEffects";
import { getCaseStudy, getCaseUi } from "@/content/case-studies";
import { profile } from "@/content/portfolio";
import { alternates, fill, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/wazalink">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const study = getCaseStudy("wazalink", lang);
  const title = fill(getCaseUi(lang).metaTitle, { title: study.title, name: profile.fullName });
  return {
    title,
    description: study.summary,
    alternates: alternates(lang, "/projects/wazalink"),
    openGraph: { title, description: study.summary, type: "article" },
  };
}

export default async function WazalinkPage({ params }: PageProps<"/[lang]/projects/wazalink">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const study = getCaseStudy("wazalink", lang);
  const ui = getCaseUi(lang);
  const { sections } = study;

  return (
    <>
      <PageEffects />
      <CaseHeader lang={lang} name={profile.fullName} initials={profile.initials} ui={ui} next={study.next} />
      <main>
        <CaseHero
          study={study}
          ui={ui}
          visual={
            <InView>
              <SyncMap lang={lang} />
            </InView>
          }
        />
        <CaseBlock section={sections.problem}>
          <InView>
            <VpnStrip lang={lang} />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.architecture}>
          <InView>
            <Layers lang={lang} />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.flows}>
          <InView>
            <FlowCards lang={lang} />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.states}>
          <StateMachine lang={lang} />
        </CaseBlock>
        <CaseBlock section={sections.resilience}>
          <InView>
            <Resilience lang={lang} />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.shipping}>
          <InView>
            <ShipFlow lang={lang} />
          </InView>
        </CaseBlock>
        <CaseOutcome study={study} ui={ui} name={profile.fullName} />
      </main>
    </>
  );
}
