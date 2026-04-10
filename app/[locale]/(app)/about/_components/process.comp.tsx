import { env } from "@/lib/env";
import Wrapper from "@/components/wrapper";
import { AboutCard } from "@/components/about-card";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const ProcessComp = () => {
  const t = useTranslations("about.contribute");

  const processData = t.raw("process_data") as {
    title: string;
    description: string;
  }[];

  return (
    <Wrapper id="guideline">
      <div className="mx-auto grid grid-cols-1 gap-8 md:gap-16 lg:grid-cols-2">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 md:gap-8 lg:mx-0 lg:max-w-[472px] lg:items-start">
          <h3 className="leading-none font-normal">{t("title")}</h3>
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <p className="text-base tracking-tight md:text-lg lg:text-xl">
              {t("p1")}
            </p>
            <p className="text-base tracking-tight md:text-lg lg:text-xl">
              {t("p2")}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <Link href="/suggest" className={buttonVariants({ size: "lg" })}>
              <span>{t("suggest_button")}</span>
            </Link>

            <Link
              target="_blank"
              href={env.githubUrl}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <span>{t("github_button")}</span>
            </Link>
          </div>
        </div>

        <div className="mx-auto flex max-w-2xl flex-col gap-4 lg:mx-0 lg:max-w-max">
          {processData.map((process, index) => (
            <AboutCard
              key={index}
              index={index}
              label={process.title}
              description={process.description}
              className="bg-[#a1bf03]"
            />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};
