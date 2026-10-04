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
};

export default nextConfig;
