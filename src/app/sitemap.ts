import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { caseStudySlugsQuery } from "@/sanity/lib/queries";

const SITE_URL = "https://www.roysheppard.digital";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const caseStudies = await client.fetch(caseStudySlugsQuery);

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/web-design-watford`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/web-development-watford`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/ecommerce-watford`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...caseStudies.flatMap((item) =>
      item.slug
        ? [
            {
              url: `${SITE_URL}/work/${item.slug}`,
              lastModified: new Date(item._updatedAt),
              changeFrequency: "yearly" as const,
              priority: 0.6,
            },
          ]
        : [],
    ),
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
