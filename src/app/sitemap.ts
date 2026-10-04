import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { caseStudySlugsQuery } from "@/sanity/lib/queries";
import { CONTACT_UPDATED, lastEditsQuery, pageModified, type LastEdits } from "@/lib/page-dates";
import { ecommerce, privacyPolicy, webDesign, webDevelopment } from "@/content/service-pages";

const SITE_URL = "https://www.roysheppard.digital";

// Re-built at most hourly, so a publish in Sanity reaches the sitemap without a deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, edits] = await Promise.all([
    client.fetch(caseStudySlugsQuery),
    client.fetch<LastEdits>(lastEditsQuery),
  ]);

  // Service pages pull their project screenshots from work items.
  const servicePage = (codeUpdated: string) => pageModified(edits, { source: "work", codeUpdated });

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: pageModified(edits, { source: "home" }),
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
      url: `${SITE_URL}/contact`,
      lastModified: pageModified(edits, { source: "shared", codeUpdated: CONTACT_UPDATED }),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: pageModified(edits, { source: "shared", codeUpdated: new Date(privacyPolicy.lastUpdated).toISOString() }),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
