import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { caseStudySlugsQuery } from "@/sanity/lib/queries";
import { lastEditsQuery, pageModified, type LastEdits } from "@/lib/page-dates";

const SITE_URL = "https://www.roysheppard.digital";

// Re-built at most hourly, so a publish in Sanity reaches the sitemap without a deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, edits] = await Promise.all([
    client.fetch(caseStudySlugsQuery),
    client.fetch<LastEdits>(lastEditsQuery),
  ]);

  // Service pages render from their own Sanity documents plus project screenshots from work items.
  const servicePage = () => pageModified(edits, { source: "service" });

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: pageModified(edits, { source: "home" }),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/web-design-watford`,
      lastModified: servicePage(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/web-development-watford`,
      lastModified: servicePage(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/ecommerce-watford`,
      lastModified: servicePage(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified: pageModified(edits, { source: "work" }),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...caseStudies.flatMap((item) =>
      item.slug
        ? [
            {
              url: `${SITE_URL}/work/${item.slug}`,
              lastModified: pageModified(edits, { source: "shared", own: item._updatedAt }),
              changeFrequency: "yearly" as const,
              priority: 0.6,
            },
          ]
        : [],
    ),
    {
      url: `${SITE_URL}/free-website-review`,
      lastModified: pageModified(edits, { source: "freeReview" }),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: pageModified(edits, { source: "contact" }),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: pageModified(edits, { source: "privacy" }),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
