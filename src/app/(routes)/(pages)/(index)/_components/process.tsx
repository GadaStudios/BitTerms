import React from "react";
import Link from "next/link";

import Wrapper from "@/components/wrapper";
import processData from "@/data/process.json";
import { buttonVariants } from "@/components/ui/button";

export const Process = () => {
  return (
    <section className="pt-24 md:pt-[152px]">
      <Wrapper>
        <div className="grid mx-auto grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          <div className="flex flex-col items-center lg:items-start gap-6 md:gap-8 max-w-2xl mx-auto lg:mx-0 lg:max-w-[472px]">
            <h3 className="font-normal leading-none">How to Contribute</h3>
            <div className="flex flex-col text-center lg:text-left gap-4">
              <p className="text-base md:text-lg lg:text-xl tracking-tight">
                Want to help make Bitcoin more accessible? You’re in the right
                place. This section shows you how to get involved with BitTerms.
                Whether you’re simplifying terms, drawing illustrations, or
                suggesting improvements, we’ve made it easy to jump in and
                collaborate with the community.
              </p>
              <p className="text-base md:text-lg lg:text-xl tracking-tight">
                Help others learn by adding your own simple explanations,
                suggesting definitions, sharing feedback, or contributing via
                images. Every bit helps someone else learn.
              </p>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
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

          <div className="grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-1 gap-4">
            {processData.map((process, index) => (
              <div
                key={process.title || index}
                className="p-6 rounded-3xl border flex items-start gap-6 w-full md:max-w-[472px]"
              >
                <div className="flex-shrink-0 size-10 rounded-[8px] bg-[#A1BF03] text-background flex items-center justify-center text-lg font-bold">
                  {index + 1}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg sm:text-xl md:text-[22px] font-semibold">
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
