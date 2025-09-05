import { MdOutlineBrandingWatermark } from "react-icons/md";
import { defineField, defineType } from "sanity";

export const termsType = defineType({
  name: "term",
  title: "Term",
  type: "document",
  icon: MdOutlineBrandingWatermark,
  fields: [
    defineField({
      name: "name",
      title: "Name of Term",
      type: "string",
    }),
    defineField({
      name: "audio",
      title: "Term Audio",
      type: "url",
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
      type: "blockContent",
    }),
    defineField({
      name: "technicalDefinition",
      title: "Technical Definition",
      type: "blockContent",
    }),
    defineField({
      name: "illustration",
      title: "Illustration",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
  ],
});
