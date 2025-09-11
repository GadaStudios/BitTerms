import { Badge } from "@/components/ui/badge";
import { sanityFetch } from "@/lib/live";
import { queryApprovedTerms } from "@/lib/queries";
import React from "react";

export const RecentlyAdded = async () => {
  const result = await sanityFetch({
    query: queryApprovedTerms(),
  });

  const terms: TermInstance[] = result.data;

  if (terms.length === 0) return null;

  return (
    <div className="mx-auto flex w-full max-w-[361px] flex-wrap items-center justify-center gap-2">
      <p className="text-sm font-normal sm:text-base">Recently added terms</p>

      {terms.slice(0, 4).map((term) => (
        <Badge
          key={term.name}
          className="text-foreground h-[35px] bg-[#F9FDE5] px-4 text-sm font-normal"
        >
          {term.name}
        </Badge>
      ))}
    </div>
  );
};
