import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { ServiceHeader } from "@/components/service-page/service-header";
import { ProcessSection } from "@/components/service-page/process-section";
import { RelatedLinks } from "@/components/service-page/related-links";
import { PageModifiedJsonLd } from "@/components/ui/page-modified-jsonld";
import { Accordion } from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/ui/faq-jsonld";
import { TextLink } from "@/components/ui/text-link";

const PATH = "/ecommerce-website-cost";
const TITLE = "How Much Does an Ecommerce Website Cost? | Roy Sheppard";
const DESCRIPTION =
  "What an online shop costs to build, what changes the price and how I quote. Online shops from £2,000, on Shopify or custom-built, by a Watford freelancer.";

const priceFactors = [
  {
    title: "How many products you sell",
    description:
      "Ten products and a thousand products need different work. A bigger catalogue means more to organise, more to import and more ways for customers to filter and search.",
  },
  {
    title: "Shopify or a custom build",
    description:
      "Shopify gets a straightforward shop live sooner. A custom build costs more but suits shops with unusual needs, such as made-to-order products or trade pricing.",
  },
  {
    title: "How your products are sold",
    description:
      "Simple one-price products are the quickest. Sizes, colours, bundles, made-to-measure options or subscriptions all add work.",
  },
  {
    title: "Payments, delivery and tax",
    description:
      "Taking card payments is standard. Different delivery rules by country or weight, or selling to both the public and businesses, take more setting up.",
  },
  {
    title: "Connections to other tools",
    description:
      "Linking the shop to your stock system, accounts or a courier means extra work. If you only need the shop itself, you don't pay for it.",
  },
  {
    title: "Your photos and product descriptions",
    description:
      "A shop is only as good as its product pages. If your photos and descriptions are ready, it's quicker. If they still need writing or shooting, that time needs planning for.",
  },
  {
    title: "Moving from an old shop",
    description:
      "If you already sell online, bringing your existing products across adds to the job. We'll look at what you have before I quote.",
  },
];

const otherCosts = [
  "The platform. Shopify charges its own monthly plan, paid to Shopify and separate from my fee. A custom build has hosting costs instead.",
  "Payment fees. Card providers such as Stripe and PayPal take a small charge on each sale.",
  "Your domain name, if you don't already have one.",
  "Photography, if your products need professional pictures.",
  "Ongoing support after launch, if you want me to keep the site updated and looked after. This is optional.",
];

const quoteSteps = [
  {
    title: "We talk about your business",
    description:
      "What you sell, who buys it and what you want the shop to do. No obligation, and I usually reply within 24 hours.",
  },
  {
    title: "You get a clear quote",
    description:
      "A written quote covering the work we've agreed, so you know what's included before anything starts.",
  },
  {
    title: "I design the key pages first",
    description:
      "You see how the shop will look and work before it's built, and can change things while that's still easy.",
  },
  {
    title: "I build it and we review it together",
    description:
      "I build the shop, then we go through it together before it goes live. I show you how to update products yourself.",
  },
];

const faqs = [
  {
    question: "Is £2,000 the final price?",
    answer:
      "No. It's where online shops start. The final price depends on the things listed above, and you get a written quote before any work begins, so you know the cost up front.",
  },
  {
    question: "Do you build on Shopify?",
    answer:
      "Yes, and I also build custom shops. I'll recommend whichever suits what you sell and how you want to run the shop, and explain why.",
  },
  {
    question: "Can I add and change products myself?",
    answer:
      "Yes. I show you how to update products, prices and content before the shop goes live, so you don't need to ask me for every change.",
  },
  {
    question: "Can you redo my existing online shop?",
    answer:
      "Yes. I can refresh or rebuild an existing shop. We'll look at your current products and pages together before I quote.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
}

export default function EcommerceCostPage() {
  return (
    <PageShell>
      <PageModifiedJsonLd path={PATH} name={TITLE} source="service" portrait />
      <Breadcrumbs
        label="Ecommerce website cost"
        path={PATH}
        parents={[
          { label: "Services", path: "/services" },
          { label: "E-Commerce", path: "/ecommerce-watford" },
        ]}
      />
      <ServiceHeader
        eyebrow="Cost guide"
        heading="How much does an ecommerce website cost?"
        highlight="cost"
        intro="Online shops start from £2,000. Here's what changes the price, what you pay for besides the build, and how I quote, so there are no surprises."
      />

      <div className="flex flex-col gap-6 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-8 lg:px-35 lg:py-25">
        <h2 className="max-w-190 text-3xl font-semibold lg:text-[42px] lg:leading-[1.12]">
          Online shops start from £2,000
        </h2>
        <div className="flex max-w-155 flex-col gap-4 text-base leading-relaxed text-muted-strong lg:text-lg">
          <p>
            That is the starting point for a shop built around your products, on Shopify or custom-built. Where your
            shop lands above that depends on what it needs to do.
          </p>
          <p>
            I don&apos;t price from a menu. After we talk about your business I send a written quote, so the figure
            you see covers the work we&apos;ve actually agreed.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8 border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:gap-12 lg:px-35 lg:py-25">
        <h2 className="max-w-190 text-3xl font-semibold lg:text-[42px] lg:leading-[1.12]">
          What changes the price
        </h2>
        <dl className="grid gap-x-16 sm:grid-cols-2">
          {priceFactors.map((factor) => (
            <div key={factor.title} className="border-t border-border-tan py-6">
              <dt className="text-xl font-bold leading-snug text-ink">{factor.title}</dt>
              <dd className="mt-2 max-w-110 text-base leading-relaxed text-muted-strong">{factor.description}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col gap-6 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-8 lg:px-35 lg:py-25">
        <h2 className="max-w-190 text-3xl font-semibold lg:text-[42px] lg:leading-[1.12]">
          What you pay for besides the build
        </h2>
        <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
          Some costs go to other companies, not to me. It&apos;s worth knowing about them before you decide.
        </p>
        <ul className="flex max-w-155 list-disc flex-col gap-3 pl-5 text-base leading-relaxed text-muted-strong marker:text-ink lg:text-lg">
          {otherCosts.map((cost) => (
            <li key={cost}>{cost}</li>
          ))}
        </ul>
      </div>

      <ProcessSection
        tone="cream"
        intro="This is how a project runs from the first conversation, so you can see where the cost comes from."
        steps={quoteSteps}
      />

      <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
        <FaqJsonLd faqs={faqs} />
        <h2 className="text-3xl font-semibold lg:text-[42px]">Questions about cost</h2>
        <Accordion items={faqs} />
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <TextLink variant="button" href="/contact">
            Start a project <span aria-hidden="true">→</span>
          </TextLink>
          <TextLink variant="underline" href="/free-website-review">
            Get a free website review
          </TextLink>
        </div>
      </div>

      <RelatedLinks
        tone="cream"
        items={[
          { label: "E-commerce websites", href: "/ecommerce-watford" },
          { label: "Web design", href: "/web-design-watford" },
        ]}
      />
    </PageShell>
  );
}
