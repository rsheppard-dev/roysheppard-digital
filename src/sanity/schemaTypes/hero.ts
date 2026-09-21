import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    defineField({
      name: "badge",
      title: "Badge text",
      type: "string",
      description: 'e.g. "Taking on new projects for Spring 2026"',
    }),
    defineField({
      name: "heading",
      title: "Heading (H1)",
      type: "string",
      description: "The page's single H1 — keep this the primary SEO headline.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short supporting line shown under the H1, e.g. the brand hook.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "heading" },
  },
});
