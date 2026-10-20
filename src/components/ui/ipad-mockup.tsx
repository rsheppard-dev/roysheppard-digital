import type { CSSProperties } from "react";
import Image from "next/image";

// Aspect ratio (height / width) of the screen itself. The bezel is added around it, so the whole
// device lands close to the old drawn frame's proportions and the grids don't shift.
const SCREEN_ASPECT = 816 / 1172;
const PREVIEW_WIDTH = 900;
const IMAGE_SIZES = "(min-width: 1024px) 380px, (min-width: 768px) 320px, 85vw";

/** How far (as % of the image's own height) a tall screenshot must pan
 * upward on hover so its bottom edge reaches the screen's bottom edge. */
function getRevealPercent(dimensions?: { width: number; height: number } | null) {
  if (!dimensions) return 0;
  const imageAspect = dimensions.height / dimensions.width;
  if (imageAspect <= SCREEN_ASPECT) return 0;
  return ((imageAspect - SCREEN_ASPECT) / imageAspect) * 100;
}

/**
 * A slim tablet around a website screenshot: a light bezel with a hairline edge, a small camera
 * dot and a soft layered shadow, matching BrowserMockup and PhoneMockup. Sizes are in container
 * units so the frame keeps its proportions at any width. On hover of a `group` ancestor a tall
 * screenshot scrolls to its bottom.
 */
export function IPadMockup({
  screenshotSrc,
  screenshotAlt,
  screenshotDimensions,
  className = "",
  loading,
  sizes = IMAGE_SIZES,
}: {
  /** Optional: omit to show a neutral placeholder until a screenshot is available. */
  screenshotSrc?: string;
  screenshotAlt: string;
  /** Natural pixel dimensions of the screenshot, used to compute the hover pan distance. */
  screenshotDimensions?: { width: number; height: number } | null;
  className?: string;
  /** Pass "eager" when the iPad sits above the fold, so the screenshot isn't lazy-loaded. */
  loading?: "eager" | "lazy";
  /** Rendered width of the iPad, for picking the right image size. */
  sizes?: string;
}) {
  const revealPercent = getRevealPercent(screenshotDimensions);
  const previewHeight = screenshotDimensions
    ? Math.round((PREVIEW_WIDTH * screenshotDimensions.height) / screenshotDimensions.width)
    : Math.round(PREVIEW_WIDTH * SCREEN_ASPECT);

  return (
    <div className={`@container w-full ${className}`}>
      <div className="relative rounded-[3.6cqw] bg-white p-[2.6cqw] shadow-[0_2px_6px_rgba(23,23,26,0.06),0_18px_40px_rgba(23,23,26,0.13)] ring-1 ring-ink/10">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[0.85cqw] size-[0.9cqw] -translate-x-1/2 rounded-full bg-ink/70"
        />
        <div
          className="relative w-full overflow-hidden rounded-[1.1cqw] bg-tan"
          style={{ aspectRatio: "1172 / 816" }}
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
              className="absolute inset-x-0 top-0 h-auto w-full transition-transform duration-2500 ease-in-out group-hover:-translate-y-(--reveal) motion-reduce:transition-none"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-[11px] text-muted">
              [Project screenshot]
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
