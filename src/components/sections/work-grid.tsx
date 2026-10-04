import Link from "next/link";
import { IPadMockup } from "@/components/ui/ipad-mockup";
import { TextLink } from "@/components/ui/text-link";
import { urlFor } from "@/sanity/lib/image";
import type { WorkItemsQueryResult } from "@/sanity/types";

type WorkItem = Partial<WorkItemsQueryResult[number]> & { name?: string | null; meta?: string | null };

/**
 * Desktop span for each project on a 6-column grid so every row is full, however
 * many projects there are: rows of three, switching to rows of two where a lone
 * card would be left over (4 reads as 2×2, 5 as 3 + 2, 7 as 3 + 2 + 2).
 */
function desktopSpan(count: number, index: number) {
  if (count === 1) return "md:col-span-2 lg:col-span-6 md:w-1/2 md:justify-self-center";
  const pairs = count % 3 === 0 ? 0 : count % 3 === 2 ? 1 : 2;
  return count - index <= pairs * 2 ? "lg:col-span-3" : "lg:col-span-2";
}

/** On the 2-column tablet grid, an odd last project is centred rather than left beside a gap. */
function tabletSpan(count: number, index: number) {
  return count > 1 && count % 2 === 1 && index === count - 1
    ? "md:col-span-2 md:w-[calc(50%-1rem)] md:justify-self-center lg:w-full lg:justify-self-stretch"
    : "";
}

export function WorkGrid({
  items,
  headingLevel: Heading = "h3",
  eagerCount = 0,
}: {
  items: WorkItem[];
  /** "h2" where the grid sits directly under the page's h1 (the work index). */
  headingLevel?: "h2" | "h3";
  /** How many of the first projects sit above the fold and should load eagerly. */
  eagerCount?: number;
}) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-6 lg:gap-x-10 lg:gap-y-16">
      {items.map((item, index) => {
        const caseStudyHref = item.slug ? `/work/${item.slug}` : undefined;
        const screenshotSrc = item.image ? urlFor(item.image).width(900).url() : undefined;
        const dims = item.imageDimensions;
        const screenshotDimensions =
          dims?.width != null && dims?.height != null ? { width: dims.width, height: dims.height } : undefined;
        const mockup = (
          <IPadMockup
            screenshotSrc={screenshotSrc}
            screenshotAlt={item.name ? `${item.name} website screenshot` : "Website screenshot"}
            screenshotDimensions={screenshotDimensions}
            loading={index < eagerCount ? "eager" : undefined}
            className="drop-shadow-[0_18px_20px_rgba(23,23,26,0.10)] transition-transform duration-300 ease-out-strong group-hover:-translate-y-1.5"
          />
        );

        return (
          <li
            key={`${item.name ?? ""}-${item.meta ?? ""}`}
            className={`group flex flex-col ${desktopSpan(items.length, index)} ${tabletSpan(items.length, index)}`}
          >
            {caseStudyHref ? (
              <Link href={caseStudyHref} tabIndex={-1} aria-hidden="true">
                {mockup}
              </Link>
            ) : (
              mockup
            )}
            <div className="mt-4 flex flex-col gap-1">
              <Heading className="text-lg font-bold">
                {caseStudyHref ? (
                  <Link href={caseStudyHref} className="transition-colors group-hover:text-accent-text">
                    {item.name}
                  </Link>
                ) : (
                  item.name
                )}
              </Heading>
              {item.meta && <p className="text-sm text-muted">{item.meta}</p>}
            </div>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-2">
              {caseStudyHref && (
                <TextLink variant="big" href={caseStudyHref} className="text-sm">
                  Read the case study{" "}
                  <span aria-hidden="true" className="transition-transform duration-200 ease-out-strong group-hover:translate-x-1">
                    →
                  </span>
                  <span className="sr-only"> for {item.name}</span>
                </TextLink>
              )}
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-area font-mono text-xs text-muted transition-colors hover:text-accent-text"
                >
                  Live site <span aria-hidden="true">↗</span>
                  <span className="sr-only"> for {item.name} (opens in a new tab)</span>
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
