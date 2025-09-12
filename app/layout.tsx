import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";

import "./globals.css";
import { cn } from "@/lib/utils";
import { naughtyMonster } from "@/fonts";
import { SanityLive } from "@/sanity/lib/live";
import { siteConfig } from "@/config/site.config";
import { draftMode } from "next/headers";
import { GlobalProvider } from "./provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
    icon: "/hero.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex flex-1 flex-col antialiased",
          inter.variable,
          naughtyMonster.variable,
        )}
      >
        <GlobalProvider>
          {children}
          <SanityLive />
          {(await draftMode()).isEnabled && <VisualEditing />}
        </GlobalProvider>
      </body>
    </html>
  );
}
