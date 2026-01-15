import type { Metadata } from "next";

import "./globals.css";
import { fontVariable } from "@/lib/fonts";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: {
    template: `%s • ${siteConfig.default.title}`,
    default: siteConfig.default.title,
  },
  description: siteConfig.default.description,
  keywords: [
    "Bitcoin",
    "cryptocurrency",
    "Bitcoin terms",
    "crypto glossary",
    "Bitcoin education",
    "Bitcoin learning",
    "Bitcoin definitions",
    "blockchain",
    "crypto terms",
    "Bitcoin explained",
  ],
  metadataBase: siteConfig.url,
  authors: [{ name: siteConfig.default.title, url: siteConfig.url }],
  creator: siteConfig.default.title,
  publisher: siteConfig.default.title,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.default.title,
    siteName: siteConfig.default.title,
    description: siteConfig.default.description,
    images: [
      {
        url: `${siteConfig.url}/svg/favicon.svg`,
        width: 189,
        height: 209,
        alt: siteConfig.default.title,
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.default.title,
    description: siteConfig.default.description,
    creator: "@bit_terms",
    images: [
      {
        url: `${siteConfig.url}/svg/favicon.svg`,
        width: 189,
        height: 209,
        alt: siteConfig.default.title,
      },
    ],
  },
  icons: [
    {
      url: "/svg/favicon.svg",
      media: "(prefers-color-scheme: light)",
    },
    {
      url: "/svg/favicon.svg",
      media: "(prefers-color-scheme: dark)",
    },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.default.title,
  },
  manifest: "/manifest.json",
  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.default.title,
    description: siteConfig.default.description,
    url: siteConfig.url,
    creator: {
      "@type": "Organization",
      name: siteConfig.default.title,
      url: siteConfig.url,
    },
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  console.log(
    `${new Date().toLocaleString("en-US")} (UTC${
      -new Date().getTimezoneOffset() / 60
    })`,
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="en" href={siteConfig.url.toString()} />
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
      </head>
      <body className={fontVariable("flex flex-1 flex-col antialiased")}>
        {children}
      </body>
    </html>
  );
}
