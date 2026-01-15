import React from "react";
import { Analytics } from "@vercel/analytics/next";

import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import { GlobalProvider } from "@/components/provider";
import { SanityLive } from "@/sanity/lib/live";

export default function RoutesLayout(props: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      <Header />
      <main className="flex-1">{props.children}</main>
      <Footer />
      <SanityLive />
      <Analytics />
    </GlobalProvider>
  );
}
