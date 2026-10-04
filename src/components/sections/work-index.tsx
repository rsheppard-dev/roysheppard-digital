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

const FEATURE_SIZES = "(min-width: 1024px) 55vw, 92vw";
const PAIR_SIZES = "(min-width: 1024px) 42vw, (min-width: 640px) 45vw, 92vw";

/**
 * Splits the projects into rows that alternate between one large "feature" and a
 * staggered pair, so the page has a rhythm instead of a uniform grid. A lone
 * project left over for a pair row is shown as a feature.
 */
function toRows(items: WorkIndexItem[]) {
  const rows: { kind: "feature" | "pair"; items: WorkIndexItem[] }[] = [];
  let index = 0;
  while (index < items.length) {
    const wantPair = rows.length % 2 === 1 && items.length - index >= 2;
    const take = wantPair ? 2 : 1;
    rows.push({ kind: wantPair ? "pair" : "feature", items: items.slice(index, index + take) });
    index += take;
  }
  return rows;
}

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
    <div className="flex max-w-120 flex-col gap-4">
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
      <div className="mt-1 flex flex-wrap items-baseline gap-x-6 gap-y-2">
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

/** The /work index: a large feature, a staggered pair, a feature, and so on, each with what the project was. */
export function WorkIndex({ items }: { items: WorkIndexItem[] }) {
  let featureCount = 0;

  return (
    <div className="flex flex-col gap-20 lg:gap-32">
      {toRows(items).map((row, rowIndex) => {
        if (row.kind === "pair") {
          return (
            <ul key={`pair-${rowIndex}`} className="grid items-start gap-16 sm:grid-cols-2 lg:gap-14">
              {row.items.map((item, index) => (
                <li
                  key={item.slug ?? item.name}
                  className={`group flex flex-col gap-7 ${index === 1 ? "sm:mt-16 lg:mt-28" : ""}`}
                >
                  <Mockup item={item} width={1400} sizes={PAIR_SIZES} />
                  <Details item={item} />
                </li>
              ))}
            </ul>
          );
        }

        const item = row.items[0];
        const flip = featureCount++ % 2 === 1;
        return (
          <div
            key={item.slug ?? item.name}
            className={`group grid items-center gap-8 lg:gap-16 ${
              flip ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]" : "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
            }`}
          >
            <div className={flip ? "lg:order-2" : ""}>
              <Mockup item={item} width={1800} sizes={FEATURE_SIZES} eager={rowIndex === 0} />
            </div>
            <Details item={item} />
          </div>
        );
      })}
    </div>
  );
}
