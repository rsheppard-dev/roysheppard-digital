import { defineQuery } from "next-sanity";

/**
 * When each page last changed, for the sitemap's `lastmod` and each page's
 * `dateModified` structured data. Sanity documents carry their own
 * `_updatedAt`; copy that lives in code has a manually maintained date.
 */

// The contact page's copy lives in code, so its date is maintained here.
// (The free review page keeps its own date in content/free-review.ts.)
export const CONTACT_UPDATED = "2026-10-02";

const latestOf = (types: string[]) =>
  `*[_type in ${JSON.stringify(types)}] | order(_updatedAt desc)[0]._updatedAt`;

/** Newest edit among the Sanity documents each kind of page renders from. */
export const lastEditsQuery = defineQuery(`{
  "home": ${latestOf(["hero", "about", "cta", "footer", "service", "testimonial", "faq", "workItem", "siteSettings"])},
  "work": ${latestOf(["workItem", "cta", "footer", "siteSettings"])},
  "shared": ${latestOf(["cta", "footer", "siteSettings"])}
}`);

export type LastEdits = { home: string | null; work: string | null; shared: string | null };

/** `home`: the homepage's sections. `work`: work items plus the shared sections. `shared`: only the shared sections (call-to-action, footer, settings). */
export type DateSource = keyof LastEdits;

/** The most recent of the given dates (ignoring missing ones). */
export function newest(...dates: (string | null | undefined)[]) {
  const times = dates.flatMap((date) => (date ? [new Date(date).getTime()] : []));
  return new Date(Math.max(...times));
}

/** A page's last-modified date: the newest of its Sanity source, its own document and any copy date in code. */
export function pageModified(
  edits: LastEdits,
  { source, own, codeUpdated }: { source: DateSource; own?: string | null; codeUpdated?: string },
) {
  return newest(edits[source], own, codeUpdated);
}
