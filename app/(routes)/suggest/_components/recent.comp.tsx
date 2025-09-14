"use client";

import React from "react";

import { useGlobal } from "@/app/provider";
import { Badge } from "@/components/ui/badge";
import Wrapper from "@/components/shared/wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export const RecentlyAddedComp = () => {
  const {
    terms: { data, isFetching },
  } = useGlobal();

  if (!data.length) return null;

  return (
    <Wrapper className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap md:mt-[56px] md:gap-3">
      <p className="text-sm font-normal sm:text-base">Recently added terms</p>
      <div className="flex items-center gap-1">
        {isFetching
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-8 w-[130px] first-of-type:w-[100px] last-of-type:w-[80px]"
              />
            ))
          : data
              .slice(0, 3)
              .reverse()
              .map((tag) => (
                <Badge
                  key={tag._id}
                  className="text-foreground cursor-pointer bg-[#F9FDE5] px-2 py-1 text-xs font-normal sm:px-4 sm:text-sm"
                >
                  {tag.name}
                </Badge>
              ))}
      </div>
    </Wrapper>
  );
};
