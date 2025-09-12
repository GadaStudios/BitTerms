import React from "react";
import { Metadata } from "next";

import { siteConfig } from "@/config/site.config";
import { HeroComp } from "./_components/hero.comp";
import { FilterComp } from "./_components/filter.comp";
import { TermsComp } from "./_components/terms.comp";

export const metadata: Metadata = {
  title: siteConfig.terms.title,
  description: siteConfig.terms.description,
  openGraph: {
    title: siteConfig.terms.title,
    description: siteConfig.terms.description,
    url: siteConfig.url,
    type: "website",
    siteName: siteConfig.terms.title,
  },
};

export default async function TermsPage() {
  return (
    <div className="flex flex-1 flex-col overflow-x-clip">
      <HeroComp />
      <FilterComp />
      <TermsComp />
    </div>
  );
}
