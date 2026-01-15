import { Metadata } from "next";

import { siteConfig } from "@/config/site.config";
import { HeroComp } from "./_components/hero.comp";
import { RecentlyAddedComp } from "./_components/recent.comp";
import { FormComp } from "./_components/form.comp";

export const metadata: Metadata = {
  title: siteConfig.suggest.title,
  description: siteConfig.suggest.description,
  keywords: [
    "suggest Bitcoin term",
    "contribute to BitTerms",
    "Bitcoin definition contribution",
    "community contributed terms",
  ],
  openGraph: {
    title: siteConfig.suggest.title,
    description: siteConfig.suggest.description,
    type: "website",
    siteName: siteConfig.suggest.title,
    url: `${siteConfig.url}/suggest`,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.suggest.title,
    description: siteConfig.suggest.description,
  },
};

export default function Suggest() {
  return (
    <div className="flex flex-1 flex-col overflow-x-clip">
      <HeroComp />
      <RecentlyAddedComp />
      <FormComp />
    </div>
  );
}
