import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { lastEditsQuery, pageModified, type DateSource, type LastEdits } from "@/lib/page-dates";

const SITE_URL = "https://www.roysheppard.digital";

const workItemUpdatedQuery = defineQuery(
  `*[_type == "workItem" && slug.current == $slug][0]._updatedAt`,
);

/**
 * WebPage structured data carrying the page's `dateModified`, worked out the
 * same way as the sitemap's `lastmod` (see lib/page-dates.ts). Fetched through
 * `sanityFetch`, so it refreshes with the rest of the page's live content.
 * `slug` adds that case study's own last edit.
 */
export async function PageModifiedJsonLd({
  path,
  name,
  source,
  codeUpdated,
  slug,
}: {
  path: string;
  name?: string;
  source: DateSource;
  /** Date (YYYY-MM-DD or similar) the page's copy was last edited in code. */
  codeUpdated?: string;
  slug?: string;
}) {
  const [{ data: edits }, own] = await Promise.all([
    sanityFetch({ query: lastEditsQuery, stega: false }) as Promise<{ data: LastEdits }>,
    slug
      ? (sanityFetch({
          query: workItemUpdatedQuery,
          params: { slug },
          stega: false,
        }) as Promise<{ data: string | null }>)
      : Promise.resolve({ data: null }),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path === "/" ? "/" : path}#webpage`,
    url: `${SITE_URL}${path === "/" ? "/" : path}`,
    ...(name ? { name } : {}),
    inLanguage: "en-GB",
    dateModified: pageModified(edits, { source, own: own.data, codeUpdated }).toISOString(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
