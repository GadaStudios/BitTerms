import React, { Suspense } from "react";
import { Metadata } from "next";

import { TermsHero } from "./_components/hero";
import { siteConfig } from "@/config/site.config";
import { Terms } from "./_components/terms";

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

export default function TermsPage() {
  return (
    <div className="flex flex-col flex-1 overflow-x-clip">
      <Suspense fallback={null}>
        <TermsHero />
      </Suspense>
      <Suspense fallback={null}>
        <Terms />
      </Suspense>
    </div>
  );
}
