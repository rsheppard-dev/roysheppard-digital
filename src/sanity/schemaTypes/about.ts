import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow label",
      type: "string",
      initialValue: "About",
    }),
    defineField({
      name: "statement",
      title: "Statement",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "Illustration",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "statement" },
  },
});
