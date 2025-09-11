import { type SchemaTypeDefinition } from "sanity";

import { termsType } from "./termsType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [termsType],
};
