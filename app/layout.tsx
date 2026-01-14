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
  openGraph: {
    title: siteConfig.default.title,
    description: siteConfig.default.description,
    url: siteConfig.url,
    type: "website",
    siteName: siteConfig.default.title,
  },
  icons: {
    icon: "/svg/hero.svg",
  },
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
