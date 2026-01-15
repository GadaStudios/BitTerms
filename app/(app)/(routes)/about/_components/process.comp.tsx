import Link from "next/link";

import { env } from "@/lib/env";
import Wrapper from "@/components/wrapper";
import { PROCESS_DATA } from "@/lib/constants";
import { AboutCard } from "@/components/about-card";
import { buttonVariants } from "@/components/ui/button";

export const ProcessComp = () => {
  return (
    <Wrapper id="guideline">
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

          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
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

        <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
          {PROCESS_DATA.map((item, idx) => (
            <AboutCard
              key={idx}
              index={idx}
              label={item.title}
              description={item.description}
              className="bg-[#A1BF03]"
            />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};
