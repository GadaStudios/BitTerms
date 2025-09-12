import React from "react";

import Wrapper from "@/components/shared/wrapper";

export const HeroComp = () => {
  return (
    <section className="relative pt-36 sm:pt-44 md:pt-[187px]">
      <Wrapper className="flex flex-col gap-4 text-center">
        <h2 className="flex flex-col text-center">
          Looking for a term? <br /> See its simplified definition
        </h2>
        <p className="mx-auto w-full max-w-[640px] text-base md:text-lg lg:text-xl">
          Find or search for terms you want to know about and see a simplified
          definition with accompanied illustration
        </p>
      </Wrapper>
    </section>
  );
};
