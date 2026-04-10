import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site.config";
import { routing } from "@/i18n/routing";

export default async function Head(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "metadata" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("title"),
    description: t("description"),
    url: siteConfig.url,
    creator: {
      "@type": "Organization",
      name: t("title"),
    },
    inLanguage: locale === "en" ? "en-US" : locale,
    isAccessibleForFree: true,
  };

  return (
    <>
      {routing.locales.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${siteConfig.url}/${l}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${siteConfig.url}/${routing.defaultLocale}`}
      />
      <link
        rel="search"
        type="application/opensearchdescription+xml"
        title="BitTerms Search"
        href="/opensearch.xml"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta
        name="apple-mobile-web-app-title"
        content={siteConfig.default.title}
      />
      <meta
        name="theme-color"
        content="#ffffff"
        media="(prefers-color-scheme: light)"
      />
      <meta
        name="theme-color"
        content="#000000"
        media="(prefers-color-scheme: dark)"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
