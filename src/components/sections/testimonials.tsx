import { testimonials as fallbackTestimonials } from "@/content/site";
import { Card } from "@/components/ui/card";
import { sanityFetch } from "@/sanity/lib/live";
import { testimonialsQuery } from "@/sanity/lib/queries";

export async function Testimonials() {
  const { data } = await sanityFetch({ query: testimonialsQuery });
  const testimonials = data && data.length > 0 ? data : fallbackTestimonials;

  return (
    <div className="flex flex-col gap-8 bg-tan px-6 py-14 sm:px-10 lg:gap-10 lg:px-[140px] lg:py-[100px]">
      <h2 className="text-3xl font-semibold lg:text-4xl">Kind words</h2>
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-7">
        {testimonials.map((testimonial) => (
          <Card
            key={`${testimonial.name ?? ""}-${testimonial.quote ?? ""}`}
            className="flex flex-1 flex-col gap-4.5"
          >
            <span className="text-base tracking-[2px] text-accent">
              ★★★★★
            </span>
            <p className="text-[17px] font-medium leading-relaxed text-[#33312A]">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <span className="font-mono text-[13px] text-muted">
              {testimonial.name}, {testimonial.company}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
