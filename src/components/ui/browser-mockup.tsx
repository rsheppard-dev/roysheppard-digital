import type { CSSProperties } from "react";
import Image from "next/image";

const SCREEN_ASPECT = 10 / 16;
const PREVIEW_WIDTH = 1200;

/** How far (as % of the image's own height) a tall screenshot must pan
 * upward on hover so its bottom edge reaches the bottom of the viewport. */
function getRevealPercent(dimensions?: { width: number; height: number } | null) {
  if (!dimensions) return 0;
  const imageAspect = dimensions.height / dimensions.width;
  if (imageAspect <= SCREEN_ASPECT) return 0;
  return ((imageAspect - SCREEN_ASPECT) / imageAspect) * 100;
}

/** A simple browser window (traffic-light dots, address bar) around a website screenshot. */
export function BrowserMockup({
  screenshotSrc,
  screenshotAlt,
  screenshotDimensions,
  address,
  sizes = "(min-width: 1024px) 560px, 90vw",
  className = "",
}: {
  /** Optional — omit to show a neutral placeholder until a screenshot is available. */
  screenshotSrc?: string;
  screenshotAlt: string;
  /** Natural pixel dimensions of the screenshot, used to compute the hover pan distance. */
  screenshotDimensions?: { width: number; height: number } | null;
  /** Text shown in the address bar, e.g. the site's hostname. */
  address?: string;
  sizes?: string;
  className?: string;
}) {
  const revealPercent = getRevealPercent(screenshotDimensions);
  const previewHeight = screenshotDimensions
    ? Math.round((PREVIEW_WIDTH * screenshotDimensions.height) / screenshotDimensions.width)
    : Math.round(PREVIEW_WIDTH * SCREEN_ASPECT);

  return (
    <div
      className={`flex w-full flex-col overflow-hidden rounded-card border border-border-tan bg-paper shadow-[0_12px_32px_rgba(23,23,26,0.08)] ${className}`}
    >
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border-tan bg-paper px-4">
        <span className="size-2.5 rounded-full bg-border-tan" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-border-tan" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-border-tan" aria-hidden="true" />
        {address && (
          <span className="ml-3 truncate font-mono text-[11px] text-muted-soft">{address}</span>
        )}
      </div>
      <div className="relative w-full overflow-hidden bg-tan" style={{ aspectRatio: "16 / 10" }}>
        {screenshotSrc ? (
          <Image
            src={screenshotSrc}
            alt={screenshotAlt}
            width={PREVIEW_WIDTH}
            height={previewHeight}
            sizes={sizes}
            style={{ "--reveal": `${revealPercent}%` } as CSSProperties}
            className="absolute inset-x-0 top-0 h-auto w-full transition-transform duration-2500 ease-in-out group-hover:-translate-y-(--reveal)"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-[11px] text-muted-soft">
            [Project screenshot]
          </div>
        )}
      </div>
    </div>
  );
}
