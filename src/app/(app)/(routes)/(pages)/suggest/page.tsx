import { Metadata } from "next";

import { siteConfig } from "@/config/site.config";
import { SuggestHero } from "./_components/hero";
import { SuggestForm } from "./_components/suggest-form";

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
      <SuggestHero />
      <SuggestForm />
    </div>
  );
}
