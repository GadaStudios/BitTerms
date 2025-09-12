import { defineQuery } from "next-sanity";

export const TERM_QUERY = defineQuery(
  `*[_type == "term" && approved == true]{
      _id,
      name,
      definition,
      technicalDefinition,
      illustration{
        _key,
        asset->{
          _id,
          url
        }
      },
      author,
      audio
    } | order(name asc)`,
);
