import React from "react";
import { Footer } from "@/components/footer";
import Provider from "./provider";

export default function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      {children}
      <Footer />
    </Provider>
  );
}
