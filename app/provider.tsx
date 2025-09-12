"use client";

import * as React from "react";

import NextJSTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/shared/scroll";
import { client } from "@/sanity/lib/client";
import { TERM_QUERY } from "@/sanity/lib/queries";
import { TERM_QUERYResult } from "@/sanity/types";

type TermProps = {
  data: TERM_QUERYResult | [];
  isFetching: boolean;
  error: string | null;
};

type GlobalContextType = {
  terms: TermProps;
  setTerms: React.Dispatch<React.SetStateAction<TermProps>>;
};

const GlobalContext = React.createContext<GlobalContextType | undefined>(
  undefined,
);

const options = { next: { revalidate: 10 } };

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [terms, setTerms] = React.useState<{
    data: TERM_QUERYResult | [];
    isFetching: boolean;
    error: string | null;
  }>({
    data: [],
    isFetching: true,
    error: null,
  });

  const handleFetchTerms = async () => {
    setTerms((prev) => ({ ...prev, isFetching: true }));
    try {
      const result: TERM_QUERYResult = await client.fetch(
        TERM_QUERY,
        {},
        options,
      );
      setTerms((prev) => ({ ...prev, isFetching: false, data: result }));
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
