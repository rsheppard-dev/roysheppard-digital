import { defineField, defineType } from "sanity";

export const workItem = defineType({
  name: "workItem",
  title: "Work item",
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
      title: "Project name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "meta",
      title: "Meta line",
      type: "string",
      description: 'e.g. "Hospitality — brand site & booking system"',
    }),
    defineField({
      name: "image",
      title: "Screenshot",
      type: "image",
      options: { hotspot: true },
      description: "Optional — leave empty to show the placeholder card.",
    }),
    defineField({
      name: "url",
      title: "Live site URL",
      type: "url",
      description: "Optional — if set, the card links out to the live site in a new tab.",
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
    select: { title: "name", subtitle: "meta" },
  },
});
