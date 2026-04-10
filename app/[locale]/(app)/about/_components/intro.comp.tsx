import Image from "next/image";
import { INTRO_DATA } from "@/lib/constants";
import Wrapper from "@/components/wrapper";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const IntroComp = () => {
  const t = useTranslations("about");

  const introData = t.raw("intro_data") as {
    title: string;
    description: string;
  }[];

  return (
    <Wrapper>
      <div className="flex grid-cols-1 flex-col-reverse gap-8 md:gap-16 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          {introData.map((intro, index) => {
            const constantData = INTRO_DATA[index];
            return (
              <div
                key={intro.title || index}
                style={{
                  backgroundColor: constantData.bgColor,
                  borderColor: constantData.borderColor,
                  transform: `rotate(${Number(constantData.rotate) * -1}deg)`,
                }}
                className="mx-auto flex max-w-[472px] items-center gap-2 rounded-3xl border px-6 py-5 nth-[2]:z-10 nth-[2]:-mt-1 nth-[2]:-mb-6 md:rounded-4xl md:px-7 lg:mx-0 lg:max-w-max"
              >
                <div className="flex flex-1 flex-col gap-3 md:gap-4">
                  <p className="text-base font-semibold md:text-[22px]">
                    {intro.title}
                  </p>
                  <p className="text-xs sm:text-[13px] md:text-sm lg:text-base">
                    {intro.description}
                  </p>
                </div>

                <Image
                  src={`/illustrations/${constantData.illustration}.svg`}
                  alt={intro.title}
                  width={113}
                  height={113}
                  priority
                  quality={100}
                  className="size-[85px] object-cover md:size-[113px]"
                />
              </div>
            );
          })}
        </div>

        <div className="mx-auto flex max-w-2xl flex-col justify-center gap-4 text-center md:gap-8 md:text-start lg:mx-0 lg:max-w-[472px]">
          <h3 className="leading-none font-normal">{t("title")}</h3>
          <div className="flex flex-col gap-4">
            <p className="text-base tracking-tight md:text-lg lg:text-xl">
              {t("description")}
            </p>
          </div>

          <Link
            href="/"
            className={buttonVariants({
              size: "lg",
              className: "mx-auto w-max md:mx-0",
            })}
          >
            <span>{t("intro_button")}</span>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};
