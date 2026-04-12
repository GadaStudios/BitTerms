import * as Flags from "country-flag-icons/react/3x2";

const fallbackMap: Record<string, keyof typeof Flags> = {
  en: "US",
  es: "ES",
  fr: "FR",
  de: "DE",
  sw: "TZ",
};

export const getFlag = (locale: string) => {
  const parts = locale.split("-");
  const countryCode = parts[1]?.toUpperCase() || fallbackMap[locale];

  if (countryCode && countryCode in Flags) {
    return Flags[countryCode as keyof typeof Flags];
  }

  return null;
};

export const getLanguageName = (locale: string, displayLocale = "en") => {
  const display = new Intl.DisplayNames([displayLocale], {
    type: "language",
  });

  return display.of(locale);
};
