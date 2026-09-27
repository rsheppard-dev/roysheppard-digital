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
  image,
}: {
  title: string;
  description: string;
  path: string;
  /** Optional page-specific social share image (1200×630); otherwise the site default is used. */
  image?: string;
}): Metadata {
  const images = image ? [{ url: image, width: 1200, height: 630 }] : undefined;
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
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images && { images }),
    },
  };
}
