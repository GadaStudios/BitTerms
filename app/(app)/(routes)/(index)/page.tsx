import type { Metadata } from "next";
import { siteConfig } from "@/config/site.config";
import { HeroComp } from "./_components/hero.comp";
import { TermsComp } from "./_components/terms.comp";

export const metadata: Metadata = {
  title: siteConfig.default.title,
  description: siteConfig.default.description,
  keywords: [
    "Bitcoin terms",
    "cryptocurrency glossary",
    "Bitcoin definitions",
    "learn Bitcoin",
    "crypto terminology",
  ],
  openGraph: {
    title: siteConfig.default.title,
    description: siteConfig.default.description,
    type: "website",
    url: siteConfig.url,
  },
};

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col overflow-x-clip">
      <HeroComp />
      <TermsComp />
    </div>
  );
}
