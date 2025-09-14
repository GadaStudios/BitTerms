"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { useGlobal } from "@/app/provider";
import { abcFilters } from "@/lib/constants";
import Wrapper from "@/components/shared/wrapper";
import { TERM_QUERYResult } from "@/sanity/types";
import { TermItemComp } from "@/components/term-item";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_SIZE } from "@/lib/env";

export const TermsComp = () => {
  const { terms, setTerms } = useGlobal();

  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("letter");
  const activeTerm = searchParams.get("term") ?? "";

  const [speakingId, setSpeakingId] = React.useState<string | null>(null);
  const [activeToggle, setActiveToggle] = React.useState<string | null>(null);

  const termsRef = React.useRef<HTMLDivElement | null>(null);
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  const [loadingMore, setLoadingMore] = React.useState(false);

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

  const termsData = (terms?.data ?? []) as TERM_QUERYResult;
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

  type Term = TERM_QUERYResult extends Array<infer U> ? U : never;
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

  // Infinite scroll loader
  const loadMore = React.useCallback(async () => {
    if (loadingMore) return;
    if (terms.nextOffset == null) return;
    if (activeFilter || activeTerm) return; // only auto-load for full list

    setLoadingMore(true);
    try {
      const res = await fetch(
        `/api/terms?offset=${terms.nextOffset}&limit=${PAGE_SIZE}`,
        { cache: "no-store" },
      );
      if (!res.ok) throw new Error(`Failed to load more terms: ${res.status}`);
      const data: { items: TERM_QUERYResult; nextOffset: number | null } =
        await res.json();
      setTerms((prev) => ({
        ...prev,
        data: [...(prev.data as TERM_QUERYResult), ...data.items],
        nextOffset: data.nextOffset,
      }));
    } catch (e) {
      // optionally surface an error toast here
      console.error(e);
    } finally {
      setLoadingMore(false);
    }
  }, [activeFilter, activeTerm, loadingMore, setTerms, terms.nextOffset]);

  // Observe sentinel for infinite scroll
  React.useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    if (activeFilter || activeTerm) return; // disable when filtering/searching

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [activeFilter, activeTerm, loadMore]);

  return (
    <Wrapper
      ref={termsRef}
      className="mt-12 flex w-full flex-col gap-8 md:max-w-[752px]"
    >
      {terms.isFetching && (
        <div className="flex w-full flex-col gap-8">
          {[...new Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-end gap-2">
                <Skeleton className="h-[40px] w-max rounded-[12px] px-6 font-medium md:h-[48px] lg:h-[64px]" />
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
                    <Skeleton className="size-[92px] origin-top-right rounded-[12px] md:size-[160px]" />
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
          src="/no-result.svg"
          alt="No Filter"
          width={350}
          height={394}
          priority
          quality={100}
          className="mx-auto mt-10 h-[296px] w-[263px] object-contain md:mt-5 md:h-[394px] md:w-[350px]"
        />
      )}

      {!terms.isFetching &&
        abcFilters
          .filter((f) => f !== "all")
          .map((letter) => {
            const displayLabel = letter === "symbol" ? "#" : letter;
            const termsForLetter = groupedTerms[letter];
            if (!termsForLetter?.length) return null;

            return (
              <div key={letter} className="flex flex-col gap-2">
                {!activeFilter && !activeTerm && (
                  <p className="py-2 text-[40px] font-medium md:text-5xl lg:text-[64px]">
                    {displayLabel}.
                  </p>
                )}
                <ul className="flex flex-col">
                  {termsForLetter.map((term, idx) => (
                    <TermItemComp
                      key={term._id ?? term.name ?? idx}
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

      {/* Infinite scroll sentinel and status */}
      {!terms.isFetching && !activeFilter && !activeTerm && (
        <div className="flex flex-col items-center justify-center">
          <div ref={sentinelRef} />
          {loadingMore && (
            <div className="-mt-8 flex w-full justify-between gap-3.5 border-t py-8">
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
              <Skeleton className="size-[92px] origin-top-right rounded-[12px] md:size-[160px]" />
            </div>
          )}
          {terms.nextOffset == null && termsData.length > 0 && (
            <p className="text-muted-foreground py-6 text-sm">
              No more results.
            </p>
          )}
        </div>
      )}
    </Wrapper>
  );
};
