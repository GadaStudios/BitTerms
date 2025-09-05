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

  // Filter terms
  let filteredTerms = termsData;

  if (activeTerm) {
    filteredTerms = termsData.filter(
      (t) => t.name.toLowerCase() === activeTerm.toLowerCase()
    );
  } else if (activeFilter && activeFilter !== "all") {
    if (activeFilter === "symbol") {
      // pick names starting with non A-Z
      filteredTerms = termsData.filter((t) => !/^[A-Z]/i.test(t.name[0]));
    } else {
      filteredTerms = termsData.filter((t) =>
        t.name.toUpperCase().startsWith(activeFilter)
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
    {}
  );

  return (
    <section className="pb-16 md:py-16 lg:py-24">
      <Wrapper className="flex flex-col gap-10 md:max-w-[752px]">
        {/* ALPHABETS */}
        <div className="sticky top-[72px] md:top-[78px] bg-background py-4 md:py-6 z-50">
          <div className="flex whitespace-pre flex-wrap z-50 gap-1 md:gap-2 justify-center w-full">
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
                  className={`font-mono !rounded-[12px] h-[34px] sm:h-[44px] text-lg md:text-xl lg:text-2xl
  ${
    label === "all" ? "w-[55px] md:w-[84px]" : "w-[30px] px-3 sm:px-4 md:px-5"
  }`}
                >
                  <span>{displayLabel}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* TERMS */}
        <div className="flex flex-col gap-8 w-full">
          {/* SEARCH RESULT COUNT */}
          {(activeFilter || activeTerm) && (
            <p
              className={cn(
                "text-base md:text-lg lg:text-xl font-normal flex items-center gap-2",
                {
                  "mx-auto": filteredTerms.length === 0,
                }
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
              className="object-contain mx-auto w-[263px] h-[296px] mt-10 md:mt-5 md:w-[350px] md:h-[394px]"
            />
          )}

          {filters
            .filter((f) => f !== "all") // skip "all"
            .map((letter) => {
              const displayLabel = letter === "symbol" ? "#" : letter;
              const termsForLetter = groupedTerms[letter];
              if (!termsForLetter || termsForLetter.length === 0) return null;

              return (
                <div key={letter} className="flex flex-col gap-2">
                  {/* Letter Heading */}
                  <p className="text-[40px] md:text-5xl lg:text-[64px] font-medium py-2">
                    {displayLabel}.
                  </p>

                  {/* Terms under this letter */}
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
