const SITE_URL = "https://www.roysheppard.digital";

/** Towns served, kept in step with the Google Business Profile service area. No street address is published: this is a home-based service-area business. */
const SERVICE_AREA_CITIES = [
  "Watford",
  "Bushey",
  "St Albans",
  "Abbots Langley",
  "Kings Langley",
  "Rickmansworth",
  "Chorleywood",
  "Leavesden",
  "Croxley Green",
];

/** Sitewide ProfessionalService (a LocalBusiness subtype) entity, tied to the Person entity (layout.tsx) via @id. Deliberately omits aggregateRating: Google ignores self-served review markup for a business's own site. */
export function LocalBusinessJsonLd({
  telephone,
  email,
  sameAs,
}: {
  telephone: string;
  email: string;
  sameAs: (string | undefined)[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: "Roy Sheppard Digital",
    url: SITE_URL,
    description:
      "Freelance web design, full-stack development and e-commerce websites for businesses in Watford and across Hertfordshire.",
    telephone,
    email,
    founder: { "@id": `${SITE_URL}/#person` },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Watford",
      addressRegion: "Hertfordshire",
      addressCountry: "GB",
    },
    areaServed: [
      ...SERVICE_AREA_CITIES.map((name) => ({ "@type": "City", name })),
      { "@type": "AdministrativeArea", name: "Hertfordshire" },
    ],
    knowsAbout: ["Web design", "Web development", "E-commerce websites"],
    sameAs: sameAs.filter((url): url is string => Boolean(url)),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
