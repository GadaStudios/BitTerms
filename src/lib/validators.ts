import z from "zod";

export const searchFilterSchema = z.object({
  term: z
    .string()
    .min(3, "Minimum of 3 characters allowed")
    .max(50, "Maximum of 50 characters allowed"),
});

export type SearchFilterProps = z.infer<typeof searchFilterSchema>;

export const suggestFormSchema = z.object({
  fName: z
    .string()
    .max(50, "First Name must be at most 50 characters")
    .optional(),
  term: z
    .string()
    .min(3, "Term must be at least 3 characters")
    .max(100, "Term must be at most 100 characters"),
  definition: z
    .string()
    .min(2, "Definition must be at least 2 characters")
    .max(1000, "Definition must be at most 1000 characters"),
  simpleDefinition: z
    .string()
    .max(300, "Simplify Definition must be at most 300 characters")
    .optional(),
  illustration: z.string().optional(),
});

export type SuggestFormValues = z.infer<typeof suggestFormSchema>;
