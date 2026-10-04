import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
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
      {
        source: "/studio/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
