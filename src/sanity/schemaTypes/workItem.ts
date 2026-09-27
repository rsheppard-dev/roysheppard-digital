import { defineArrayMember, defineField, defineType } from "sanity";

/** A screenshot with the alt text that describes it (required for anything shown on the case study page). */
const screenshot = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt text",
        type: "string",
        description: "Describe what the screenshot shows, e.g. \"Property search results on mobile\".",
        validation: (Rule) => Rule.required(),
      }),
    ],
    validation: (Rule) => Rule.required(),
  });

const caption = defineField({
  name: "caption",
  title: "Caption",
  type: "string",
  description: "Optional — one short line under the image.",
});

export const workItem = defineType({
  name: "workItem",
  title: "Work item",
  type: "document",
  groups: [
    { name: "card", title: "Homepage card", default: true },
    { name: "overview", title: "Case study: overview" },
    { name: "story", title: "Case study: story" },
    { name: "showcase", title: "Case study: showcase" },
    { name: "details", title: "Case study: details" },
  ],
  fields: [
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
      group: "card",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Project name",
      type: "string",
      group: ["card", "overview"],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "meta",
      title: "Meta line",
      type: "string",
      description: 'e.g. "Hospitality — brand site & booking system"',
      group: "card",
    }),
    defineField({
      name: "image",
      title: "Screenshot",
      type: "image",
      options: { hotspot: true },
      description:
        "Optional — leave empty to show the placeholder card. A tall, full-page screenshot works best: it's also the case study's hero image and scrolls on hover.",
      group: ["card", "overview"],
    }),
    defineField({
      name: "url",
      title: "Live site URL",
      type: "url",
      description: "Optional — if set, the card links out to the live site in a new tab (or to the case study, once it has one).",
      group: ["card", "overview"],
    }),

    // — Case study: overview —
    defineField({
      name: "slug",
      title: "Case study URL",
      type: "slug",
      description:
        "Setting this publishes a case study page at /work/<slug> and links the homepage card to it. Leave empty for a card-only project.",
      options: { source: "name", maxLength: 60 },
      group: "overview",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 2,
      description:
        "One or two sentences under the project name, and the page's search/social description. Lead with what the project did for the business.",
      group: "overview",
      validation: (Rule) =>
        Rule.max(200).custom((value, context) =>
          context.document?.slug && !value ? "Needed for the case study page" : true,
        ),
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      description: 'e.g. "Estate agency"',
      group: "overview",
    }),
    defineField({
      name: "projectType",
      title: "Project type",
      type: "string",
      description: 'e.g. "New website" or "Custom e-commerce build"',
      group: "overview",
    }),
    defineField({
      name: "services",
      title: "Services provided",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description: 'e.g. "Web design", "Web development", "Aftercare"',
      group: "overview",
    }),

    // — Case study: story —
    defineField({
      name: "client",
      title: "The client",
      type: "text",
      rows: 5,
      description: "Who they are and what they do. Separate paragraphs with a blank line.",
      group: "story",
    }),
    defineField({
      name: "challenge",
      title: "The challenge",
      type: "text",
      rows: 8,
      description:
        "What the business needed and why, in business terms rather than a technical spec. The first paragraph is shown larger, so make it the headline problem.",
      group: "story",
    }),
    defineField({
      name: "solution",
      title: "The solution",
      type: "text",
      rows: 8,
      description:
        "Your approach, and why you made the key design and development decisions. The first paragraph is shown larger.",
      group: "story",
    }),

    // — Case study: showcase —
    defineField({
      name: "showcase",
      title: "Design showcase",
      type: "array",
      description:
        "Screenshots, in the order they appear. Mix the layouts — e.g. a browser view, then mobile screens, then a detail — so the page reads like an editorial spread rather than a grid.",
      group: "showcase",
      of: [
        defineArrayMember({
          name: "showcaseBrowser",
          title: "Browser window",
          type: "object",
          fields: [screenshot("image", "Screenshot"), caption],
          preview: {
            select: { title: "caption", media: "image" },
            prepare: ({ title, media }) => ({ title: title || "Browser window", subtitle: "Browser window", media }),
          },
        }),
        defineArrayMember({
          name: "showcaseFullWidth",
          title: "Full-width image",
          type: "object",
          fields: [screenshot("image", "Image"), caption],
          preview: {
            select: { title: "caption", media: "image" },
            prepare: ({ title, media }) => ({ title: title || "Full-width image", subtitle: "Full-width image", media }),
          },
        }),
        defineArrayMember({
          name: "showcaseMobile",
          title: "Mobile screens",
          type: "object",
          fields: [
            defineField({
              name: "images",
              title: "Screens",
              type: "array",
              of: [
                defineArrayMember({
                  type: "image",
                  options: { hotspot: true },
                  fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() })],
                }),
              ],
              description: "One to three phone-width screenshots (390px wide, or a multiple of it).",
              validation: (Rule) => Rule.required().min(1).max(3),
            }),
            caption,
          ],
          preview: {
            select: { title: "caption", media: "images.0" },
            prepare: ({ title, media }) => ({ title: title || "Mobile screens", subtitle: "Mobile screens", media }),
          },
        }),
        defineArrayMember({
          name: "showcasePair",
          title: "Side-by-side",
          type: "object",
          fields: [screenshot("first", "First image"), screenshot("second", "Second image"), caption],
          preview: {
            select: { title: "caption", media: "first" },
            prepare: ({ title, media }) => ({ title: title || "Side-by-side", subtitle: "Side-by-side", media }),
          },
        }),
        defineArrayMember({
          name: "showcaseDetail",
          title: "Detail with notes",
          type: "object",
          fields: [
            screenshot("image", "Cropped detail"),
            defineField({ name: "heading", title: "Heading", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "heading", media: "image" },
            prepare: ({ title, media }) => ({ title, subtitle: "Detail with notes", media }),
          },
        }),
      ],
    }),

    // — Case study: details —
    defineField({
      name: "features",
      title: "Key features",
      type: "array",
      description: "Only what this project actually has — no filler.",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "technologies",
      title: "Technology",
      type: "array",
      description:
        "What it's built with, and why it matters to the client in plain English (e.g. \"Sanity — lets the team update services and gallery photos themselves\").",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "reason", title: "Why it was used", type: "string" }),
          ],
          preview: { select: { title: "name", subtitle: "reason" } },
        }),
      ],
    }),
    defineField({
      name: "results",
      title: "Outcome",
      type: "array",
      description:
        "Genuine outcomes only. Add a figure ONLY if you can back it up (analytics, the client's own numbers); otherwise describe the outcome in words.",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "figure",
              title: "Figure (optional)",
              type: "string",
              description: 'A real, verifiable number, e.g. "2×" or "40%". Leave empty for a qualitative outcome.',
            }),
            defineField({ name: "title", title: "Outcome", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Detail", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "title", figure: "figure" },
            prepare: ({ title, figure }) => ({ title: figure ? `${figure} — ${title}` : title }),
          },
        }),
      ],
    }),
    defineField({
      name: "testimonial",
      title: "Client testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
      description: "Optional — only a quote from this client.",
      group: "details",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "meta", slug: "slug.current", media: "image" },
    prepare: ({ title, subtitle, slug, media }) => ({
      title,
      subtitle: slug ? `Case study · ${subtitle ?? ""}` : subtitle,
      media,
    }),
  },
});
