import { defineQuery } from "next-sanity";

/**
 * When each page last changed, for the sitemap's `lastmod` and each page's
 * `dateModified` structured data. Sanity documents carry their own
 * `_updatedAt`, so every page's date follows its last publish in Studio.
 */

const latestOf = (types: string[]) =>
  `*[_type in ${JSON.stringify(types)}] | order(_updatedAt desc)[0]._updatedAt`;

/** Newest edit among the Sanity documents each kind of page renders from. */
export const lastEditsQuery = defineQuery(`{
  "home": ${latestOf(["hero", "about", "cta", "footer", "service", "testimonial", "faq", "workItem", "siteSettings"])},
  "work": ${latestOf(["workIndexPage", "workItem", "cta", "footer", "siteSettings"])},
  "shared": ${latestOf(["cta", "footer", "siteSettings"])},
  "service": ${latestOf(["servicePage", "workItem", "cta", "footer", "siteSettings"])},
  "freeReview": ${latestOf(["freeReviewPage", "footer", "siteSettings"])},
  "contact": ${latestOf(["contactPage", "footer", "siteSettings"])},
  "privacy": ${latestOf(["privacyPolicy", "cta", "footer", "siteSettings"])}
}`);

export type LastEdits = {
  home: string | null;
  work: string | null;
  shared: string | null;
  service: string | null;
  freeReview: string | null;
  contact: string | null;
  privacy: string | null;
};

/** `home`: the homepage's sections. `freeReview`, `contact`, `privacy`: that page's own document plus the shared sections it shows. `work`: work items plus the shared sections. `service`: service pages, work items (their screenshots) and the shared sections. `shared`: only the shared sections (call-to-action, footer, settings). */
export type DateSource = keyof LastEdits;

/** The most recent of the given dates (ignoring missing ones). */
export function newest(...dates: (string | null | undefined)[]) {
  const times = dates.flatMap((date) => (date ? [new Date(date).getTime()] : []));
  return new Date(Math.max(...times));
}

/** A page's last-modified date: the newest of its Sanity source and its own document. */
export function pageModified(
  edits: LastEdits,
  { source, own }: { source: DateSource; own?: string | null },
) {
  return newest(edits[source], own);
}
