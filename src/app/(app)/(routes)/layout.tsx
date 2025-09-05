import React from "react";
import { Footer } from "@/components/footer";

export default function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      {children}
      <Footer />
    </React.Fragment>
  );
}
