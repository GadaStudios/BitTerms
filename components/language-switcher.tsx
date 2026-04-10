"use client";

import React from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { i18n, Locale } from "@/lib/i18n-config";
import { cn } from "@/lib/utils";
import { US, ES, FR, DE, TZ } from "country-flag-icons/react/3x2";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LuLanguages } from "react-icons/lu";

export const LanguageSwitcher = ({
  lang,
  variant = "default",
  className,
}: {
  lang: Locale;
  variant?: "outline" | "outline2" | "default" | "secondary";
  className?: string;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  const languageNames = i18n.languageNames;
  const flags: Record<Locale, React.ComponentType<{ className?: string }>> = {
    en: US,
    es: ES,
    fr: FR,
    de: DE,
    sw: TZ,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          className={cn("size-8! px-0", className)}
        >
          <LuLanguages className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44 rounded-[14px]!">
        {i18n.locales.map((locale) => (
          <DropdownMenuCheckboxItem
            key={locale}
            checked={lang === locale}
            onCheckedChange={(checked) => {
              if (checked) {
                handleLocaleChange(locale);
              }
            }}
            className={cn("rounded-[12px]!", {
              "bg-accent": lang === locale,
            })}
          >
            <span className="flex items-center gap-2">
              {React.createElement(flags[locale], {
                className: "h-3 w-5",
              })}
              <span>{languageNames[locale]}</span>
            </span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
