"use client";

import React from "react";

import Wrapper from "@/components/wrapper";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useContextProvider } from "@/components/provider";
import { client } from "@/sanity/lib/client";
import { QUERY_RECENT_ADDED } from "@/sanity/lib/queries";
// import { useRouter } from "next/navigation";

export const RecentlyAddedComp = () => {
  const {
    searchVersion,
    // bumpSearchVersion,
  } = useContextProvider();

  // const router = useRouter();

  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState<
    Array<{ name: string; searchCount: number }>
  >([]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await client
          .withConfig({ useCdn: true, token: undefined })
          .fetch(QUERY_RECENT_ADDED(), { limit: 3 });
        if (!cancelled) setItems(data || []);
      } catch (e) {
        console.error(e);
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [searchVersion]);

  // async function handleRecentClick(term: string) {
  //   try {
  //     router.push(`/?term=${encodeURIComponent(term)}`, { scroll: false });
  //     await fetch('/api/search', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ term }),
  //     });
  //     if (bumpSearchVersion) bumpSearchVersion();
  //   } catch (e) {
  //     console.error('Failed to record search', e);
  //   }
  // }

  if (!items.length) return null;

  return (
    <Wrapper className="mt-6 flex flex-col items-center justify-center gap-2 sm:mt-10 sm:flex-row sm:flex-wrap md:mt-14 md:gap-3">
      <p className="text-sm font-normal sm:text-base">Recently added</p>
      <div className="flex items-center gap-1">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-8 w-[130px] first-of-type:w-[100px] last-of-type:w-20"
              />
            ))
          : items.map((tag, idx) => (
              <Badge
                key={idx}
                role="button"
                // onClick={() => handleRecentClick(tag.name)}
                className="text-foreground cursor-pointer bg-[#F9FDE5] px-2 py-1 text-xs font-normal sm:px-4 sm:text-sm"
              >
                {tag.name}
              </Badge>
            ))}
      </div>
    </Wrapper>
  );
};
