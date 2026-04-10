import React from "react";

import "./globals.css";
import { fontVariable } from "@/lib/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={fontVariable("flex flex-1 flex-col antialiased")}>
        {children}
      </body>
    </html>
  );
}
