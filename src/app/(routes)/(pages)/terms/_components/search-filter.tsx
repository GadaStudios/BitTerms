"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  term: z
    .string("Search term is required")
    .min(2, "Minimum of of 2 characters long")
    .max(50, "Maximum of 50 characters long"),
});

type SearchFilterProps = z.infer<typeof formSchema>;

export const SearchFilter = () => {
  const form = useForm<SearchFilterProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      term: "",
    },
  });

  function onSubmit(values: SearchFilterProps) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col max-w-[546px] w-full mx-auto gap-6"
      >
        <div className="flex items-center mx-auto gap-3">
          <p className="text-sm sm:text-base font-normal">Top Searched</p>

          <div className="flex items-center gap-1">
            <Badge className="h-[35px] px-4 text-sm text-foreground font-normal bg-primary/15">
              Consensus
            </Badge>
            <Badge className="h-[35px] px-4 text-sm text-foreground font-normal bg-primary/15">
              Hash
            </Badge>
            <Badge className="h-[35px] px-4 text-sm text-foreground font-normal bg-primary/15">
              Multisig
            </Badge>
          </div>
        </div>

        <FormField
          control={form.control}
          name="term"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative h-[76px]">
                  <FiSearch className="size-6 absolute top-1/2 left-5 text-[#8E8E8E] -translate-y-1/2" />
                  <Input
                    {...field}
                    aria-invalid={!!form.formState.errors.term}
                    placeholder="Search bitcoin terms"
                    className="h-full rounded-full md:text-lg pl-14 pr-36 flex-1 border-foreground placeholder:text-[#B4B4B4] shadow-none"
                  />
                  <Button
                    type="submit"
                    className="!px-8 size-6 absolute top-1/2 right-2 w-[123px] -translate-y-1/2 !h-[calc(100%-16px)]"
                  >
                    <span>Search</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="md:text-base" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
