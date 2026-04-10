import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site.config";
import { IntroComp } from "./_components/intro.comp";
import { ProcessComp } from "./_components/process.comp";
import { SupportComp } from "./_components/support.comp";
import { GuidelineComp } from "./_components/guideline.comp";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      siteName: t("title"),
      url: `${siteConfig.url}/${locale}/about`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: t("title"),
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@bit_terms",
      images: ["/twitter-image.png"],
    },
  };
}

export default async function TermsPage() {
  return (
    <div className="flex flex-1 flex-col gap-24 overflow-x-clip pt-[152px] pb-24 md:gap-[152px] lg:pt-48">
      <IntroComp />
      <SupportComp />
      <ProcessComp />
      <GuidelineComp />
    </div>
  );
}
