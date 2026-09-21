import { defineField, defineType } from "sanity";

export const trustLogo = defineType({
  name: "trustLogo",
  title: "Trust logo",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Client name",
      type: "string",
      description: "Used as alt text.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
