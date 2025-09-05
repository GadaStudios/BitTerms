import React, { Suspense } from "react";
import { Metadata } from "next";

import { TermsHero } from "./_components/hero";
import { siteConfig } from "@/config/site.config";
import { Terms } from "./_components/terms";
import { sanityFetch } from "@/lib/live";
import { queryApprovedTerms } from "@/lib/queries";

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
  const result = await sanityFetch({
    query: queryApprovedTerms(),
  });

  const terms: TermInstance[] = result.data;

  return (
    <div className="flex flex-col flex-1 overflow-x-clip">
      <Suspense fallback={null}>
        <TermsHero />
      </Suspense>
      <Suspense fallback={null}>
        <Terms termsData={terms} />
      </Suspense>
    </div>
  );
}
