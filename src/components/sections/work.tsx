import Link from "next/link";
import { workItems as fallbackWorkItems } from "@/content/site";
import { IPadMockup } from "@/components/ui/ipad-mockup";
import { TextLink } from "@/components/ui/text-link";
import { sanityFetch } from "@/sanity/lib/live";
import { workItemsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export async function Work() {
  const { data } = await sanityFetch({ query: workItemsQuery });
  const workItems = data && data.length > 0 ? data : fallbackWorkItems;

  return (
    <div
      id="work"
      className="flex flex-col gap-6 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-35 lg:py-25"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-3xl font-semibold lg:text-[42px]">
          Client work
        </h2>
        <TextLink variant="big" href="/contact" className="text-[15px]">
          Start yours <span>→</span>
        </TextLink>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3 lg:gap-x-10">
        {workItems.map((item) => {
          const url = "url" in item ? item.url : undefined;
          const caseStudyHref = "slug" in item && item.slug ? `/work/${item.slug}` : undefined;
          const screenshotSrc =
            "image" in item && item.image ? urlFor(item.image).width(900).url() : undefined;
          const dims = "imageDimensions" in item ? item.imageDimensions : undefined;
          const screenshotDimensions =
            dims?.width != null && dims?.height != null
              ? { width: dims.width, height: dims.height }
              : undefined;

          return (
            <div key={`${item.name ?? ""}-${item.meta ?? ""}`} className="group flex flex-col">
              {caseStudyHref ? (
                <Link
                  href={caseStudyHref}
                  aria-label={item.name ? `Read the ${item.name} case study` : "Read the case study"}
                >
                  <IPadMockup
                    screenshotSrc={screenshotSrc}
                    screenshotAlt={item.name ? `${item.name} website screenshot` : "Website screenshot"}
                    screenshotDimensions={screenshotDimensions}
                  />
                </Link>
              ) : (
                <IPadMockup
                  screenshotSrc={screenshotSrc}
                  screenshotAlt={item.name ? `${item.name} website screenshot` : "Website screenshot"}
                  screenshotDimensions={screenshotDimensions}
                />
              )}
              <div className="mt-4 flex flex-col gap-1">
                <span className="text-lg font-bold">
                  {item.name}
                </span>
                <span className="text-sm text-muted-soft">{item.meta}</span>
              </div>
              {caseStudyHref ? (
                <div className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                  <TextLink variant="big" href={caseStudyHref} className="text-sm">
                    Read the case study <span>→</span>
                  </TextLink>
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-muted-soft transition-colors hover:text-accent"
                    >
                      Live site ↗
                    </a>
                  )}
                </div>
              ) : url && (
                <TextLink
                  variant="big"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-fit text-sm"
                >
                  Visit website <span>→</span>
                </TextLink>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
