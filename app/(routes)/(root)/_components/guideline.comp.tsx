import React from "react";
import Link from "next/link";

import Wrapper from "@/components/shared/wrapper";
import guidelineData from "@/data/guide.json";
import { buttonVariants } from "@/components/ui/button";

export const GuidelineComp = () => {
  return (
    <section className="pt-24 md:pt-[152px]">
      <Wrapper>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 text-center max-w-[811px] mx-auto">
            <h3 className="font-normal leading-none">
              Contribution Guidelines
            </h3>
          </div>

          <div className="grid mx-auto grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {guidelineData.map((guideline, index) => (
              <div
                key={guideline.title ?? index}
                className="flex flex-col gap-4 sm:gap-6"
              >
                <p className="text-[22px] sm:text-2xl md:text-[28px] font-semibold">
                  {guideline.title}
                </p>

                <div className="grid grid-cols-1 gap-4">
                  {guideline.guides.map((guides, idx) => (
                    <div
                      key={guides.label || idx}
                      className="p-6 rounded-3xl border flex items-start gap-6 w-full md:max-w-[472px]"
                    >
                      <div
                        className={`flex-shrink-0 size-10 rounded-[8px] flex items-center justify-center text-lg font-bold text-background ${
                          guideline.title === "Illustration Guide"
                            ? "bg-foreground"
                            : "bg-[#3A9CFF]"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-lg sm:text-xl md:text-[22px] font-semibold">
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
