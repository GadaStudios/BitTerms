import Wrapper from "@/components/wrapper";
import { useTranslations } from "next-intl";

export const HeroComp = () => {
  const t = useTranslations("suggest");

  return (
    <section className="relative pt-36 sm:pt-44 md:pt-[187px]">
      <Wrapper className="flex flex-col gap-4 text-center">
        <h2 className="flex flex-col text-center">{t("title")}</h2>
        <p className="mx-auto w-full max-w-[606px] text-base md:text-lg lg:text-xl">
          {t("description")}
        </p>
      </Wrapper>
    </section>
  );
};
