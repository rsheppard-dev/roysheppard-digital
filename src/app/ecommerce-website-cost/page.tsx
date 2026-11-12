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
  "What an online shop costs to build, what changes the price and how I quote. Built around your business by a Watford freelancer, with a written quote first.";

const priceFactors = [
  {
    title: "How many products you sell",
    description:
      "Ten products and a thousand products need different work. A bigger catalogue means more to organise, more to import and more ways for customers to filter and search.",
  },
  {
    title: "A ready-made platform or a custom build",
    description:
      "A ready-made platform gets a straightforward shop live sooner. A custom build costs more but suits shops with unusual needs, such as made-to-order products or trade pricing.",
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
      "A shop is only as good as its product pages. Clear photos and descriptions make a big difference, and I'll talk through what you have and what would help.",
  },
  {
    title: "Moving from an old shop",
    description:
      "If you already sell online, bringing your existing products across adds to the job. I'll look at what you have before I quote.",
  },
];

const otherCosts = [
  {
    cost: "The platform",
    detail:
      "A ready-made platform charges its own monthly plan, separate from my fee. A custom build has hosting costs instead.",
    paidTo: "Your platform or host",
  },
  {
    cost: "Payment fees",
    detail: "Card providers such as Stripe and PayPal take a small charge on each sale.",
    paidTo: "Your payment provider",
  },
  {
    cost: "Your domain name",
    detail: "Only if you don't already have one.",
    paidTo: "A domain registrar",
  },
  {
    cost: "Photography",
    detail: "If your products need professional pictures.",
    paidTo: "A photographer",
  },
  {
    cost: "Support after launch",
    detail: "If you want me to keep the site updated and looked after. This is optional.",
    paidTo: "Me, only if you want it",
  },
];

const quoteSteps = [
  {
    title: "I find out about your business",
    description:
      "What you sell, who buys it and what you want the shop to do. No obligation, and I usually reply within 24 hours.",
  },
  {
    title: "You get a clear quote",
    description:
      "A written quote covering exactly what you need, so you know what's included before anything starts.",
  },
  {
    title: "I design the key pages first",
    description:
      "You see how the shop will look and work before it's built, and can change things while that's still easy.",
  },
  {
    title: "I build it and go through it with you",
    description:
      "I build the shop, then go through it with you before it goes live. I show you how to update products yourself.",
  },
];

const faqs = [
  {
    question: "Is £2,000 the final price?",
    answer:
      "No. It's where online shops start. The final price depends on the things listed above, and you get a written quote before any work begins, so you know the cost up front.",
  },
  {
    question: "What does a website that isn't a shop cost?",
    answer:
      "It depends on what you need, and you get a written quote before any work begins. The [website cost quiz](/website-cost) shows what a business website or a redesign typically costs.",
  },
  {
    question: "Which platform will you build my shop on?",
    answer:
      "Whichever suits what you sell and how you want to run it. That might be a ready-made platform or a custom build, and I'll explain why before you decide.",
  },
  {
    question: "Can I add and change products myself?",
    answer:
      "Yes. I show you how to update products, prices and content before the shop goes live, so you don't need to ask me for every change.",
  },
  {
    question: "Can you look after my shop once it's live?",
    answer:
      "Yes, if you'd like me to. The [hosting and care plans](/hosting-and-care) cover updates, monitoring, backups and small changes for one fixed monthly price, month to month. They don't include a ready-made platform's own monthly fee, which is paid to the platform.",
  },
  {
    question: "Can you redo my existing online shop?",
    answer:
      "Yes. I can refresh or rebuild an existing shop. I'll look at your current products and pages before I quote.",
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
            That is the starting point for a shop built around your products and how you sell them. Where your
            shop lands above that depends on what it needs to do.
          </p>
          <p>
            I don&apos;t price from a menu. After I find out about your business I send a written quote, so the figure
            you see covers exactly what you need.
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

      <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-12 lg:px-35 lg:py-25">
        <div className="flex flex-col gap-4">
          <h2 className="max-w-190 text-3xl font-semibold lg:text-[42px] lg:leading-[1.12]">
            What you pay for besides the build
          </h2>
          <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
            Most of these costs go to other companies, not to me. It&apos;s worth knowing about them before you decide.
          </p>
        </div>
        <ul className="flex flex-col">
          {otherCosts.map((item) => (
            <li
              key={item.cost}
              className="grid gap-2 border-t border-border-tan py-6 last:border-b lg:grid-cols-[15rem_minmax(0,1fr)_17rem] lg:items-baseline lg:gap-10"
            >
              <h3 className="text-xl font-bold leading-snug text-ink">{item.cost}</h3>
              <p className="max-w-110 text-base leading-relaxed text-muted-strong">{item.detail}</p>
              <p className="text-sm leading-snug text-muted-strong">
                <span className="font-mono text-[13px]">Paid to </span>
                <span className="font-semibold text-ink">{item.paidTo}</span>
              </p>
            </li>
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
          { label: "E-Commerce", href: "/ecommerce-watford" },
          { label: "Web Design", href: "/web-design-watford" },
        ]}
      />
    </PageShell>
  );
}
