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

/** Picks which project, and which of its mobile screens, takes the front (middle) phone. */
type Front = { slug: string; screen: number };

async function getScreens(slug?: string, front?: Front): Promise<Screen[]> {
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

  // One screen from each project (its homepage unless `front` picks another), so different businesses sit side by side.
  const { data } = await sanityFetch({ query: workScreensQuery });
  const screens = (data ?? []).flatMap((item) => {
    const index = front && front.slug === item.slug ? front.screen : 0;
    const screen = item.screens?.[index];
    return item.slug && screen?.asset
      ? [{ key: item.slug, href: `/work/${item.slug}`, name: item.name ?? "", alt: screen.alt, asset: screen.asset }]
      : [];
  });

  // The fan's middle phone stands forward, so slot the featured project there.
  const featured = screens.find((screen) => screen.key === front?.slug);
  if (!featured) return screens;
  const others = screens.filter((screen) => screen !== featured);
  return [others[0], featured, ...others.slice(1)].filter(Boolean);
}

/**
 * Real client mobile screens fanned out beside a service page intro, pulled from
 * the case studies' mobile showcase in Sanity and linking through to them. With a
 * `slug`, shows that one project's screens; without, one homepage per project, with
 * `front` bringing a chosen project and screen to the middle.
 */
export async function WorkScreens({ slug, front }: { slug?: string; front?: Front }) {
  const screens = (await getScreens(slug, front)).slice(0, 3);
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
            screenshotSrc={urlFor(screen.asset).width(600).url()}
            screenshotAlt={screen.alt ?? `${screen.name} website on mobile`}
            sizes="(min-width: 1024px) 200px, 34vw"
            // These sit beside the page intro, above the fold on desktop, and are the LCP there.
            loading="eager"
            className="phone-lift"
          />
          <span className="sr-only">Read the {screen.name} case study</span>
        </Link>
      ))}
    </div>
  );
}
