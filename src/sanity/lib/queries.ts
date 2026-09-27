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
  `*[_type == "workItem"] | order(order asc){ name, meta, image, url, "slug": slug.current, "imageDimensions": image.asset->metadata.dimensions{width, height} }`,
);

export const caseStudySlugsQuery = defineQuery(
  `*[_type == "workItem" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
);

export const caseStudyQuery = defineQuery(
  `*[_type == "workItem" && slug.current == $slug][0]{
    name,
    url,
    tagline,
    industry,
    projectType,
    services,
    client,
    challenge,
    solution,
    image,
    "imageDimensions": image.asset->metadata.dimensions{width, height},
    showcase[]{
      _key,
      _type,
      caption,
      heading,
      text,
      image{ ..., "dimensions": asset->metadata.dimensions{width, height} },
      first{ ..., "dimensions": asset->metadata.dimensions{width, height} },
      second{ ..., "dimensions": asset->metadata.dimensions{width, height} },
      images[]{ ..., "dimensions": asset->metadata.dimensions{width, height} }
    },
    features[]{ _key, title, description },
    technologies[]{ _key, name, reason },
    results[]{ _key, figure, title, description },
    testimonial->{ quote, name, company },
    "next": coalesce(
      *[_type == "workItem" && defined(slug.current) && order > ^.order] | order(order asc)[0],
      *[_type == "workItem" && defined(slug.current) && _id != ^._id] | order(order asc)[0]
    ){ name, meta, "slug": slug.current }
  }`,
);

export const testimonialsQuery = defineQuery(
  `*[_type == "testimonial"] | order(order asc){ quote, name, company }`,
);

export const faqsQuery = defineQuery(
  `*[_type == "faq"] | order(order asc){ question, answer }`,
);
