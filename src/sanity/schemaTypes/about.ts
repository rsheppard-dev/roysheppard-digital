import { defineArrayMember, defineField, defineType } from "sanity";

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
      name: "badges",
      title: "Badges",
      description:
        "The pills under the statement. Add a link to send visitors to the page that backs the badge up, for example /web-design-watford. Leave the link empty for a plain badge.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "href",
              title: "Link",
              description: "A page on this site such as /services, or a full https:// address.",
              type: "string",
              validation: (Rule) =>
                Rule.custom((value) =>
                  !value || /^(\/|https:\/\/)/.test(value) ? true : "Start with / for a page on this site, or https:// for another site.",
                ),
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags (old)",
      description: "Replaced by Badges above. Only used if Badges is empty.",
      type: "array",
      of: [{ type: "string" }],
      hidden: true,
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
