"use client";

import * as React from "react";

import NextJSTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/shared/scroll";
import { TERM_QUERYResult } from "@/sanity/types";
import { PAGE_SIZE } from "@/lib/env";

type TermProps = {
  data: TERM_QUERYResult | [];
  isFetching: boolean;
  error: string | null;
  nextOffset: number | null;
};

type GlobalContextType = {
  terms: TermProps;
  setTerms: React.Dispatch<React.SetStateAction<TermProps>>;
};

const GlobalContext = React.createContext<GlobalContextType | undefined>(
  undefined,
);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [terms, setTerms] = React.useState<{
    data: TERM_QUERYResult | [];
    isFetching: boolean;
    error: string | null;
    nextOffset: number | null;
  }>({
    data: [],
    isFetching: true,
    error: null,
    nextOffset: 0,
  });

  const handleFetchTerms = async () => {
    setTerms((prev) => ({ ...prev, isFetching: true }));
    try {
      const res = await fetch(`/api/terms?offset=0&limit=${PAGE_SIZE}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Failed to load terms: ${res.status}`);
      const data: { items: TERM_QUERYResult; nextOffset: number | null } =
        await res.json();
      setTerms((prev) => ({
        ...prev,
        isFetching: false,
        data: data.items,
        nextOffset: data.nextOffset,
      }));
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Problem fetching terms";
      setTerms((prev) => ({ ...prev, isFetching: false, error: errMsg }));
    }
  };

  React.useEffect(() => {
    handleFetchTerms();
  }, []);

  const providerValues: GlobalContextType = {
    terms,
    setTerms,
  };

  return (
    <GlobalContext.Provider value={providerValues}>
      <NextJSTopLoader
        showSpinner={false}
        showForHashAnchor
        color="var(--primary)"
      />
      <Toaster richColors />
      <ScrollToTop />
      <main className="flex-1">{children}</main>
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within an GlobalProvider");
  }
  return context;
};
