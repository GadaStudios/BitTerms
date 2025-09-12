import Wrapper from "@/components/shared/wrapper";
import understandData from "@/data/understand.json";

export const UnderstandComp = () => {
  return (
    <section className="pt-24 md:pt-[152px]">
      <Wrapper>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6 text-center sm:max-w-[811px] mx-auto">
            <h3 className="font-normal leading-none">
              Helping people understand Bitcoin{" "}
              <br className="hidden sm:flex" /> One word at a Time!
            </h3>
            <p className="text-base md:text-lg lg:text-xl tracking-tight">
              BitTerms is not just a list of words; it&apos;s a continuous
              project for sharing knowledge and making Bitcoin accessible to
              everyone. Here&apos;s how we do it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {understandData.map((item, index) => (
              <div
                key={index}
                className="border max-w-[316px] sm:max-w-max mx-auto rounded-3xl p-6 flex flex-col gap-[76px] hover:shadow-2xl transition-shadow duration-300 shadow-[rgba(0,0,0,0.1)]"
              >
                <span className="text-5xl">{item.icon}</span>

                <div className="flex flex-col gap-3.5">
                  <p className="text-[22px] font-semibold">{item.title}</p>
                  <p className="text-[15px] font-normal">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  );
};
