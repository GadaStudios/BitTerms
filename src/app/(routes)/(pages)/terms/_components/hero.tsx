import Wrapper from "@/components/wrapper";
import React from "react";
import { SearchFilter } from "./search-filter";

export const TermsHero = () => {
  return (
    <section className="relative">
      <div className="py-36 sm:py-44 md:py-[187px] lg:pt-60">
        <Wrapper className="flex flex-col text-center gap-8 md:gap-14">
          <div className="flex flex-col gap-4">
            <h2 className="text-center flex flex-col">
              Looking for a term? <br /> See its simplified definition
            </h2>
            <p className="text-base md:text-lg lg:text-xl tracking-tight max-w-[640px] w-full mx-auto">
              Find or search for terms you want to know about and see a
              simplified definition with accompanied illustration
            </p>
          </div>

          <SearchFilter />
        </Wrapper>
      </div>
    </section>
  );
};
