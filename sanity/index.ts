import { type SchemaTypeDefinition } from "sanity";

import { termsType } from "./schema/term.type";
import { searchTermType } from "./schema/searchTerm.type";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [termsType, searchTermType],
};
