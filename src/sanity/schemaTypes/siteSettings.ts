import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "trustLabel",
      title: "Trust strip label",
      type: "string",
      initialValue: "Worked with",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      description:
        "Overrides the default page title and description used in the browser tab, search results, and social share cards.",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta title",
          type: "string",
          description: "Leave blank to use the default site title.",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta description",
          type: "text",
          rows: 3,
          description: "Leave blank to use the default site description.",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
