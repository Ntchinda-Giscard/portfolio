import type { Metadata } from "next";
import CaseHeader from "@/components/case/CaseHeader";
import { CaseBlock, CaseHero, CaseOutcome } from "@/components/case/CaseParts";
import InView from "@/components/case/InView";
import StateMachine from "@/components/case/StateMachine";
import { FlowCards, Layers, Resilience, ShipFlow, SyncMap, VpnStrip } from "@/components/case/WazalinkVisuals";
import PageEffects from "@/components/PageEffects";
import { wazalinkCase as study } from "@/content/case-studies";
import { profile } from "@/content/portfolio";

export const metadata: Metadata = {
  title: `${study.title} — case study · ${profile.fullName}`,
  description: study.summary,
};

export default function WazalinkPage() {
  const { sections } = study;
  return (
    <>
      <PageEffects />
      <CaseHeader next={study.next} />
      <main>
        <CaseHero
          study={study}
          visual={
            <InView>
              <SyncMap />
            </InView>
          }
        />
        <CaseBlock section={sections.problem}>
          <InView>
            <VpnStrip />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.architecture}>
          <InView>
            <Layers />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.flows}>
          <InView>
            <FlowCards />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.states}>
          <StateMachine />
        </CaseBlock>
        <CaseBlock section={sections.resilience}>
          <InView>
            <Resilience />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.shipping}>
          <InView>
            <ShipFlow />
          </InView>
        </CaseBlock>
        <CaseOutcome study={study} />
      </main>
    </>
  );
}
