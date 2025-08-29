import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { naughtyMonster } from "@/fonts";
import { siteConfig } from "@/config/site.config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
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
          "flex flex-col flex-1 antialiased min-h-dvh",
          inter.variable,
          naughtyMonster.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
