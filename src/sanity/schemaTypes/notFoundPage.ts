import { defineType } from "sanity";
import { requiredText, seoFields } from "./seoFields";

export const notFoundPage = defineType({
  name: "notFoundPage",
  title: "Page not found (404)",
  type: "document",
  fields: [
    ...seoFields({ socialImage: false }),
    requiredText("heading", "Heading", 2),
    requiredText("body", "Message", 2),
    requiredText("primaryButton", "Main button label"),
    requiredText("secondaryLink", "Second link label"),
  ],
  preview: { prepare: () => ({ title: "Page not found (404)" }) },
});
