export const i18n = {
  defaultLocale: "en",
  locales: ["en", "es", "fr", "de", "sw"] as const,
  languageNames: {
    en: "English",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    sw: "Kiswahili",
  } as const,
} as const;

export type Locale = (typeof i18n)["locales"][number];
