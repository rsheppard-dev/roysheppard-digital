import { cta as fallbackCta } from "@/content/site";
import { TextLink } from "@/components/ui/text-link";
import { sanityFetch } from "@/sanity/lib/live";
import { ctaQuery } from "@/sanity/lib/queries";

export async function CtaBanner() {
  const { data } = await sanityFetch({ query: ctaQuery });
  const cta = data ?? fallbackCta;

  return (
    <div
      id="contact"
      className="flex flex-col items-center justify-center gap-5 bg-accent px-6 py-16 text-center sm:px-10 lg:gap-6 lg:px-[140px] lg:py-[100px]"
    >
      <h2 className="max-w-[760px] text-3xl font-semibold leading-[1.15] text-cream sm:text-4xl lg:text-[54px] lg:leading-[1.1]">
        {cta.heading}
      </h2>
      <p className="max-w-[480px] text-base text-accent-soft lg:text-lg">
        {cta.body}
      </p>
      <TextLink
        variant="ctaLink"
        href={`mailto:${cta.email}`}
        className="mt-2 break-all text-lg sm:text-xl lg:text-[26px]"
      >
        {cta.email}
      </TextLink>
    </div>
  );
}
