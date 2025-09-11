"use client";

import { toast } from "sonner";
import React, { useId } from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

import Wrapper from "@/components/wrapper";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchFilterProps, searchFilterSchema } from "@/lib/validators";
import { cn } from "@/lib/utils";

export const TermsHero = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTerm = searchParams.get("term") ?? "";
  const termId = useId();

  const [isScrolled, setIsScrolled] = React.useState(false);

  const form = useForm<SearchFilterProps>({
    resolver: zodResolver(searchFilterSchema),
    defaultValues: { term: activeTerm ?? "" },
  });

  function handleChange(value: string) {
    form.setValue("term", value, { shouldValidate: true });

    const params = new URLSearchParams(searchParams.toString());
    if (!value.trim()) {
      params.delete("term");
    } else {
      params.set("term", value.trim());
    }
    router.replace(`?${params.toString()}`);
  }

  async function onSubmit({ term }: SearchFilterProps) {
    toast.loading(`Searching for "${term.trim() || "all terms"}"...`, {
      id: "search",
    });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success(`Search completed!`, { id: "search" });
  }

  // Track scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <React.Fragment>
      <section className="relative pt-36 sm:pt-44 md:pt-[187px]">
        <Wrapper className="flex flex-col gap-8 text-center md:gap-14">
          <div className="flex flex-col gap-4">
            <h2 className="flex flex-col text-center">
              Looking for a term? <br /> See its simplified definition
            </h2>
            <p className="mx-auto w-full max-w-[640px] text-base md:text-lg lg:text-xl">
              Find or search for terms you want to know about and see a
              simplified definition with accompanied illustration
            </p>
          </div>

          <div className="mx-auto flex items-center gap-3">
            <p className="text-sm font-normal sm:text-base">Top Searched</p>
            <div className="flex items-center gap-1">
              {["Accessibility", "Hash", "Multisig"].map((tag) => (
                <Badge
                  key={tag}
                  className="text-foreground bg-primary/15 cursor-pointer px-2 py-1 text-xs font-normal sm:px-4 sm:text-sm"
                  onClick={() => handleChange(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Wrapper>
      </section>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("bg-background sticky top-0 z-50 w-full py-6", {
            "py-4": isScrolled,
          })}
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
                          ? "h-14 md:h-12 lg:h-[54px]"
                          : "h-14 md:h-16 lg:h-[76px]",
                      )}
                    >
                      <FiSearch className="absolute top-1/2 left-5 size-5 -translate-y-1/2 text-[#8E8E8E] md:size-6" />
                      <Input
                        {...field}
                        value={field.value}
                        disabled={form.formState.isSubmitting}
                        onChange={(e) => handleChange(e.target.value)}
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
    </React.Fragment>
  );
};
