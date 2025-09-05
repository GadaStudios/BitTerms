import Wrapper from "@/components/wrapper";
import React from "react";
import { RecentlyAdded } from "./recent";
import { SuggestForm } from "./suggest-form";

export const SuggestHero = () => {
  return (
    <section className="relative">
      <div className="py-36 sm:py-44 md:py-[187px] lg:pt-60">
        <Wrapper className="flex flex-col text-center gap-8 md:gap-14">
          <div className="flex flex-col gap-4">
            <h2 className="text-center flex flex-col">Suggest a Term</h2>
            <p className="text-base md:text-lg lg:text-xl max-w-[606px] w-full mx-auto">
              Confusing jargon? Not here. From the market woman to the tech bro,
              BitTerms helps everyone make sense of Bitcoin, one simple
              definition at a time.
            </p>
          </div>

          <RecentlyAdded />

          <SuggestForm />
        </Wrapper>
      </div>
    </section>
  );
};
