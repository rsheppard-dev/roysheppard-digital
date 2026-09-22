// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from './client'

// `browserToken` deliberately omitted — it's shared with the browser to power
// live-previewing drafts outside the Presentation Tool, which this site
// doesn't use (no draftMode/VisualEditing anywhere). `serverToken` alone
// still powers the live revalidation `sanityFetch`/`SanityLive` are for, and
// is never sent to the browser.
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
});
