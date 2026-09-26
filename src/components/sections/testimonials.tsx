import { testimonials as fallbackTestimonials } from "@/content/site";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { sanityFetch } from "@/sanity/lib/live";
import { testimonialsQuery } from "@/sanity/lib/queries";

export async function Testimonials() {
  const { data } = await sanityFetch({ query: testimonialsQuery });
  const testimonials = data && data.length > 0 ? data : fallbackTestimonials;

  return (
    <div className="flex flex-col gap-6 border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:gap-7 lg:px-35 lg:py-25">
      <Eyebrow as="h2">Kind words</Eyebrow>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-7">
        {testimonials.map((testimonial, index) => {
          const isFeatured = index === 0;
          return (
            <Card
              key={`${testimonial.name ?? ""}-${testimonial.quote ?? ""}`}
              className={`flex flex-col justify-between gap-6 ${
                isFeatured ? "sm:col-span-2 lg:col-span-4" : "lg:col-span-2"
              }`}
            >
              <div className="flex flex-col gap-4">
                <span
                  className={`tracking-[2px] text-accent ${isFeatured ? "text-base" : "text-sm"}`}
                  aria-hidden="true"
                >
                  ★★★★★
                </span>
                <p
                  className={
                    isFeatured
                      ? "text-xl font-medium leading-relaxed text-[#33312A] lg:text-[24px]"
                      : "text-[15px] leading-relaxed text-[#33312A]"
                  }
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
              <span
                className={`font-mono text-muted ${isFeatured ? "text-[13px]" : "text-[12px]"}`}
              >
                {testimonial.name}, {testimonial.company}
              </span>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
