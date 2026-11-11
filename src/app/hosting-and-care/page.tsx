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

const PATH = "/hosting-and-care";
const TITLE = "Website Hosting and Care Plans | Roy Sheppard, Watford";
const DESCRIPTION =
  "Hosting and care for the website I build for you, for one fixed monthly price: updates, monitoring, backups and small changes, from £45 a month. From a Watford freelance web designer.";

const notes = [
  "Two plans, £45 or £65 a month.",
  "Hosting is included, so there's no separate hosting bill.",
  "No contract: it runs month to month.",
];

const plans = [
  {
    name: "Care",
    price: "£45",
  },
  {
    name: "Care Plus",
    price: "£65",
  },
];

/** `true` is a tick, `false` is not included, and text is shown as written. */
type Cell = boolean | string;
const features: { label: string; care: Cell; plus: Cell }[] = [
  { label: "Hosting for your website", care: true, plus: true },
  { label: "Monitoring, so I know if your site goes down", care: true, plus: true },
  { label: "Security and software updates", care: true, plus: true },
  { label: "Backups of your content", care: true, plus: true },
  { label: "Email support", care: true, plus: true },
  { label: "Small changes each month", care: "30 minutes", plus: "1 hour" },
  { label: "Monthly report on how your site is doing in Google, in plain English", care: false, plus: true },
  { label: "Regular check on your Google Business Profile", care: false, plus: true },
  { label: "Priority replies", care: false, plus: true },
];

function Mark({ value, accent = false }: { value: Cell; accent?: boolean }) {
  if (typeof value === "string") return <span className="font-semibold text-ink">{value}</span>;
  if (!value) {
    return (
      <>
        <span aria-hidden="true" className="mx-auto block h-0.5 w-3.5 rounded-full bg-muted-soft" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className={`mx-auto h-5 w-5 ${accent ? "text-accent-text" : "text-ink"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={accent ? 2.5 : 2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 10.5l4 4 8-9" />
      </svg>
      <span className="sr-only">Included</span>
    </>
  );
}

const hostingPoints = [
  {
    title: "Hosting is included",
    description:
      "I host your website and look after it, and the cost is part of your monthly plan. There's no separate hosting bill and nothing for you to set up. A domain name is separate and stays in your name.",
  },
  {
    title: "Every hosting plan has limits",
    description:
      "Hosting comes with limits on memory, processing power and storage. A normal business site uses a small part of what's available, so most owners never think about it.",
  },
  {
    title: "Fair use for normal business sites",
    description:
      "The plans are priced for a business site in normal use. If your traffic or storage grows well beyond that, such as a busy shop or a lot of video, I'll talk to you before it becomes a problem and we'll agree the next step together.",
  },
  {
    title: "Large files and video",
    description:
      "Video and big downloads are best kept on a service built for them, so they don't use up your site's allowance. I'll point you to the right one.",
  },
  {
    title: "If you ever stop the plan",
    description:
      "Your site is yours. If you stop, I'll hand over everything so it can run on your own hosting account or with another host.",
  },
  {
    title: "Bigger jobs are quoted first",
    description:
      "New pages, new features and redesigns aren't small changes. I'll give you a price before I start, so nothing turns into a surprise bill.",
  },
];

const faqs = [
  {
    question: "Do I have to take a plan?",
    answer:
      "No. The site is yours either way. A plan is there if you'd rather not think about hosting, updates and small changes. If you'd prefer to look after it yourself, I'll hand over everything you need and help you set it up on your own hosting.",
  },
  {
    question: "Is hosting included?",
    answer:
      "Yes. I host your site and the cost is part of your monthly plan, so there's no separate hosting bill. A domain name is separate and stays in your name.",
  },
  {
    question: "What counts as a small change?",
    answer:
      "Things like swapping a photo, updating opening hours, changing a price or fixing a typo. Most take a few minutes. You can make these yourself in the editor too, and I'll show you how.",
  },
  {
    question: "What if I use up my time?",
    answer:
      "Your time doesn't roll over to the next month. If something needs more than your plan includes, I'll tell you before going over. Extra time is £50 an hour, with a 30 minute minimum, and I always agree it with you first.",
  },
  {
    question: "Is there a contract?",
    answer:
      "No. Plans run month to month and you can stop at the end of any month. A plan starts the month after your site launches.",
  },
  {
    question: "Will the monthly report promise better Google rankings?",
    answer:
      "No. The Care Plus report shows what's happening on your site and in Google, in plain English, so you can see how it's doing. Nobody can honestly promise a position in search results, and I don't.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });
}

export default function CarePlansPage() {
  return (
    <PageShell>
      <PageModifiedJsonLd path={PATH} name={TITLE} source="service" />
      <Breadcrumbs label="Hosting and care" path={PATH} parents={[{ label: "Services", path: "/services" }]} />

      <div className="flex flex-col gap-6 px-6 pb-16 pt-8 sm:px-10 lg:px-35 lg:pb-24 lg:pt-10">
        <h1 className="max-w-180 text-balance text-4xl font-medium leading-[1.1] tracking-[-0.015em] sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
          <HighlightedHeading text="Website hosting and care" highlight="care" />
        </h1>
        <p className="max-w-150 text-lg leading-relaxed text-muted-strong lg:text-[19px]">
          Your website needs a home, and some looking after once it&apos;s live. I host it, keep it updated, keep an eye on it
          and make small changes, all for one fixed monthly price.
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
      </div>

      <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-12 lg:px-35 lg:py-25">
        <div className="flex flex-col gap-4">
          <h2 className="max-w-190 text-3xl font-semibold lg:text-[42px] lg:leading-[1.12]">
            Pick the level of help you want
          </h2>
          <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
            Both plans host and look after your site. Care Plus adds more of my time and a monthly report that shows
            what your site is doing for you in Google.
          </p>
        </div>

        <div className="overflow-hidden rounded-card border border-border-tan bg-paper">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">What each plan includes</caption>
            <thead>
              <tr>
                <td className="w-[46%] sm:w-[52%]" />
                {plans.map((plan, index) => {
                  const dark = index === 1;
                  return (
                    <th
                      key={plan.name}
                      scope="col"
                      className={`px-2 pb-5 pt-6 text-center align-top font-normal sm:px-5 ${dark ? "bg-ink text-cream" : "text-ink"}`}
                    >
                      <span className="block font-display text-base font-bold sm:text-2xl">{plan.name}</span>
                      <span className="mt-1 block font-display text-3xl font-bold tabular-nums sm:text-5xl">
                        {plan.price}
                      </span>
                      <span className={`block text-xs sm:text-base ${dark ? "text-border-tan" : "text-muted-strong"}`}>
                        a month
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.label} className="border-t border-border-tan">
                  <th scope="row" className="py-3.5 pl-4 pr-2 text-sm font-normal leading-snug text-ink sm:py-4 sm:pl-7 sm:pr-4 sm:text-base">
                    {feature.label}
                  </th>
                  <td className="px-2 py-3.5 text-center text-sm sm:px-5 sm:py-4 sm:text-base">
                    <Mark value={feature.care} />
                  </td>
                  <td className="px-2 py-3.5 text-center text-sm sm:px-5 sm:py-4 sm:text-base">
                    <Mark value={feature.plus} accent />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="max-w-170 text-base leading-relaxed text-muted-strong">
          Time doesn&apos;t roll over from one month to the next. If you need more than your plan includes, extra time
          is £50 an hour and I&apos;ll agree it with you before I start.
        </p>
      </div>

      <div
        id="hosting-and-limits"
        className="flex scroll-mt-24 flex-col gap-8 border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:gap-12 lg:px-35 lg:py-25"
      >
        <div className="flex flex-col gap-4">
          <h2 className="max-w-190 text-3xl font-semibold lg:text-[42px] lg:leading-[1.12]">
            Hosting and fair use
          </h2>
          <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
            I manage the hosting for you, so your site, its updates and its backups are all in one place with one
            person to call.
          </p>
        </div>
        <dl className="grid gap-x-16 sm:grid-cols-2">
          {hostingPoints.map((point) => (
            <div key={point.title} className="border-t border-border-tan py-6">
              <dt className="text-xl font-bold leading-snug text-ink">{point.title}</dt>
              <dd className="mt-2 max-w-110 text-base leading-relaxed text-muted-strong">{point.description}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25">
        <FaqJsonLd faqs={faqs} />
        <h2 className="text-3xl font-semibold lg:text-[42px]">Questions about hosting and care</h2>
        <Accordion items={faqs} />
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <TextLink variant="button" href="/contact">
            Start a project <span aria-hidden="true">→</span>
          </TextLink>
          <TextLink variant="underline" href="/website-cost">
            See what a website costs
          </TextLink>
        </div>
      </div>

      <RelatedLinks
        tone="cream"
        costQuiz={false}
        items={[
          { label: "Website Cost Quiz", href: "/website-cost" },
          { label: "Web Development", href: "/web-development-watford" },
        ]}
      />
    </PageShell>
  );
}
