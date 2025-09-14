"use client";

import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

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

type TopTerm = { _id: string; name: string; searchPopularity: number };

export const FilterComp = () => {
  const { terms } = useGlobal();

  const termId = React.useId();
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);
  const [items, setItems] = React.useState<TopTerm[] | null>(null);
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);

  const form = useForm<SearchFilterProps>({
    resolver: zodResolver(searchFilterSchema),
    defaultValues: { term: "" },
  });

  // initialize from URL
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setActiveFilter(params.get("letter"));
      const t = params.get("term");
      if (t) form.setValue("term", t);
    }
  }, [form]);

  async function onSubmit({ term }: SearchFilterProps) {
    const value = term.trim();
    toast.loading(`Searching for "${value || "all terms"}"...`, {
      id: "search",
    });
    try {
      if (value) {
        // Record the search and increment popularity on the matching term
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ term: value }),
        });
        if (!res.ok) {
          throw new Error(`Search record failed: ${res.status}`);
        }

        // Update URL params to reflect the active search term
        const params = new URLSearchParams(
          typeof window !== "undefined" ? window.location.search : "",
        );
        params.set("term", value);
        params.delete("letter");
        setActiveFilter(null);
        router.push(`/terms?${params.toString()}`, { scroll: false });
      }
      toast.success("Search completed!", { id: "search" });
    } catch (error) {
      console.log("Search error", error);
      toast.error("Search failed.", { id: "search" });
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

  // Fetch top searched
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/terms/top?limit=3`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data: { items: TopTerm[] } = await res.json();
        if (!cancelled) setItems(data.items || []);
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
  }, []);

  return (
    <>
      <Wrapper className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap md:mt-[56px] md:gap-3">
        {(terms.isFetching || loading || (items && items?.length > 0)) && (
          <React.Fragment>
            <p className="text-sm font-normal sm:text-base">Top Searched</p>
            <div className="flex items-center gap-1">
              {terms.isFetching || loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-8 w-[130px] first-of-type:w-[100px] last-of-type:w-[80px]"
                    />
                  ))
                : items?.map((tag) => (
                    <Badge
                      key={tag._id}
                      className="text-foreground bg-primary/15 px-2 py-1 text-xs font-normal sm:px-4 sm:text-sm"
                    >
                      {tag.name}
                    </Badge>
                  ))}
            </div>
          </React.Fragment>
        )}
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
                      {(form.watch("term")?.trim()?.length ?? 0) > 0 ? (
                        <IoClose
                          role="button"
                          onClick={() => {
                            const params = new URLSearchParams(
                              typeof window !== "undefined"
                                ? window.location.search
                                : "",
                            );
                            params.delete("term");
                            setActiveFilter(null);
                            router.push(`/terms?${params.toString()}`, {
                              scroll: false,
                            });
                            form.reset({ term: "" });
                          }}
                          className="absolute top-1/2 left-5 size-5 -translate-y-1/2 cursor-pointer text-[#8E8E8E] md:size-6"
                        />
                      ) : (
                        <FiSearch className="absolute top-1/2 left-5 size-5 -translate-y-1/2 text-[#8E8E8E] md:size-6" />
                      )}
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
                        disabled={
                          !form.formState.isValid || form.formState.isSubmitting
                        }
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
    </>
  );
};
