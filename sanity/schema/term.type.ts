import { MdOutlineBrandingWatermark } from "react-icons/md";
import { defineField, defineType } from "sanity";

export const termsType = defineType({
  name: "term",
  title: "Term",
  type: "document",
  icon: MdOutlineBrandingWatermark,
  groups: [
    {name: "details",title: "Details", default: true},
    {name: "media",title: "Media"},
    {name: "popularity",title: "Popularity"},
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name of Term",
      type: "string",
    }),
    defineField({
      name: "audio",
      title: "Audio File",
      type: "file",
      options: {
        accept: "audio/*",
      },
      group: "media",
    }),
    defineField({
      name: "author",
      title: "Full Name",
      type: "string",
    }),
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "definition",
      title: "Simplified Definition",
      type: "text",
      group: "details",
    }),
    defineField({
      name: "technicalDefinition",
      title: "Technical Definition",
      type: "text",
      group: "details",
    }),
    defineField({
      name: "illustration",
      title: "Illustration",
      type: "image",
      group: "media",
    }),
    defineField({
      name: "searchPopularity",
      title: "Search Popularity",
      type: "number",
      description: "How often this term is searched",
      initialValue: 0,
      readOnly: true,
      group: "popularity",
    }),
  ],
  orderings: [
    {
      title: "Approved, Newest First",
      name: "approvedDesc",
      by: [
        { field: "approved", direction: "desc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
    {
      title: "Pending Approval",
      name: "pendingFirst",
      by: [
        { field: "approved", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "author",
      approved: "approved",
      audio: "audio",
      media: "illustration",
    },
    prepare({ title, subtitle, approved, audio, media }) {
      const status = approved ? "Approved" : "Pending";
      const audioStatus = audio ? "Has Audio" : "No Audio";

      return {
        title,
        subtitle: `${subtitle || "No author"} • ${status} • ${audioStatus}`,
        media,
      };
    },
  },
});
