import Wrapper from "@/components/wrapper";

export const HeroComp = () => {
  return (
    <section className="relative pt-36 sm:pt-44 md:pt-[187px]">
      <Wrapper className="flex flex-col gap-4 text-center">
        <h2 className="flex flex-col text-center">Suggest a Term</h2>
        <p className="mx-auto w-full max-w-[606px] text-base md:text-lg lg:text-xl">
          Confusing jargon? Not here. From the market woman to the tech bro,
          BitTerms helps everyone make sense of Bitcoin, one simple definition
          at a time.
        </p>
      </Wrapper>
    </section>
  );
};
