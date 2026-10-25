import type { Metadata } from "next";
import { newSiteChoice, serviceLinks, services as fallbackServices } from "@/content/site";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getServicesIndexPage } from "@/lib/site-pages";
import { sanityFetch } from "@/sanity/lib/live";
import { servicesQuery } from "@/sanity/lib/queries";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { ServiceHeader } from "@/components/service-page/service-header";
import { ServicePicker, type PickerChoice } from "@/components/service-page/service-picker";
import { PageModifiedJsonLd } from "@/components/ui/page-modified-jsonld";
import { TextLink } from "@/components/ui/text-link";
import { ReviewPromo } from "@/components/sections/review-promo";

const PATH = "/services";
const SITE_URL = "https://www.roysheppard.digital";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicesIndexPage();
  return buildPageMetadata({ title: page.title, description: page.description, path: PATH, image: page.socialImage });
}

export default async function ServicesPage() {
  const page = await getServicesIndexPage();
  const { data } = await sanityFetch({ query: servicesQuery });
  const details = data && data.length > 0 ? data : fallbackServices;

  // The page links come from code; the descriptions and bullets from the services edited in Studio.
  const services = serviceLinks.map((link) => {
    const detail = details.find((d) => d.title === link.title);
    return { ...link, description: detail?.description ?? link.summary, bullets: detail?.bullets ?? [] };
  });

  const choices: PickerChoice[] = [
    newSiteChoice,
    ...services.map((service) => ({
      label: service.choice,
      tag: service.title,
      title: service.title,
      description: service.description,
      image: `/images/focus/${service.image}.webp`,
      href: service.href,
      cta: `Explore ${service.title.toLowerCase()}`,
      bullets: service.bullets,
    })),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${SITE_URL}${service.href}`,
    })),
  };

  return (
    <PageShell>
      <PageModifiedJsonLd path={PATH} name="Services" source="services" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Breadcrumbs label="Services" path={PATH} />
      <ServiceHeader eyebrow={page.eyebrow} heading={page.heading} intro={page.intro} />

      <div className="border-y border-border-tan bg-tan px-6 py-12 sm:px-10 lg:px-35 lg:py-20">
        <h2 className="mb-8 max-w-180 text-3xl font-medium leading-tight tracking-[-0.01em] lg:mb-10 lg:text-[44px]">
          Which of these sounds like you?
        </h2>
        <ServicePicker choices={choices} />
        <nav aria-label="Services" className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-1 text-[15px] text-muted-strong lg:mt-12">
          <span>Or go straight to a service:</span>
          {services.map((service) => (
            <TextLink key={service.href} variant="underline" href={service.href}>
              {service.title}
            </TextLink>
          ))}
        </nav>
      </div>

      <ReviewPromo />
    </PageShell>
  );
}
