import z from "zod";

export const searchFilterSchema = z.object({
  term: z
    .string()
    .min(3, "Minimum of 3 characters allowed")
    .max(50, "Maximum of 50 characters allowed"),
});

export type SearchFilterProps = z.infer<typeof searchFilterSchema>;

export const suggestFormSchema = z.object({
  author: z
    .string()
    .max(50, "First Name must be at most 50 characters")
    .optional(),
  name: z
    .string()
    .min(3, "Term name must be at least 3 characters")
    .max(100, "Term name must be at most 100 characters"),
  definition: z
    .string()
    .max(300, "Simplify Definition must be at most 300 characters")
    .optional(),
  technicalDefinition: z
    .string()
    .min(2, "Technical Definition must be at least 2 characters")
    .max(1000, "Technical Definition must be at most 1000 characters"),
  illustration: z.instanceof(File).optional(),
  audio: z.string().optional(),
});

export type SuggestFormValues = z.infer<typeof suggestFormSchema>;
