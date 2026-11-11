import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    // Optimised images default to a 4 hour cache. 30 days stops repeat visitors
    // re-downloading them. Rename a file when its artwork changes.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Old URLs that still get search impressions and visits (per Search Console / GA4).
  async redirects() {
    return [
      { source: "/faq", destination: "/", permanent: true },
      { source: "/hi", destination: "/", permanent: true },
    ];
  },
  // Keep the Sanity Studio out of search results. Not disallowed in robots.ts
  // on purpose: crawlers have to be able to fetch it to see this header.
  async headers() {
    return [
      // Files served straight from public/images (the hero loop is ~890 KB)
      // otherwise get a 4 hour cache.
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
      {
        source: "/studio/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
