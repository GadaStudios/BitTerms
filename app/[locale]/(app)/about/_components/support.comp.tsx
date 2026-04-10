import Wrapper from "@/components/wrapper";
import { SUPPORT_DATA } from "@/lib/constants";
import { useTranslations } from "next-intl";

export const SupportComp = () => {
  const t = useTranslations("about.support");

  const supportData = t.raw("support_data") as {
    title: string;
    description: string;
  }[];

  return (
    <Wrapper>
      <div className="flex flex-col gap-10">
        <div className="mx-auto flex flex-col gap-6 text-center sm:max-w-[811px]">
          <h3 className="leading-none font-normal">{t("title")}</h3>
          <p className="text-base tracking-tight md:text-lg lg:text-xl">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {supportData.map((item, index) => (
            <div
              key={index}
              className="mx-auto flex max-w-[316px] flex-col gap-[76px] rounded-3xl border p-6 shadow-[rgba(0,0,0,0.1)] transition-shadow duration-300 hover:shadow-2xl sm:max-w-max"
            >
              <span className="text-5xl">{SUPPORT_DATA[index].icon}</span>

              <div className="flex flex-col gap-3.5">
                <p className="text-[22px] font-semibold">{item.title}</p>
                <p className="text-[15px] font-normal">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};
