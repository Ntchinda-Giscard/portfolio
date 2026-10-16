import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppDemo from "@/components/case/AppDemo";
import CaseHeader from "@/components/case/CaseHeader";
import { CaseBlock, CaseHero, CaseOutcome } from "@/components/case/CaseParts";
import FormulaPlayground from "@/components/case/FormulaPlayground";
import InView from "@/components/case/InView";
import { BalancedPiece, DesktopStack, ManualWork, Pipeline, Reconcile } from "@/components/case/LedgerVisuals";
import PageEffects from "@/components/PageEffects";
import { getCaseStudy, getCaseUi } from "@/content/case-studies";
import { profile } from "@/content/portfolio";
import { alternates, fill, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/ledgersync">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const study = getCaseStudy("ledgersync", lang);
  const title = fill(getCaseUi(lang).metaTitle, { title: study.title, name: profile.fullName });
  return {
    title,
    description: study.summary,
    alternates: alternates(lang, "/projects/ledgersync"),
    openGraph: { title, description: study.summary, type: "article" },
  };
}

export default async function LedgerSyncPage({ params }: PageProps<"/[lang]/projects/ledgersync">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const study = getCaseStudy("ledgersync", lang);
  const ui = getCaseUi(lang);
  const { sections } = study;

  return (
    <>
      <PageEffects />
      <CaseHeader lang={lang} name={profile.fullName} initials={profile.initials} ui={ui} next={study.next} />
      <main>
        <CaseHero study={study} ui={ui} visual={<AppDemo lang={lang} />} />
        <CaseBlock section={sections.problem}>
          <InView>
            <ManualWork lang={lang} />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.pipeline}>
          <InView>
            <Pipeline lang={lang} />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.formulas}>
          <FormulaPlayground lang={lang} />
        </CaseBlock>
        <CaseBlock section={sections.balance}>
          <InView>
            <BalancedPiece lang={lang} />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.reconcile}>
          <InView>
            <Reconcile lang={lang} />
          </InView>
        </CaseBlock>
        <CaseBlock section={sections.desktop}>
          <InView>
            <DesktopStack lang={lang} />
          </InView>
        </CaseBlock>
        <CaseOutcome study={study} ui={ui} name={profile.fullName} />
      </main>
    </>
  );
}
