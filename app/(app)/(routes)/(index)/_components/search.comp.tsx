"use client";
import React from "react";
import { Route } from "next";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { motion, useAnimation } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { QUERY_TOP_TERMS } from "@/sanity/lib/queries";
import { useContextProvider } from "@/components/provider";
import { SearchFilterProps, searchFilterSchema } from "@/lib/validators";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

interface Props {
  reverse?: boolean;
  className?: string;
}

type TopTerm = { _id: string; name: string; searchPopularity: number };

export const SearchComp: React.FC<Props> = ({ reverse, className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const controls = useAnimation();
  const { fetchTerms, bumpSearchVersion, setTerms } = useContextProvider();

  const [mounted, setMounted] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [items, setItems] = React.useState<TopTerm[] | null>(null);

  const form = useForm<SearchFilterProps>({
    resolver: zodResolver(searchFilterSchema),
    defaultValues: { term: "" },
  });

  // Initialize form value from URL params on component mount
  React.useEffect(() => {
    const termParam = searchParams.get("term");
    if (termParam) {
      form.setValue("term", termParam);
    }
  }, [searchParams, form]);

  async function handleBadgeClick(name: string) {
    form.setValue("term", name);
    await onSubmit({ term: name });
  }

  function handleReset() {
    form.reset({ term: "" });

    // Clear the term parameter from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete("term");

    // Update the URL without the term parameter
    router.push(`${pathname}?${params.toString()}` as Route, { scroll: false });
  }

  async function onSubmit({ term }: SearchFilterProps) {
    const normalized = (term || "").trim();
    if (!normalized) return;

    // Create new URLSearchParams from current params
    const params = new URLSearchParams(searchParams.toString());
    params.set("term", normalized);
    // Ensure letter and term are mutually exclusive
    params.delete("letter");

    // Update URL without scrolling
    router.push(`${pathname}?${params.toString()}` as Route, { scroll: false });

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
        updated.sort(
          (a, b) =>
            b.searchPopularity - a.searchPopularity ||
            a.name.localeCompare(b.name),
        );
        return updated.slice(0, 3);
      }
      const newItem: TopTerm = {
        _id: `temp-${Date.now()}`,
        name: normalized,
        searchPopularity: 1,
      };
      return [newItem, ...prevList].slice(0, 3);
    });

    // Update provider terms' local searchPopularity for immediate feedback
    setTerms((prev) => ({
      ...prev,
      data: prev.data.map((t) =>
        t.name?.toLowerCase() === normLower
          ? {
              ...t,
              searchPopularity: (t as any).searchPopularity
                ? (t as any).searchPopularity + 1
                : 1,
            }
          : t,
      ),
    }));

    // record the search server-side and then refresh terms
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
        const top: TopTerm[] = await client
          .withConfig({ useCdn: true, token: undefined })
          .fetch(q, { limit: 3 });
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
        const data: TopTerm[] = await client
          .withConfig({ useCdn: true, token: undefined })
          .fetch(q, { limit: 3 });
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
    <React.Fragment>
      <Form {...form}>
        <motion.form
          animate={mounted ? controls : undefined}
          initial={{
            y: reverse ? 0 : 100,
            opacity: reverse ? 1 : 0,
            pointerEvents: reverse ? "auto" : "none",
          }}
          transition={{ duration: 0.25 }}
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("w-full py-4", className)}
        >
          <div className="mx-auto w-full max-w-[702px]">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="border-primary relative flex h-14 items-center rounded-full border p-1.5 transition-all duration-300 sm:h-16 md:h-[76px]">
                      <span className="pl-4 sm:pl-6">
                        {(form.watch("term")?.trim()?.length ?? 0) > 0 ? (
                          <IoClose
                            role="button"
                            onClick={handleReset}
                            className="size-5 cursor-pointer text-[#8E8E8E] md:size-6"
                          />
                        ) : (
                          <FiSearch className="size-5 text-[#8E8E8E] md:size-6" />
                        )}
                      </span>

                      <Input
                        type="text"
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
        </motion.form>
      </Form>

      <motion.div
        animate={mounted ? controls : undefined}
        initial={{
          y: reverse ? 0 : 100,
          opacity: reverse ? 1 : 0,
          pointerEvents: reverse ? "auto" : "none",
        }}
        transition={{ duration: 0.25 }}
        className="mx-auto flex flex-row flex-wrap items-center justify-center gap-2 sm:items-start md:gap-3"
      >
        <p className="mt-1 text-sm font-normal sm:text-base">
          {items && items?.length > 0 ? "Top Searched" : ""}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1">
          {loading
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
                  className="bg-primary/80 cursor-pointer px-2 py-1 text-xs font-normal text-white sm:px-4 sm:text-sm"
                >
                  {tag.name}
                </Badge>
              ))}
        </div>
      </motion.div>
    </React.Fragment>
  );
};
