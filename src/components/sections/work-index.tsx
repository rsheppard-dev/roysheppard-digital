import Link from "next/link";
import { IPadMockup } from "@/components/ui/ipad-mockup";
import { TextLink } from "@/components/ui/text-link";
import { urlFor } from "@/sanity/lib/image";

export type WorkIndexItem = {
  name: string | null;
  tagline: string | null;
  industry: string | null;
  projectType: string | null;
  url: string | null;
  slug: string | null;
  image: Parameters<typeof urlFor>[0] | null;
  imageDimensions: { width: number | null; height: number | null } | null;
};

const SIZES = "(min-width: 1024px) 42vw, (min-width: 640px) 45vw, 92vw";

function Mockup({
  item,
  width,
  sizes,
  eager,
}: {
  item: WorkIndexItem;
  width: number;
  sizes: string;
  eager?: boolean;
}) {
  const dims = item.imageDimensions;
  const mockup = (
    <IPadMockup
      screenshotSrc={item.image ? urlFor(item.image).width(width).url() : undefined}
      screenshotAlt={item.name ? `${item.name} website screenshot` : "Website screenshot"}
      screenshotDimensions={
        dims?.width != null && dims?.height != null ? { width: dims.width, height: dims.height } : undefined
      }
      sizes={sizes}
      loading={eager ? "eager" : undefined}
      className="drop-shadow-[0_18px_20px_rgba(23,23,26,0.10)] transition-transform duration-300 ease-out-strong group-hover:-translate-y-1.5"
    />
  );
  return item.slug ? (
    <Link href={`/work/${item.slug}`} tabIndex={-1} aria-hidden="true" className="block">
      {mockup}
    </Link>
  ) : (
    mockup
  );
}

function Details({ item }: { item: WorkIndexItem }) {
  const href = item.slug ? `/work/${item.slug}` : undefined;
  const facts = [
    { label: "Industry", value: item.industry },
    { label: "Project", value: item.projectType },
  ].filter((fact) => fact.value);

  return (
    <div className="flex max-w-120 flex-1 flex-col gap-4">
      <h2 className="text-2xl font-bold lg:text-[34px] lg:leading-[1.15]">
        {href ? (
          <Link href={href} className="transition-colors group-hover:text-accent-text">
            {item.name}
          </Link>
        ) : (
          item.name
        )}
      </h2>
      {item.tagline && (
        <p className="text-[15px] leading-relaxed text-muted-strong lg:text-base">{item.tagline}</p>
      )}
      {facts.length > 0 && (
        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border-tan pt-4">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1">
              <dt className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-muted">
                {fact.label}
              </dt>
              <dd className="text-sm font-semibold leading-snug">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="mt-auto flex flex-wrap items-baseline gap-x-6 gap-y-2 pt-1">
        {href && (
          <TextLink variant="big" href={href} className="text-[15px]">
            Read the case study{" "}
            <span aria-hidden="true" className="transition-transform duration-200 ease-out-strong group-hover:translate-x-1">
              →
            </span>
            <span className="sr-only"> for {item.name}</span>
          </TextLink>
        )}
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-area font-mono text-xs text-muted transition-colors hover:text-accent-text"
          >
            Live site <span aria-hidden="true">↗</span>
            <span className="sr-only"> for {item.name} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </div>
  );
}

/** The /work index: every project gets the same space, two across, each with what the project was. */
export function WorkIndex({ items }: { items: WorkIndexItem[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-20 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-28">
      {items.map((item, index) => (
        <li
          key={item.slug ?? item.name}
          // A lone last project is centred at the same width as the rest, not stretched.
          className={`group flex flex-col gap-7 ${
            items.length % 2 === 1 && index === items.length - 1
              ? "sm:col-span-2 sm:w-[calc(50%-1.25rem)] sm:justify-self-center lg:w-[calc(50%-2rem)]"
              : ""
          }`}
        >
          <Mockup item={item} width={1400} sizes={SIZES} eager={index < 2} />
          <Details item={item} />
        </li>
      ))}
    </ul>
  );
}
