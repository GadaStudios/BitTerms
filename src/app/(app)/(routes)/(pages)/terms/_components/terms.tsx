"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Wrapper from "@/components/wrapper";
import { Button } from "@/components/ui/button";
import { TermItem } from "./term-item";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  termsData: Array<TermInstance>;
}

export const Terms: React.FC<Props> = ({ termsData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("letter");
  const activeTerm = searchParams.get("term") ?? "";

  const [activeToggle, setActiveToggle] = React.useState<string | null>(null);

  const filters = [
    "all",
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
    "symbol",
  ];

  const handleClick = (label: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (label === "all") {
      params.delete("letter");
    } else {
      params.set("letter", label);
    }
    router.push(`?${params.toString()}`);
  };

  let filteredTerms = termsData;

  if (activeTerm) {
    filteredTerms = termsData.filter(
      (t) => t.name.toLowerCase() === activeTerm.toLowerCase(),
    );
  } else if (activeFilter && activeFilter !== "all") {
    if (activeFilter === "symbol") {
      // pick names starting with non A-Z
      filteredTerms = termsData.filter((t) => !/^[A-Z]/i.test(t.name[0]));
    } else {
      filteredTerms = termsData.filter((t) =>
        t.name.toUpperCase().startsWith(activeFilter),
      );
    }
  }

  // Group terms by first character
  const groupedTerms = filteredTerms.reduce(
    (acc: Record<string, TermInstance[]>, term) => {
      const firstChar = term.name[0].toUpperCase();

      // If it starts with A-Z, use that letter
      const letter = /^[A-Z]$/.test(firstChar) ? firstChar : "symbol";

      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(term);
      return acc;
    },
    {},
  );

  return (
    <section className="pb-16 md:py-16 lg:py-24">
      <Wrapper className="flex flex-col gap-10 md:max-w-[752px]">
        <div className="bg-background sticky top-[72px] z-50 py-4 md:top-[78px] md:py-6">
          <div className="z-50 flex w-full flex-wrap justify-center gap-1 whitespace-pre md:gap-2">
            {filters.map((label) => {
              const displayLabel = label === "symbol" ? "#" : label;
              const isActive =
                label === "all"
                  ? activeFilter === null
                  : activeFilter === label;

              return (
                <Button
                  key={label}
                  onClick={() => handleClick(label)}
                  variant={isActive ? "default" : "secondary"}
                  className={cn(
                    "h-[34px] !rounded-[12px] font-mono text-lg sm:h-[44px] md:text-xl lg:text-2xl",
                    label === "all"
                      ? "w-[55px] md:w-[84px]"
                      : "w-[30px] px-3 sm:px-4 md:px-5",
                  )}
                >
                  <span>{displayLabel}</span>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex w-full flex-col gap-8">
          {(activeFilter || activeTerm) && (
            <p
              className={cn(
                "flex items-center gap-2 text-base font-normal md:text-lg lg:text-xl",
                {
                  "mx-auto": filteredTerms.length === 0,
                },
              )}
            >
              <span>Search Result:</span>
              <strong>{filteredTerms.length}</strong>
            </p>
          )}

          {filteredTerms.length === 0 && (
            <Image
              src="/no-result.svg"
              alt="No Filter"
              width={350}
              height={394}
              className="mx-auto mt-10 h-[296px] w-[263px] object-contain md:mt-5 md:h-[394px] md:w-[350px]"
            />
          )}

          {filters
            .filter((f) => f !== "all")
            .map((letter) => {
              const displayLabel = letter === "symbol" ? "#" : letter;
              const termsForLetter = groupedTerms[letter];
              if (!termsForLetter || termsForLetter.length === 0) return null;

              return (
                <div key={letter} className="flex flex-col gap-2">
                  <p className="py-2 text-[40px] font-medium md:text-5xl lg:text-[64px]">
                    {displayLabel}.
                  </p>

                  <ul className="flex flex-col">
                    {termsForLetter.map((term) => (
                      <TermItem
                        key={term.name}
                        term={term}
                        activeToggle={activeToggle}
                        setActiveToggle={setActiveToggle}
                      />
                    ))}
                  </ul>
                </div>
              );
            })}
        </div>
      </Wrapper>
    </section>
  );
};
