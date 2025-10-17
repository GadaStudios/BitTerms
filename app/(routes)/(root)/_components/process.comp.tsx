import React from "react";
import Link from "next/link";

import { processData } from "@/lib/constants";
import Wrapper from "@/components/shared/wrapper";
import { buttonVariants } from "@/components/ui/button";

export const ProcessComp = () => {
  return (
    <section className="pt-24 md:pt-[152px]" id="guideline">
      <Wrapper>
        <div className="mx-auto grid grid-cols-1 gap-8 md:gap-16 lg:grid-cols-2">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 md:gap-8 lg:mx-0 lg:max-w-[472px] lg:items-start">
            <h3 className="leading-none font-normal">How to Contribute</h3>
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <p className="text-base tracking-tight md:text-lg lg:text-xl">
                Want to help make Bitcoin more accessible? You’re in the right
                place. This section shows you how to get involved with BitTerms.
                Whether you’re simplifying terms, drawing illustrations, or
                suggesting improvements, we’ve made it easy to jump in and
                collaborate with the community.
              </p>
              <p className="text-base tracking-tight md:text-lg lg:text-xl">
                Help others learn by adding your own simple explanations,
                suggesting definitions, sharing feedback, or contributing via
                images. Every bit helps someone else learn.
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 md:justify-start">
              <Link href="/suggest" className={buttonVariants({ size: "lg" })}>
                <span>Suggest a term</span>
              </Link>

              <Link
                target="_blank"
                href="https://github.com/bitterms"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                <span>See Github Repo</span>
              </Link>
            </div>
          </div>

          <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
            {processData.map((process, index) => (
              <div
                key={process.title || index}
                className="flex w-full items-start gap-6 rounded-3xl border p-6 md:max-w-[472px]"
              >
                <div className="text-background flex size-10 flex-shrink-0 items-center justify-center rounded-[8px] bg-[#A1BF03] text-lg font-bold">
                  {index + 1}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-semibold sm:text-xl md:text-[22px]">
                    {process.title}
                  </p>
                  <p className="text-base font-normal tracking-tight">
                    {process.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};
