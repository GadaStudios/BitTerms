import Image from "next/image";
import Wrapper from "@/components/wrapper";
import { SearchComp } from "./search.comp";
import { IllustrationComp } from "./illustration.comp";
import React from "react";
import { useTranslations } from "next-intl";

export const HeroComp = () => {
  const t = useTranslations("hero");

  return (
    <section className="text-background bg-foreground relative w-full">
      <Image
        src="/svg/texture.svg"
        alt=""
        width="1440"
        height="311"
        priority
        className="absolute -bottom-8 left-1/2 w-dvw -translate-x-1/2 scale-[115%] rotate-180 object-contain sm:-bottom-10 md:-bottom-16"
      />

      <div className="relative py-36 pb-16 sm:pt-44">
        <Wrapper className="flex flex-col gap-2 text-center">
          <div className="mb-6 flex flex-col gap-4">
            <h1 className="flex flex-col text-center leading-[0.95]">
              <span className="flex items-end justify-center leading-[0.95]">
                {t("title_part1")}{" "}
                <IllustrationComp className="ml-3 w-[102px] sm:mr-3 sm:ml-6 sm:w-[132px] md:w-[165px] lg:w-[189px]" />{" "}
                {t("title_part2")}
              </span>
              <span>{t("subtitle")}</span>
            </h1>
            <p className="mx-auto w-full max-w-[790px] text-base md:text-lg lg:text-xl">
              {t("description")}
            </p>
          </div>

          <React.Suspense fallback={<div className="h-20 w-full" />}>
            <SearchComp reverse />
          </React.Suspense>
        </Wrapper>
      </div>
    </section>
  );
};
