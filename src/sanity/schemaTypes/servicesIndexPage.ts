import { defineType } from "sanity";
import { requiredText, seoFields } from "./seoFields";

export const servicesIndexPage = defineType({
  name: "servicesIndexPage",
  title: "Services page",
  type: "document",
  fields: [
    ...seoFields(),
    requiredText("eyebrow", "Eyebrow label"),
    requiredText("heading", "Heading"),
    requiredText("intro", "Intro", 3, "The three services listed below it are managed under Services (the cards on the homepage)."),
  ],
  preview: { prepare: () => ({ title: "Services page" }) },
});
