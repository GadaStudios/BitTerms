"use client";

import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useGlobal } from "@/app/provider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/shared/wrapper";
import { SearchFilterProps, searchFilterSchema } from "@/lib/validators";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { abcFilters } from "@/lib/constants";

export const FilterComp = () => {
  const { terms } = useGlobal();

  const termId = React.useId();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // initialize from URL
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setActiveFilter(params.get("letter"));
    }
  }, []);

  const form = useForm<SearchFilterProps>({
    resolver: zodResolver(searchFilterSchema),
    defaultValues: { term: "" },
  });

  async function recordSearch(term: string) {
    try {
      await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term }),
      });
    } catch (e) {
      console.error("Failed to record search", e);
    }
  }

  async function onSubmit({ term }: SearchFilterProps) {
    toast.loading(`Searching for "${term.trim() || "all terms"}"...`, {
      id: "search",
    });
    try {
      await recordSearch(term);
      toast.success("Search completed!", { id: "search" });
    } catch (error) {
      console.log("Search error", error);
    }
  }

  const handleClick = (label: string) => {
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : "",
    );

    if (label === "all") {
      params.delete("letter");
    } else {
      params.set("letter", label);
    }
    params.delete("term"); // clear search when filtering

    setActiveFilter(label === "all" ? null : label);
    router.push(`/terms?${params.toString()}`, { scroll: false });
  };

  // Track scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <React.Fragment>
      <Wrapper className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap md:mt-[56px] md:gap-3">
        <p className="text-sm font-normal sm:text-base">Top Searched</p>
        <div className="flex items-center gap-1">
          {terms.isFetching
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-8 w-[130px] first-of-type:w-[100px] last-of-type:w-[80px]"
                />
              ))
            : terms.data.slice(0, 3).map((tag) => (
                <Badge
                  key={tag._id}
                  onClick={() => {
                    form.setValue("term", tag.name || "");
                    onSubmit({ term: tag.name || "" });
                  }}
                  className="text-foreground bg-primary/15 cursor-pointer px-2 py-1 text-xs font-normal sm:px-4 sm:text-sm"
                >
                  {tag.name}
                </Badge>
              ))}
        </div>
      </Wrapper>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "bg-background sticky top-0 z-50 w-full py-6",
            isScrolled && "py-4 md:py-6",
          )}
        >
          <Wrapper className="mx-auto w-full max-w-[546px]">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div
                      className={cn(
                        "relative transition-all duration-300",
                        isScrolled
                          ? "h-14 lg:h-[54px]"
                          : "h-14 md:h-16 lg:h-[76px]",
                      )}
                    >
                      <FiSearch className="absolute top-1/2 left-5 size-5 -translate-y-1/2 text-[#8E8E8E] md:size-6" />
                      <Input
                        {...field}
                        value={field.value}
                        disabled={form.formState.isSubmitting}
                        id={termId}
                        placeholder="Search bitcoin terms"
                        className={cn(
                          "border-foreground !h-full flex-1 rounded-full pr-26 pl-12 shadow-none placeholder:text-[#B4B4B4] md:pl-14 md:text-lg",
                          isScrolled ? "pr-32" : "md:pr-36",
                        )}
                      />
                      <Button
                        type="submit"
                        loadingText="Searching..."
                        isLoading={form.formState.isSubmitting}
                        disabled={!form.formState.isValid}
                        className={cn(
                          "absolute top-1/2 right-2 !h-[calc(100%-12px)] -translate-y-1/2 transition-all",
                          isScrolled ? "right-1.5" : "md:!px-8",
                        )}
                      >
                        <span>Search</span>
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </Wrapper>
        </form>
      </Form>

      <div className="bg-background sticky top-[86px] z-50 mt-8 py-4 sm:mt-16 md:mt-28">
        <Wrapper className="md:max-w-[752px]">
          {terms.isFetching ? (
            <div className="z-50 flex w-full flex-wrap justify-center gap-1 whitespace-pre md:gap-2">
              {abcFilters.map((label) => (
                <Skeleton
                  key={label}
                  className="h-[34px] w-[30px] !rounded-[12px] px-3 font-mono text-lg first-of-type:w-[55px] sm:h-[44px] sm:px-4 md:px-5 md:text-xl first-of-type:md:w-[84px] lg:text-2xl"
                />
              ))}
            </div>
          ) : (
            <div className="flex w-full flex-wrap justify-center gap-1 whitespace-pre md:gap-2">
              {abcFilters.map((label) => {
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
                      "h-[34px] !rounded-[12px] font-mono text-lg sm:h-[44px] md:text-xl lg:text-2xl",
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
        </Wrapper>
      </div>
    </React.Fragment>
  );
};
