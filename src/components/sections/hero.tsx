import { hero as fallbackHero } from "@/content/site";
import { TextLink } from "@/components/ui/text-link";
import { HeroIllustration } from "@/components/sections/hero-illustration";
import { HighlightedHeading } from "@/components/ui/highlighted-heading";
import { sanityFetch } from "@/sanity/lib/live";
import { heroQuery } from "@/sanity/lib/queries";

export async function Hero() {
  const { data } = await sanityFetch({ query: heroQuery });
  const hero = data ?? fallbackHero;

  return (
    <div className="flex flex-col items-center gap-10 px-6 py-14 sm:px-10 md:py-16 lg:flex-row lg:gap-14 lg:px-35 lg:py-12">
      <div className="flex flex-1 flex-col justify-center gap-5 lg:gap-5">
        {hero.badge && (
          <div className="flex w-fit items-center gap-2 rounded-pill bg-tan px-4 py-2">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span className="font-mono text-xs font-medium tracking-[0.02em] text-muted-strong">
              {hero.badge}
            </span>
          </div>
        )}
        <h1 className="max-w-170 text-4xl font-medium leading-[1.1] tracking-[-0.01em] sm:text-5xl lg:text-[56px] lg:leading-[1.08]">
          <HighlightedHeading text={hero.heading ?? ""} />
        </h1>
        {"tagline" in hero && hero.tagline && (
          <p className="max-w-140 text-lg font-medium text-ink lg:text-xl">
            {hero.tagline}
          </p>
        )}
        <p className="max-w-140 text-base leading-relaxed text-muted-strong lg:text-base">
          {hero.body}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-5 lg:mt-1 lg:gap-6">
          <TextLink variant="button" href="/contact" className="text-base lg:text-lg">
            Start a project <span className="text-lg lg:text-xl">→</span>
          </TextLink>
          <TextLink variant="underline" href="/work" className="text-sm lg:text-[15px]">
            See my work
          </TextLink>
        </div>
      </div>
      <div className="flex w-full flex-1 items-center justify-center">
        <HeroIllustration />
      </div>
    </div>
  );
}
