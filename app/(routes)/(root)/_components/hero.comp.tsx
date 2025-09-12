import React from "react";
import Link from "next/link";
import Image from "next/image";

import Wrapper from "@/components/shared/wrapper";
import { buttonVariants } from "@/components/ui/button";
import { IllustrationComp } from "./illustration.comp";

export const HeroComp = () => {
  return (
    <section className="text-background bg-foreground relative w-full">
      <Image
        src="/texture.svg"
        alt=""
        width="1440"
        height="311"
        priority
        className="absolute -bottom-8 left-1/2 w-dvw -translate-x-1/2 scale-[115%] rotate-180 object-contain sm:-bottom-10 md:-bottom-16"
      />

      <div className="relative pt-36 pb-16 sm:pt-44 md:pt-[187px]">
        <Wrapper className="flex flex-col gap-8 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="flex flex-col text-center leading-[0.95]">
              <span className="flex items-end justify-center leading-[0.95]">
                BITCOIN{" "}
                <IllustrationComp className="ml-3 w-[102px] sm:w-[132px] md:w-[165px] lg:w-[189px]" />{" "}
                TERMS
              </span>
              <span>FINALLY MADE SIMPLE</span>
            </h1>
            <p className="mx-auto w-full max-w-[790px] text-base tracking-tight md:text-lg lg:text-xl">
              Ease into Bitcoin with less jargon and no confusion. Bit Terms
              meets wherever you are, helping you make sense of Bitcoin, one
              clear definition at a time, with friendly visuals so you
              understand and remember.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Link href="/terms" className={buttonVariants({ size: "lg" })}>
              <span>Search terms</span>
            </Link>
            <Link
              href="/suggest"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <span>Suggest a term</span>
            </Link>
          </div>
        </Wrapper>
      </div>
    </section>
  );
};
