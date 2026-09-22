import { defineQuery } from "next-sanity";

export const siteSettingsQuery = defineQuery(
  `*[_type == "siteSettings"][0]{ seo }`,
);

export const heroQuery = defineQuery(
  `*[_type == "hero"][0]{ badge, heading, tagline, body }`,
);

export const aboutQuery = defineQuery(
  `*[_type == "about"][0]{ eyebrow, statement, tags, image }`,
);

export const ctaQuery = defineQuery(
  `*[_type == "cta"][0]{ heading, body, email }`,
);

export const footerQuery = defineQuery(
  `*[_type == "footer"][0]{ name, blurb, email, phone, social }`,
);

export const servicesQuery = defineQuery(
  `*[_type == "service"] | order(order asc){ title, description, bullets }`,
);

export const workItemsQuery = defineQuery(
  `*[_type == "workItem"] | order(order asc){ name, meta, image, url, "imageDimensions": image.asset->metadata.dimensions{width, height} }`,
);

export const testimonialsQuery = defineQuery(
  `*[_type == "testimonial"] | order(order asc){ quote, name, company }`,
);

export const faqsQuery = defineQuery(
  `*[_type == "faq"] | order(order asc){ question, answer }`,
);
