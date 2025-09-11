import React from "react";
import Wrapper from "@/components/wrapper";
import { RecentlyAdded } from "./recent";

export const SuggestHero = () => {
  return (
    <section className="relative">
      <div className="pt-36 sm:pt-44 md:pt-[187px] lg:pt-60">
        <Wrapper className="flex flex-col gap-8 text-center md:gap-14">
          <div className="flex flex-col gap-4">
            <h2 className="flex flex-col text-center">Suggest a Term</h2>
            <p className="mx-auto w-full max-w-[606px] text-base md:text-lg lg:text-xl">
              Confusing jargon? Not here. From the market woman to the tech bro,
              BitTerms helps everyone make sense of Bitcoin, one simple
              definition at a time.
            </p>
          </div>

          <RecentlyAdded />
        </Wrapper>
      </div>
    </section>
  );
};
