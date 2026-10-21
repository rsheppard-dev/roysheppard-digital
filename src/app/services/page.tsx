import type { Metadata } from "next";
import Image from "next/image";
import { serviceLinks, services as fallbackServices } from "@/content/site";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getServicesIndexPage } from "@/lib/site-pages";
import { sanityFetch } from "@/sanity/lib/live";
import { servicesQuery } from "@/sanity/lib/queries";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { ServiceHeader } from "@/components/service-page/service-header";
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

      <div className="border-t border-border-tan bg-tan px-6 py-6 sm:px-10 lg:px-35 lg:py-10">
        <ul className="flex flex-col">
          {services.map((service, index) => (
            <li
              key={service.href}
              className={`grid gap-8 py-10 lg:grid-cols-[minmax(0,10rem)_minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14 lg:py-14 ${
                index > 0 ? "border-t border-border-tan" : ""
              }`}
            >
              <Image
                src={`/images/focus/${service.image}.webp`}
                alt=""
                width={400}
                height={400}
                sizes="(min-width: 1024px) 160px, 128px"
                className="h-32 w-auto self-start lg:h-40"
              />

              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-semibold leading-tight lg:text-[40px]">{service.title}</h2>
                <p className="max-w-120 text-base leading-relaxed text-muted-strong lg:text-lg">{service.description}</p>
                <ul className="flex flex-col gap-1.5 text-[15px] text-muted-strong">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span aria-hidden="true" className="text-accent-text">
                        +
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-between gap-8 lg:pt-1.5">
                <div className="flex flex-col gap-2">
                  <h3 className="font-mono text-[13px] font-medium uppercase tracking-[0.06em] text-muted">
                    A good fit if
                  </h3>
                  <p className="max-w-80 text-base leading-relaxed text-ink">{service.fit}</p>
                </div>
                <TextLink variant="big" href={service.href} className="w-fit">
                  Explore {service.title.toLowerCase()} <span aria-hidden="true">→</span>
                </TextLink>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ReviewPromo />
    </PageShell>
  );
}
