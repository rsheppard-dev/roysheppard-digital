import type { Metadata } from "next";
import { headers } from "next/headers";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { footer as fallbackFooter } from "@/content/site";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { footerQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import { ConsentDefaultScript } from "@/components/consent/consent-default-script";
import { ConsentBanner } from "@/components/consent/consent-banner";
import "./globals.css";

const GTM_ID = "GTM-PTDWD92";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://www.roysheppard.digital";
const PRODUCTION_HOSTS = ["roysheppard.digital", "www.roysheppard.digital"];
const SITE_TITLE = "Web Designer & Web Developer in Watford | Roy Sheppard";
const SITE_DESCRIPTION =
  "Freelance web designer and developer in Watford. Custom websites for businesses, organisations and agencies. Discuss your project with Roy Sheppard.";
const JOB_TITLE = "Freelance Web Designer & Developer";
const LOCALITY = "Watford";
const COUNTRY = "GB";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: siteSettingsQuery });
  const host = (await headers()).get("host") ?? "";
  const isProductionHost = PRODUCTION_HOSTS.includes(host);

  const title = data?.seo?.metaTitle || SITE_TITLE;
  const description = data?.seo?.metaDescription || SITE_DESCRIPTION;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: SITE_URL,
    },
    robots: isProductionHost
      ? { index: true, follow: true }
      : { index: false, follow: false },
    appleWebApp: {
      title: "Roy Sheppard",
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { data: footerData } = await sanityFetch({ query: footerQuery });

  const email = footerData?.email || fallbackFooter.email;
  const phone = footerData?.phone || fallbackFooter.phone;
  const social =
    footerData?.social && footerData.social.length > 0
      ? footerData.social
      : fallbackFooter.social;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Roy Sheppard",
    jobTitle: JOB_TITLE,
    url: SITE_URL,
    email,
    telephone: toE164(phone),
    address: {
      "@type": "PostalAddress",
      addressLocality: LOCALITY,
      addressCountry: COUNTRY,
    },
    sameAs: social.map((item) => item.url).filter(Boolean),
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} antialiased`}
    >
      <body className="bg-cream text-ink font-display">
        <ConsentDefaultScript />
        <GoogleTagManager gtmId={GTM_ID} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <ConsentBanner />
        <SanityLive />
      </body>
    </html>
  );
}

/** Converts a UK local number like "07883066944" to E.164 ("+447883066944"). */
function toE164(ukNumber: string): string {
  const digits = ukNumber.replace(/\D/g, "");
  return digits.startsWith("0") ? `+44${digits.slice(1)}` : `+${digits}`;
}
