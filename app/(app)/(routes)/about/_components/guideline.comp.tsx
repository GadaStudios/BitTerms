import Link from "next/link";

import Wrapper from "@/components/wrapper";
import { GUIDELINE_DATA } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { env } from "@/lib/env";
import { AboutCard } from "@/components/about-card";

export const GuidelineComp = () => {
  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <div className="mx-auto flex max-w-[811px] flex-col gap-6 text-center">
          <h3 className="leading-none font-normal">Contribution Guidelines</h3>
        </div>

        <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {GUIDELINE_DATA.map((guideline, index) => (
            <div
              key={guideline.title ?? index}
              className="flex flex-col gap-4 sm:gap-6"
            >
              <p className="text-[22px] font-semibold sm:text-2xl md:text-[28px]">
                {guideline.title}
              </p>

              <div className="grid grid-cols-1 gap-4">
                {guideline.guides.map((guides, idx) => (
                  <AboutCard
                    key={idx}
                    index={idx}
                    label={guides.label}
                    description={guides.description}
                    className={
                      guideline.title === "Illustration Guide"
                        ? "bg-foreground"
                        : "bg-[#3A9CFF]"
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/suggest" className={buttonVariants({ size: "lg" })}>
            <span>Suggest a term</span>
          </Link>

          <Link
            target="_blank"
            href={{ pathname: env.githubUrl }}
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            <span>See Github Repo</span>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};
