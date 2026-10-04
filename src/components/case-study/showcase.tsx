import { BrowserMockup } from "@/components/ui/browser-mockup";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PhoneMockup } from "@/components/ui/phone-mockup";
import { urlFor } from "@/sanity/lib/image";
import type { CaseStudyQueryResult } from "@/sanity/types";

type Block = NonNullable<NonNullable<CaseStudyQueryResult>["showcase"]>[number];
type ShowcaseImage = NonNullable<Extract<Block, { _type: "showcaseBrowser" }>["image"]>;

const FULL_SIZES = "(min-width: 1024px) calc(100vw - 280px), 92vw";
const HALF_SIZES = "(min-width: 1024px) calc(50vw - 160px), (min-width: 640px) 45vw, 92vw";

function toSource(image: ShowcaseImage | null, width: number) {
  if (!image?.asset) return null;
  const dims = image.dimensions;
  return {
    src: urlFor(image).width(width).url(),
    alt: image.alt ?? "",
    dimensions:
      dims?.width != null && dims?.height != null
        ? { width: dims.width, height: dims.height }
        : undefined,
  };
}

/** A flat screenshot shown whole, in the same illustrated browser window as the other showcase shots. */
function FramedImage({
  image,
  width,
  sizes,
  className = "",
}: {
  image: ShowcaseImage | null;
  width: number;
  sizes: string;
  className?: string;
}) {
  const source = toSource(image, width);
  if (!source) return null;

  return (
    <BrowserMockup
      variant="illustrated"
      fit="natural"
      screenshotSrc={source.src}
      screenshotAlt={source.alt}
      screenshotDimensions={source.dimensions ?? { width: 16, height: 10 }}
      sizes={sizes}
      className={className}
    />
  );
}

function Caption({ children }: { children?: string | null }) {
  if (!children) return null;
  return <figcaption className="mt-4 font-mono text-xs text-muted lg:mt-5">{children}</figcaption>;
}

function ShowcaseBlock({ block, flip }: { block: Block; flip: boolean }) {
  switch (block._type) {
    case "showcaseBrowser": {
      const source = toSource(block.image, 2400);
      if (!source) return null;
      return (
        <figure>
          <BrowserMockup
            variant="illustrated"
            screenshotSrc={source.src}
            screenshotAlt={source.alt}
            screenshotDimensions={source.dimensions}
            sizes={FULL_SIZES}
          />
          <Caption>{block.caption}</Caption>
        </figure>
      );
    }

    case "showcaseFullWidth":
      return (
        <figure>
          <FramedImage image={block.image} width={2400} sizes={FULL_SIZES} />
          <Caption>{block.caption}</Caption>
        </figure>
      );

    case "showcaseMobile": {
      const screens = (block.images ?? [])
        .map((image) => ({ key: image._key, source: toSource(image, 900) }))
        .filter((screen) => screen.source);
      if (screens.length === 0) return null;
      return (
        <figure>
          <div className="flex justify-center gap-3 rounded-card bg-tan px-4 py-10 sm:gap-6 sm:px-8 lg:gap-12 lg:py-20">
            {screens.map((screen, index) => (
              <PhoneMockup
                variant="illustrated"
                key={screen.key}
                screenshotSrc={screen.source!.src}
                screenshotAlt={screen.source!.alt}
                // Stagger the middle screen of three so the row doesn't read as a flat grid.
                className={`w-[30%] max-w-75 ${screens.length === 3 && index === 1 ? "translate-y-6 lg:translate-y-12" : ""}`}
              />
            ))}
          </div>
          <Caption>{block.caption}</Caption>
        </figure>
      );
    }

    case "showcasePair":
      return (
        <figure>
          <div className="grid items-start gap-6 sm:grid-cols-2 lg:gap-10">
            <FramedImage image={block.first} width={1400} sizes={HALF_SIZES} />
            <FramedImage image={block.second} width={1400} sizes={HALF_SIZES} className="sm:mt-12 lg:mt-20" />
          </div>
          <Caption>{block.caption}</Caption>
        </figure>
      );

    case "showcaseDetail":
      return (
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
          <FramedImage
            image={block.image}
            width={1800}
            sizes="(min-width: 1024px) 58vw, 92vw"
            className={flip ? "lg:order-2" : ""}
          />
          <div className="flex max-w-110 flex-col gap-3">
            <h3 className="text-2xl font-bold lg:text-[30px] lg:leading-[1.2]">{block.heading}</h3>
            {block.text && (
              <p className="text-[15px] leading-relaxed text-muted lg:text-base">{block.text}</p>
            )}
          </div>
        </div>
      );
  }
}

/** The screenshots, laid out as a sequence of varied, full-width "spreads" rather than a uniform grid. */
export function Showcase({ blocks }: { blocks: Block[] }) {
  if (blocks.length === 0) return null;
  let detailCount = 0;

  return (
    <div className="flex flex-col gap-10 border-t border-border-tan bg-cream px-6 py-14 sm:px-10 lg:gap-14 lg:px-35 lg:py-25">
      <div className="flex flex-col gap-3">
        <Eyebrow>Design showcase</Eyebrow>
        <h2 className="text-3xl font-semibold lg:text-[42px]">How it came together</h2>
      </div>
      <div className="flex flex-col gap-16 lg:gap-28">
        {blocks.map((block) => {
          const flip = block._type === "showcaseDetail" && detailCount++ % 2 === 1;
          return <ShowcaseBlock key={block._key} block={block} flip={flip} />;
        })}
      </div>
    </div>
  );
}
