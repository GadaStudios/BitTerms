import { type SchemaTypeDefinition } from "sanity";
import { termsType } from "./term.type";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [termsType],
};
