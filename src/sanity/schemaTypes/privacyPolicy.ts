import { defineArrayMember, defineField, defineType } from "sanity";
import { requiredText, seoFields } from "./seoFields";

export const privacyPolicy = defineType({
  name: "privacyPolicy",
  title: "Privacy policy",
  type: "document",
  fields: [
    ...seoFields(),
    requiredText("heading", "Heading"),
    defineField({
      name: "policyUpdated",
      title: "Policy last changed",
      type: "date",
      description:
        "Shown on the page as \"Last updated\". Change it only when the policy itself changes, not for typo fixes.",
      options: { dateFormat: "D MMMM YYYY" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      description: "Shown in this order.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            requiredText("heading", "Heading"),
            defineField({
              name: "paragraphs",
              title: "Paragraphs",
              type: "array",
              of: [defineArrayMember({ type: "text", rows: 4 })],
            }),
            defineField({
              name: "list",
              title: "Bullet list (optional)",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
          ],
          preview: { select: { title: "heading" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Privacy policy" }) },
});
