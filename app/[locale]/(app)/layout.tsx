import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GlobalProvider } from "@/components/provider";
import { SanityLive } from "@/sanity/lib/live";
import { routing } from "@/i18n/routing";
import { Locale } from "@/i18n/config";

export default async function RoutesLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <GlobalProvider lang={locale as Locale}>
        <Header />
        <main className="flex-1">{props.children}</main>
        <Footer />
        <SanityLive />
        <Analytics />
      </GlobalProvider>
    </NextIntlClientProvider>
  );
}
