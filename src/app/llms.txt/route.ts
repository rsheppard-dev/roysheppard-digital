import { client } from "@/sanity/lib/client";
import { llmsCaseStudiesQuery } from "@/sanity/lib/queries";

const SITE_URL = "https://www.roysheppard.digital";

// Plain-text site summary for AI assistants (https://llmstxt.org). Built at
// deploy time like sitemap.ts, so case studies added in Sanity appear on the
// next deploy.
export const dynamic = "force-static";

export async function GET() {
  const caseStudies = await client.fetch(llmsCaseStudiesQuery);

  const work = caseStudies
    .filter((item) => item.slug)
    .map(
      (item) =>
        `- [${item.name}](${SITE_URL}/work/${item.slug}): ${item.tagline ?? item.meta ?? ""}`.trimEnd(),
    )
    .join("\n");

  const body = `# Roy Sheppard

> Roy Sheppard is a freelance web designer and web developer based in Watford, Hertfordshire, UK. He designs and builds custom websites for businesses and organisations, in Watford and further afield.

Key facts:

- Freelancer with 6 years designing and building websites for businesses of all sizes.
- Services: custom web design, web development, and e-commerce websites.
- Every site is designed and built around the business rather than fitted into a template, often with a headless CMS so clients can edit their own content.
- Also offers bespoke functionality, SEO fundamentals, content management setup and ongoing support after launch.
- E-commerce sites are built around the business, on a ready-made platform or custom-built, depending on what is sold.
- Pricing is quoted per project after an initial conversation about the business and its goals. Online shops start from £2,000.
- Contact: info@roysheppard.digital, 07883066944, or the contact form. He usually replies within a day.

## Services

- [All services](${SITE_URL}/services): An overview of the three services and which one fits.
- [Web design in Watford](${SITE_URL}/web-design-watford): Custom design built around your brand and customers, looking right on phones first, with a clear next step on every page.
- [Web development in Watford](${SITE_URL}/web-development-watford): Custom-built websites with content clients can manage themselves, plus custom functionality such as booking systems, customer accounts, portals and quote calculators.
- [E-commerce in Watford](${SITE_URL}/ecommerce-watford): Online stores built around what the business sells.
- [Website cost quiz](${SITE_URL}/website-cost): Typical prices for business websites, redesigns, online shops and new features, with an optional written quote.
- [Website hosting and care](${SITE_URL}/hosting-and-care): Fixed monthly plans, £45 or £65, covering hosting, a database, image storage, email sending, updates, monitoring, backups and small changes. No contract, month to month.

## Case studies

${work}

## Contact

- [Free website review](${SITE_URL}/free-website-review): Request a free, personal review of an existing website, with three clear improvements.
- [Start a project](${SITE_URL}/contact): Contact form, email and phone details.

## Optional

- [Home page](${SITE_URL}/): Overview, client testimonials and FAQs.
- [Privacy policy](${SITE_URL}/privacy-policy)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
