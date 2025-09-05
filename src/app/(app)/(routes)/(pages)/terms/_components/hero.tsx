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
      <section className="pt-36 sm:pt-44 md:pt-[187px] relative">
        <Wrapper className="flex flex-col text-center gap-8 md:gap-14">
          <div className="flex flex-col gap-4">
            <h2 className="text-center flex flex-col">
              Looking for a term? <br /> See its simplified definition
            </h2>
            <p className="text-base md:text-lg lg:text-xl max-w-[640px] w-full mx-auto">
              Find or search for terms you want to know about and see a
              simplified definition with accompanied illustration
            </p>
          </div>

          <div className="flex items-center mx-auto gap-3">
            <p className="text-sm sm:text-base font-normal">Top Searched</p>
            <div className="flex items-center gap-1">
              {["Accessibility", "Hash", "Multisig"].map((tag) => (
                <Badge
                  key={tag}
                  className="px-2 py-1 sm:px-4 text-xs sm:text-sm text-foreground font-normal bg-primary/15 cursor-pointer"
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
          className={cn("w-full sticky top-0 z-50 bg-background py-6", {
            "py-4": isScrolled,
          })}
        >
          <Wrapper className="max-w-[546px] mx-auto w-full">
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
                          : "h-14 md:h-16 lg:h-[76px]"
                      )}
                    >
                      <FiSearch className="size-5 md:size-6 absolute top-1/2 left-5 text-[#8E8E8E] -translate-y-1/2" />
                      <Input
                        {...field}
                        value={field.value}
                        disabled={form.formState.isSubmitting}
                        onChange={(e) => handleChange(e.target.value)}
                        id={termId}
                        placeholder="Search bitcoin terms"
                        className={cn(
                          "h-full rounded-full md:text-lg md:pl-14 pr-26 flex-1 border-foreground placeholder:text-[#B4B4B4] shadow-none",
                          isScrolled ? "md:pr-32 pl-8" : "pl-12 md:pr-36"
                        )}
                      />
                      <Button
                        type="submit"
                        loadingText="Searching..."
                        isLoading={form.formState.isSubmitting}
                        disabled={!form.formState.isValid}
                        className={cn(
                          "absolute top-1/2 right-2 -translate-y-1/2 !h-[calc(100%-12px)] transition-all",
                          isScrolled ? "right-1.5" : "!px-9"
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
