import { getLanguageName } from "./language";
import { baseLocales, defaultLocale } from "./generated-locales";

if (!baseLocales.includes(defaultLocale as Locale)) {
  throw new Error("defaultLocale must exist in baseLocales");
}

export const i18n = {
  defaultLocale,
  locales: baseLocales,
} as const;

export type Locale = (typeof baseLocales)[number];

export const languageNames = Object.fromEntries(
  i18n.locales.map((locale) => [locale, getLanguageName(locale)]),
) as Record<Locale, string>;
