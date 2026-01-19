"use client";

import React from "react";
import NextJSTopLoader from "nextjs-toploader";

import { Toaster } from "./ui/sonner";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { QUERY_TERMS } from "@/sanity/lib/queries";
import { ScrollToTop } from "./scroll";

export type TermDataProps = {
  _id: string;
  name?: string;
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
  error: string | null;
};

interface GlobalContextProps {
  terms: TermProps;
  setTerms: React.Dispatch<React.SetStateAction<TermProps>>;
  activeFilter: string | null;
  setActiveFilter: React.Dispatch<React.SetStateAction<string | null>>;

  handleClick: (label: string) => void;
  fetchTerms: (shouldShowLoader: boolean) => Promise<void>;
  bumpSearchVersion: () => void;
  searchVersion: number;
}

const GlobalContext = React.createContext<GlobalContextProps | undefined>(
  undefined,
);

function GlobalProvider(props: { children: React.ReactNode }) {
  const router = useRouter();

  const [activeFilter, setActiveFilter] =
    React.useState<GlobalContextProps["activeFilter"]>(null);
  const [terms, setTerms] = React.useState<TermProps>({
    data: [],
    isFetching: true,
    error: null,
  });

  // version to track when searches update so other components can re-query
  const [searchVersion, setSearchVersion] = React.useState<number>(0);
  const bumpSearchVersion = React.useCallback(() => {
    setSearchVersion((v) => v + 1);
  }, []);

  const handleFetchTerms = async (shouldShowLoader: boolean) => {
    setTerms((prev) => ({ ...prev, isFetching: shouldShowLoader ?? true }));
    try {
      const query = QUERY_TERMS();
      const items: Array<TermDataProps> = await client.fetch(query);

      setTerms((prev) => ({
        ...prev,
        isFetching: false,
        data: items,
      }));
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Problem fetching terms";
      setTerms((prev) => ({ ...prev, isFetching: false, error: errMsg }));
    }
  };

  const handleClick = React.useCallback(
    (label: string) => {
      const params = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : "",
      );

      if (label === "all") {
        params.delete("letter");
        params.delete("term");
      } else {
        params.set("letter", label);
        params.delete("term");
      }

      setActiveFilter(label === "all" ? null : label);
      router.push(`/?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  React.useEffect(() => {
    handleFetchTerms(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setActiveFilter(params.get("letter"));
    }
  }, []);

  const contextValue: GlobalContextProps = React.useMemo(
    () => ({
      terms,
      setTerms,
      activeFilter,
      setActiveFilter,
      handleClick,
      fetchTerms: (shouldShowLoader: boolean) =>
        handleFetchTerms(shouldShowLoader),
      bumpSearchVersion,
      searchVersion,
    }),
    [activeFilter, handleClick, terms, bumpSearchVersion, searchVersion],
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
