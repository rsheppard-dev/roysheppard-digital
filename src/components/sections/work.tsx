import { workItems as fallbackWorkItems } from "@/content/site";
import { WorkGrid } from "@/components/sections/work-grid";
import { TextLink } from "@/components/ui/text-link";
import { sanityFetch } from "@/sanity/lib/live";
import { workItemsQuery } from "@/sanity/lib/queries";

/** The homepage shows the first projects by Sanity `order`; the rest live on /work. */
const HOMEPAGE_LIMIT = 6;

export async function Work() {
  const { data } = await sanityFetch({ query: workItemsQuery });
  const workItems = data && data.length > 0 ? data : fallbackWorkItems;
  const hasMore = workItems.length > HOMEPAGE_LIMIT;

  return (
    <div
      id="work"
      className="flex flex-col gap-6 border-t border-border-tan bg-tan px-6 py-14 sm:px-10 lg:gap-14 lg:px-35 lg:py-25"
    >
      <div className="flex items-end justify-between gap-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-semibold lg:text-[42px]">Client projects</h2>
          <TextLink variant="big" href={hasMore ? "/work" : "/contact"} className="w-fit text-[15px]">
            {hasMore ? "All projects" : "Start yours"} <span aria-hidden="true">→</span>
          </TextLink>
        </div>
        {/* Only where hovering is possible: tells visitors the screens scroll through each site. */}
        <p className="hidden -rotate-2 items-start gap-2 pb-1 lg:mr-40 font-hand text-xl leading-none text-muted-strong [@media(hover:hover)_and_(pointer:fine)]:lg:flex">
          hover a screen to scroll the site
          <svg
            aria-hidden="true"
            width="32"
            height="34"
            viewBox="0 0 32 34"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-3 text-accent"
          >
            <path d="M2 5c11-4 21 3 21 22" />
            <path d="M17 21l6 7 5-7" />
          </svg>
        </p>
      </div>
      <WorkGrid items={workItems.slice(0, HOMEPAGE_LIMIT)} />
    </div>
  );
}
