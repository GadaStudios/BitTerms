import { Metadata } from "next";

import { siteConfig } from "@/config/site.config";
import { SuggestHero } from "./_components/hero";

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
    <div className="flex flex-col flex-1 overflow-x-clip">
      <SuggestHero />
    </div>
  );
}
