import Link from "next/link";
import { BrowserMockup } from "@/components/ui/browser-mockup";
import { TextLink } from "@/components/ui/text-link";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { workItemsQuery } from "@/sanity/lib/queries";
import { Signature } from "@/components/ui/signature";
import { Stars } from "@/components/ui/stars";

type ProjectEvidenceProps = {
  eyebrow: string;
  name: string;
  meta: string;
  url: string;
  contribution: string[];
  quote: string;
  quoteName: string;
  quoteCompany: string;
};

const normaliseUrl = (url?: string | null) => url?.replace(/\/+$/, "").toLowerCase();

/**
 * A real project (screenshot, name, meta, contribution, live link) alongside
 * a separately-attributed client testimonial. The screenshot comes from the
 * matching work item in Sanity (matched by live-site URL), so it stays in
 * sync with the homepage, and links to that project's case study when it has
 * one — never out to the live site. The quote isn't always from the project
 * shown, so it's labelled on its own rather than implying it is.
 */
export async function ProjectEvidence({
  eyebrow,
  name,
  meta,
  url,
  contribution,
  quote,
  quoteName,
  quoteCompany,
}: ProjectEvidenceProps) {
  const { data } = await sanityFetch({ query: workItemsQuery });
  const workItem = data?.find((item) => normaliseUrl(item.url) === normaliseUrl(url));
  const screenshotSrc = workItem?.image ? urlFor(workItem.image).width(1200).url() : undefined;
  const dims = workItem?.imageDimensions;
  const screenshotDimensions =
    dims?.width != null && dims?.height != null
      ? { width: dims.width, height: dims.height }
      : undefined;

  const mockup = (
    <BrowserMockup
      variant="illustrated"
      className="transition-transform duration-300 ease-out-strong group-hover:-translate-y-1.5"
      screenshotSrc={screenshotSrc}
      screenshotAlt={`${name} website screenshot`}
      screenshotDimensions={screenshotDimensions}
      address={new URL(url).hostname.replace(/^www\./, "")}
    />
  );

  return (
    <div className="border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:px-35 lg:py-25">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        {workItem?.slug ? (
          <Link
            href={`/work/${workItem.slug}`}
            aria-label={`Read the ${name} case study`}
            className="group w-full lg:w-[55%] lg:shrink-0"
          >
            {mockup}
          </Link>
        ) : (
          <div className="group w-full lg:w-[55%] lg:shrink-0">{mockup}</div>
        )}
        <div className="flex flex-1 flex-col gap-3.5">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted">
            {eyebrow}
          </span>
          <h3 className="text-2xl font-bold lg:text-[34px] lg:leading-[1.15]">{name}</h3>
          <p className="text-sm text-muted">{meta}</p>
          <ul className="mt-2 flex flex-col gap-2 text-[15px] leading-relaxed text-muted">
            {contribution.map((line) => (
              <li key={line}>— {line}</li>
            ))}
          </ul>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-6 gap-y-5">
            <TextLink
              variant="underline"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm"
            >
              Visit the live site →
            </TextLink>
            {workItem?.slug && (
              <TextLink variant="big" href={`/work/${workItem.slug}`} className="w-fit text-sm">
                Read the full case study <span>→</span>
              </TextLink>
            )}
          </div>
          <figure className="mt-5 flex flex-col gap-4 rounded-card bg-ink px-7 py-7">
            <div className="flex items-start justify-between gap-6">
              <span aria-hidden="true" className="-mb-5 -mt-1 text-[56px] font-semibold leading-none text-accent">
                &ldquo;
              </span>
              <Stars size={14} className="mt-1" />
            </div>
            <blockquote className="text-pretty text-base font-medium leading-relaxed text-cream">
              <p>{quote}&rdquo;</p>
            </blockquote>
            <Signature name={quoteName} company={quoteCompany} onDark />
          </figure>
        </div>
      </div>
    </div>
  );
}
