import { defineArrayMember, defineField, defineType } from "sanity";
import { socialImageField } from "./seoFields";

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
        "One or two sentences under the project name. Lead with what the project did for the business. Also the search description if no Search description is set below.",
      group: "overview",
      validation: (Rule) =>
        Rule.max(200).custom((value, context) =>
          context.document?.slug && !value ? "Needed for the case study page" : true,
        ),
    }),
    defineField({
      name: "metaTitle",
      title: "Search title",
      type: "string",
      description: "Optional. The title shown in Google and the browser tab. Leave blank for \"[Name] Website Case Study | Roy Sheppard\".",
      group: "overview",
      validation: (Rule) => Rule.max(70).warning("Over 70 characters may be cut off in Google."),
    }),
    defineField({
      ...socialImageField(),
      description:
        "Optional. The picture shown when this case study is shared. 1200 × 630 works best. Leave blank to use a crop of the main screenshot.",
      group: "overview",
    }),
    defineField({
      name: "metaDescription",
      title: "Search description",
      type: "text",
      rows: 2,
      description:
        "Optional. What shows under the page title in Google, aim for 120 to 155 characters. Say what the business is and where, e.g. \"How Roy Sheppard built a new website for a Watford estate agency, with property search and valuations in one place.\" Falls back to the tagline if empty.",
      group: "overview",
      validation: (Rule) => Rule.max(160).warning("Google cuts descriptions off at about 155 characters."),
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
        defineArrayMember({
          name: "showcasePopout",
          title: "Pop-out",
          type: "object",
          description:
            "One full-page screenshot with parts of it lifted off the page. Every piece is cut from the same screenshot, so there is nothing else to upload.",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              description: "What this part of the build does for the client. With a heading the pop-out sits beside its text instead of full width.",
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 4,
              description: "What you built and why, in plain words. Only what is true of this project.",
            }),
            defineField({
              ...screenshot("image", "Full screenshot"),
              description:
                "Capture the page at 2x (e.g. 1440px wide at device scale 2, so 2880px). All the numbers below are pixels in this image.",
            }),
            defineField({
              name: "view",
              title: "Visible area",
              type: "object",
              description: "The part of the screenshot shown as the page behind the pieces.",
              options: { columns: 4 },
              fields: [
                defineField({ name: "x", title: "Left", type: "number", validation: (Rule) => Rule.required().min(0) }),
                defineField({ name: "y", title: "Top", type: "number", validation: (Rule) => Rule.required().min(0) }),
                defineField({ name: "width", title: "Width", type: "number", validation: (Rule) => Rule.required().min(1) }),
                defineField({ name: "height", title: "Height", type: "number", validation: (Rule) => Rule.required().min(1) }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "pieces",
              title: "Pieces",
              type: "array",
              description: "Two to four work best. Each is lifted off the page with a soft shadow.",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      title: "What it shows",
                      type: "string",
                      description: "Read out to screen readers, e.g. \"Search filters for area, price and bedrooms\".",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "source",
                      title: "Cut from the screenshot",
                      type: "object",
                      options: { columns: 4 },
                      fields: [
                        defineField({ name: "x", title: "Left", type: "number", validation: (Rule) => Rule.required().min(0) }),
                        defineField({ name: "y", title: "Top", type: "number", validation: (Rule) => Rule.required().min(0) }),
                        defineField({ name: "width", title: "Width", type: "number", validation: (Rule) => Rule.required().min(1) }),
                        defineField({ name: "height", title: "Height", type: "number", validation: (Rule) => Rule.required().min(1) }),
                      ],
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "place",
                      title: "Where it sits",
                      type: "object",
                      description: "Top-left corner, in the same pixels as the screenshot, measured from the screenshot's own top-left.",
                      options: { columns: 2 },
                      fields: [
                        defineField({ name: "x", title: "Left", type: "number", validation: (Rule) => Rule.required() }),
                        defineField({ name: "y", title: "Top", type: "number", validation: (Rule) => Rule.required() }),
                      ],
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "scale",
                      title: "Size",
                      type: "number",
                      description: "1 is the size it has on the page. Slightly above 1 reads as lifted towards the viewer.",
                      initialValue: 1,
                      validation: (Rule) => Rule.min(0.5).max(2),
                    }),
                    defineField({
                      name: "rotate",
                      title: "Tilt (degrees)",
                      type: "number",
                      description: "Optional. Keep it under 2.",
                      initialValue: 0,
                      validation: (Rule) => Rule.min(-4).max(4),
                    }),
                  ],
                  preview: { select: { title: "label" } },
                }),
              ],
              validation: (Rule) => Rule.required().min(1).max(5),
            }),
            caption,
          ],
          preview: {
            select: { title: "heading", fallback: "caption", media: "image" },
            prepare: ({ title, fallback, media }) => ({ title: title || fallback || "Pop-out", subtitle: "Pop-out", media }),
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
