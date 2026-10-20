import { defineArrayMember, defineField, defineType } from "sanity";
import { socialImageField } from "./seoFields";

const titledText = (name: string, title: string, withBenefit = false) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
            validation: (Rule) => Rule.required(),
          }),
          ...(withBenefit
            ? [
                defineField({
                  name: "benefit",
                  title: "Benefit",
                  type: "text",
                  rows: 2,
                }),
              ]
            : []),
        ],
        preview: { select: { title: "title", subtitle: "description" } },
      }),
    ],
  });

export const servicePage = defineType({
  name: "servicePage",
  title: "Service page",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Page address",
      type: "slug",
      description: "The page's URL, for example web-design-watford. Do not change this on a live page.",
      options: { source: "eyebrow" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Search title",
      type: "string",
      description: "The title shown in Google and the browser tab.",
      validation: (Rule) => Rule.required().max(70).warning("Over 70 characters may be cut off in Google."),
    }),
    defineField({
      name: "description",
      title: "Search description",
      type: "text",
      rows: 3,
      description: "The snippet shown under the title in Google.",
      validation: (Rule) => Rule.required().max(165).warning("Over 165 characters may be cut off in Google."),
    }),
    socialImageField(),
    defineField({
      name: "eyebrow",
      title: "Eyebrow label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlight",
      title: "Highlighted words",
      type: "string",
      description: "Optional. Words from the heading to highlight (must match the heading exactly).",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    titledText("capabilities", "What the website can do (Web Development only)", true),
    titledText("focusAreas", "Focus areas"),
    defineField({
      name: "caseStudy",
      title: "Showcase project",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow label", type: "string", initialValue: "Showcase" }),
        defineField({ name: "name", title: "Project name", type: "string" }),
        defineField({ name: "meta", title: "Project summary line", type: "string" }),
        defineField({ name: "url", title: "Project website", type: "url" }),
        defineField({
          name: "contribution",
          title: "What I did",
          type: "array",
          of: [defineArrayMember({ type: "text", rows: 3 })],
        }),
        defineField({ name: "quote", title: "Client quote", type: "text", rows: 4 }),
        defineField({ name: "quoteName", title: "Quote name", type: "string" }),
        defineField({ name: "quoteCompany", title: "Quote company", type: "string" }),
      ],
    }),
    defineField({
      name: "processIntro",
      title: "How it works: intro",
      type: "text",
      rows: 2,
      description: "Optional line under the How it works heading.",
    }),
    titledText("process", "How it works: steps"),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
    defineField({
      name: "related",
      title: "Related pages",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "eyebrow", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `/${subtitle}` : "" };
    },
  },
});
