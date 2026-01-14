"use client";

import * as React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { SearchComp } from "./search.comp";
import Wrapper from "@/components/wrapper";
import { ABC_FILTERS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TermItemComp } from "@/components/term-item";
import { TermDataProps, useContextProvider } from "@/components/provider";

export const TermsComp = () => {
  return (
    <React.Suspense
      fallback={
        <Wrapper className="mt-20 flex w-full flex-col gap-8 md:mt-40 md:max-w-[752px]">
          <div className="flex w-full flex-col gap-8">
            {[...new Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-end gap-2">
                  <Skeleton className="h-10 w-max rounded-[12px] px-6 font-medium md:h-12 lg:h-16" />
                  <Skeleton className="mb-2 size-4 rounded-full" />
                </div>
                <ul className="flex flex-col">
                  {[...new Array(2)].map((_, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between gap-3.5 border-b py-8 first-of-type:border-t last-of-type:border-b-0"
                    >
                      <div className="flex max-w-[500px] flex-1 flex-col gap-6">
                        <div className="flex flex-col gap-4 md:gap-6">
                          <div className="flex items-center gap-4">
                            <Skeleton className="h-[18px] w-32 font-medium md:h-5 lg:h-6" />
                            <Skeleton className="size-9 lg:size-12" />
                          </div>
                          <div className="flex flex-1 flex-col gap-2">
                            <Skeleton className="h-4 w-full md:h-[18px]" />
                            <Skeleton className="h-4 w-[80%] md:h-[18px]" />
                          </div>
                          <Skeleton className="h-4 w-[60%]" />
                        </div>
                      </div>
                      <Skeleton className="size-[92px] origin-top-right rounded-[12px] md:size-40" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Wrapper>
      }
    >
      <Terms />
    </React.Suspense>
  );
};

const Terms = () => {
  const { terms, handleClick } = useContextProvider();

  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("letter");
  const activeTerm = searchParams.get("term") ?? "";

  const [speakingId, setSpeakingId] = React.useState<string | null>(null);
  const [activeToggle, setActiveToggle] = React.useState<string | null>(null);

  const termsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if ((activeFilter || activeTerm) && termsRef.current) {
      const headerOffset = 280;
      const elementPosition =
        termsRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [activeFilter, activeTerm]);

  const termsData = (terms?.data ?? []) as TermDataProps[];
  let filteredTerms = termsData;

  if (activeTerm) {
    const needle = activeTerm.toLowerCase();
    filteredTerms = termsData.filter(
      (t) => t.name && t.name.toLowerCase().includes(needle),
    );
  } else if (activeFilter && activeFilter !== "all") {
    if (activeFilter === "symbol") {
      filteredTerms = termsData.filter(
        (t) => t.name && !/^[A-Z]/i.test(t.name[0]),
      );
    } else {
      filteredTerms = termsData.filter(
        (t) => t.name && t.name.toUpperCase().startsWith(activeFilter),
      );
    }
  }

  type Term = TermDataProps[] extends Array<infer U> ? U : never;
  const groupedTerms = filteredTerms.reduce(
    (acc: Record<string, Term[]>, term) => {
      const firstChar = term.name ? term.name[0].toUpperCase() : "";
      const letter = /^[A-Z]$/.test(firstChar) ? firstChar : "symbol";
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(term);
      return acc;
    },
    {},
  );

  return (
    <Wrapper
      className={cn(
        "mt-20 flex flex-col md:mt-40 md:max-w-[752px]",
        terms.data.length === 0 && "min-h-dvh",
      )}
    >
      <React.Suspense fallback={<div className="h-20 w-full" />}>
        <SearchComp className="bg-background sticky top-0 z-50" />
      </React.Suspense>

      <div className="bg-background sticky top-20 z-50 mt-6 py-2 sm:top-26 md:mt-10">
        {terms.isFetching ? (
          <div className="z-50 flex w-full flex-wrap justify-center gap-1 whitespace-pre md:gap-2">
            {ABC_FILTERS.map((label) => (
              <Skeleton
                key={label}
                className="h-[34px] w-[30px] rounded-[12px]! px-3 font-mono text-lg first-of-type:w-[55px] sm:h-11 sm:px-4 md:px-5 md:text-xl first-of-type:md:w-[84px] lg:text-2xl"
              />
            ))}
          </div>
        ) : (
          <div className="flex w-full flex-wrap justify-center gap-1 whitespace-pre md:gap-2">
            {ABC_FILTERS.map((label) => {
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
                    "h-[34px] rounded-[12px]! font-mono text-lg sm:h-11 md:text-xl lg:text-2xl",
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
        )}
      </div>

      <div ref={termsRef} className="mt-8 flex w-full flex-col gap-8 md:mt-12">
        {terms.isFetching && (
          <div className="flex w-full flex-col gap-8">
            {[...new Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col gap-6">
                <div className="flex items-end gap-2">
                  <Skeleton className="h-10 w-max rounded-[12px] px-5 font-medium md:h-12 lg:h-16" />
                  <Skeleton className="size-4 rounded-full" />
                </div>
                <ul className="flex flex-col">
                  {[...new Array(2)].map((_, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between gap-3.5 border-b py-8 first-of-type:border-t last-of-type:border-b-0"
                    >
                      <div className="flex max-w-[500px] flex-1 flex-col gap-6">
                        <div className="flex flex-col gap-4 md:gap-6">
                          <div className="flex items-center gap-4">
                            <Skeleton className="h-[18px] w-32 font-medium md:h-5 lg:h-6" />
                            <Skeleton className="size-10" />
                          </div>
                          <div className="flex flex-1 flex-col gap-2">
                            <Skeleton className="h-4 w-full md:h-[18px]" />
                            <Skeleton className="h-4 w-[80%] md:h-[18px]" />
                          </div>
                          <Skeleton className="mt-4 h-4 w-[40%]" />
                        </div>
                      </div>
                      <Skeleton className="size-[92px] origin-top-right rounded-[12px] md:size-40" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {!terms.isFetching && (activeFilter || activeTerm) && (
          <p
            className={cn(
              "flex items-center gap-2 text-base font-normal md:text-lg lg:text-xl",
              { "mx-auto": filteredTerms.length === 0 },
            )}
          >
            <span>Search Result:</span>
            <strong>{filteredTerms.length}</strong>
          </p>
        )}

        {!terms.isFetching && filteredTerms.length === 0 && (
          <Image
            src="/svg/no-result.svg"
            alt="No Filter"
            width={350}
            height={394}
            priority
            quality={100}
            className="mx-auto mt-10 h-[296px] w-[263px] object-contain md:mt-5 md:h-[394px] md:w-[350px]"
          />
        )}

        {!terms.isFetching &&
          ABC_FILTERS.filter((f) => f !== "all").map((letter) => {
            const displayLabel = letter === "symbol" ? "#" : letter;
            const termsForLetter = groupedTerms[letter];
            if (!termsForLetter?.length) return null;

            return (
              <div key={letter} className="flex flex-col gap-2">
                {/* {!activeFilter && !activeTerm && ( */}
                <p className="py-2 text-[40px] font-medium md:text-5xl lg:text-[64px]">
                  {displayLabel}.
                </p>
                {/* )} */}
                <ul className="flex flex-col">
                  {termsForLetter.map((term, idx) => (
                    <TermItemComp
                      key={idx}
                      term={term}
                      activeToggle={activeToggle}
                      setActiveToggle={setActiveToggle}
                      speakingId={speakingId}
                      setSpeakingId={setSpeakingId}
                    />
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </Wrapper>
  );
};
