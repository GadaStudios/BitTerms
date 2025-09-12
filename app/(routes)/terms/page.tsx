import React from "react";
import { Metadata } from "next";

import { siteConfig } from "@/config/site.config";
import { HeroComp } from "./_components/hero.comp";
import { FilterComp } from "./_components/filter.comp";
import { TermsComp } from "./_components/terms.comp";
import { Skeleton } from "@/components/ui/skeleton";
import Wrapper from "@/components/shared/wrapper";

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
      <React.Suspense
        fallback={
          <Wrapper className="mt-12 flex w-full flex-col gap-8 md:max-w-[752px]">
            <div className="flex w-full flex-col gap-8">
              {[...new Array(3)].map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-end gap-2">
                    <Skeleton className="h-[40px] w-max rounded-[12px] px-6 font-medium md:h-[48px] lg:h-[64px]" />
                    <Skeleton className="mb-2 size-4 rounded-full" />
                  </div>
                  <ul className="flex flex-col">
                    {[...new Array(2)].map((_, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between gap-3.5 border-b py-8 first-of-type:border-t last-of-type:border-b-0"
                      >
                        <div className="flex max-w-[500px] flex-1 flex-col gap-6">
                          <div className="flex flex-col gap-4 md:gap-6">
                            <div className="flex items-center gap-4">
                              <Skeleton className="h-[18px] w-32 font-medium md:h-5 lg:h-6" />
                              <Skeleton className="size-9 lg:size-12" />
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
        }
      >
        <TermsComp />
      </React.Suspense>
    </div>
  );
}
