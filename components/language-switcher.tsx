"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { i18n, languageNames, Locale } from "@/lib/i18n-config";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LuLanguages } from "react-icons/lu";

// ✅ shadcn command
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { MdRadioButtonChecked } from "react-icons/md";
import { getFlag } from "@/lib/language";

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

      <DropdownMenuContent
        align="end"
        className="min-w-56 overflow-hidden rounded-[14px]! p-0"
      >
        <Command>
          {/* 🔍 Search input */}
          <CommandInput placeholder="Search language..." />

          {/* 📜 Scrollable list */}
          <CommandList className="max-h-64 overflow-y-auto">
            <CommandEmpty>No language found.</CommandEmpty>

            <CommandGroup>
              {i18n.locales.map((locale) => {
                const Flag = getFlag(locale);

                return (
                  <CommandItem
                    key={locale}
                    onSelect={() => handleLocaleChange(locale)}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-[10px]!",
                      {
                        "bg-accent": lang === locale,
                      },
                    )}
                  >
                    {Flag && <Flag className="h-3 w-5" />}
                    <span className="flex-1">{languageNames[locale]}</span>

                    {/* ✅ Selected indicator */}
                    {lang === locale && (
                      <MdRadioButtonChecked className="text-primary h-4 w-4" />
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
