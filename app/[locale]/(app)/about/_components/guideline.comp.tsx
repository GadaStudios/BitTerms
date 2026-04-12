import { env } from "@/lib/env";
import Wrapper from "@/components/wrapper";
import { AboutCard } from "@/components/about-card";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const GuidelineComp = () => {
  const t = useTranslations("about.guidelines");

  const guidelineData = t.raw("guideline_data") as {
    title: string;
    guides: { label: string; description: string }[];
  }[];

  return (
    <Wrapper>
      <div className="flex flex-col gap-8">
        <div className="mx-auto flex max-w-[811px] flex-col gap-6 text-center">
          <h3 className="leading-none font-normal">{t("title")}</h3>
        </div>

        <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
          {guidelineData.map((guideline, index) => (
            <div
              key={guideline.title ?? index}
              className="flex flex-col gap-4 sm:gap-6"
            >
              <p className="text-[22px] font-semibold sm:text-2xl md:text-[28px]">
                {guideline.title}
              </p>

              <div className="grid grid-cols-1 gap-4">
                {guideline.guides.map((guides, idx) => (
                  <AboutCard
                    key={idx}
                    index={idx}
                    label={guides.label}
                    description={guides.description}
                    className={index === 1 ? "bg-foreground" : "bg-[#3A9CFF]"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
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
    </Wrapper>
  );
};
