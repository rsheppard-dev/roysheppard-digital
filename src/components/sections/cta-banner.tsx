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
      className="flex flex-col items-center justify-center gap-5 bg-accent px-6 py-16 text-center sm:px-10 lg:gap-6 lg:px-35 lg:py-25"
    >
      <h2 className="max-w-190 text-3xl font-semibold leading-[1.15] text-cream sm:text-4xl lg:text-[54px] lg:leading-[1.1]">
        {cta.heading}
      </h2>
      <p className="max-w-120 text-base text-accent-soft lg:text-lg">
        {cta.body}
      </p>
      <TextLink
        variant="buttonInverse"
        href="/contact"
        className="mt-2 text-base lg:text-lg"
      >
        Start a project <span className="text-lg lg:text-xl">→</span>
      </TextLink>
      <TextLink
        variant="ctaLinkSecondary"
        href={`mailto:${cta.email}`}
        className="break-all"
      >
        or email {cta.email} directly
      </TextLink>
    </div>
  );
}
