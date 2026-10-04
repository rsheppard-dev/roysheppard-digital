import type { MetadataRoute } from "next";
import { isProduction } from "@/lib/is-production";

const SITE_URL = "https://www.roysheppard.digital";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const isProductionHost = isProduction;

  // Crawling stays open even off production: a page that also carries
  // `noindex` (see layout.tsx) only works if crawlers are able to fetch it
  // and read that tag. Disallowing "/" here would block that fetch, and per
  // Google's own guidance a disallowed-but-linked URL can still get indexed
  // with no snippet — the opposite of what staging protection needs. Actual
  // staging protection should come from hosting-level access control
  // (password/IP allowlist on the non-production deployment), not robots.txt.
  // /studio is deliberately not disallowed: it is kept out of search by
  // `noindex` (page metadata and an X-Robots-Tag header in next.config.ts),
  // which crawlers can only read if they are allowed to fetch it.
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: isProductionHost ? `${SITE_URL}/sitemap.xml` : undefined,
  };
}
