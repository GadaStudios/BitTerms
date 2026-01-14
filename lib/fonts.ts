import { Inter } from "next/font/google";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const naughtyMonster = localFont({
  src: [
    {
      path: "../public/fonts/NaughtyMonster.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mono",
});

const fontVariable = (className: string) =>
  cn(inter.variable, naughtyMonster.variable, className);

export { fontVariable };
