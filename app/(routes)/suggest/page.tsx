import { Metadata } from "next";

import { HeroComp } from "./_components/hero.comp";
import { SuggestFormComp } from "./_components/suggestForm.comp";
import { siteConfig } from "@/config/site.config";
import { RecentlyAddedComp } from "./_components/recent.comp";

export const metadata: Metadata = {
  title: siteConfig.suggest.title,
  description: siteConfig.suggest.description,
  openGraph: {
    title: siteConfig.suggest.title,
    description: siteConfig.suggest.description,
    url: siteConfig.url,
    type: "website",
    siteName: siteConfig.suggest.title,
  },
};

export default function SuggestTermPage() {
  return (
    <div className="flex flex-1 flex-col overflow-x-clip">
      <HeroComp />
      <RecentlyAddedComp />
      <SuggestFormComp />
    </div>
  );
}
