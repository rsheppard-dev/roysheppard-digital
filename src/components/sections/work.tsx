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
      className="flex flex-col gap-6 bg-ink px-6 py-14 sm:px-10 lg:gap-10 lg:px-[140px] lg:py-[100px]"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-3xl font-semibold text-cream lg:text-[42px]">
          Recent work
        </h2>
        <TextLink variant="bigLight" href="#contact" className="text-[15px]">
          Start yours <span>→</span>
        </TextLink>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3 lg:gap-x-10">
        {workItems.map((item) => {
          const url = "url" in item ? item.url : undefined;
          const screenshotSrc =
            "image" in item && item.image ? urlFor(item.image).width(900).url() : undefined;
          const screenshotDimensions = "imageDimensions" in item ? item.imageDimensions : undefined;

          return (
            <div key={`${item.name ?? ""}-${item.meta ?? ""}`} className="group flex flex-col">
              <IPadMockup
                screenshotSrc={screenshotSrc}
                screenshotAlt={item.name ? `${item.name} website screenshot` : "Website screenshot"}
                screenshotDimensions={screenshotDimensions}
              />
              <div className="mt-4 flex flex-col gap-1">
                <span className="text-lg font-bold text-cream">
                  {item.name}
                </span>
                <span className="text-sm text-[#9A9686]">{item.meta}</span>
              </div>
              {url && (
                <TextLink
                  variant="bigLight"
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
