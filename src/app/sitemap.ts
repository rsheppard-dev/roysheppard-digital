import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { caseStudySlugsQuery } from "@/sanity/lib/queries";
import { ecommerce, privacyPolicy, webDesign, webDevelopment } from "@/content/service-pages";

const SITE_URL = "https://www.roysheppard.digital";

// Re-built at most hourly, so a publish in Sanity reaches the sitemap without a deploy.
export const revalidate = 3600;

// The contact page's copy lives in code, so its date is maintained here.
const CONTACT_UPDATED = "2026-10-02";

const latestOf = (type: string[]) =>
  `*[_type in ${JSON.stringify(type)}] | order(_updatedAt desc)[0]._updatedAt`;

// Newest edit among the Sanity documents each kind of page renders from.
const lastEditsQuery = `{
  "home": ${latestOf(["hero", "about", "cta", "footer", "service", "testimonial", "faq", "workItem", "siteSettings"])},
  "work": ${latestOf(["workItem", "cta", "footer", "siteSettings"])},
  "shared": ${latestOf(["cta", "footer", "siteSettings"])}
}`;

type LastEdits = { home: string | null; work: string | null; shared: string | null };

/** The most recent of the given dates (ignoring missing ones). */
function newest(...dates: (string | null | undefined)[]) {
  const times = dates.flatMap((date) => (date ? [new Date(date).getTime()] : []));
  return new Date(Math.max(...times));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, edits] = await Promise.all([
    client.fetch(caseStudySlugsQuery),
    client.fetch<LastEdits>(lastEditsQuery),
  ]);

  // Service pages pull their project screenshots from work items.
  const servicePage = (codeUpdated: string) => newest(codeUpdated, edits.work);

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: newest(edits.home),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/web-design-watford`,
      lastModified: servicePage(webDesign.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/web-development-watford`,
      lastModified: servicePage(webDevelopment.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/ecommerce-watford`,
      lastModified: servicePage(ecommerce.lastUpdated),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: newest(edits.work),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...caseStudies.flatMap((item) =>
      item.slug
        ? [
            {
              url: `${SITE_URL}/work/${item.slug}`,
              lastModified: newest(item._updatedAt, edits.shared),
              changeFrequency: "yearly" as const,
              priority: 0.6,
            },
          ]
        : [],
    ),
    {
      url: `${SITE_URL}/contact`,
      lastModified: newest(CONTACT_UPDATED, edits.shared),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: newest(new Date(privacyPolicy.lastUpdated).toISOString(), edits.shared),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
