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
import { sanityFetch } from "@/sanity/lib/live";
import { testimonialsQuery } from "@/sanity/lib/queries";

const PATH = "/hosting-and-care";
const TITLE = "Website Hosting and Care Plans | Roy Sheppard, Watford";
const DESCRIPTION =
  "Hosting and care for the website I build for you. Updates, backups, monitoring and small changes, all looked after for one fixed monthly price, with no contract.";

const notes = [
  "One bill covers hosting, database, image storage and email sending.",
  "Your small changes are made for you every month.",
  "No contract. Stop at the end of any month.",
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
type Feature = { label: string; care: Cell; plus: Cell };

/** Grouped so an owner reads what I do for them first, and the hosting detail second. */
const featureGroups: { title: string; features: Feature[] }[] = [
  {
    title: "Looking after your site",
    features: [
      { label: "Small changes made for you each month", care: "30 minutes", plus: "1 hour" },
      { label: "Security and software updates", care: true, plus: true },
      { label: "Monitoring, so I know if your site goes down", care: true, plus: true },
      { label: "Help by email when you need it", care: true, plus: true },
    ],
  },
  {
    title: "Hosting, all in one bill",
    features: [
      { label: "Hosting for your website", care: true, plus: true },
      { label: "Database for your site's content", care: true, plus: true },
      { label: "Email sending for your forms and enquiries, from your own domain", care: true, plus: true },
      { label: "Space for images and files", care: "10 GB", plus: "25 GB" },
      { label: "Database size", care: "1 GB", plus: "5 GB" },
      { label: "Website traffic each month", care: "50 GB", plus: "150 GB" },
      { label: "Backups, kept for", care: "4 weeks", plus: "3 months" },
    ],
  },
  {
    title: "Only in Care Plus",
    features: [
      { label: "Monthly report on how your site is doing in Google, in plain English", care: false, plus: true },
      { label: "Regular check on your Google Business Profile", care: false, plus: true },
      { label: "Priority replies", care: false, plus: true },
    ],
  },
];

/** The sums use the published £50 an hour rate for extra time, so they stay true if a price changes. */
const breakdown = [
  {
    name: "Care",
    sum: "£25 + £20",
    description:
      "The 30 minutes of changes would be £25 at my hourly rate. That leaves £20 for hosting, database, email sending, storage, backups, updates and monitoring.",
  },
  {
    name: "Care Plus",
    sum: "£50 + £15",
    description:
      "The hour of changes would be £50 on its own. That leaves £15 for all the hosting and looking after, plus the monthly report, the Google Business Profile check and priority replies.",
  },
];

function Tick({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

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
    title: "Your site is always yours",
    description:
      "If you ever stop the plan, I'll hand over everything so it can run on your own hosting account or with another host. Your domain name stays in your name throughout.",
  },
  {
    title: "Stop at the end of any month",
    description:
      "Plans run month to month. There's no minimum term and no notice period to work out. Tell me and it stops at the end of that month.",
  },
  {
    title: "One bill for everything",
    description:
      "I host your website, its database, your images and files, and the emails it sends. There are no separate accounts for you to set up or pay for. A domain name is the only thing billed separately.",
  },
  {
    title: "Bigger jobs are quoted first",
    description:
      "New pages, new features and redesigns aren't small changes. I'll give you a price before I start, so nothing turns into a surprise bill.",
  },
  {
    title: "Room for a normal business site",
    description:
      "Each plan comes with set amounts of storage and traffic, shown in the table above. A normal business site uses a small part of them. If yours regularly goes over, I'll let you know and we'll agree a plan that fits.",
  },
  {
    title: "Large files and video",
    description:
      "Video and big downloads are best kept on a service built for them, so they don't use up your site's allowance. I'll point you to the right one.",
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
      "Yes. I host your site, its database and your images and files, and look after the emails it sends. The cost is part of your monthly plan, so there's no separate hosting bill. A domain name is separate and stays in your name.",
  },
  {
    question: "What does the email part cover?",
    answer:
      "I set up and look after the emails your site sends, such as enquiry form messages to you, confirmations to your customers and order emails, sent from your own domain so they look right and reach the inbox. It isn't a business mailbox. Addresses like info@yourbusiness.co.uk need a service like Google Workspace or Microsoft 365, which I can set up for you as an extra.",
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

export default async function CarePlansPage() {
  const { data } = await sanityFetch({ query: testimonialsQuery });
  // A client's own words on what happens after launch. Only the first paragraph, so it reads at a glance.
  const aftercare = data?.find((entry) => entry.name?.trim() === "Jack Kingsley" && entry.quote);
  const aftercareQuote = aftercare?.quote?.split("\n")[0]?.trim();

  return (
    <PageShell>
      <PageModifiedJsonLd path={PATH} name={TITLE} source="service" />
      <Breadcrumbs label="Hosting and care" path={PATH} parents={[{ label: "Services", path: "/services" }]} />

      <div className="flex flex-col gap-10 px-6 pb-14 pt-8 sm:px-10 lg:flex-row lg:items-center lg:gap-16 lg:px-35 lg:pb-20 lg:pt-10">
        <div className="flex flex-col gap-6 lg:flex-1">
          <h1 className="max-w-180 text-balance text-4xl font-medium leading-[1.1] tracking-[-0.015em] sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
            <HighlightedHeading text="Website hosting and care" highlight="care" />
          </h1>
          <p className="max-w-150 text-lg leading-relaxed text-muted-strong lg:text-[19px]">
            Once your site is live, I host it, keep it safe and up to date, and make your small changes for you, all
            for one fixed monthly price.
          </p>
          <ul className="flex flex-col gap-2.5 text-base text-ink">
            {notes.map((note) => (
              <li key={note} className="flex items-start gap-3">
                <Tick className="mt-0.75 h-5 w-5 shrink-0 text-accent-text" />
                {note}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 pt-1">
            <Image
              src={PORTRAIT.path}
              alt={PORTRAIT.alt}
              width={PORTRAIT.width}
              height={PORTRAIT.height}
              sizes="96px"
              priority
              className="h-20 w-20 shrink-0 rounded-full border border-border-tan lg:h-24 lg:w-24"
            />
            <p className="flex flex-col text-sm leading-snug text-muted-strong lg:text-base">
              <span className="font-semibold text-ink">Roy Sheppard</span>
              Freelance web designer and developer in Watford
            </p>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-7 gap-y-4">
            <TextLink variant="button" href="/contact">
              Start a project <span aria-hidden="true">→</span>
            </TextLink>
            <TextLink variant="underline" href="#plans">
              Compare the plans
            </TextLink>
          </div>
        </div>
        <Image
          src="/images/hosting-care-watering.webp"
          alt="Roy watering a plant pot with a small website growing from it"
          width={760}
          height={1141}
          sizes="(min-width: 1024px) 380px, 0px"
          priority
          className="hidden h-auto w-95 shrink-0 lg:block"
        />
      </div>

      <div
        id="plans"
        className="flex scroll-mt-24 flex-col gap-8 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-12 lg:px-35 lg:py-25"
      >
        <div className="flex flex-col gap-4">
          <h2 className="max-w-190 text-3xl font-semibold lg:text-[42px] lg:leading-[1.12]">
            Pick the level of help you want
          </h2>
          <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
            Both plans host and look after your site. Care Plus doubles the time for your changes and adds a monthly
            report that shows what your site is doing for you in Google.
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
            {featureGroups.map((group) => (
              <tbody key={group.title}>
                <tr className="border-t border-border-tan bg-cream">
                  <th
                    scope="rowgroup"
                    colSpan={3}
                    className="py-2.5 pl-4 pr-2 text-left font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted-strong sm:pl-7"
                  >
                    {group.title}
                  </th>
                </tr>
                {group.features.map((feature) => (
                  <tr key={feature.label} className="border-t border-border-tan">
                    <th
                      scope="row"
                      className="py-3.5 pl-4 pr-2 text-sm font-normal leading-snug text-ink sm:py-4 sm:pl-7 sm:pr-4 sm:text-base"
                    >
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
            ))}
          </table>
        </div>

        <div className="flex flex-col gap-6 pt-4 lg:gap-8 lg:pt-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold lg:text-3xl">Where the money goes</h3>
            <p className="max-w-155 text-base leading-relaxed text-muted-strong">
              My time on its own is £50 an hour. Here is how each plan compares with that.
            </p>
          </div>
          <dl className="grid gap-x-16 sm:grid-cols-2">
            {breakdown.map((plan) => (
              <div key={plan.name} className="border-t border-border-tan py-6">
                <dt className="text-base font-bold text-ink">{plan.name}</dt>
                <dd className="mt-1 font-display text-4xl font-bold tabular-nums text-ink lg:text-5xl">{plan.sum}</dd>
                <dd className="mt-3 max-w-110 text-base leading-relaxed text-muted-strong">{plan.description}</dd>
              </div>
            ))}
          </dl>
          <p className="max-w-170 text-base leading-relaxed text-muted-strong">
            Time doesn&apos;t roll over from one month to the next. If you need more than your plan includes, extra
            time is £50 an hour and I&apos;ll agree it with you before I start.
          </p>
        </div>
      </div>

      {aftercareQuote && aftercare && (
        <figure className="flex flex-col gap-5 border-t border-border-tan bg-paper px-6 py-14 sm:px-10 lg:px-35 lg:py-20">
          <blockquote className="max-w-210 text-balance text-2xl font-medium leading-snug text-ink lg:text-[34px] lg:leading-[1.25]">
            &ldquo;{aftercareQuote}&rdquo;
          </blockquote>
          <figcaption className="text-base text-muted-strong">
            <span className="font-semibold text-ink">{aftercare.name}</span>
            {aftercare.company ? `, ${aftercare.company}` : ""}
          </figcaption>
        </figure>
      )}

      <div
        id="hosting-and-limits"
        className="flex scroll-mt-24 flex-col gap-8 border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:gap-12 lg:px-35 lg:py-25"
      >
        <div className="flex flex-col gap-4">
          <h2 className="max-w-190 text-3xl font-semibold lg:text-[42px] lg:leading-[1.12]">No surprises</h2>
          <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
            Your site, its updates and its backups are all in one place, with one person to call. Here is how the
            plans work, in plain English.
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
