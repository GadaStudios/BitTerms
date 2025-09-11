import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextJSTopLoader from "nextjs-toploader";

import "./globals.css";
import { cn } from "@/lib/utils";
import { naughtyMonster } from "@/fonts";
import { siteConfig } from "@/config/site.config";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
import { SanityLive } from "@/lib/live";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-dvh flex-1 flex-col antialiased",
          inter.variable,
          naughtyMonster.variable,
        )}
      >
        <SanityLive />
        <Toaster richColors />
        <NextJSTopLoader
          showSpinner={false}
          showForHashAnchor
          color="var(--primary)"
        />
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
