import Link from "next/link";

import Wrapper from "@/components/wrapper";
import { buttonVariants } from "@/components/ui/button";
import { HeroIllustration } from "./hero-illustration";

export const HomeHero = () => {
  return (
    <section className="text-background relative bg-foreground">
      <div className="py-36 sm:py-44 md:py-[187px] relative">
        <Wrapper className="flex flex-col text-center gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-center leading-[0.95] flex flex-col">
              <span className="flex items-end leading-[0.95] justify-center">
                BITCOIN{" "}
                <HeroIllustration className="ml-3 w-[102px] sm:w-[132px] md:w-[165px] lg:w-[189px]" />{" "}
                TERMS
              </span>
              <span>FINALLY MADE SIMPLE</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl tracking-tight max-w-[790px] w-full mx-auto">
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
