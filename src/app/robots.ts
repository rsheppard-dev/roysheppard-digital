import type { MetadataRoute } from "next";
import { headers } from "next/headers";

const SITE_URL = "https://www.roysheppard.digital";
const PRODUCTION_HOSTS = ["roysheppard.digital", "www.roysheppard.digital"];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? "";
  const isProductionHost = PRODUCTION_HOSTS.includes(host);

  // Crawling stays open even off production: a page that also carries
  // `noindex` (see layout.tsx) only works if crawlers are able to fetch it
  // and read that tag. Disallowing "/" here would block that fetch, and per
  // Google's own guidance a disallowed-but-linked URL can still get indexed
  // with no snippet — the opposite of what staging protection needs. Actual
  // staging protection should come from hosting-level access control
  // (password/IP allowlist on the non-production deployment), not robots.txt.
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/studio",
    },
    sitemap: isProductionHost ? `${SITE_URL}/sitemap.xml` : undefined,
  };
}
