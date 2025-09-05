import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { termsType } from "./termsType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, termsType],
};
