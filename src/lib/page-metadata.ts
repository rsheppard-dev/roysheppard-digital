import type { Metadata } from "next";

/**
 * Per-page metadata for a retained standalone page. `robots` and
 * `metadataBase` are intentionally left undefined so they inherit the root
 * layout's host-aware production/staging logic — only fields that must be
 * page-specific (title, description, canonical, social) are set here, so a
 * page never silently inherits the homepage's canonical or og:url.
 */
export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Roy Sheppard",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
