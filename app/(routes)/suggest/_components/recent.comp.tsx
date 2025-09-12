"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useGlobal } from "@/app/provider";
import { Badge } from "@/components/ui/badge";
import { SearchFilterProps, searchFilterSchema } from "@/lib/validators";
import Wrapper from "@/components/shared/wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export const RecentlyAddedComp = () => {
  const {
    terms: { data, isFetching },
  } = useGlobal();

  const router = useRouter();

  // get term from current URL on mount
  const [activeTerm, setActiveTerm] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setActiveTerm(params.get("term") ?? "");
    }
  }, []);

  const form = useForm<SearchFilterProps>({
    resolver: zodResolver(searchFilterSchema),
    defaultValues: { term: activeTerm ?? "" },
  });

  function handleChange(value: string) {
    form.setValue("term", value, { shouldValidate: true });

    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : "",
    );

    if (!value.trim()) {
      params.delete("term");
    } else {
      params.set("term", value.trim());
    }

    router.push(`/terms?${params.toString()}`, { scroll: false });
    setActiveTerm(value.trim());
  }

  return (
    <Wrapper className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap md:mt-[56px] md:gap-3">
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
                  onClick={() => handleChange(tag.name as string)}
                  className="text-foreground cursor-pointer bg-[#F9FDE5] px-2 py-1 text-xs font-normal sm:px-4 sm:text-sm"
                >
                  {tag.name}
                </Badge>
              ))}
      </div>
    </Wrapper>
  );
};
