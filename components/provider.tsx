"use client";

import React from "react";
import NextJSTopLoader from "nextjs-toploader";

import { Toaster } from "./ui/sonner";
import { useSearchParams } from "next/navigation";

import { client } from "@/sanity/lib/client";
import { QUERY_TERMS_PAGED } from "@/sanity/lib/queries";
import { ScrollToTop } from "./scroll";
import { Locale } from "@/lib/i18n";

export type TermDataProps = {
  _id: string;
  name?: string;
  slug?: string;
  definition?: string;
  technicalDefinition?: string;
  author?: string;
  illustration?: string;
  audio?: string;
  searchPopularity?: number;
};

type TermProps = {
  data: Array<TermDataProps>;
  isFetching: boolean;
  isFetchingMore: boolean;
  hasMore: boolean;
  error: string | null;
};

interface GlobalContextProps {
  terms: TermProps;
  setTerms: React.Dispatch<React.SetStateAction<TermProps>>;
  activeFilter: string | null;
  setActiveFilter: React.Dispatch<React.SetStateAction<string | null>>;

  fetchTerms: (shouldShowLoader: boolean) => Promise<void>;
  fetchMoreTerms: () => Promise<void>;
  bumpSearchVersion: () => void;
  searchVersion: number;
}

const GlobalContext = React.createContext<GlobalContextProps | undefined>(
  undefined,
);

function GlobalProvider(props: { children: React.ReactNode; lang: Locale }) {
  const searchParams = useSearchParams();

  const [activeFilter, setActiveFilter] =
    React.useState<GlobalContextProps["activeFilter"]>(null);
  const [terms, setTerms] = React.useState<TermProps>({
    data: [],
    isFetching: true,
    isFetchingMore: false,
    hasMore: true,
    error: null,
  });

  // version to track when searches update so other components can re-query
  const [searchVersion, setSearchVersion] = React.useState<number>(0);
  const bumpSearchVersion = React.useCallback(() => {
    setSearchVersion((v) => v + 1);
  }, []);

  const pageSize = 20;
  const termParam = (searchParams.get("term") ?? "").trim().toLowerCase();
  const letterParam = (searchParams.get("letter") ?? "").trim();
  const termsCountRef = React.useRef(0);

  React.useEffect(() => {
    termsCountRef.current = terms.data.length;
  }, [terms.data.length]);

  const handleFetchTerms = React.useCallback(
    async (shouldShowLoader: boolean) => {
      setTerms((prev) => ({
        ...prev,
        isFetching: shouldShowLoader ?? true,
        isFetchingMore: false,
        hasMore: true,
        error: null,
        data: [],
      }));
      try {
        const query = QUERY_TERMS_PAGED();
        const items: Array<TermDataProps> = await client.fetch(query, {
          lang: props.lang,
          term: termParam || null,
          letter: letterParam || null,
          offset: 0,
          end: pageSize,
        });

        setTerms((prev) => ({
          ...prev,
          isFetching: false,
          hasMore: items.length === pageSize,
          data: items,
        }));
      } catch (error) {
        const errMsg =
          error instanceof Error ? error.message : "Problem fetching terms";
        setTerms((prev) => ({ ...prev, isFetching: false, error: errMsg }));
      }
    },
    [letterParam, props.lang, termParam],
  );

  const handleFetchMore = React.useCallback(async () => {
    setTerms((prev) => {
      if (prev.isFetching || prev.isFetchingMore || !prev.hasMore) return prev;
      return { ...prev, isFetchingMore: true, error: null };
    });

    try {
      const query = QUERY_TERMS_PAGED();
      const offset = termsCountRef.current;
      const items: Array<TermDataProps> = await client.fetch(query, {
        lang: props.lang,
        term: termParam || null,
        letter: letterParam || null,
        offset,
        end: offset + pageSize,
      });

      setTerms((prev) => ({
        ...prev,
        isFetchingMore: false,
        hasMore: items.length === pageSize,
        data: [...prev.data, ...items],
      }));
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Problem fetching more terms";
      setTerms((prev) => ({ ...prev, isFetchingMore: false, error: errMsg }));
    }
  }, [letterParam, props.lang, termParam]);

  React.useEffect(() => {
    handleFetchTerms(true);
  }, [handleFetchTerms]);

  React.useEffect(() => {
    setActiveFilter(searchParams.get("letter"));
  }, [searchParams]);

  const contextValue: GlobalContextProps = React.useMemo(
    () => ({
      terms,
      setTerms,
      activeFilter,
      setActiveFilter,
      fetchTerms: (shouldShowLoader: boolean) =>
        handleFetchTerms(shouldShowLoader),
      fetchMoreTerms: () => handleFetchMore(),
      bumpSearchVersion,
      searchVersion,
    }),
    [
      terms,
      activeFilter,
      setActiveFilter,
      handleFetchMore,
      handleFetchTerms,
      bumpSearchVersion,
      searchVersion,
    ],
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      <NextJSTopLoader
        showSpinner={false}
        showForHashAnchor
        color="var(--primary)"
      />
      <Toaster richColors />
      {props.children}
      <ScrollToTop />
    </GlobalContext.Provider>
  );
}

function useContextProvider() {
  const ctx = React.useContext(GlobalContext);
  if (ctx === undefined) {
    throw new Error("useContextProvider must be used within a GlobalProvider");
  }
  return ctx;
}

export { GlobalProvider, useContextProvider };
