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

> Roy Sheppard is a freelance web designer and web developer based in Watford, Hertfordshire, UK. He designs and hand-codes custom websites for businesses and organisations, in Watford and further afield.

Key facts:

- Freelancer with 6 years designing and building websites for businesses of all sizes.
- Services: custom web design, web development, and e-commerce / online catalogue builds.
- Every site is designed from scratch rather than from a template, and hand-coded rather than built with page-builder plugins, often with a headless CMS so clients can edit their own content.
- Also offers UI/UX design, bespoke functionality, SEO fundamentals, content management setup and ongoing support after launch.
- E-commerce is built on Shopify or as a custom build, depending on the catalogue; not every product business needs online checkout.
- Pricing is quoted per project after an initial conversation about the business and its goals.
- Contact: info@roysheppard.digital, 07883066944, or the contact form. He usually replies within a day.

## Services

- [Web design in Watford](${SITE_URL}/web-design-watford): Custom, brand-led, mobile-first design with a clear next step on every page.
- [Web development in Watford](${SITE_URL}/web-development-watford): Hand-coded, fast-loading builds with content clients can manage themselves and custom functionality where needed.
- [E-commerce in Watford](${SITE_URL}/ecommerce-watford): Online stores and B2B catalogues built around what the business sells, on Shopify or a custom build.

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
