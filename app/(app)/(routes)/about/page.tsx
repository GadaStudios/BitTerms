import { Metadata } from "next";

import { siteConfig } from "@/config/site.config";
import { IntroComp } from "./_components/intro.comp";
import { ProcessComp } from "./_components/process.comp";
import { SupportComp } from "./_components/support.comp";
import { GuidelineComp } from "./_components/guideline.comp";

export const metadata: Metadata = {
  title: siteConfig.about.title,
  description: siteConfig.about.description,
  keywords: [
    "about BitTerms",
    "Bitcoin education project",
    "cryptocurrency learning",
    "open source Bitcoin terms",
  ],
  openGraph: {
    title: siteConfig.about.title,
    description: siteConfig.about.description,
    type: "website",
    siteName: siteConfig.about.title,
    url: `${siteConfig.url}/about`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.about.title,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.about.title,
    description: siteConfig.about.description,
    creator: "@bit_terms",
    images: ["/twitter-image.png"],
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-1 flex-col gap-24 overflow-x-clip pt-[152px] pb-24 md:gap-[152px] lg:pt-48">
      <IntroComp />
      <SupportComp />
      <ProcessComp />
      <GuidelineComp />
    </div>
  );
}
