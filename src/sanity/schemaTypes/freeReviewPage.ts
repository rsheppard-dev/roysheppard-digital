import { defineArrayMember, defineField, defineType } from "sanity";
import { requiredText, seoFields } from "./seoFields";

const titledList = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields: [requiredText("title", "Title"), requiredText("description", "Description", 3)],
        preview: { select: { title: "title", subtitle: "description" } },
      }),
    ],
  });

export const freeReviewPage = defineType({
  name: "freeReviewPage",
  title: "Free website review page",
  type: "document",
  fields: [
    ...seoFields(),
    requiredText("eyebrow", "Eyebrow label"),
    requiredText("heading", "Heading", 2),
    requiredText("intro", "Intro", 3),
    requiredText("areasHeading", "\"What I look at\" heading"),
    requiredText("areasIntro", "\"What I look at\" intro", 2),
    titledList("areas", "What I look at"),
    requiredText("stepsHeading", "\"How it works\" heading"),
    requiredText("stepsIntro", "\"How it works\" intro", 2),
    titledList("steps", "How it works (steps)"),
    requiredText("faqHeading", "FAQ heading"),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [requiredText("question", "Question"), requiredText("answer", "Answer", 3)],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Free website review page" }) },
});
