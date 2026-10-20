import { defineArrayMember, defineField, defineType } from "sanity";
import { requiredText, seoFields } from "./seoFields";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    ...seoFields(),
    requiredText("heading", "Heading", 2),
    requiredText("intro", "Intro", 3),
    requiredText("stepsHeading", "\"What happens next\" label"),
    defineField({
      name: "steps",
      title: "What happens next (steps)",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 2 })],
    }),
    requiredText(
      "directHeading",
      "\"Prefer email or phone?\" label",
      0,
      "The email address and phone number come from the Footer.",
    ),
  ],
  preview: { prepare: () => ({ title: "Contact page" }) },
});
