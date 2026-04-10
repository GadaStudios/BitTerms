import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site.config";
import { HeroComp } from "./_components/hero.comp";
import { RecentlyAddedComp } from "./_components/recent.comp";
import { FormComp } from "./_components/form.comp";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata.suggest" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      siteName: t("title"),
      url: `${siteConfig.url}/${locale}/suggest`,
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

export default async function Suggest() {
  return (
    <div className="flex flex-1 flex-col overflow-x-clip">
      <HeroComp />
      <RecentlyAddedComp />
      <FormComp />
    </div>
  );
}
