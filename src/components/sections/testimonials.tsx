import { testimonials as fallbackTestimonials } from "@/content/site";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { sanityFetch } from "@/sanity/lib/live";
import { testimonialsQuery } from "@/sanity/lib/queries";

export async function Testimonials() {
  const { data } = await sanityFetch({ query: testimonialsQuery });
  const testimonials = data && data.length > 0 ? data : fallbackTestimonials;
  const [featured, ...supporting] = testimonials;

  return (
    <div className="flex flex-col gap-6 border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:gap-7 lg:px-35 lg:py-25">
      <Eyebrow as="h2">Kind words</Eyebrow>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-7">
        {featured && (
          <Card className="flex flex-col justify-between gap-6 lg:flex-[1.3]">
            <div className="flex flex-col gap-4.5">
              <span className="text-base tracking-[2px] text-accent" aria-hidden="true">
                ★★★★★
              </span>
              <p className="text-xl font-medium leading-relaxed text-[#33312A] lg:text-[22px]">
                &ldquo;{featured.quote}&rdquo;
              </p>
            </div>
            <span className="font-mono text-[13px] text-muted">
              {featured.name}, {featured.company}
            </span>
          </Card>
        )}
        {supporting.length > 0 && (
          <div className="flex flex-1 flex-col gap-6">
            {supporting.map((testimonial) => (
              <Card
                key={`${testimonial.name ?? ""}-${testimonial.quote ?? ""}`}
                className="flex flex-1 flex-col justify-between gap-3"
              >
                <div className="flex flex-col gap-3">
                  <span className="text-sm tracking-[2px] text-accent" aria-hidden="true">
                    ★★★★★
                  </span>
                  <p className="text-[15px] leading-relaxed text-[#33312A]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
                <span className="font-mono text-[12px] text-muted">
                  {testimonial.name}, {testimonial.company}
                </span>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
