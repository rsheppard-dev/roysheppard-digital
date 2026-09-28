import Link from "next/link";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { projectScreensQuery, workScreensQuery } from "@/sanity/lib/queries";

/** Fan position per phone: outer screens tilt away and sit lower, the middle one stands forward. */
const FAN = [
  "z-0 -rotate-6 translate-y-5 lg:translate-y-8",
  "z-10 -translate-y-1",
  "z-0 rotate-6 translate-y-5 lg:translate-y-8",
];

type Screen = { key: string; href: string; name: string; alt: string | null; asset: Parameters<typeof urlFor>[0] };

async function getScreens(slug?: string): Promise<Screen[]> {
  if (slug) {
    // One project's mobile screens, all linking to its case study.
    const { data } = await sanityFetch({ query: projectScreensQuery, params: { slug } });
    if (!data?.slug) return [];
    return (data.screens ?? []).flatMap((screen, index) =>
      screen.asset
        ? [{ key: `${data.slug}-${index}`, href: `/work/${data.slug}`, name: data.name ?? "", alt: screen.alt, asset: screen.asset }]
        : [],
    );
  }

  // One homepage from each project, so different businesses sit side by side.
  const { data } = await sanityFetch({ query: workScreensQuery });
  return (data ?? []).flatMap((item) =>
    item.slug && item.screen?.asset
      ? [{ key: item.slug, href: `/work/${item.slug}`, name: item.name ?? "", alt: item.screen.alt, asset: item.screen.asset }]
      : [],
  );
}

/**
 * Real client mobile screens fanned out beside a service page intro, pulled from
 * the case studies' mobile showcase in Sanity and linking through to them. With a
 * `slug`, shows that one project's screens; without, one homepage per project.
 */
export async function WorkScreens({ slug }: { slug?: string }) {
  const screens = (await getScreens(slug)).slice(0, 3);
  if (screens.length === 0) return null;

  return (
    <div className="flex items-start justify-center pb-6 pt-2 lg:pb-10">
      {screens.map((screen, index) => (
        <Link
          key={screen.key}
          href={screen.href}
          className={`fan-in group relative -mx-2 w-[34%] max-w-50 sm:-mx-3 ${FAN[index % FAN.length]}`}
          style={{ "--i": index } as React.CSSProperties}
        >
          <PhoneMockup
            variant="illustrated"
            screenshotSrc={urlFor(screen.asset).width(600).url()}
            screenshotAlt={screen.alt ?? `${screen.name} website on mobile`}
            sizes="(min-width: 1024px) 200px, 34vw"
            className="phone-lift"
          />
          <span className="sr-only">Read the {screen.name} case study</span>
        </Link>
      ))}
    </div>
  );
}
