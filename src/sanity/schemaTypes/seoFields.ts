import { defineField } from "sanity";

/** The optional per-page share picture. The site-wide default lives in Site Settings. */
export const socialImageField = () =>
  defineField({
    name: "socialImage",
    title: "Social share image",
    type: "image",
    options: { hotspot: true },
    description:
      "Optional. The picture shown when this page is shared on social media or in messages. 1200 × 630 works best. Leave blank to use the default in Site Settings.",
  });

/** Search title and description for a page (shown in Google, the browser tab and social cards), plus an optional social share image. */
export const seoFields = ({ socialImage = true } = {}) => [
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
  ...(socialImage ? [socialImageField()] : []),
];

const requiredText = (name: string, title: string, rows = 0, description?: string) =>
  defineField({
    name,
    title,
    type: rows ? "text" : "string",
    ...(rows ? { rows } : {}),
    ...(description ? { description } : {}),
    validation: (Rule) => Rule.required(),
  });

export { requiredText };
