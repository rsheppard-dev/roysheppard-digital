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

/**
 * A simple browser window (muted dots, no address bar) around a website screenshot: white
 * body, a light toolbar, a hairline edge and a soft layered shadow, so it sits on the page
 * rather than being drawn onto it. `fit="natural"` shows the whole screenshot at its own
 * aspect ratio instead of a 16:10 viewport that pans on hover.
 */
export function BrowserMockup({
  screenshotSrc,
  screenshotAlt,
  screenshotDimensions,
  sizes = "(min-width: 1024px) 560px, 90vw",
  className = "",
  fit = "viewport",
  pan = true,
  loading,
}: {
  /** Optional — omit to show a neutral placeholder until a screenshot is available. */
  screenshotSrc?: string;
  screenshotAlt: string;
  /** Natural pixel dimensions of the screenshot, used to compute the hover pan distance. */
  screenshotDimensions?: { width: number; height: number } | null;
  sizes?: string;
  className?: string;
  fit?: "viewport" | "natural";
  /** Scroll a tall screenshot on hover of a `group` ancestor (viewport fit only). */
  pan?: boolean;
  /** Pass "eager" when the mockup sits above the fold, so the screenshot isn't lazy-loaded. */
  loading?: "eager" | "lazy";
}) {
  const natural = fit === "natural" && screenshotDimensions;
  const revealPercent = getRevealPercent(screenshotDimensions);
  const previewHeight = screenshotDimensions
    ? Math.round((PREVIEW_WIDTH * screenshotDimensions.height) / screenshotDimensions.width)
    : Math.round(PREVIEW_WIDTH * SCREEN_ASPECT);

  return (
    <div
      className={`flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_6px_rgba(23,23,26,0.05),0_20px_48px_rgba(23,23,26,0.10)] ring-1 ring-ink/[0.07] lg:rounded-2xl ${className}`}
    >
      <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-border-tan bg-tan px-3.5 lg:h-11 lg:gap-2 lg:px-5">
        <span className="size-2.5 rounded-full bg-ink/15 lg:size-3" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-ink/15 lg:size-3" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-ink/15 lg:size-3" aria-hidden="true" />
      </div>
      <div
        className="relative w-full overflow-hidden bg-tan"
        style={{
          aspectRatio: natural
            ? `${screenshotDimensions.width} / ${screenshotDimensions.height}`
            : "16 / 10",
        }}
      >
        {screenshotSrc ? (
          <Image
            src={screenshotSrc}
            alt={screenshotAlt}
            width={PREVIEW_WIDTH}
            height={previewHeight}
            sizes={sizes}
            loading={loading}
            style={
              {
                "--reveal": `${revealPercent}%`,
                // Stated in CSS too: with `h-auto`, Chrome doesn't count the width/height
                // attributes alone as reserving space for a lazy image.
                aspectRatio: `${PREVIEW_WIDTH} / ${previewHeight}`,
              } as CSSProperties
            }
            className={`absolute inset-x-0 top-0 h-auto w-full ${
              natural || !pan ? "" : "transition-transform duration-2500 ease-in-out group-hover:-translate-y-(--reveal) motion-reduce:transition-none"
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-[11px] text-muted">
            [Project screenshot]
          </div>
        )}
      </div>
    </div>
  );
}
