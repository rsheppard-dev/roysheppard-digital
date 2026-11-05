import type { Metadata } from "next";
import Image from "next/image";
import { buildPageMetadata } from "@/lib/page-metadata";
import { PORTRAIT } from "@/lib/portrait";
import { PageShell } from "@/components/service-page/page-shell";
import { Breadcrumbs } from "@/components/service-page/breadcrumbs";
import { RelatedLinks } from "@/components/service-page/related-links";
import { PageModifiedJsonLd } from "@/components/ui/page-modified-jsonld";
import { Accordion } from "@/components/ui/accordion";
import { FaqJsonLd } from "@/components/ui/faq-jsonld";
import { HighlightedHeading } from "@/components/ui/highlighted-heading";
import { TextLink } from "@/components/ui/text-link";
import { CostQuiz } from "@/components/cost-quiz/cost-quiz";
import { Signature } from "@/components/ui/signature";
import { Stars } from "@/components/ui/stars";
import { sanityFetch } from "@/sanity/lib/live";
import { testimonialsQuery } from "@/sanity/lib/queries";

const PATH = "/website-cost";
const TITLE = "How Much Does a Website Cost? Quick Quiz | Roy Sheppard";
const DESCRIPTION =
  "Answer a few questions to see what a website like yours typically costs, then ask for a written quote. Business sites, redesigns, online shops and new features, from a Watford freelancer.";

const notes = [
  "Takes about a minute.",
  "You see the range without giving an email.",
  "Your written quote is always the real price.",
];

const priceFactors = [
  {
    title: "How big the site is",
    description:
      "A handful of pages is quicker than a large site with many sections. Every extra page is more to design, write and check.",
  },
  {
    title: "What it needs to do",
    description:
      "Showing what you do and taking enquiries is the simplest. Bookings, logins, quote requests or something specific to your business add work.",
  },
  {
    title: "Your text and photos",
    description:
      "Words and pictures you already have help the project move quickly. If you'd like a hand with either, I'll talk through what you have and what would help.",
  },
  {
    title: "Starting fresh or rebuilding",
    description:
      "With an existing site, I look at what you have, what stays and what changes before anything is built.",
  },
  {
    title: "Connections to other tools",
    description:
      "Linking the site to a calendar, your accounts or another system takes extra setup. If it only needs to stand on its own, you don't pay for it.",
  },
  {
    title: "Help after launch",
    description:
      "Ongoing support is optional and separate from the build, so you only pay for it if you want it.",
  },
];

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
      "I read your answers and usually reply within 24 hours. If anything is unclear I'll ask, then I send a written quote that covers what you need, with no obligation.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
}

/** One client's words beside the quiz. Desktop shows it under the byline, phones show it after the quiz so the first question is never pushed down. */
function QuizTestimonial({
  quote,
  name,
  company,
  show,
}: {
  quote: string;
  name?: string | null;
  company?: string | null;
  show: "desktop" | "mobile";
}) {
  return (
    <figure
      className={`${show === "desktop" ? "hidden lg:flex" : "flex lg:hidden"} w-full max-w-130 flex-col gap-4 rounded-card bg-ink px-7 py-7`}
    >
      <div className="flex items-start justify-between gap-6">
        <span aria-hidden="true" className="-mb-5 -mt-1 text-[56px] font-semibold leading-none text-accent">
          &ldquo;
        </span>
        <Stars size={14} className="mt-1" />
      </div>
      <blockquote className="text-pretty text-base font-medium leading-relaxed text-cream lg:text-[17px]">
        <p>{quote}&rdquo;</p>
      </blockquote>
      <Signature name={name} company={company} onDark />
    </figure>
  );
}

export default async function WebsiteCostPage() {
  const { data } = await sanityFetch({ query: testimonialsQuery });
  const testimonial = data?.find((item) => item.name?.trim() === "James Sumner" && item.quote);
  const resultProof = data?.find((item) => item.name?.trim() === "Paul Franklin" && item.quote);

  return (
    <PageShell>
      <PageModifiedJsonLd path={PATH} name={TITLE} source="service" />
      <Breadcrumbs label="Website cost" path={PATH} />

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
          <div className="flex items-center gap-4 pt-2">
            <Image
              src={PORTRAIT.path}
              alt={PORTRAIT.alt}
              width={PORTRAIT.width}
              height={PORTRAIT.height}
              sizes="96px"
              className="h-20 w-20 shrink-0 rounded-full border border-border-tan lg:h-24 lg:w-24"
            />
            <p className="flex flex-col text-sm leading-snug text-muted-strong lg:text-base">
              <span className="font-semibold text-ink">Roy Sheppard</span>
              Freelance web designer and developer in Watford
            </p>
          </div>
          {testimonial && <QuizTestimonial {...testimonial} quote={testimonial.quote ?? ""} show="desktop" />}
        </div>
        <div className="flex flex-col gap-8">
          <CostQuiz
            proof={resultProof ? { quote: resultProof.quote ?? "", name: resultProof.name, company: resultProof.company } : null}
          />
          {testimonial && <QuizTestimonial {...testimonial} quote={testimonial.quote ?? ""} show="mobile" />}
        </div>
      </div>

      <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-12 lg:px-35 lg:py-25">
        <div className="flex flex-col gap-4">
          <h2 className="max-w-190 text-3xl font-semibold lg:text-[42px] lg:leading-[1.12]">What changes the price</h2>
          <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
            Every project is different. These are the things that move a quote up or down.
          </p>
        </div>
        <dl className="grid gap-x-16 sm:grid-cols-2">
          {priceFactors.map((factor) => (
            <div key={factor.title} className="border-t border-border-tan py-6">
              <dt className="text-xl font-bold leading-snug text-ink">{factor.title}</dt>
              <dd className="mt-2 max-w-110 text-base leading-relaxed text-muted-strong">{factor.description}</dd>
            </div>
          ))}
        </dl>
        <p className="max-w-155 text-base leading-relaxed text-muted-strong">
          Planning an online shop? The{" "}
          <TextLink variant="underline" href="/ecommerce-website-cost">
            cost guide
          </TextLink>{" "}
          lists each cost and who it&apos;s paid to.
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
        costQuiz={false}
        items={[
          { label: "Online Shop Cost Guide", href: "/ecommerce-website-cost" },
          { label: "Web Design", href: "/web-design-watford" },
        ]}
      />
    </PageShell>
  );
}
