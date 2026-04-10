import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { i18n } from "@/lib/i18n-config";

export const routing = defineRouting({
  locales: i18n.locales as unknown as string[],
  defaultLocale: i18n.defaultLocale,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
