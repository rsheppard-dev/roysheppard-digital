import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to action banner",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "heading" },
  },
});
