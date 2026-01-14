import { defineQuery } from "next-sanity";

export const QUERY_TERMS = () => defineQuery(`
*[_type == "term" && approved == true]{
  _id,
  name,
  definition,
  technicalDefinition,
  author,
  "illustration": illustration.asset->url,
  "audio": audio.asset->url
} | order(name asc)`);

export const QUERY_TOP_TERMS = () => defineQuery(`
  *[_type == "term" && approved == true]
    | order(coalesce(searchPopularity, 0) desc, name asc)[0...$limit]{
      _id,
      name,
      "searchPopularity": coalesce(searchPopularity, 0)
    }
`);

export const QUERY_RECENT_ADDED = () => defineQuery(`
  *[_type == "term" && approved == true]
    | order(_createdAt desc)[0...$limit]{
      _id,
      name,
      "illustration": illustration.asset->url
    }
`);
