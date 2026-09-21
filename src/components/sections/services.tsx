import { services as fallbackServices } from "@/content/site";
import { Card } from "@/components/ui/card";
import { sanityFetch } from "@/sanity/lib/live";
import { servicesQuery } from "@/sanity/lib/queries";

export async function Services() {
  const { data } = await sanityFetch({ query: servicesQuery });
  const services = data && data.length > 0 ? data : fallbackServices;

  return (
    <div
      id="services"
      className="flex flex-col gap-8 px-6 py-14 sm:px-10 lg:gap-12 lg:px-[140px] lg:py-[100px]"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="text-3xl font-semibold lg:text-[42px]">What I do</h2>
        <p className="max-w-[380px] text-sm text-muted-soft lg:text-right lg:text-base">
          Everything you need to go from idea to a site that actually earns
          its keep.
        </p>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-7">
        {services.map((service, index) => (
          <Card key={service.title} className="flex flex-1 flex-col gap-4">
            <span className="font-mono text-sm font-semibold text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-bold lg:text-[22px]">
              {service.title}
            </h3>
            <p className="text-[15px] leading-relaxed text-muted">
              {service.description}
            </p>
            <div className="mt-2 flex flex-col gap-2 text-sm text-muted-strong">
              {service.bullets?.map((bullet) => (
                <span key={bullet}>— {bullet}</span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
