import React from "react";
import Link from "next/link";

import { guidelineData } from "@/lib/constants";
import Wrapper from "@/components/shared/wrapper";
import { buttonVariants } from "@/components/ui/button";

export const GuidelineComp = () => {
  return (
    <section className="pt-24 md:pt-[152px]">
      <Wrapper>
        <div className="flex flex-col gap-8">
          <div className="mx-auto flex max-w-[811px] flex-col gap-6 text-center">
            <h3 className="leading-none font-normal">
              Contribution Guidelines
            </h3>
          </div>

          <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
            {guidelineData.map((guideline, index) => (
              <div
                key={guideline.title ?? index}
                className="flex flex-col gap-4 sm:gap-6"
              >
                <p className="text-[22px] font-semibold sm:text-2xl md:text-[28px]">
                  {guideline.title}
                </p>

                <div className="grid grid-cols-1 gap-4">
                  {guideline.guides.map((guides, idx) => (
                    <div
                      key={guides.label || idx}
                      className="flex w-full items-start gap-6 rounded-3xl border p-6 md:max-w-[472px]"
                    >
                      <div
                        className={`text-background flex size-10 flex-shrink-0 items-center justify-center rounded-[8px] text-lg font-bold ${
                          guideline.title === "Illustration Guide"
                            ? "bg-foreground"
                            : "bg-[#3A9CFF]"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-semibold sm:text-xl md:text-[22px]">
                          {guides.label}
                        </p>
                        <p className="text-base font-normal tracking-tight">
                          {guides.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4">
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
      </Wrapper>
    </section>
  );
};
