import { BrowserMockup } from "@/components/ui/browser-mockup";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/components/ui/text-link";

type Fact = { label: string; value?: string | null };

/**
 * Case study opener: name, tagline, a short row of project facts and the
 * large site visual. The visual straddles the cream/tan boundary into the
 * story section below, so the page reads as one continuous spread.
 */
export function CaseStudyHero({
  name,
  tagline,
  facts,
  url,
  screenshotSrc,
  screenshotDimensions,
}: {
  name: string;
  tagline?: string | null;
  facts: Fact[];
  url?: string | null;
  screenshotSrc?: string;
  screenshotDimensions?: { width: number; height: number };
}) {
  const shownFacts = facts.filter((fact) => fact.value);
  const hostname = url ? new URL(url).hostname.replace(/^www\./, "") : undefined;

  return (
    <>
      <div className="flex flex-col gap-5 px-6 pb-10 pt-8 sm:px-10 lg:gap-6 lg:px-35 lg:pb-16 lg:pt-10">
        <Eyebrow>Case study</Eyebrow>
        <h1 className="max-w-190 text-4xl font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
          {name}
        </h1>
        {tagline && (
          <p className="max-w-155 text-base leading-relaxed text-muted-strong lg:text-lg">
            {tagline}
          </p>
        )}
        {shownFacts.length > 0 && (
          <dl className="mt-3 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-border-tan pt-6 lg:mt-5 lg:grid-cols-4">
            {shownFacts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1.5">
                <dt className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted-soft">
                  {fact.label}
                </dt>
                <dd className="text-[15px] font-semibold leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {url && (
          <TextLink
            variant="underline"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 w-fit text-sm"
          >
            Visit the live site ↗
          </TextLink>
        )}
      </div>
      <div className="bg-[linear-gradient(to_bottom,var(--color-cream)_50%,var(--color-tan)_50%)] px-6 sm:px-10 lg:px-35">
        {/* Not a link: the visual belongs to this case study, and the live
            site is reached through the explicit text link above. */}
        <div className="group">
          <BrowserMockup
            screenshotSrc={screenshotSrc}
            screenshotAlt={`${name} website homepage`}
            screenshotDimensions={screenshotDimensions}
            address={hostname}
            sizes="(min-width: 1024px) calc(100vw - 280px), 92vw"
          />
        </div>
      </div>
    </>
  );
}
