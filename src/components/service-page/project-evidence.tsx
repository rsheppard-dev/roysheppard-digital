import { BrowserMockup } from "@/components/ui/browser-mockup";
import { TextLink } from "@/components/ui/text-link";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { workItemsQuery } from "@/sanity/lib/queries";

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
 * matching "Recent work" item in Sanity (matched by live-site URL), so it
 * stays in sync with the homepage. The quote isn't always from the project
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

  return (
    <div className="border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:px-35 lg:py-25">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${name} website`}
          className="group w-full lg:w-[55%] lg:shrink-0"
        >
          <BrowserMockup
            screenshotSrc={screenshotSrc}
            screenshotAlt={`${name} website screenshot`}
            screenshotDimensions={screenshotDimensions}
            address={new URL(url).hostname.replace(/^www\./, "")}
          />
        </a>
        <div className="flex flex-1 flex-col gap-3.5">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted-soft">
            {eyebrow}
          </span>
          <h3 className="text-2xl font-bold lg:text-[34px] lg:leading-[1.15]">{name}</h3>
          <p className="text-sm text-muted-soft">{meta}</p>
          <ul className="mt-2 flex flex-col gap-2 text-[15px] leading-relaxed text-muted">
            {contribution.map((line) => (
              <li key={line}>— {line}</li>
            ))}
          </ul>
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
          <div className="mt-5 flex flex-col gap-2.5 rounded-card bg-ink px-7 py-6">
            <span className="text-base tracking-[2px] text-accent" aria-hidden="true">
              ★★★★★
            </span>
            <p className="text-base font-medium leading-relaxed text-cream">
              &ldquo;{quote}&rdquo;
            </p>
            <span className="font-mono text-xs text-[#d8d4c6]">
              {quoteName}, {quoteCompany}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
