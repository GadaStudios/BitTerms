import React from "react";
import { Metadata } from "next";

import { TermsHero } from "./_components/hero";
import { siteConfig } from "@/config/site.config";
import { Terms } from "./_components/terms";
import { sanityFetch } from "@/lib/live";
import { queryApprovedTerms } from "@/lib/queries";
import Wrapper from "@/components/wrapper";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="flex flex-1 flex-col overflow-x-clip">
      <React.Suspense fallback={null}>
        <TermsHero />
      </React.Suspense>

      <React.Suspense fallback={<FallbackTerms />}>
        <Terms termsData={terms} />
      </React.Suspense>
    </div>
  );
}

const FallbackTerms = () => {
  const filters = [
    "all",
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
    "symbol",
  ];

  return (
    <section className="pb-16 md:py-16 lg:py-24">
      <Wrapper className="flex flex-col gap-10 md:max-w-[752px]">
        <div className="bg-background py-4 md:py-6">
          <div className="z-50 flex w-full flex-wrap justify-center gap-1 whitespace-pre md:gap-2">
            {filters.map((label) => {
              return (
                <Skeleton
                  key={label}
                  className="h-[34px] w-[30px] !rounded-[12px] px-3 font-mono text-lg first-of-type:w-[55px] sm:h-[44px] sm:px-4 md:px-5 md:text-xl first-of-type:md:w-[84px] lg:text-2xl"
                />
              );
            })}
          </div>
        </div>

        <div className="flex w-full flex-col gap-8">
          {[...new Array(2)].map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-end gap-2">
                <Skeleton className="h-[40px] w-max rounded-[12px] px-6 font-medium md:h-[48px] lg:h-[64px]" />
                <Skeleton className="mb-2 size-4 rounded-full" />
              </div>

              <ul className="flex flex-col">
                {[...new Array(2)].map((_, index) => (
                  <li
                    key={index}
                    className="flex justify-between gap-3.5 border-b py-8 first-of-type:border-t last-of-type:border-b-0"
                  >
                    <div className="flex max-w-[500px] flex-1 flex-col gap-6">
                      <div className="flex flex-col gap-4 md:gap-6">
                        <div className="flex items-center gap-4">
                          <Skeleton className="h-[18px] w-32 font-medium md:h-5 lg:h-6" />
                          <Skeleton className="size-9 lg:size-11" />
                        </div>

                        <div className="flex flex-1 flex-col gap-2">
                          <Skeleton className="h-4 w-full md:h-[18px]" />
                          <Skeleton className="h-4 w-[80%] md:h-[18px]" />
                        </div>

                        <Skeleton className="h-4 w-[60%]" />
                      </div>
                    </div>

                    <Skeleton className="size-[92px] origin-top-right rounded-[12px] md:size-[160px]" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Wrapper>
    </section>
  );
};
