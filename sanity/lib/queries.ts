import { defineQuery } from "next-sanity";

export const QUERY_TERMS = () => defineQuery(`
*[_type == "term" && approved == true && (language == $lang || (!defined(language) && $lang == "en"))]{
  _id,
  name,
  "slug": slug.current,
  definition,
  technicalDefinition,
  author,
  "illustration": illustration.asset->url,
  "audio": audio.asset->url
} | order(name asc)`);

export const QUERY_TERMS_PAGED = () => defineQuery(`
*[
  _type == "term" &&
  approved == true &&
  (language == $lang || (!defined(language) && $lang == "en")) &&
  (
    !defined($term) ||
    $term == "" ||
    slug.current == $term ||
    lower(name) match ("*" + $term + "*")
  ) &&
  (
    !defined($letter) ||
    $letter == "" ||
    $letter == "all" ||
    $letter == "#" ||
    string::startsWith(upper(name), upper($letter))
  )
]
| order(name asc)[$offset...$end]{
  _id,
  name,
  "slug": slug.current,
  definition,
  technicalDefinition,
  author,
  "illustration": illustration.asset->url,
  "audio": audio.asset->url,
  "searchPopularity": coalesce(searchPopularity, 0)
}`);

export const QUERY_TOP_TERMS = () => defineQuery(`
  *[_type == "term" && approved == true && (language == $lang || (!defined(language) && $lang == "en"))]
    | order(coalesce(searchPopularity, 0) desc, name asc)[0...$limit]{
      _id,
      name,
      "slug": slug.current,
      "searchPopularity": coalesce(searchPopularity, 0)
    }
`);

export const QUERY_RECENT_ADDED = () => defineQuery(`
  *[_type == "term" && approved == true && (language == $lang || (!defined(language) && $lang == "en"))]
    | order(_createdAt desc)[0...$limit]{
      _id,
      name,
      "slug": slug.current,
      "illustration": illustration.asset->url
    }
`);
