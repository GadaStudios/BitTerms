import z from "zod";

export const searchFilterSchema = z.object({
  term: z.string().min(1).max(50),
});

export type SearchFilterProps = z.infer<typeof searchFilterSchema>;

export type SuggestValidationMessages = {
  name_min?: string;
  name_max?: string;
  author_max?: string;
  definition_max?: string;
  technical_min?: string;
  technical_max?: string;
};

export const getSuggestFormSchema = (dictionary?: SuggestValidationMessages) =>
  z.object({
    author: z
      .string()
      .max(50, dictionary?.author_max)
      .optional()
      .or(z.literal("")),
    name: z
      .string()
      .min(3, dictionary?.name_min)
      .max(100, dictionary?.name_max),
    definition: z
      .string()
      .max(300, dictionary?.definition_max)
      .optional()
      .or(z.literal("")),
    technicalDefinition: z
      .string()
      .min(2, dictionary?.technical_min)
      .max(1000, dictionary?.technical_max),
    illustration: z.instanceof(File).optional(),
  });

export const suggestFormSchema = getSuggestFormSchema();

export type SuggestFormValues = z.infer<
  ReturnType<typeof getSuggestFormSchema>
>;
