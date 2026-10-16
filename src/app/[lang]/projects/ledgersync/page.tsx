import type { Metadata } from "next";
import AppDemo from "@/components/case/AppDemo";
import CaseHeader from "@/components/case/CaseHeader";
import { CaseBlock, CaseHero, CaseOutcome } from "@/components/case/CaseParts";
import FormulaPlayground from "@/components/case/FormulaPlayground";
import InView from "@/components/case/InView";
import { BalancedPiece, DesktopStack, ManualWork, Pipeline, Reconcile } from "@/components/case/LedgerVisuals";
import PageEffects from "@/components/PageEffects";
import { ledgersyncCase as study } from "@/content/case-studies";
import { profile } from "@/content/portfolio";

export const metadata: Metadata = {
  title: `${study.title} — case study · ${profile.fullName}`,
  description: study.summary,
};

export default function LedgerSyncPage() {
  const { sections } = study;
  return (
    <>
      <PageEffects />
      <CaseHeader next={study.next} />
      <main>
        <CaseHero study={study} visual={<AppDemo />} />
        <CaseBlock section={sections.problem}>
          <InView>
            <ManualWork />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.pipeline}>
          <InView>
            <Pipeline />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.formulas}>
          <FormulaPlayground />
        </CaseBlock>
        <CaseBlock section={sections.balance}>
          <InView>
            <BalancedPiece />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.reconcile}>
          <InView>
            <Reconcile />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.desktop}>
          <InView>
            <DesktopStack />
          </InView>
        </CaseBlock>
        <CaseOutcome study={study} />
      </main>
    </>
  );
}
