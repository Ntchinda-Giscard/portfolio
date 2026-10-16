import type { Metadata } from "next";
import { notFound } from "next/navigation";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Approach from "@/components/Approach";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PageEffects from "@/components/PageEffects";
import Security from "@/components/Security";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import { getContent } from "@/content/portfolio";
import { alternates, isLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? { alternates: alternates(lang, "/") } : {};
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const c = getContent(lang);

  return (
    <>
      <PageEffects />
      <Header lang={lang} profile={c.profile} content={c.header} />
      <main>
        <Hero profile={c.profile} content={c.hero} />
        <About num="01" profile={c.profile} content={c.about} />
        <Services num="02" profile={c.profile} content={c.services} />
        <Work num="03" lang={lang} content={c.work} />
        <Approach num="04" content={c.approach} />
        <Security num="05" content={c.security} />
        <Skills num="06" content={c.skills} />
        <Experience num="07" content={c.experience} />
        <Certifications num="08" content={c.certifications} />
        <Achievements num="09" content={c.achievements} />
        <Contact num="10" lang={lang} profile={c.profile} content={c.contact} />
      </main>
    </>
  );
}
