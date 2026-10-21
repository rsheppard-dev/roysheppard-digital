import { defineQuery } from "next-sanity";

export const siteSettingsQuery = defineQuery(
  `*[_type == "siteSettings"][0]{ seo }`,
);

export const heroQuery = defineQuery(
  `*[_type == "hero"][0]{ badge, heading, tagline, body }`,
);

export const aboutQuery = defineQuery(
  `*[_type == "about"][0]{ eyebrow, statement, tags, image, "imageDimensions": image.asset->metadata.dimensions{width, height} }`,
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

export const servicePageQuery = defineQuery(
  `*[_type == "servicePage" && slug.current == $slug][0]{
    title,
    description,
    socialImage,
    eyebrow,
    heading,
    highlight,
    intro,
    capabilities[]{ _key, title, description, benefit },
    focusAreas[]{ _key, title, description },
    caseStudy{ eyebrow, name, meta, url, contribution, quote, quoteName, quoteCompany },
    processIntro,
    process[]{ _key, title, description },
    faqs[]{ _key, question, answer },
    related[]{ _key, label, href }
  }`,
);

export const privacyPolicyQuery = defineQuery(
  `*[_type == "privacyPolicy"][0]{ title, description, socialImage, heading, policyUpdated, sections[]{ _key, heading, paragraphs, list } }`,
);

export const freeReviewPageQuery = defineQuery(
  `*[_type == "freeReviewPage"][0]{
    title, description, socialImage, eyebrow, heading, intro,
    areasHeading, areasIntro, areas[]{ _key, title, description },
    stepsHeading, stepsIntro, steps[]{ _key, title, description },
    faqHeading, faqs[]{ _key, question, answer }
  }`,
);

export const contactPageQuery = defineQuery(
  `*[_type == "contactPage"][0]{ title, description, socialImage, heading, intro, stepsHeading, steps, directHeading }`,
);

export const notFoundPageQuery = defineQuery(
  `*[_type == "notFoundPage"][0]{ title, description, heading, body, primaryButton, secondaryLink }`,
);

export const workIndexPageQuery = defineQuery(
  `*[_type == "workIndexPage"][0]{ title, description, socialImage, eyebrow, heading, intro }`,
);

export const servicesIndexPageQuery = defineQuery(
  `*[_type == "servicesIndexPage"][0]{ title, description, socialImage, eyebrow, heading, intro }`,
);

export const servicePageSlugsQuery = defineQuery(
  `*[_type == "servicePage" && defined(slug.current)]{ "slug": slug.current }`,
);

export const workItemsQuery = defineQuery(
  `*[_type == "workItem"] | order(order asc){ name, meta, image, url, "slug": slug.current, "imageDimensions": image.asset->metadata.dimensions{width, height} }`,
);

export const workIndexQuery = defineQuery(
  `*[_type == "workItem" && defined(slug.current)] | order(order asc){ name, tagline, industry, projectType, url, image, "slug": slug.current, "imageDimensions": image.asset->metadata.dimensions{width, height} }`,
);

export const workScreensQuery = defineQuery(
  `*[_type == "workItem" && defined(slug.current)] | order(order asc){ name, "slug": slug.current, "screens": showcase[_type == "showcaseMobile"][0].images[]{ alt, asset } }`,
);

export const projectScreensQuery = defineQuery(
  `*[_type == "workItem" && slug.current == $slug][0]{ name, "slug": slug.current, "screens": showcase[_type == "showcaseMobile"][0].images[]{ alt, asset } }`,
);

export const caseStudySlugsQuery = defineQuery(
  `*[_type == "workItem" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
);

export const llmsCaseStudiesQuery = defineQuery(
  `*[_type == "workItem" && defined(slug.current)] | order(order asc){ name, meta, tagline, "slug": slug.current }`,
);

export const caseStudyQuery = defineQuery(
  `*[_type == "workItem" && slug.current == $slug][0]{
    name,
    url,
    tagline,
    metaTitle,
    metaDescription,
    socialImage,
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
      images[]{ ..., "dimensions": asset->metadata.dimensions{width, height} },
      view,
      pieces[]{ _key, label, source, place, scale, rotate }
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
