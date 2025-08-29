import localFont from "next/font/local";

export const naughtyMonster = localFont({
  src: [
    {
      path: "./NaughtyMonster/NaughtyMonster.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-naughty-monster",
});
