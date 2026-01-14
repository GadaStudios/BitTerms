"use client";

import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { motion, useAnimation } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SearchFilterProps, searchFilterSchema } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContextProvider } from "@/components/provider";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { QUERY_TOP_TERMS } from "@/sanity/lib/queries";

type TopTerm = { _id: string; name: string; searchPopularity: number };

interface SearchCompProps {
  reverse?: boolean;
  className?: string;
}

export const SearchComp: React.FC<SearchCompProps> = ({
  reverse,
  className,
}) => {
  const controls = useAnimation();
  const { terms, fetchTerms, bumpSearchVersion, setTerms } = useContextProvider();

  const [mounted, setMounted] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [items, setItems] = React.useState<TopTerm[] | null>(null);

  const form = useForm<SearchFilterProps>({
    resolver: zodResolver(searchFilterSchema),
    defaultValues: { term: "" },
  });

  const router = useRouter();

  React.useEffect(() => {
    // Read URL params on the client only (avoids next/navigation hooks during prerender)
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const paramTerm = params.get("term") ?? "";
    if (paramTerm) {
      form.setValue("term", paramTerm);
    }
  }, []);

  async function handleBadgeClick(name: string) {
    form.setValue("term", name);
    await onSubmit({ term: name });
  }

  async function onSubmit({ term }: SearchFilterProps) {
    const normalized = (term || "").trim();
    if (!normalized) return;

    // Optimistic UI: push term in the URL so Terms page filters immediately
    const params = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : "",
    );
    params.set("term", normalized);
    // Ensure letter and term are mutually exclusive
    params.delete("letter");
    router.push(`/?${params.toString()}`, { scroll: false });

    // helper to allow clicking on top terms

    // Optimistic: bump local top items and provider state immediately
    const normLower = normalized.toLowerCase();

    setItems((prev) => {
      const prevList = prev ?? [];
      const idx = prevList.findIndex((t) => t.name.toLowerCase() === normLower);
      if (idx >= 0) {
        const updated = [...prevList];
        updated[idx] = {
          ...updated[idx],
          searchPopularity: updated[idx].searchPopularity + 1,
        };
        updated.sort((a, b) => b.searchPopularity - a.searchPopularity || a.name.localeCompare(b.name));
        return updated.slice(0, 3);
      }
      const newItem: TopTerm = { _id: `temp-${Date.now()}`, name: normalized, searchPopularity: 1 };
      return [newItem, ...prevList].slice(0, 3);
    });

    // Update provider terms' local searchPopularity for immediate feedback
    setTerms((prev) => ({
      ...prev,
      data: prev.data.map((t) =>
        t.name?.toLowerCase() === normLower
          ? { ...t, searchPopularity: (t as any).searchPopularity ? (t as any).searchPopularity + 1 : 1 }
          : t,
      ),
    }));

    // Fire: record the search server-side and then refresh terms
    try {
      await fetch(`/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ term: normalized }),
      });

      // After server records the search, refresh terms and top badges
      if (fetchTerms) await fetchTerms(false);

      try {

        const q = QUERY_TOP_TERMS();
        const top: TopTerm[] = await client.withConfig({ useCdn: true, token: undefined }).fetch(q, { limit: 3 });
        setItems(top || []);
      } catch (e) {
        console.error("Failed to refresh top items", e);
      }

      // notify other components that searches updated
      if (bumpSearchVersion) bumpSearchVersion();
    } catch (err) {
      console.error("Search recording failed", err);
      toast.error("Failed to record search");
    }
  }

  // Fetch top searched using Sanity client
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const q = QUERY_TOP_TERMS();
        const data: TopTerm[] = await client.withConfig({ useCdn: true, token: undefined }).fetch(q, { limit: 3 });
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
  }, []);

  React.useEffect(() => {
    setMounted(true);

    const onScroll = () => {
      const y = window.scrollY;

      if (y > 800) {
        if (reverse) {
          controls.start({ y: 100, opacity: 0, pointerEvents: "none" });
        } else {
          controls.start({ y: 0, opacity: 1, pointerEvents: "auto" });
        }
      } else {
        if (reverse) {
          controls.start({ y: 0, opacity: 1, pointerEvents: "auto" });
        } else {
          controls.start({ y: -100, opacity: 0, pointerEvents: "none" });
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [controls, reverse]);

  return (
    <motion.div
      animate={mounted ? controls : undefined}
      initial={{
        y: reverse ? 0 : 100,
        opacity: reverse ? 1 : 0,
        pointerEvents: reverse ? "auto" : "none",
      }}
      transition={{ duration: 0.25 }}
      className={cn(
        "sticky top-0 z-50 flex flex-col gap-2 py-4 sm:gap-4",
        className,
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="mx-auto w-full max-w-[702px]">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="border-primary relative flex h-16 items-center rounded-full border p-1.5 transition-all duration-300 md:h-[76px]">
                      <span className="pl-4 sm:pl-6">
                        {(form.watch("term")?.trim()?.length ?? 0) > 0 ? (
                          <IoClose
                            role="button"
                            onClick={() => form.reset({ term: "" })}
                            className="size-5 cursor-pointer text-[#8E8E8E] md:size-6"
                          />
                        ) : (
                          <FiSearch className="size-5 text-[#8E8E8E] md:size-6" />
                        )}
                      </span>

                      <Input
                        autoComplete="off"
                        className="h-full! rounded-full border-transparent bg-transparent px-4! shadow-none placeholder:text-[#B4B4B4] focus-visible:border-transparent focus-visible:ring-0 md:text-lg"
                        placeholder="Search bitcoin terms"
                        {...field}
                      />
                      <Button
                        type="submit"
                        disabled={
                          !form.formState.isValid || form.formState.isSubmitting
                        }
                        className="h-full! md:px-8!"
                      >
                        <span className="text-sm sm:text-base">Search</span>
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      <div className="mx-auto flex flex-row justify-center gap-2 sm:flex-wrap md:gap-3">
        {terms.isFetching || loading || (items && items?.length > 0) ? (
          <React.Fragment>
            <p className="mt-1 text-sm font-normal sm:text-base">
              Top Searched
            </p>
            <div className="flex flex-1 flex-wrap items-center gap-1">
              {terms.isFetching || loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-8 w-[130px] first-of-type:w-[100px] last-of-type:w-20"
                    />
                  ))
                : items?.map((tag, idx) => (
                    <Badge
                      key={idx}
                      role="button"
                      onClick={() => handleBadgeClick(tag.name)}
                      className="cursor-pointer bg-primary/80 px-2 py-1 text-xs font-normal text-white sm:px-4 sm:text-sm"
                    >
                      {tag.name}
                    </Badge>
                  ))}
            </div>
          </React.Fragment>
        ) : (
          <p className="text-muted-foreground mt-1 text-sm font-normal sm:text-base">
            No Top Searched
          </p>
        )}
      </div>
    </motion.div>
  );
};
