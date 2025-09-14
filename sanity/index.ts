import { type SchemaTypeDefinition } from "sanity";

import { termsType } from "./schema/term.type";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [termsType],
};
