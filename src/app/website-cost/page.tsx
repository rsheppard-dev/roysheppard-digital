import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { QUIZ_PATHS, formatRange } from "@/lib/cost-quiz";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { RelatedLinks } from "@/components/service-page/related-links";
import { PageModifiedJsonLd } from "@/components/ui/page-modified-jsonld";
import { Accordion } from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/ui/faq-jsonld";
import { HighlightedHeading } from "@/components/ui/highlighted-heading";
import { TextLink } from "@/components/ui/text-link";
import { CostQuiz } from "@/components/cost-quiz/cost-quiz";

const PATH = "/website-cost";
const TITLE = "How Much Does a Website Cost? Quick Quiz | Roy Sheppard";
const DESCRIPTION =
  "Answer a few questions to see what a website like yours typically costs, then ask for a written quote. Business sites, redesigns and online shops, from a Watford freelancer.";

const notes = [
  "Takes about a minute.",
  "You see the range without giving an email.",
  "Your written quote is always the real price.",
];

const rangeNotes: Record<string, string> = {
  business: "From a few pages up to a larger site with extra features.",
  redesign: "A new design and build for a site you already have.",
  shop: "A shop built around your products and how you sell them.",
};

const faqs = [
  {
    question: "How accurate is the range?",
    answer:
      "It's a guide based on typical projects. Your answers narrow the full range down to the part your site is most likely to fall in. Bigger or more unusual projects can go above it, which is why you get a written quote before any work starts.",
  },
  {
    question: "Do I have to give my email to see the price?",
    answer:
      "No. You see the range as soon as you've answered the questions. You only add your details if you'd like a written quote for your exact project.",
  },
  {
    question: "What does the price cover?",
    answer:
      "My work designing and building the site. Things paid to other companies, such as a domain name, a platform or hosting plan and payment fees, are separate, and ongoing support is optional. For online shops, the [cost guide](/ecommerce-website-cost) lists each one and who it's paid to.",
  },
  {
    question: "What happens after I send my answers?",
    answer:
      "I read your answers and usually reply within 24 hours. If anything is unclear I'll ask, then I send a written quote that covers the work we've agreed, with no obligation.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
}

export default function WebsiteCostPage() {
  return (
    <PageShell>
      <PageModifiedJsonLd path={PATH} name={TITLE} source="service" />
      <Breadcrumbs
        label="Website cost quiz"
        path={PATH}
        parents={[{ label: "Services", path: "/services" }]}
      />

      {/* On a phone the order is text then quiz, so the first question is never pushed far down. */}
      <div className="grid grid-cols-1 gap-x-18 gap-y-10 px-6 pb-16 pt-8 sm:px-10 lg:grid-cols-2 lg:items-start lg:px-35 lg:pb-24 lg:pt-10">
        <div className="flex flex-col gap-6 lg:pt-4">
          <h1 className="max-w-150 text-balance text-4xl font-medium leading-[1.1] tracking-[-0.015em] sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
            <HighlightedHeading text="How much will my website cost?" highlight="cost" />
          </h1>
          <p className="max-w-130 text-lg leading-relaxed text-muted-strong lg:text-[19px]">
            Answer a few quick questions to see what a website like yours typically costs.
          </p>
          <ul className="flex flex-col gap-2 text-base text-muted-strong">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
        <CostQuiz />
      </div>

      <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-12 lg:px-35 lg:py-25">
        <div className="flex flex-col gap-4">
          <h2 className="max-w-190 text-3xl font-semibold lg:text-[42px] lg:leading-[1.12]">
            Typical prices at a glance
          </h2>
          <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
            I don&apos;t price from a menu. These are the ranges most projects fall into, and your written quote
            covers what you actually need.
          </p>
        </div>
        <ul className="flex flex-col">
          {QUIZ_PATHS.map((item) => (
            <li
              key={item.id}
              className="grid gap-2 border-t border-border-tan py-6 last:border-b lg:grid-cols-[17rem_minmax(0,1fr)_14rem] lg:items-baseline lg:gap-10"
            >
              <h3 className="text-xl font-bold leading-snug text-ink">{item.label}</h3>
              <p className="max-w-110 text-base leading-relaxed text-muted-strong">{rangeNotes[item.id]}</p>
              <p className="font-semibold text-ink">{formatRange(item)}</p>
            </li>
          ))}
        </ul>
        <p className="max-w-155 text-base leading-relaxed text-muted-strong">
          Planning an online shop? The{" "}
          <TextLink variant="underline" href="/ecommerce-website-cost">
            cost guide
          </TextLink>{" "}
          explains what changes the price.
        </p>
      </div>

      <div className="flex flex-col gap-8 border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
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
        tone="tan"
        items={[
          { label: "Online shop cost guide", href: "/ecommerce-website-cost" },
          { label: "Web design", href: "/web-design-watford" },
        ]}
      />
    </PageShell>
  );
}
