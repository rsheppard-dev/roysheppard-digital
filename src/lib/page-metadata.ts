import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityFetch } from "@/sanity/lib/live";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

/** A Sanity image as a 1200×630 share card (a ready URL is passed through unchanged). */
export function socialImageUrl(image: SanityImageSource | string): string {
  return typeof image === "string" ? image : urlFor(image).width(1200).height(630).fit("crop").url();
}

const SHARE_ALT = "Roy Sheppard, freelance web designer and developer";

/** The share image tags for og and twitter: the given image, else the built-in files in /public. */
export function shareImages(source?: SanityImageSource | string | null) {
  const url = source ? socialImageUrl(source) : null;
  return {
    og: [{ url: url ?? "/opengraph-image.png", width: 1200, height: 630, alt: SHARE_ALT }],
    twitter: [{ url: url ?? "/twitter-image.png", width: 1200, height: 630, alt: SHARE_ALT }],
  };
}

/**
 * Per-page metadata for a retained standalone page. `robots` and
 * `metadataBase` are intentionally left undefined so they inherit the root
 * layout's host-aware production/staging logic — only fields that must be
 * page-specific (title, description, canonical, social) are set here, so a
 * page never silently inherits the homepage's canonical or og:url.
 *
 * Share image: the page's own `image` if it has one, otherwise the default
 * from Site Settings, otherwise the built-in opengraph-image.png / twitter-image.png.
 */
export async function buildPageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  /** Page-specific share image: a Sanity image or a ready 1200×630 URL. */
  image?: SanityImageSource | string | null;
}): Promise<Metadata> {
  const { data: settings } = await sanityFetch({ query: siteSettingsQuery });
  const source = image ?? settings?.seo?.socialImage;
  const { og, twitter } = shareImages(source);
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
      locale: "en_GB",
      type: "website",
      images: og,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: twitter,
    },
  };
}
