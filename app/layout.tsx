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
  metadataBase: siteConfig.url,
  authors: [{ name: siteConfig.default.title, url: siteConfig.url }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.default.title,
    description: siteConfig.default.description,
    images: [
      {
        url: `${siteConfig.url}/svg/logo.svg`,
        width: 660,
        height: 190,
        alt: siteConfig.default.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.default.title,
    description: siteConfig.default.description,
    images: [
      {
        url: `${siteConfig.url}/svg/logo.svg`,
        width: 660,
        height: 190,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontVariable("flex flex-1 flex-col antialiased")}>
        {children}
      </body>
    </html>
  );
}
