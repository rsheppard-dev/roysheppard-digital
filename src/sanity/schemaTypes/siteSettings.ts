import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
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
        defineField({
          name: "socialImage",
          title: "Default social share image",
          type: "image",
          options: { hotspot: true },
          description:
            "The picture shown when any page is shared on social media or in messages, unless that page has its own. 1200 × 630 works best. Leave blank to use the built-in image.",
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
