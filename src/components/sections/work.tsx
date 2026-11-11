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
            {hasMore ? "All work" : "Start yours"} <span aria-hidden="true">→</span>
          </TextLink>
        </div>
      </div>
      <WorkGrid items={workItems.slice(0, HOMEPAGE_LIMIT)} />
    </div>
  );
}
