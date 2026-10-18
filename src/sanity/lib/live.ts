import type { QueryParams } from "next-sanity";

import { client } from "./client";

/**
 * How long a page keeps serving Sanity content before it is rebuilt in the
 * background. Edits published in Studio reach the live site within about this
 * long, with no webhook needed. The sitemap and llms.txt have their own timers.
 */
const REVALIDATE_SECONDS = 60;

// Published content only. The token is for reading; it is never sent to the browser.
const serverClient = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
}: {
  query: QueryString;
  params?: QueryParams;
  /** Accepted so existing calls keep working; there is no visual-editing overlay to switch off. */
  stega?: boolean;
}) {
  const data = await serverClient.fetch(query, params, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  return { data };
}
