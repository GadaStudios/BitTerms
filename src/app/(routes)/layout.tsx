import React from "react";
import NextJSTopLoader from "nextjs-toploader";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <NextJSTopLoader
        showSpinner={false}
        showForHashAnchor
        color="var(--primary)"
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </React.Fragment>
  );
}
