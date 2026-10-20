import { defineType } from "sanity";
import { requiredText, seoFields } from "./seoFields";

export const workIndexPage = defineType({
  name: "workIndexPage",
  title: "Work page",
  type: "document",
  fields: [
    ...seoFields(),
    requiredText("eyebrow", "Eyebrow label"),
    requiredText("heading", "Heading"),
    requiredText("intro", "Intro", 3, "The case studies listed below it are managed under Case studies."),
  ],
  preview: { prepare: () => ({ title: "Work page" }) },
});
