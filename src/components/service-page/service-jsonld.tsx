const SITE_URL = "https://www.roysheppard.digital";

/** Service structured data for a single service subpage, tied to the sitewide Person entity (layout.tsx) via @id rather than redefining it. */
export function ServiceJsonLd({
  path,
  name,
  serviceType,
  description,
}: {
  path: string;
  name: string;
  serviceType: string;
  description: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    serviceType,
    description,
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: { "@type": "City", name: "Watford" },
    url: `${SITE_URL}${path}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
