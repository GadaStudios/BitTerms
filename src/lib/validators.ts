import z from "zod";

export const searchFilterSchema = z.object({
  term: z
    .string()
    .min(3, "Minimum of 3 characters allowed")
    .max(50, "Maximum of 50 characters allowed"),
});

export type SearchFilterProps = z.infer<typeof searchFilterSchema>;
