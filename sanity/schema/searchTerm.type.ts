import { MdTrendingUp } from "react-icons/md";
import { defineField, defineType } from "sanity";

export const searchTermType = defineType({
  name: "searchTerm",
  title: "Search Term",
  type: "document",
  icon: MdTrendingUp,
  fields: [
    defineField({
      name: "term",
      title: "Search Term",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "searchCount",
      title: "Search Count",
      type: "number",
      description: "Total number of times this term has been searched",
      initialValue: 0,
    }),
    defineField({
      name: "lastSearched",
      title: "Last Searched",
      type: "datetime",
      description: "When this term was last searched",
    }),
    defineField({
      name: "relatedTerms",
      title: "Related Terms",
      type: "array",
      of: [{ type: "string" }],
      description: "Other terms frequently searched with this term",
    }),
    defineField({
      name: "isTrending",
      title: "Is Trending",
      type: "boolean",
      description: "Mark if this term is currently trending",
      initialValue: false,
    }),
    defineField({
      name: "associatedTerm",
      title: "Associated Main Term",
      type: "reference",
      to: [{ type: "term" }],
      description: "Link to the main term document if exists",
    }),
  ],
  orderings: [
    {
      title: "Most Searched",
      name: "searchCountDesc",
      by: [{ field: "searchCount", direction: "desc" }],
    },
    {
      title: "Recently Searched",
      name: "lastSearchedDesc",
      by: [{ field: "lastSearched", direction: "desc" }],
    },
    {
      title: "Trending First",
      name: "trendingFirst",
      by: [
        { field: "isTrending", direction: "desc" },
        { field: "searchCount", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "term",
      searchCount: "searchCount",
      lastSearched: "lastSearched",
      isTrending: "isTrending",
    },
    prepare({ title, searchCount, lastSearched, isTrending }) {
      const trendStatus = isTrending ? "🔥 " : "";
      const date = lastSearched
        ? new Date(lastSearched).toLocaleDateString()
        : "Never";

      return {
        title: `${trendStatus}${title}`,
        subtitle: `Searched ${searchCount} times • Last: ${date}`,
      };
    },
  },
});
